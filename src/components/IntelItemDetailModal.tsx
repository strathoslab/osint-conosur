import React from 'react';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  ShieldAlert, 
  Tag, 
  Clock, 
  Bookmark, 
  CheckCircle2,
  Building,
  Radio
} from 'lucide-react';
import { IntelItem } from '../types';
import { COUNTRY_NAMES, PILLAR_INFO, ALERT_LEVEL_INFO } from '../utils/formatters';

interface IntelItemDetailModalProps {
  item: IntelItem | null;
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const IntelItemDetailModal: React.FC<IntelItemDetailModalProps> = ({
  item,
  onClose,
  onToggleBookmark,
}) => {
  if (!item) return null;

  const country = COUNTRY_NAMES[item.country] || { name: item.country, flag: '🌐' };
  const pillar = PILLAR_INFO[item.pillar] || PILLAR_INFO.GEOPOLITICS_DIPLOMACY;
  const alertMeta = ALERT_LEVEL_INFO[item.level] || ALERT_LEVEL_INFO.ROUTINE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-6 relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div>
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 text-slate-200 border border-slate-800 text-xs font-semibold">
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${pillar.color}`}>
                <span>{pillar.label}</span>
              </span>

              <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold border ${alertMeta.bg} ${alertMeta.text} ${alertMeta.border}`}>
                {alertMeta.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleBookmark(item.id, e)}
                className={`p-2 rounded-lg border border-slate-800 hover:bg-slate-800 transition cursor-pointer ${
                  item.bookmarked ? 'text-blue-400 bg-slate-800' : 'text-slate-400'
                }`}
                title={item.bookmarked ? 'Guardado' : 'Guardar cable'}
              >
                <Bookmark className={`w-4 h-4 ${item.bookmarked ? 'fill-blue-400' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="mt-4">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {item.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mt-2.5">
              <span className="text-blue-400 font-semibold flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" />
                {item.source}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                {new Date(item.timestamp).toLocaleString('es-AR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {item.location && (
                <span className="flex items-center gap-1 text-amber-400">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location.name} {item.location.lat && `(${item.location.lat.toFixed(2)}, ${item.location.lng?.toFixed(2)})`}
                </span>
              )}
            </div>
          </div>

          {/* Main Intelligence Content */}
          <div className="mt-5 space-y-4 text-sm text-slate-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 font-medium">
              {item.summary}
            </div>

            {item.content && item.content !== item.summary && (
              <p className="text-slate-300">
                {item.content}
              </p>
            )}

            {/* Strategic Threat Assessment Box */}
            {item.threatAssessment && (
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                <div className="flex items-center gap-1.5 text-red-400 font-semibold uppercase tracking-wider mb-1.5 font-mono">
                  <ShieldAlert className="w-4 h-4" />
                  Evaluación de Amenaza / Impacto Estratégico
                </div>
                <p className="text-slate-300">
                  {item.threatAssessment}
                </p>
              </div>
            )}

            {/* Entities Extracted */}
            {item.entities && item.entities.length > 0 && (
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1 mb-2">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  Entidades & Actores Clave Monitoreados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.entities.map((ent, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800/90 text-blue-300 border border-blue-500/20 font-mono"
                    >
                      {ent}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1 mb-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  Descriptores / Etiquetas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fuente Abierta Verificada // Protocolo Cono Sur</span>
          </div>

          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              <span>Ver Fuente Original</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
