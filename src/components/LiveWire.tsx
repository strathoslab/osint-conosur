import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  AlertTriangle, 
  RefreshCw
} from 'lucide-react';
import { IntelItem, CountryCode, StrategicPillar, AlertLevel, CountryProfile } from '../types';
import { IntelItemCard } from './IntelItemCard';
import { CountryBarometer } from './CountryBarometer';

interface LiveWireProps {
  items: IntelItem[];
  profiles: Record<string, CountryProfile>;
  onSelectItem: (item: IntelItem) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSync: () => void;
  isSyncing: boolean;
  selectedCountry: CountryCode | 'ALL';
  setSelectedCountry: (country: CountryCode | 'ALL') => void;
}

export const LiveWire: React.FC<LiveWireProps> = ({
  items,
  profiles,
  onSelectItem,
  onToggleBookmark,
  onSync,
  isSyncing,
  selectedCountry,
  setSelectedCountry,
}) => {
  const [search, setSearch] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<StrategicPillar | 'ALL'>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<AlertLevel | 'ALL'>('ALL');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Filter Items
  const filteredItems = items.filter((item) => {
    if (selectedCountry !== 'ALL' && item.country !== selectedCountry) return false;
    if (selectedPillar !== 'ALL' && item.pillar !== selectedPillar) return false;
    if (selectedLevel !== 'ALL' && item.level !== selectedLevel) return false;
    if (onlyBookmarked && !item.bookmarked) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchSource = item.source.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchSource && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Country Risk Barometer */}
      <CountryBarometer
        profiles={profiles}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
      />

      {/* Filter Control Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 backdrop-blur-sm">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por palabra clave, actor, hidrovía, litio, puerto, radar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Pillar Filter */}
          <select
            value={selectedPillar}
            onChange={(e) => setSelectedPillar(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">Todos los Pilares</option>
            <option value="DEFENSE_SECURITY">Defensa & Seguridad</option>
            <option value="GEOPOLITICS_DIPLOMACY">Geopolítica & Diplomacia</option>
            <option value="ECONOMY_COMMODITIES">Economía & Commodities</option>
            <option value="ENERGY_INFRASTRUCTURE">Energía & Infraestructura</option>
            <option value="CLIMATE_CRISIS">Clima & Cuencas</option>
            <option value="CYBER_CRIME">Ciberseguridad</option>
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="ALL">Todo Nivel de Alerta</option>
            <option value="CRITICAL">Crítico / Flash</option>
            <option value="HIGH">Elevado</option>
            <option value="MEDIUM">Moderado</option>
            <option value="ROUTINE">Rutina</option>
          </select>

          {/* Bookmark Toggle */}
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg border transition cursor-pointer ${
              onlyBookmarked
                ? 'bg-blue-950/80 border-blue-500 text-blue-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-blue-400' : ''}`} />
            <span>Guardados</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <div>
          MOSTRANDO <span className="text-blue-400 font-bold">{filteredItems.length}</span> DE <span className="text-slate-200">{items.length}</span> CABLES
          {selectedCountry !== 'ALL' && ` // PAÍS: ${selectedCountry}`}
          {selectedPillar !== 'ALL' && ` // PILAR: ${selectedPillar}`}
          {selectedLevel !== 'ALL' && ` // NIVEL: ${selectedLevel}`}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <IntelItemCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-xl space-y-3">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto opacity-70" />
          <h4 className="text-sm font-semibold text-slate-200">No se encontraron cables de inteligencia</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Prueba ajustando los filtros de país, pilar estratégico o término de búsqueda. También puedes sincronizar las fuentes en vivo.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCountry('ALL');
              setSelectedPillar('ALL');
              setSelectedLevel('ALL');
              setOnlyBookmarked(false);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-xs text-blue-400 hover:bg-slate-700 transition cursor-pointer"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}
    </div>
  );
};
