import Anthropic from '@anthropic-ai/sdk';
import { StrategyRequest, StrategyResponse, StrategyServiceOptions } from '../types/strategy.types';
import { buildSystemPrompt, buildUserPrompt } from '../prompts/system.prompt';

const DEFAULT_MODEL  = 'claude-sonnet-4-6';
const DEFAULT_TOKENS = 4000;

export class ClaudeStrategyService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
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
      .filter(b => b.type === 'text')
      .map(b => (b as { type: 'text'; text: string }).text)
      .join('');

    return this.parse(rawText);
  }

  private parse(raw: string): StrategyResponse {
    const cleaned = raw
      .replace(/^```json\s*/m, '')
      .replace(/^```\s*/m, '')
      .replace(/```\s*$/m, '')
      .trim();
    try {
      const parsed = JSON.parse(cleaned) as StrategyResponse;
      this.validate(parsed);
      return parsed;
    } catch (err) {
      throw new Error(`AI 응답 파싱 실패: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  private validate(data: StrategyResponse): void {
    const required = ['summary', 'regulation', 'compliance', 'channels', 'events', 'kol', 'roadmap'];
    for (const key of required) {
      if (!(key in data)) throw new Error(`응답 필드 누락: ${key}`);
    }
  }
}
