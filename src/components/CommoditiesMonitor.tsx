import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Filter, 
  Search, 
  Activity, 
  MapPin, 
  ShieldAlert, 
  RefreshCw, 
  ExternalLink, 
  ArrowUpRight,
  FileText,
  AlertCircle,
  Truck,
  Globe2,
  Sparkles
} from 'lucide-react';
import { CommodityItem, CommodityCategory, CountryCode, IntelItem } from '../types';

interface CommoditiesMonitorProps {
  commodities: CommodityItem[];
  items: IntelItem[];
  onSelectIntelItem: (item: IntelItem) => void;
  onNavigateToWireWithFilter?: (keyword: string) => void;
  onGenerateReport?: (reportType: any, countries: CountryCode[], prompt?: string) => void;
}

const CATEGORY_NAMES: Record<CommodityCategory, { label: string; icon: string; color: string }> = {
  AGRO_GRAINS: { label: 'Granos & Agroindustria', icon: '🌾', color: 'text-amber-400 bg-amber-950/40 border-amber-800/40' },
  METALS_MINING: { label: 'Metales Críticos & Minería', icon: '⛏️', color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/40' },
  ENERGY_HYDROCARBONS: { label: 'Energía & Hidrocarburos', icon: '⚡', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40' },
  FORESTRY_PULP: { label: 'Forestal & Celulosa', icon: '🌲', color: 'text-green-400 bg-green-950/40 border-green-800/40' },
};

const COUNTRY_DATA: Record<CountryCode | string, { name: string; flag: string }> = {
  AR: { name: 'Argentina', flag: '🇦🇷' },
  CL: { name: 'Chile', flag: '🇨🇱' },
  BR: { name: 'Brasil', flag: '🇧🇷' },
  UY: { name: 'Uruguay', flag: '🇺🇾' },
  PY: { name: 'Paraguay', flag: '🇵🇾' },
  BO: { name: 'Bolivia', flag: '🇧🇴' },
  REGIONAL: { name: 'Cono Sur', flag: '🌎' },
};

export const CommoditiesMonitor: React.FC<CommoditiesMonitorProps> = ({
  commodities,
  items,
  onSelectIntelItem,
  onNavigateToWireWithFilter,
  onGenerateReport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CommodityCategory | 'ALL'>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCommodityModal, setActiveCommodityModal] = useState<CommodityItem | null>(null);

  // Filtered commodities
  const filteredCommodities = useMemo(() => {
    return commodities.filter((c) => {
      if (selectedCategory !== 'ALL' && c.category !== selectedCategory) return false;
      if (selectedCountry !== 'ALL' && !c.keyCountries.includes(selectedCountry)) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesSymbol = c.symbol.toLowerCase().includes(q);
        const matchesRelevance = c.strategicRelevance.toLowerCase().includes(q);
        const matchesAxis = c.logisticsAxis.toLowerCase().includes(q);
        const matchesDrivers = c.geopoliticalDrivers.some((d) => d.toLowerCase().includes(q));
        if (!matchesName && !matchesSymbol && !matchesRelevance && !matchesAxis && !matchesDrivers) {
          return false;
        }
      }
      return true;
    });
  }, [commodities, selectedCategory, selectedCountry, searchQuery]);

  // Correlated intel items for the active modal commodity
  const correlatedCables = useMemo(() => {
    if (!activeCommodityModal) return [];
    const nameKeywords = activeCommodityModal.name.toLowerCase().split(' ');
    const symbolKeywords = activeCommodityModal.symbol.toLowerCase().split(/[\s\/]+/);
    
    return items.filter((item) => {
      const text = `${item.title} ${item.summary} ${item.tags.join(' ')}`.toLowerCase();
      // Check for commodity direct match
      if (activeCommodityModal.id.includes('soja') && (text.includes('soja') || text.includes('grano') || text.includes('hidrovía'))) return true;
      if (activeCommodityModal.id.includes('cobre') && (text.includes('cobre') || text.includes('codelco') || text.includes('minería'))) return true;
      if (activeCommodityModal.id.includes('litio') && (text.includes('litio') || text.includes('salar') || text.includes('batería'))) return true;
      if (activeCommodityModal.id.includes('petroleo') && (text.includes('petróleo') || text.includes('vaca muerta') || text.includes('crudo') || text.includes('pre-sal'))) return true;
      if (activeCommodityModal.id.includes('gas') && (text.includes('gas') || text.includes('gasoducto') || text.includes('gnl') || text.includes('gasbol'))) return true;
      if (activeCommodityModal.id.includes('trigo') && (text.includes('trigo') || text.includes('cosecha'))) return true;
      if (activeCommodityModal.id.includes('maiz') && (text.includes('maíz') || text.includes('maiz'))) return true;
      if (activeCommodityModal.id.includes('celulosa') && (text.includes('celulosa') || text.includes('upm') || text.includes('papelera'))) return true;
      if (activeCommodityModal.id.includes('hierro') && (text.includes('hierro') || text.includes('vale') || text.includes('mutún'))) return true;
      if (activeCommodityModal.id.includes('carne') && (text.includes('carne') || text.includes('ganado') || text.includes('frigorífico'))) return true;

      return symbolKeywords.some(k => k.length > 2 && text.includes(k));
    }).slice(0, 6);
  }, [activeCommodityModal, items]);

  // Mini SVG Sparkline Generator
  const renderSparkline = (data: number[], isPositive: boolean) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 120;
    const height = 36;
    const padding = 4;

    const points = data
      .map((val, idx) => {
        const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((val - min) / range) * (height - 2 * padding);
        return `${x},${y}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#10b981' : '#ef4444';
    const fillColor = isPositive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {data.map((val, idx) => {
          if (idx === data.length - 1) {
            const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((val - min) / range) * (height - 2 * padding);
            return <circle key={idx} cx={x} cy={y} r="3" fill={strokeColor} />;
          }
          return null;
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Monitor Geoeconómico de Commodities
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border border-amber-500/30 bg-amber-950/40 text-amber-300">
                    CONO SUR STRATHOS RADAR
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Seguimiento estratégico en tiempo real de recursos críticos, granos, metales y energía (Argentina, Chile, Brasil, Uruguay, Paraguay, Bolivia)
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                if (onGenerateReport) {
                  onGenerateReport(
                    'GEOECONOMIC',
                    ['AR', 'CL', 'BR', 'UY', 'PY', 'BO'],
                    'Generar un informe estratégico geoeconómico sobre el impacto de las cotizaciones de granos, litio, cobre y energía en la balanza de pagos y estabilidad del Cono Sur.'
                  );
                }
              }}
              id="btn-report-commodities"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold shadow-[0_0_12px_rgba(37,99,235,0.3)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Informe Geoeconómico IA</span>
            </button>
          </div>
        </div>

        {/* Strategic Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>AGROEXPORTACIÓN</span>
              <span>🌾</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">Soja: $442.80 <span className="text-xs text-emerald-400 font-semibold">+1.35%</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">FOB Rosario & Paranaguá // Hidrovía</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>METALES CRÍTICOS</span>
              <span>⛏️</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">Cobre: $4.42 <span className="text-xs text-emerald-400 font-semibold">+2.15%</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">LME / Codelco Chile // Litio $11.9k</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>ENERGÍA REGIONAL</span>
              <span>⚡</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">WTI: $79.15 <span className="text-xs text-red-400 font-semibold">-1.20%</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">Vaca Muerta & Pre-Sal Brasil</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>GAS & INTEGRACIÓN</span>
              <span>🔥</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">Gas: $2.88 <span className="text-xs text-emerald-400 font-semibold">+2.85%</span></div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">Reversión Norte / Gasbol AR-BO-BR</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/60 backdrop-blur-md p-3.5 rounded-xl border border-slate-800">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === 'ALL'
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Todos ({commodities.length})
          </button>
          {(Object.keys(CATEGORY_NAMES) as CommodityCategory[]).map((cat) => {
            const meta = CATEGORY_NAMES[cat];
            const count = commodities.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{meta.icon}</span>
                <span>{meta.label}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Country Filter & Search */}
        <div className="flex items-center gap-2">
          {/* Country Selector */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="ALL">🌎 Todos los Países</option>
            <option value="AR">🇦🇷 Argentina</option>
            <option value="CL">🇨🇱 Chile</option>
            <option value="BR">🇧🇷 Brasil</option>
            <option value="UY">🇺🇾 Uruguay</option>
            <option value="PY">🇵🇾 Paraguay</option>
            <option value="BO">🇧🇴 Bolivia</option>
          </select>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar commodity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Commodities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCommodities.map((item) => {
          const isPositive = item.change24h >= 0;
          const catMeta = CATEGORY_NAMES[item.category];

          return (
            <div
              key={item.id}
              onClick={() => setActiveCommodityModal(item)}
              className="rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-4 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]"
            >
              {/* Header with Symbol & Tag */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{catMeta.icon}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        {item.name}
                      </h3>
                      <div className="font-mono text-[10px] text-slate-400">{item.symbol}</div>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${catMeta.color}`}>
                    {item.benchmark.split('/')[0].trim()}
                  </span>
                </div>

                {/* Price & Sparkline Row */}
                <div className="flex items-center justify-between my-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <div>
                    <div className="text-xl font-black text-white font-mono tracking-tight">
                      ${item.price >= 1000 ? item.price.toLocaleString('es-AR') : item.price.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.unit}</div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div
                      className={`flex items-center font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isPositive
                          ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/40'
                          : 'text-red-400 bg-red-950/60 border border-red-800/40'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {isPositive ? '+' : ''}{item.change24h.toFixed(2)}%
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-1">
                      7d: {item.changeWeek >= 0 ? '+' : ''}{item.changeWeek.toFixed(2)}%
                    </div>
                  </div>

                  {/* Visual Sparkline */}
                  <div className="hidden sm:block pl-2">
                    {renderSparkline(item.sparkline, isPositive)}
                  </div>
                </div>

                {/* Country Producers & Relevance */}
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-300">
                    <span className="text-slate-400 font-mono text-[10px]">Países Clave:</span>
                    <div className="flex items-center space-x-1">
                      {item.keyCountries.map((c) => (
                        <span
                          key={c}
                          className="px-1.5 py-0.5 rounded bg-slate-800 text-[11px] font-semibold border border-slate-700"
                          title={COUNTRY_DATA[c]?.name || c}
                        >
                          {COUNTRY_DATA[c]?.flag} {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.strategicRelevance}
                  </p>
                </div>
              </div>

              {/* Footer Corridor & Action */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <div className="flex items-center space-x-1 truncate max-w-[200px]" title={item.logisticsAxis}>
                  <Truck className="w-3 h-3 text-blue-400 shrink-0" />
                  <span className="truncate">{item.logisticsAxis.split('(')[0]}</span>
                </div>

                <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Análisis OSINT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCommodities.length === 0 && (
        <div className="p-12 text-center rounded-xl border border-slate-800 bg-slate-900/40">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <div className="text-sm font-semibold text-slate-300">No se encontraron commodities</div>
          <p className="text-xs text-slate-500 mt-1">Prueba cambiando la categoría o término de búsqueda.</p>
        </div>
      )}

      {/* Detailed Commodity Modal */}
      {activeCommodityModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCommodityModal(null)}
        >
          <div 
            className="w-full max-w-3xl rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-2xl">
                  {CATEGORY_NAMES[activeCommodityModal.category].icon}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-white">
                      {activeCommodityModal.name}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {activeCommodityModal.symbol}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Benchmark Internacional: <span className="text-slate-200">{activeCommodityModal.benchmark}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveCommodityModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Price & Sparkline Detailed Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-[11px] font-mono text-slate-400">COTIZACIÓN ACTUAL</div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  ${activeCommodityModal.price.toLocaleString('es-AR')}
                </div>
                <div className="text-xs text-slate-400">{activeCommodityModal.unit}</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400">VARIACIÓN 24H / 7D</div>
                <div className={`text-base font-bold font-mono mt-1 flex items-center ${activeCommodityModal.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {activeCommodityModal.change24h >= 0 ? '+' : ''}{activeCommodityModal.change24h.toFixed(2)}% (24h)
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  7 días: {activeCommodityModal.changeWeek >= 0 ? '+' : ''}{activeCommodityModal.changeWeek.toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400">RANGO 52 SEMANAS</div>
                <div className="text-xs font-mono text-slate-200 mt-1">
                  Mín: ${activeCommodityModal.low52w || 'N/D'} | Máx: ${activeCommodityModal.high52w || 'N/D'}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Actualizado: {new Date(activeCommodityModal.lastUpdated).toLocaleTimeString('es-AR')}
                </div>
              </div>
            </div>

            {/* Strategic Impact & Logistics */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider">
                  Relevancia Estratégica en el Cono Sur
                </h4>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800">
                  {activeCommodityModal.strategicRelevance}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider">
                  Corredor Logístico & Infraestructura Crítica
                </h4>
                <div className="flex items-center space-x-2 text-xs text-blue-300 bg-blue-950/30 p-2.5 rounded-lg border border-blue-800/40 mt-1">
                  <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{activeCommodityModal.logisticsAxis}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider">
                  Drivers Geopolíticos & Factores de Riesgo
                </h4>
                <ul className="mt-1.5 space-y-1.5">
                  {activeCommodityModal.geopoliticalDrivers.map((driver, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-950/40 p-2 rounded border border-slate-800/60">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{driver}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Correlated Intel Cables */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>Cables de Inteligencia Relacionados ({correlatedCables.length})</span>
                </h4>

                {onNavigateToWireWithFilter && (
                  <button
                    onClick={() => {
                      const tag = activeCommodityModal.id.includes('soja') ? 'Soja' :
                                  activeCommodityModal.id.includes('cobre') ? 'Cobre' :
                                  activeCommodityModal.id.includes('litio') ? 'Litio' :
                                  activeCommodityModal.id.includes('petroleo') ? 'Vaca Muerta' :
                                  activeCommodityModal.id.includes('gas') ? 'Gasoducto' :
                                  activeCommodityModal.name.split(' ')[0];
                      setActiveCommodityModal(null);
                      onNavigateToWireWithFilter(tag);
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <span>Ver todos en Cables en Vivo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {correlatedCables.length > 0 ? (
                <div className="space-y-2">
                  {correlatedCables.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setActiveCommodityModal(null);
                        onSelectIntelItem(c);
                      }}
                      className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white truncate">{c.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center space-x-2 mt-0.5">
                          <span>{COUNTRY_DATA[c.country]?.flag} {c.source}</span>
                          <span>•</span>
                          <span>{new Date(c.timestamp).toLocaleDateString('es-AR')}</span>
                        </div>
                      </div>

                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        c.level === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        c.level === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {c.level}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-slate-950 text-center text-xs text-slate-500 border border-slate-800">
                  No hay cables críticos recientes vinculados específicamente a este commodity.
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setActiveCommodityModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Cerrar
              </button>

              <button
                onClick={() => {
                  if (onGenerateReport) {
                    onGenerateReport(
                      'GEOECONOMIC',
                      activeCommodityModal.keyCountries,
                      `Generar un análisis estratégico enfocado en ${activeCommodityModal.name} (${activeCommodityModal.symbol}), su impacto en ${activeCommodityModal.keyCountries.join(', ')} y el corredor logístico ${activeCommodityModal.logisticsAxis}.`
                    );
                    setActiveCommodityModal(null);
                  }
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-1.5 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generar Informe de Inteligencia IA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
