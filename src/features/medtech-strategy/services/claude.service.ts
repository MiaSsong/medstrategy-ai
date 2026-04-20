import Anthropic from '@anthropic-ai/sdk';
import { StrategyRequest, StrategyResponse, StrategyServiceOptions } from '../types/strategy.types';
import { buildSystemPrompt, buildUserPrompt } from '../prompts/system.prompt';

const DEFAULT_MODEL  = 'claude-sonnet-4-6';
const DEFAULT_TOKENS = 4000;

// 모든 필수 필드 — StrategyResponse 타입과 반드시 일치
const REQUIRED_FIELDS: (keyof StrategyResponse)[] = [
  'summary', 'regulation', 'compliance', 'channels', 'message', 'events', 'kol', 'roadmap',
];

export class ClaudeStrategyService {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.');
    this.client = new Anthropic({ apiKey });
  }

  async generateStrategy(
    req: StrategyRequest,
    opts: StrategyServiceOptions = {},
  ): Promise<StrategyResponse> {
    const model     = opts.claudeModel ?? DEFAULT_MODEL;
    const maxTokens = opts.maxTokens   ?? DEFAULT_TOKENS;

    const message = await this.client.messages.create({
      model,
      max_tokens: maxTokens,
      system:     buildSystemPrompt(req.markets),
      messages:   [{ role: 'user', content: buildUserPrompt(req.category, req.product, req.markets, req.context) }],
    });

    const rawText = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map(b => b.text)
      .join('');

    return this.parse(rawText);
  }

  private parse(raw: string): StrategyResponse {
    // 마크다운 코드블록 제거 (```json ... ``` 또는 ``` ... ```)
    const cleaned = raw
      .replace(/^```(?:json)?\s*\n?/m, '')
      .replace(/\n?```\s*$/m, '')
      .trim();

    let parsed: StrategyResponse;
    try {
      parsed = JSON.parse(cleaned) as StrategyResponse;
    } catch {
      console.error('[MedStrategy] Raw AI response:', raw.slice(0, 500));
      throw new Error('AI 응답을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.');
    }

    this.validate(parsed);
    return parsed;
  }

  private validate(data: StrategyResponse): void {
    for (const key of REQUIRED_FIELDS) {
      if (!(key in data) || data[key] === null || data[key] === undefined) {
        throw new Error(`AI 응답 필드 누락: ${key}. 다시 시도해 주세요.`);
      }
    }
  }
}
