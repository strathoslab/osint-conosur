export type CountryCode = 'AR' | 'CL' | 'UY' | 'BR' | 'PY' | 'BO' | 'REGIONAL';

export type StrategicPillar = 
  | 'DEFENSE_SECURITY' 
  | 'GEOPOLITICS_DIPLOMACY' 
  | 'ECONOMY_COMMODITIES' 
  | 'ENERGY_INFRASTRUCTURE' 
  | 'CLIMATE_CRISIS' 
  | 'CYBER_CRIME';

export type AlertLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'ROUTINE';

export interface IntelItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  sourceUrl?: string;
  country: CountryCode;
  pillar: StrategicPillar;
  level: AlertLevel;
  timestamp: string; // ISO string
  location?: {
    name: string;
    lat?: number;
    lng?: number;
  };
  tags: string[];
  entities?: string[];
  threatAssessment?: string;
  verified: boolean;
  bookmarked?: boolean;
}

export interface StrategicNode {
  id: string;
  name: string;
  category: 'PORT' | 'ENERGY_DAM' | 'MINING_LITHIUM' | 'BORDER_CHECKPOINT' | 'STRATEGIC_PASS' | 'MILITARY_BASE';
  country: CountryCode;
  lat: number;
  lng: number;
  status: 'OPERATIONAL' | 'ALERT' | 'CONGESTED' | 'DISRUPTED';
  details: string;
  keyCommoditiesOrAssets: string[];
}

export interface CountryProfile {
  code: CountryCode;
  name: string;
  flag: string;
  capital: string;
  threatLevel: AlertLevel;
  economicRisk: 'BAJO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';
  securityRisk: 'BAJO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';
  keyFocusAreas: string[];
  activeAlertsCount: number;
  lastUpdated: string;
  stats: {
    criticalItems: number;
    monitoredSources: number;
    hydroviaShare?: string;
    strategicAsset: string;
  };
}

export interface GeneratedReport {
  id: string;
  title: string;
  type: 'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM';
  targetCountries: CountryCode[];
  pillar?: StrategicPillar | 'ALL';
  createdAt: string;
  summary: string;
  classification: 'UNCLASSIFIED // OSINT' | 'CONFIDENCIAL // USO INTERNO' | 'FLASH SITREP';
  keyFindings: string[];
  strategicAssessment: string;
  riskMatrix: {
    area: string;
    threatLevel: AlertLevel;
    trend: 'INCREASING' | 'STABLE' | 'DECREASING';
    notes: string;
  }[];
  recommendations: string[];
  sourcesAnalyzedCount: number;
}

export interface IntelFilterState {
  search: string;
  country: CountryCode | 'ALL';
  pillar: StrategicPillar | 'ALL';
  level: AlertLevel | 'ALL';
  onlyVerified: boolean;
  onlyBookmarked: boolean;
}

export interface SystemMetrics {
  totalItems: number;
  criticalAlerts: number;
  activeSources: number;
  lastSync: string;
  feedsOnline: number;
  geminiOperational: boolean;
}

export type CommodityCategory = 'AGRO_GRAINS' | 'METALS_MINING' | 'ENERGY_HYDROCARBONS' | 'FORESTRY_PULP';

export interface CommodityItem {
  id: string;
  symbol: string;
  name: string;
  category: CommodityCategory;
  price: number;
  unit: string;
  change24h: number;
  changeWeek: number;
  high52w?: number;
  low52w?: number;
  lastUpdated: string;
  benchmark: string;
  keyCountries: CountryCode[];
  strategicRelevance: string;
  geopoliticalDrivers: string[];
  logisticsAxis: string;
  sparkline: number[];
}
