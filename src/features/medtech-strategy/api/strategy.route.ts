import { Router, Request, Response, NextFunction } from 'express';
import { ClaudeStrategyService } from '../services/claude.service';
import { StrategyRequest, ProductCategory, MarketCode } from '../types/strategy.types';

const router  = Router();
const service = new ClaudeStrategyService();

const VALID_CATEGORIES: ProductCategory[] = ['ivd', 'img', 'trt', 'digi', 'imp', 'cons'];
const VALID_MARKETS:    MarketCode[]       = ['KR', 'US', 'EU', 'JP', 'CN', 'SEA'];

class ValidationError extends Error {}

function validate(body: unknown): StrategyRequest {
  if (!body || typeof body !== 'object') throw new ValidationError('요청 본문이 없습니다.');
  const { category, product, markets, context } = body as Record<string, unknown>;

  if (!category || !VALID_CATEGORIES.includes(category as ProductCategory))
    throw new ValidationError(`유효하지 않은 category. 허용: ${VALID_CATEGORIES.join(', ')}`);

  if (!product || typeof product !== 'string' || product.trim().length < 5)
    throw new ValidationError('product는 5자 이상이어야 합니다.');

  if (!Array.isArray(markets) || markets.length === 0)
    throw new ValidationError('markets는 하나 이상의 배열이어야 합니다.');

  const invalid = (markets as unknown[]).filter(m => !VALID_MARKETS.includes(m as MarketCode));
  if (invalid.length > 0) throw new ValidationError(`유효하지 않은 시장 코드: ${invalid.join(', ')}`);

  return {
    category: category as ProductCategory,
    product:  (product as string).trim(),
    markets:  markets as MarketCode[],
    context:  typeof context === 'string' ? context.trim() : undefined,
  };
}

router.post('/strategy', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const strategyReq = validate(req.body);
    const result      = await service.generateStrategy(strategyReq);
    res.status(200).json({
      success: true,
      data:    result,
      meta: {
        model:       'claude-sonnet-4-6',
        markets:     strategyReq.markets,
        category:    strategyReq.category,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    next(err);
  }
});

router.get('/categories', (_req: Request, res: Response) => {
  res.json({ success: true, data: CATEGORIES });
});

router.get('/markets', (_req: Request, res: Response) => {
  res.json({ success: true, data: MARKETS });
});

const CATEGORIES = [
  { id: 'ivd',  label: '체외진단기기 (IVD)',    icon: '🧪', subs: ['분자진단', '면역진단/POCT', '임상화학·혈액학', '조직·세포진단'] },
  { id: 'img',  label: '영상진단기기',           icon: '🖥', subs: ['X선/CT', 'MRI', '초음파', '핵의학/PET'] },
  { id: 'trt',  label: '치료·수술기기',          icon: '💊', subs: ['심혈관 중재기기', '에너지 기반 치료기', '수술기기·로봇', '재활·물리치료기기'] },
  { id: 'digi', label: '디지털헬스 / SaMD',      icon: '💻', subs: ['AI 진단 SW', '원격모니터링(RPM)', '수술 계획 SW', 'EMR·연계 SW'] },
  { id: 'imp',  label: '이식형·매식기기',         icon: '🦷', subs: ['정형외과 임플란트', '치과용 임플란트', '신경자극기', '혈관 이식물'] },
  { id: 'cons', label: '소모품·일반의료기기',     icon: '🩹', subs: ['일회용 수술 소모품', '상처치료·드레싱', '개인용 건강기기', '진단 소모품·시약'] },
];

const MARKETS = [
  { code: 'KR',  label: '한국',   regulator: 'MFDS',    phase: 1 },
  { code: 'US',  label: '미국',   regulator: 'FDA',     phase: 1 },
  { code: 'EU',  label: '유럽',   regulator: 'CE/MDR',  phase: 1 },
  { code: 'JP',  label: '일본',   regulator: 'PMDA',    phase: 2 },
  { code: 'CN',  label: '중국',   regulator: 'NMPA',    phase: 2 },
  { code: 'SEA', label: '동남아', regulator: 'Various', phase: 2 },
];

export default router;
