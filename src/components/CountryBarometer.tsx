import React from 'react';
import { CountryCode, CountryProfile } from '../types';
import { ALERT_LEVEL_INFO } from '../utils/formatters';

interface CountryBarometerProps {
  profiles: Record<string, CountryProfile>;
  selectedCountry: CountryCode | 'ALL';
  onSelectCountry: (country: CountryCode | 'ALL') => void;
}

export const CountryBarometer: React.FC<CountryBarometerProps> = ({
  profiles,
  selectedCountry,
  onSelectCountry,
}) => {
  const countryKeys: CountryCode[] = ['AR', 'CL', 'BR', 'UY', 'PY', 'BO'];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
          Matriz de Riesgo y Barómetro por País
        </span>

        {selectedCountry !== 'ALL' && (
          <button
            onClick={() => onSelectCountry('ALL')}
            className="text-[11px] text-blue-400 hover:text-blue-300 font-mono underline cursor-pointer"
          >
            Ver todos los países
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {countryKeys.map((code) => {
          const profile = profiles[code];
          if (!profile) return null;

          const alertMeta = ALERT_LEVEL_INFO[profile.threatLevel] || ALERT_LEVEL_INFO.MEDIUM;
          const isSelected = selectedCountry === code;

          return (
            <button
              key={code}
              id={`country-barometer-${code}`}
              onClick={() => onSelectCountry(isSelected ? 'ALL' : code)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-800 border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.25)] ring-1 ring-blue-500/50'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-lg" role="img" aria-label={profile.name}>
                  {profile.flag}
                </span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${alertMeta.bg} ${alertMeta.text} ${alertMeta.border}`}>
                  {profile.threatLevel}
                </span>
              </div>

              <div className="mt-2">
                <div className="font-semibold text-xs text-slate-100">{profile.name}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Alertas: <strong className="text-blue-400 font-semibold">{profile.activeAlertsCount}</strong></span>
                  <span className="text-[9px] text-slate-500">{profile.capital}</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>R.Econ: <span className={profile.economicRisk === 'CRÍTICO' ? 'text-red-400 font-semibold' : profile.economicRisk === 'ALTO' ? 'text-amber-400 font-semibold' : 'text-slate-300'}>{profile.economicRisk}</span></span>
                <span>R.Seg: <span className={profile.securityRisk === 'ALTO' || profile.securityRisk === 'CRÍTICO' ? 'text-amber-400 font-semibold' : 'text-slate-300'}>{profile.securityRisk}</span></span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
