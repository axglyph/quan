
export interface QuantumNews {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  date: string;
  language: 'zh' | 'en';
  hotScore?: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface FetchState {
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}
