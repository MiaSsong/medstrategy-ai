export type ProductCategory = 'ivd' | 'img' | 'trt' | 'digi' | 'imp' | 'cons';
export type MarketCode      = 'KR' | 'US' | 'EU' | 'JP' | 'CN' | 'SEA';
export type RiskLevel       = 'high' | 'mid' | 'low';
export type Priority        = 'high' | 'mid' | 'low';
export type EventType       = '학회' | '전시회' | '심포지엄' | '포럼';

export interface StrategyRequest {
  category: ProductCategory;
  product:  string;
  markets:  MarketCode[];
  context?: string;
}

export interface RegulationInfo {
  market: string;
  grade:  string;
  path:   string;
  rules:  string[];
}

export interface ComplianceInfo {
  banned:  string[];
  allowed: string[];
  caution: string[];
}

export interface Channel {
  name:      string;
  priority:  Priority;
  rationale: string;
  tactics:   string[];
}

export interface StrategyResponse {
  summary: {
    name:     string;
    category: string;
    risk:     RiskLevel;
  };
  regulation: RegulationInfo[];
  compliance: ComplianceInfo;
  channels:   Channel[];
  message: {
    core:  string;
    proof: string[];
  };
  events: Array<{
    name:        string;
    month:       string;
    location:    string;
    type:        EventType;
    opportunity: string;
  }>;
  kol: Array<{
    type:       string;
    profile:    string;
    engagement: string;
    markets:    MarketCode[];
  }>;
  roadmap: Array<{
    phase:   string;
    period:  string;
    title:   string;
    actions: string[];
  }>;
}

export interface StrategyServiceOptions {
  claudeModel?: string;
  maxTokens?:   number;
}
