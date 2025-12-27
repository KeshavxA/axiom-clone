export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  holders: number;
  status: 'new' | 'final' | 'migrated'; 
  lastUpdate?: 'up' | 'down';
  logoUrl?: string;
  isNew?: boolean;
}