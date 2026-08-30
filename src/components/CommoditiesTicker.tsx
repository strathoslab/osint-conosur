import React from 'react';
import { TrendingUp, TrendingDown, Layers, ExternalLink } from 'lucide-react';
import { CommodityItem, CountryCode } from '../types';

interface CommoditiesTickerProps {
  commodities: CommodityItem[];
  onSelectCommodity?: (commodity: CommodityItem) => void;
  onFilterByTag?: (tag: string) => void;
}

const COUNTRY_FLAGS: Record<CountryCode | string, string> = {
  AR: '🇦🇷',
  CL: '🇨🇱',
  BR: '🇧🇷',
  UY: '🇺🇾',
  PY: '🇵🇾',
  BO: '🇧🇴',
  REGIONAL: '🌎',
};

export const CommoditiesTicker: React.FC<CommoditiesTickerProps> = ({
  commodities,
  onSelectCommodity,
}) => {
  if (!commodities || commodities.length === 0) return null;

  return (
    <div className="bg-slate-900/80 border-y border-slate-800 backdrop-blur-md px-4 py-2 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Ticker Badge */}
        <div className="flex items-center space-x-2 shrink-0 pr-3 border-r border-slate-800">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
            COMMODITIES CONO SUR
          </span>
        </div>

        {/* Scrollable Items */}
        <div className="flex items-center space-x-6 overflow-x-auto scrollbar-none py-0.5">
          {commodities.map((item) => {
            const isPositive = item.change24h >= 0;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCommodity && onSelectCommodity(item)}
                id={`ticker-${item.id}`}
                className="flex items-center space-x-2 shrink-0 font-mono text-[11px] group cursor-pointer hover:opacity-80 transition-opacity bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800/80"
                title={`${item.name} (${item.benchmark}) - Clic para ver análisis geopolítico`}
              >
                <span className="text-slate-300 font-semibold">{item.name.split('(')[0].trim()}</span>
                
                {/* Flags */}
                <span className="text-xs">
                  {item.keyCountries.slice(0, 3).map(c => COUNTRY_FLAGS[c] || '').join('')}
                </span>

                {/* Price */}
                <span className="text-white font-bold">
                  ${item.price >= 1000 ? item.price.toLocaleString('es-AR') : item.price.toFixed(2)}
                </span>

                {/* Variation */}
                <span
                  className={`flex items-center text-[10px] font-bold px-1 py-0.2 rounded ${
                    isPositive
                      ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/30'
                      : 'text-red-400 bg-red-950/40 border border-red-800/30'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                  )}
                  {isPositive ? '+' : ''}{item.change24h.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
