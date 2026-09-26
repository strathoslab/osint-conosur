import { CommodityItem, CountryCode } from '../src/types.js';
import { CONO_SUR_COMMODITIES } from './commoditiesData.js';

interface YahooChartResult {
  chart?: {
    result?: Array<{
      meta?: {
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
        currency?: string;
        regularMarketTime?: number;
        fiftyTwoWeekHigh?: number;
        fiftyTwoWeekLow?: number;
      };
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>;
        }>;
      };
    }>;
  };
}

interface CommoditySourceMapping {
  id: string;
  ticker: string;
  factor: number; // Conversion factor to the displayed unit
  decimals: number;
}

const COMMODITY_TICKERS: CommoditySourceMapping[] = [
  // Soja Grano: CBOT ZS=F (cents/bu). 1 MT = 36.7437 bu -> cents/bu * 0.367437 = USD/MT
  { id: 'commodity-soja', ticker: 'ZS=F', factor: 0.367437, decimals: 2 },
  
  // Harina de Soja: CBOT ZM=F (USD/short ton). 1 MT = 1.10231 short ton -> * 1.10231 = USD/MT
  { id: 'commodity-harina-soja', ticker: 'ZM=F', factor: 1.10231, decimals: 2 },
  
  // Maíz Amarillo: CBOT ZC=F (cents/bu). 1 MT = 39.368 bu -> cents/bu * 0.39368 = USD/MT
  { id: 'commodity-maiz', ticker: 'ZC=F', factor: 0.39368, decimals: 2 },
  
  // Trigo Pan: CBOT ZW=F (cents/bu). 1 MT = 36.7437 bu -> cents/bu * 0.367437 = USD/MT
  { id: 'commodity-trigo', ticker: 'ZW=F', factor: 0.367437, decimals: 2 },
  
  // Cobre Grado A: COMEX HG=F (USD/lb)
  { id: 'commodity-cobre', ticker: 'HG=F', factor: 1.0, decimals: 2 },
  
  // Petróleo Crudo: NYMEX CL=F (USD/bbl)
  { id: 'commodity-petroleo-wti', ticker: 'CL=F', factor: 1.0, decimals: 2 },
  
  // Gas Natural: NYMEX NG=F (USD/MMBtu)
  { id: 'commodity-gas-natural', ticker: 'NG=F', factor: 1.0, decimals: 2 },
  
  // Mineral de Hierro 62% Fe: TIO=F (USD/MT)
  { id: 'commodity-mineral-hierro', ticker: 'TIO=F', factor: 1.0, decimals: 2 },
];

class CommoditiesService {
  private commodities: CommodityItem[] = JSON.parse(JSON.stringify(CONO_SUR_COMMODITIES));
  private lastFetchTime: number = 0;
  private isUpdating: boolean = false;
  private readonly CACHE_TTL_MS = 3 * 60 * 1000; // 3 minutes

  constructor() {
    // Initial sync
    setTimeout(() => {
      this.refreshLivePrices(true).catch(err => {
        console.warn('[CommoditiesService] Initial price refresh notice:', err?.message || err);
      });
    }, 1500);

    // Periodic sync every 5 minutes
    setInterval(() => {
      this.refreshLivePrices(false).catch(err => {
        console.warn('[CommoditiesService] Periodic refresh error:', err?.message || err);
      });
    }, 5 * 60 * 1000);
  }

  public getCommodities(): CommodityItem[] {
    return this.commodities;
  }

  public getLastSyncTime(): string {
    return new Date(this.lastFetchTime || Date.now()).toISOString();
  }

  public async refreshLivePrices(force: boolean = false): Promise<{
    success: boolean;
    updatedCount: number;
    lastUpdated: string;
  }> {
    const now = Date.now();
    if (!force && now - this.lastFetchTime < this.CACHE_TTL_MS) {
      return {
        success: true,
        updatedCount: 0,
        lastUpdated: this.getLastSyncTime()
      };
    }

    if (this.isUpdating) {
      return {
        success: true,
        updatedCount: 0,
        lastUpdated: this.getLastSyncTime()
      };
    }

    this.isUpdating = true;
    let updatedCount = 0;

    try {
      // Fetch primary mapped tickers
      const tickerPromises = COMMODITY_TICKERS.map(async (mapping) => {
        try {
          const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(mapping.ticker)}?interval=1d&range=7d`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4500);

          const res = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
              'Accept': 'application/json'
            },
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (!res.ok) return null;
          const data: YahooChartResult = await res.json();
          const resultMeta = data.chart?.result?.[0]?.meta;
          const quoteIndicator = data.chart?.result?.[0]?.indicators?.quote?.[0]?.close;

          if (!resultMeta || typeof resultMeta.regularMarketPrice !== 'number') {
            return null;
          }

          const rawPrice = resultMeta.regularMarketPrice;
          const prevClose = resultMeta.chartPreviousClose || resultMeta.previousClose;
          const closePrices = Array.isArray(quoteIndicator)
            ? quoteIndicator.filter((v): v is number => typeof v === 'number' && !isNaN(v))
            : [];

          const price = Number((rawPrice * mapping.factor).toFixed(mapping.decimals));
          let change24h = 0;
          if (typeof prevClose === 'number' && prevClose > 0) {
            change24h = Number((((rawPrice - prevClose) / prevClose) * 100).toFixed(2));
          }

          let changeWeek = change24h;
          if (closePrices.length >= 2) {
            const weekStart = closePrices[0];
            if (weekStart > 0) {
              changeWeek = Number((((rawPrice - weekStart) / weekStart) * 100).toFixed(2));
            }
          }

          const sparkline = closePrices.length > 0
            ? closePrices.map(p => Number((p * mapping.factor).toFixed(mapping.decimals)))
            : [price];

          const high52w = resultMeta.fiftyTwoWeekHigh
            ? Number((resultMeta.fiftyTwoWeekHigh * mapping.factor).toFixed(mapping.decimals))
            : undefined;
          const low52w = resultMeta.fiftyTwoWeekLow
            ? Number((resultMeta.fiftyTwoWeekLow * mapping.factor).toFixed(mapping.decimals))
            : undefined;

          return {
            id: mapping.id,
            price,
            change24h,
            changeWeek,
            high52w,
            low52w,
            sparkline
          };
        } catch (e) {
          return null;
        }
      });

      // Also check LIT ETF for Lithium market movement
      const litPromise = (async () => {
        try {
          const res = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/LIT?interval=1d&range=7d', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          if (!res.ok) return null;
          const data: YahooChartResult = await res.json();
          const meta = data.chart?.result?.[0]?.meta;
          if (meta?.regularMarketPrice && meta?.chartPreviousClose) {
            const chg = Number((((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose) * 100).toFixed(2));
            return { type: 'LIT', change: chg };
          }
        } catch {}
        return null;
      })();

      const [tickerResults, litResult] = await Promise.all([
        Promise.allSettled(tickerPromises),
        litPromise
      ]);

      const nowIso = new Date().toISOString();

      tickerResults.forEach(res => {
        if (res.status === 'fulfilled' && res.value) {
          const update = res.value;
          const target = this.commodities.find(c => c.id === update.id);
          if (target) {
            target.price = update.price;
            target.change24h = update.change24h;
            target.changeWeek = update.changeWeek;
            if (update.sparkline && update.sparkline.length > 1) {
              target.sparkline = update.sparkline;
            }
            if (update.high52w) target.high52w = update.high52w;
            if (update.low52w) target.low52w = update.low52w;
            target.lastUpdated = nowIso;
            updatedCount++;
          }
        }
      });

      // Update Lithium with real market correlation if LIT was retrieved
      if (litResult && litResult.change !== undefined) {
        const lithium = this.commodities.find(c => c.id === 'commodity-litio');
        if (lithium) {
          // Adjust base price of 11950 by the industry delta
          const baseLiPrice = 11950;
          const adjustedPrice = Math.round(baseLiPrice * (1 + (litResult.change / 100)));
          lithium.price = adjustedPrice;
          lithium.change24h = litResult.change;
          lithium.lastUpdated = nowIso;
          updatedCount++;
        }
      }

      this.lastFetchTime = Date.now();
      console.log(`[CommoditiesService] Successfully synchronized ${updatedCount} live commodity benchmarks.`);
    } catch (err: any) {
      console.error('[CommoditiesService] Sync failure:', err?.message || err);
    } finally {
      this.isUpdating = false;
    }

    return {
      success: true,
      updatedCount,
      lastUpdated: this.getLastSyncTime()
    };
  }
}

export const commoditiesService = new CommoditiesService();
