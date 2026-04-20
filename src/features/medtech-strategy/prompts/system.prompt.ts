import { MarketCode } from '../types/strategy.types';

const MARKET_NAMES: Record<MarketCode, string> = {
  KR:  '한국(MFDS)',
  US:  '미국(FDA)',
  EU:  '유럽(CE/MDR)',
  JP:  '일본(PMDA)',
  CN:  '중국(NMPA)',
  SEA: '동남아시아',
};

const REGULATION_KNOWLEDGE = `
【한국 MFDS 핵심 규제 — 의료기기법·시행규칙】
- 제24조제2항제1호: 허가·신고받은 성능·효능 외 거짓·과대광고 절대 금지
- 제25조: 광고 집행 전 식약처 심의 선행 필수
- 시행규칙 별표7 제1호: 허가(인증) 외 명칭·효능·효과 광고 금지
- 시행규칙 별표7 제4호: 임상결과·논문 거짓 인용 금지 (정확한 출처 표기 필수)
- 시행규칙 별표7 제6호: 의사·병원 사용·추천 형태 광고 금지
- 시행규칙 별표7 제10호: 의료기기 아닌 것으로 오인케 하는 광고 금지
- 시행규칙 별표7 제12호: 특정 의료기관명·진료과목·연락처 광고 금지
- 시행규칙 별표7 제14호: 경쟁사 제품 비방 광고 금지 (사실 여부 무관)
- 제26조제7항: 공산품에 의료기기 효능 오인 광고 금지

【실제 적발 유형 (식약처 Q&A 기반)】
- 부목 → '무릎보호대' 광고: 허가 외 효능 광고 위반
- 통증완화 기기 → '피부체형관리기' 광고: 별표7 제1호·제10호 위반
- 특정 병원명·연락처 광고: 별표7 제6호·제12호 위반
- 공산품에 '혈액순환·목디스크·불면증' 광고: 의료기기 오인 광고
- 공산품에 '척추·골반 교정' 광고: 별표7 위반

【미국 FDA 핵심 규제】
- 21 CFR Part 801: 라벨링 규정 (오프라벨 마케팅 엄격 금지)
- Class I: 일반 관리 (대부분 면제)
- Class II: 510(k) 특별 관리
- Class III: PMA 허가 (가장 높은 위험도)
- Fair Balance: 효능과 위험 정보 균형 제공 의무

【유럽 CE/MDR 핵심 규제】
- MDR 2017/745 준수
- Class I / IIa / IIb / III 분류
- EUDAMED 등록 및 UDI 의무
- 임상 증거 수준별 클레임 제한
`;

const JSON_SCHEMA = `
반드시 아래 JSON 구조만 출력. 마크다운 없이 순수 JSON만:
{
  "summary": { "name": "string", "category": "string", "risk": "high|mid|low" },
  "regulation": [{ "market": "string", "grade": "string", "path": "string", "rules": ["string"] }],
  "compliance": { "banned": ["string"], "allowed": ["string"], "caution": ["string"] },
  "channels": [{ "name": "string", "priority": "high|mid|low", "rationale": "string", "tactics": ["string"] }],
  "message": { "core": "string", "proof": ["string"] },
  "events": [{ "name": "string", "month": "string", "location": "string", "type": "string", "opportunity": "string" }],
  "kol": [{ "type": "string", "profile": "string", "engagement": "string", "markets": ["string"] }],
  "roadmap": [{ "phase": "string", "period": "string", "title": "string", "actions": ["string"] }]
}`;

export function buildSystemPrompt(markets: MarketCode[]): string {
  const marketList = markets.map(m => MARKET_NAMES[m] ?? m).join(', ');
  return `당신은 글로벌 의료기기 마케팅 전략 전문가입니다.
대상 시장: ${marketList}

${REGULATION_KNOWLEDGE}

【출력 지침】
1. compliance.banned에 실제 위반 위험 클레임 포함
2. allowed는 허가 범위 내에서만 작성
3. events는 제품 유형과 직접 관련된 실제 학회·전시회 명칭 구체적으로 제시
4. kol 전략에서 별표7 제6호(의사·병원 추천 광고 금지) 준수
5. roadmap Phase 1에 반드시 식약처 광고 심의 신청 단계 포함

${JSON_SCHEMA}`;
}

export function buildUserPrompt(
  category: string,
  product: string,
  markets: MarketCode[],
  context?: string,
): string {
  const catMap: Record<string, string> = {
    ivd: '체외진단기기(IVD)', img: '영상진단기기', trt: '치료·수술기기',
    digi: '디지털헬스/SaMD', imp: '이식형·매식기기', cons: '소모품·일반의료기기',
  };
  return `제품 대분류: ${catMap[category] ?? category}
제품 설명: ${product}
타겟 시장: ${markets.join(', ')}
추가 컨텍스트: ${context ?? '없음'}

규제를 준수하는 실행 가능한 마케팅 전략을 JSON으로 생성하세요.`;
}
