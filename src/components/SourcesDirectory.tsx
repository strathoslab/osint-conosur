import React, { useState, useMemo } from 'react';
import { 
  Database, 
  ExternalLink, 
  Building2,
  Search,
  Anchor,
  Radio,
  BarChart3,
  Globe2,
  Shield,
  FileText,
  Ship,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CountryCode, CountryProfile, SourceDefinition, SourceCategory, SourceSubCategory } from '../types';
import { COUNTRY_NAMES } from '../utils/formatters';

export type SourceItem = SourceDefinition;

interface SourcesDirectoryProps {
  sources: SourceItem[];
  profiles: Record<string, CountryProfile>;
}

export const SourcesDirectory: React.FC<SourcesDirectoryProps> = ({ sources, profiles }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SourceSubCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlySouthAtlantic, setOnlySouthAtlantic] = useState<boolean>(false);
  const [showMatrixInfo, setShowMatrixInfo] = useState<boolean>(true);

  // Quick count of South Atlantic sources
  const southAtlanticSourcesCount = useMemo(() => {
    return sources.filter(s => 
      s.subCategory ||
      s.name.toLowerCase().includes('mar') || 
      s.name.toLowerCase().includes('atlántico') || 
      s.name.toLowerCase().includes('malvinas') || 
      s.name.toLowerCase().includes('falkland') ||
      s.name.toLowerCase().includes('sea lion') ||
      s.name.toLowerCase().includes('navitas') ||
      s.name.toLowerCase().includes('rockhopper') ||
      s.name.toLowerCase().includes('borders') ||
      s.name.toLowerCase().includes('fifca') ||
      s.name.toLowerCase().includes('puerto') || 
      s.name.toLowerCase().includes('mercopress') || 
      s.description.toLowerCase().includes('atlántico') || 
      s.description.toLowerCase().includes('mar argentino') || 
      s.description.toLowerCase().includes('milla 201') || 
      s.description.toLowerCase().includes('antártida') || 
      s.description.toLowerCase().includes('malvinas') || 
      s.description.toLowerCase().includes('sea lion') ||
      s.description.toLowerCase().includes('pesca')
    ).length;
  }, [sources]);

  const filteredSources = useMemo(() => {
    return sources.filter((s) => {
      if (onlySouthAtlantic) {
        const isSA = 
          Boolean(s.subCategory) ||
          s.name.toLowerCase().includes('mar') || 
          s.name.toLowerCase().includes('atlántico') || 
          s.name.toLowerCase().includes('malvinas') || 
          s.name.toLowerCase().includes('falkland') ||
          s.name.toLowerCase().includes('sea lion') ||
          s.name.toLowerCase().includes('navitas') ||
          s.name.toLowerCase().includes('rockhopper') ||
          s.name.toLowerCase().includes('borders') ||
          s.name.toLowerCase().includes('fifca') ||
          s.name.toLowerCase().includes('puerto') || 
          s.name.toLowerCase().includes('mercopress') || 
          s.description.toLowerCase().includes('atlántico') || 
          s.description.toLowerCase().includes('mar argentino') || 
          s.description.toLowerCase().includes('milla 201') || 
          s.description.toLowerCase().includes('antártida') || 
          s.description.toLowerCase().includes('malvinas') || 
          s.description.toLowerCase().includes('sea lion') ||
          s.description.toLowerCase().includes('pesca');
        if (!isSA) return false;
      }

      if (selectedCountry !== 'ALL' && s.country !== selectedCountry) return false;
      if (selectedCategory !== 'ALL' && s.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'ALL' && s.subCategory !== selectedSubCategory) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const match = 
          s.name.toLowerCase().includes(q) || 
          s.description.toLowerCase().includes(q) || 
          s.category.toLowerCase().includes(q) ||
          (s.subCategory && s.subCategory.toLowerCase().includes(q)) ||
          (s.ticker && s.ticker.toLowerCase().includes(q)) ||
          (s.focusArea && s.focusArea.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [sources, onlySouthAtlantic, selectedCountry, selectedCategory, selectedSubCategory, searchTerm]);

  const getReliabilityBadge = (score: string) => {
    switch (score) {
      case 'A1':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap" title="Completamente confiable / Fuente Oficial">
            STANAG A1
          </span>
        );
      case 'A2':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 whitespace-nowrap" title="Usualmente confiable / Organismo Estatal o Empresa Regulada">
            STANAG A2
          </span>
        );
      case 'B1':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 whitespace-nowrap" title="Bastante confiable / Prensa & Think Tank">
            STANAG B1
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 whitespace-nowrap">
            {score}
          </span>
        );
    }
  };

  const getSyncBadge = (status?: 'LIVE_SYNC' | 'PORTAL_DIRECT' | 'FILINGS_FEED') => {
    switch (status) {
      case 'LIVE_SYNC':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60" title="Sincronización en vivo mediante RSS Engine">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE RSS
          </span>
        );
      case 'FILINGS_FEED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/60" title="Feed regulatorio bursátil (LSE, TASE, SEDAR)">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            BURSÁTIL / RNS
          </span>
        );
      case 'PORTAL_DIRECT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-800/60" title="Portal oficial / Registro gubernamental directo">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            PORTAL OFICIAL
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 text-slate-400 border border-slate-800">
            DIRECTORIO
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Country Risk & Strategic Profiles Grid */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Building2 className="w-4 h-4 text-blue-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Matriz de Inteligencia País // Cono Sur
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {(Object.entries(profiles) as [string, CountryProfile][]).map(([code, profile]) => (
            <div
              key={code}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{profile.flag}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{profile.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400">Capital: {profile.capital}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                      NIVEL: {profile.threatLevel}
                    </span>
                  </div>
                </div>

                {/* Focus areas */}
                <div className="mt-3">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                    Ejes de Interés Prioritario:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {profile.keyFocusAreas.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-400 font-bold font-mono text-[10px]">▸</span>
                        <span className="leading-snug">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                <div>
                  <span>Riesgo Económico:</span>
                  <div className={`font-bold ${profile.economicRisk === 'CRÍTICO' ? 'text-red-400' : profile.economicRisk === 'ALTO' ? 'text-amber-400' : 'text-slate-200'}`}>
                    {profile.economicRisk}
                  </div>
                </div>
                <div>
                  <span>Riesgo Seguridad:</span>
                  <div className={`font-bold ${profile.securityRisk === 'ALTO' || profile.securityRisk === 'CRÍTICO' ? 'text-amber-400' : 'text-slate-200'}`}>
                    {profile.securityRisk}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* South Atlantic Ecosystem Summary Matrix Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg backdrop-blur-md">
        <div className="p-4 bg-gradient-to-r from-slate-900 via-blue-950/30 to-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Anchor className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-100 tracking-wide">
                  Ecosistema de Inteligencia Atlántico Sur, Malvinas & Espacio Austral
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {southAtlanticSourcesCount} Fuentes Validadas
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mapeo exhaustivo de actores clave: hidrocarburos (Sea Lion FID), regulación pesquera (FIFCA), soberanía, diplomacia (MRECIC/FCDO) y telemetría satelital naval.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMatrixInfo(!showMatrixInfo)}
              className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 transition"
            >
              {showMatrixInfo ? 'Ocultar Matriz de Validación' : 'Ver Matriz de Validación'}
            </button>
            <button
              onClick={() => {
                setOnlySouthAtlantic(!onlySouthAtlantic);
                if (!onlySouthAtlantic) {
                  setSelectedCategory('ALL');
                  setSelectedSubCategory('ALL');
                }
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition border flex items-center gap-1.5 ${
                onlySouthAtlantic
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
              }`}
            >
              <Anchor className="w-3.5 h-3.5 text-cyan-300" />
              <span>{onlySouthAtlantic ? 'Mostrando Atlántico Sur' : 'Filtrar Atlántico Sur'}</span>
            </button>
          </div>
        </div>

        {/* Validation Matrix Grid */}
        {showMatrixInfo && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-slate-950/50 text-xs">
            {/* 1. Hidrocarburos & Operadores */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono text-[11px]">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>HIDROCARBUROS & SEA LION</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Operador <span className="text-slate-200 font-medium">Navitas Petroleum (65%)</span> y socio <span className="text-slate-200 font-medium">Rockhopper (35%)</span> en bloque PL032 (~1.700M bbl). Exploración sur: <span className="text-slate-200 font-medium">Borders & Southern</span> (Darwin) y <span className="text-slate-200 font-medium">Eco Atlantic</span>.
              </p>
              <div className="pt-1 flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono">TASE: NVPT</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono">AIM: RKH</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono">AIM: BOR</span>
              </div>
            </div>

            {/* 2. Pesca & Asociaciones */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold font-mono text-[11px]">
                <Ship className="w-3.5 h-3.5" />
                <span>PESCA & RECURSOS MARINOS</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Asociación <span className="text-slate-200 font-medium">FIFCA</span> (Fortuna Ltd, Argos, CFL, Beauchene). Regulación de calamar Loligo/Illex, estadísticas de capturas, cuotas ITQ y Milla 201 / Agujero Azul.
              </p>
              <div className="pt-1 flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">Cuotas ITQ</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">Fortuna Ltd</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">Milla 201</span>
              </div>
            </div>

            {/* 3. Gobiernos, Sanciones & Diplomacia */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90 space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-400 font-semibold font-mono text-[11px]">
                <Shield className="w-3.5 h-3.5" />
                <span>SOBERANÍA & GOBIERNOS</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-medium">Cancillería Argentina (MRECIC)</span> & Casa Rosada (sanciones hidrocarburíferas ley 26.659, COPLA). Contraparte británica: <span className="text-slate-200 font-medium">FCDO</span> y <span className="text-slate-200 font-medium">UK MoD / BFSAI</span> (Mount Pleasant).
              </p>
              <div className="pt-1 flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono">Cancillería AR</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono">FIG Stanley</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-[10px] font-mono">UK FCDO</span>
              </div>
            </div>

            {/* 4. Monitoreo Técnico & Bolsas */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px]">
                <Cpu className="w-3.5 h-3.5" />
                <span>MONITOREO TÉCNICO & REGISTROS</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Telemetría satelital <span className="text-slate-200 font-medium">Global Fishing Watch</span> y <span className="text-slate-200 font-medium">MarineTraffic</span>. Divulgación oficial <span className="text-slate-200 font-medium">LSE RNS</span>, <span className="text-slate-200 font-medium">TASE</span>, <span className="text-slate-200 font-medium">Companies House UK</span> y <span className="text-slate-200 font-medium">SEDAR+</span>.
              </p>
              <div className="pt-1 flex flex-wrap gap-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">AIS Satelital</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">LSE RNS</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">Companies House</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Directory Main Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-slate-200">
              Directorio de Fuentes & Actores Estratégicos
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({filteredSources.length} activas)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar fuente, ticker o tema..."
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-48 sm:w-56"
              />
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todos los Países ({sources.length})</option>
              <option value="AR">🇦🇷 Argentina</option>
              <option value="CL">🇨🇱 Chile</option>
              <option value="BR">🇧🇷 Brasil</option>
              <option value="UY">🇺🇾 Uruguay</option>
              <option value="PY">🇵🇾 Paraguay</option>
              <option value="BO">🇧🇴 Bolivia</option>
              <option value="REGIONAL">🌎 Multilateral / Atlántico Sur</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todas las Categorías</option>
              <option value="GOVERNMENT_DEFENSE">Gobierno, Defensa & Cancillerías</option>
              <option value="ECONOMIC_CENTRAL_BANK">Economía & Bancos Centrales</option>
              <option value="ENERGY_MINING">Energía, Litio & Hidrocarburos</option>
              <option value="LOGISTICS_PORTS">Puertos, Pesca & Logística</option>
              <option value="TECHNICAL_TRACKING">Monitoreo Satelital / AIS</option>
              <option value="THINK_TANK">Think Tanks Geopolíticos</option>
              <option value="CORPORATE_REGULATORY">Bolsas & Registros Societarios</option>
              <option value="MEDIA_OSINT">Medios Estratégicos OSINT</option>
            </select>
          </div>
        </div>

        {/* SubCategory Filter Pills for Atlántico Sur and Key Sectors */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-mono mr-1">SUBSECTOR:</span>
          <button
            onClick={() => setSelectedSubCategory('ALL')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Todos ({filteredSources.length})
          </button>
          <button
            onClick={() => setSelectedSubCategory('HYDROCARBONS')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'HYDROCARBONS'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Hidrocarburos & Sea Lion
          </button>
          <button
            onClick={() => setSelectedSubCategory('FISHERIES')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'FISHERIES'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Pesca & FIFCA
          </button>
          <button
            onClick={() => setSelectedSubCategory('OFFICIAL_GOV')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'OFFICIAL_GOV'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Autoridades Oficiales
          </button>
          <button
            onClick={() => setSelectedSubCategory('TECHNICAL_DATA')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'TECHNICAL_DATA'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            AIS Satelital & Bolsas (LSE/TASE)
          </button>
          <button
            onClick={() => setSelectedSubCategory('THINK_TANK')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'THINK_TANK'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Think Tanks (RUSI/Chatham)
          </button>
          <button
            onClick={() => setSelectedSubCategory('REGULATORY_REGISTRY')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              selectedSubCategory === 'REGULATORY_REGISTRY'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Registros Societarios
          </button>
        </div>

        {/* Counter and Active Filters Notice */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Mostrando <strong className="text-slate-200">{filteredSources.length}</strong> fuentes</span>
          {onlySouthAtlantic && (
            <span className="text-cyan-400 font-medium">Filtrado activado: Atlántico Sur, Malvinas & Operadores</span>
          )}
        </div>

        {/* Sources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredSources.map((source) => {
            const country = COUNTRY_NAMES[source.country] || { name: source.country, flag: '🌐' };

            return (
              <div
                key={source.id}
                className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 hover:border-slate-700 transition flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Card Header: Flag, Name, Ticker, Reliability & Sync Status */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">{country.flag}</span>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-100">{source.name}</span>
                          {source.ticker && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              {source.ticker}
                            </span>
                          )}
                          <span className="px-1 rounded text-[9px] font-mono font-semibold uppercase bg-slate-800 text-slate-400">
                            {source.language}
                          </span>
                        </div>
                        {source.focusArea && (
                          <div className="text-[11px] text-cyan-400 font-mono font-medium mt-0.5">
                            {source.focusArea}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getReliabilityBadge(source.reliabilityScore)}
                      {getSyncBadge(source.syncStatus)}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {source.description}
                  </p>
                </div>

                {/* Card Footer: Category & Portal Link */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 truncate max-w-[200px]" title={source.category}>
                    {source.category}
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 transition"
                  >
                    <span>Abrir Portal / Feed</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSources.length === 0 && (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-sm font-medium">No se encontraron fuentes con los filtros seleccionados.</p>
            <button
              onClick={() => {
                setSelectedCountry('ALL');
                setSelectedCategory('ALL');
                setSelectedSubCategory('ALL');
                setSearchTerm('');
                setOnlySouthAtlantic(false);
              }}
              className="text-xs text-blue-400 hover:underline"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
