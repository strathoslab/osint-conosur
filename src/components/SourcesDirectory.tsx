import React, { useState } from 'react';
import { 
  Database, 
  ExternalLink, 
  Building2
} from 'lucide-react';
import { CountryCode, CountryProfile } from '../types';
import { COUNTRY_NAMES } from '../utils/formatters';

export interface SourceItem {
  id: string;
  name: string;
  country: CountryCode;
  category: string;
  url: string;
  language: string;
  reliabilityScore: string;
  description: string;
}

interface SourcesDirectoryProps {
  sources: SourceItem[];
  profiles: Record<string, CountryProfile>;
}

export const SourcesDirectory: React.FC<SourcesDirectoryProps> = ({ sources, profiles }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredSources = sources.filter((s) => {
    if (selectedCountry !== 'ALL' && s.country !== selectedCountry) return false;
    if (selectedCategory !== 'ALL' && s.category !== selectedCategory) return false;
    return true;
  });

  const getReliabilityBadge = (score: string) => {
    switch (score) {
      case 'A1':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" title="Completamente confiable / Fuente Oficial">
            STANAG A1 (OFICIAL)
          </span>
        );
      case 'A2':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30" title="Usualmente confiable / Agencia Estatal">
            STANAG A2 (ESTATAL)
          </span>
        );
      case 'B1':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30" title="Bastante confiable / Prensa & Think Tank">
            STANAG B1 (OSINT)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
            {score}
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

      {/* Sources Directory Filter & Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Directorio de Fuentes Abiertas (OSINT Registry)
              </h2>
              <p className="text-xs text-slate-400">
                Agencias de defensa, bancos centrales, autoridades portuarias y cables estratégicos monitoreados
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
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
              <option value="REGIONAL">🌎 Multilateral / Regional</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ALL">Todas las Categorías</option>
              <option value="GOVERNMENT_DEFENSE">Defensa & Gobierno</option>
              <option value="ECONOMIC_CENTRAL_BANK">Bancos Centrales & Economía</option>
              <option value="ENERGY_MINING">Energía, Litio & Minería</option>
              <option value="LOGISTICS_PORTS">Puertos & Hidrovías</option>
              <option value="MEDIA_OSINT">Medios Estratégicos OSINT</option>
            </select>
          </div>
        </div>

        {/* Sources List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredSources.map((source) => {
            const country = COUNTRY_NAMES[source.country] || { name: source.country, flag: '🌐' };

            return (
              <div
                key={source.id}
                className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{country.flag}</span>
                      <span className="text-xs font-semibold text-slate-200">{source.name}</span>
                    </div>
                    {getReliabilityBadge(source.reliabilityScore)}
                  </div>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {source.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500">CATEGORÍA: {source.category}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
