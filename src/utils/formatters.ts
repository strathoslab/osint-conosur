import { CountryCode, StrategicPillar, AlertLevel } from '../types';

export const COUNTRY_NAMES: Record<CountryCode, { name: string; flag: string; demonym: string }> = {
  AR: { name: 'Argentina', flag: '🇦🇷', demonym: 'Argentino' },
  CL: { name: 'Chile', flag: '🇨🇱', demonym: 'Chileno' },
  BR: { name: 'Brasil', flag: '🇧🇷', demonym: 'Brasileño' },
  UY: { name: 'Uruguay', flag: '🇺🇾', demonym: 'Uruguayo' },
  PY: { name: 'Paraguay', flag: '🇵🇾', demonym: 'Paraguayo' },
  BO: { name: 'Bolivia', flag: '🇧🇴', demonym: 'Boliviano' },
  REGIONAL: { name: 'Cono Sur / Regional', flag: '🌎', demonym: 'Regional' },
};

export const PILLAR_INFO: Record<StrategicPillar, { label: string; icon: string; color: string }> = {
  DEFENSE_SECURITY: {
    label: 'Defensa & Seguridad',
    icon: 'ShieldAlert',
    color: 'text-red-400 border-red-500/30 bg-red-950/40',
  },
  GEOPOLITICS_DIPLOMACY: {
    label: 'Geopolítica & Diplomacia',
    icon: 'Globe',
    color: 'text-blue-400 border-blue-500/30 bg-blue-950/40',
  },
  ECONOMY_COMMODITIES: {
    label: 'Economía & Commodities',
    icon: 'TrendingUp',
    color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
  },
  ENERGY_INFRASTRUCTURE: {
    label: 'Energía & Infraestructura',
    icon: 'Zap',
    color: 'text-amber-400 border-amber-500/30 bg-amber-950/40',
  },
  CLIMATE_CRISIS: {
    label: 'Clima & Cuencas Hídricas',
    icon: 'Droplets',
    color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
  },
  CYBER_CRIME: {
    label: 'Ciberseguridad & Delito',
    icon: 'Terminal',
    color: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
  },
};

export const ALERT_LEVEL_INFO: Record<AlertLevel, { label: string; bg: string; text: string; border: string }> = {
  CRITICAL: {
    label: 'CRÍTICO / FLASH',
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/60',
  },
  HIGH: {
    label: 'ELEVADO',
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/50',
  },
  MEDIUM: {
    label: 'MODERADO',
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/40',
  },
  ROUTINE: {
    label: 'RUTINA / INFO',
    bg: 'bg-slate-800/60',
    text: 'text-slate-300',
    border: 'border-slate-700',
  },
};

export function timeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return 'Hace instantes';
    if (diffSec < 3600) return `Hace ${Math.floor(diffSec / 60)} min`;
    if (diffSec < 86400) return `Hace ${Math.floor(diffSec / 3600)} h`;
    return `Hace ${Math.floor(diffSec / 86400)} d`;
  } catch {
    return 'Reciente';
  }
}
