import React from 'react';
import { 
  Bookmark, 
  MapPin, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  Globe,
  TrendingUp,
  Zap,
  Droplets,
  Terminal
} from 'lucide-react';
import { IntelItem } from '../types';
import { COUNTRY_NAMES, PILLAR_INFO, ALERT_LEVEL_INFO, timeAgo } from '../utils/formatters';

interface IntelItemCardProps {
  item: IntelItem;
  onSelect: (item: IntelItem) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const IntelItemCard: React.FC<IntelItemCardProps> = ({
  item,
  onSelect,
  onToggleBookmark,
}) => {
  const country = COUNTRY_NAMES[item.country] || { name: item.country, flag: '🌐' };
  const pillar = PILLAR_INFO[item.pillar] || PILLAR_INFO.GEOPOLITICS_DIPLOMACY;
  const alertMeta = ALERT_LEVEL_INFO[item.level] || ALERT_LEVEL_INFO.ROUTINE;

  const renderPillarIcon = () => {
    switch (item.pillar) {
      case 'DEFENSE_SECURITY':
        return <ShieldAlert className="w-3 h-3 text-red-400" />;
      case 'ECONOMY_COMMODITIES':
        return <TrendingUp className="w-3 h-3 text-emerald-400" />;
      case 'ENERGY_INFRASTRUCTURE':
        return <Zap className="w-3 h-3 text-amber-400" />;
      case 'CLIMATE_CRISIS':
        return <Droplets className="w-3 h-3 text-cyan-400" />;
      case 'CYBER_CRIME':
        return <Terminal className="w-3 h-3 text-purple-400" />;
      default:
        return <Globe className="w-3 h-3 text-blue-400" />;
    }
  };

  return (
    <div
      id={`intel-card-${item.id}`}
      onClick={() => onSelect(item)}
      className="group bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      {/* Top Header Tags */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Country Badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-medium">
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </span>

            {/* Pillar Badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${pillar.color}`}>
              {renderPillarIcon()}
              <span>{pillar.label}</span>
            </span>

            {/* Threat Level */}
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${alertMeta.bg} ${alertMeta.text} ${alertMeta.border}`}>
              {alertMeta.label}
            </span>
          </div>

          {/* Bookmark & Time */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleBookmark(item.id, e)}
              className={`p-1.5 rounded-md hover:bg-slate-800 transition cursor-pointer ${
                item.bookmarked ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
              title={item.bookmarked ? 'Quitar de guardados' : 'Guardar cable'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${item.bookmarked ? 'fill-blue-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors leading-snug mb-2">
          {item.title}
        </h3>

        {/* Summary Snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {item.summary}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-3 truncate">
          <span className="truncate text-slate-300 font-medium">
            {item.source}
          </span>
          {item.location && (
            <span className="flex items-center gap-1 text-slate-400 hidden sm:inline-flex">
              <MapPin className="w-3 h-3 text-blue-400" />
              <span className="truncate max-w-[120px]">{item.location.name}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{timeAgo(item.timestamp)}</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
