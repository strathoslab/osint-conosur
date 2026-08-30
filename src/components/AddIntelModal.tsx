import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Send
} from 'lucide-react';
import { CountryCode, StrategicPillar, AlertLevel } from '../types';

interface AddIntelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (itemData: {
    title: string;
    summary: string;
    source: string;
    country: CountryCode;
    pillar: StrategicPillar;
    level: AlertLevel;
    tags: string[];
    location?: { name: string; lat?: number; lng?: number };
  }) => Promise<void>;
}

export const AddIntelModal: React.FC<AddIntelModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [source, setSource] = useState('Reporte de Operador OSINT');
  const [country, setCountry] = useState<CountryCode>('AR');
  const [pillar, setPillar] = useState<StrategicPillar>('DEFENSE_SECURITY');
  const [level, setLevel] = useState<AlertLevel>('HIGH');
  const [tagInput, setTagInput] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    setIsSubmitting(true);
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      await onAddItem({
        title,
        summary,
        source,
        country,
        pillar,
        level,
        tags: tags.length > 0 ? tags : ['Ingreso Manual'],
        location: locationName ? { name: locationName } : undefined,
      });
      // Reset form
      setTitle('');
      setSummary('');
      setLocationName('');
      setTagInput('');
      onClose();
    } catch (err) {
      console.error('Error submitting intel:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-750 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)] text-white">
              <PlusCircle className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">Ingresar Nuevo Cable de Inteligencia</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
              Título del Cable Estratégico *:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Movimiento de barcazas graneleras detenido en el km 420 del Río Paraná..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
              Detalle & Análisis de Situación *:
            </label>
            <textarea
              required
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe los hechos, actores involucrados, impacto potencial y fuentes corroboradas..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* 3 columns: Country, Pillar, Level */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                País:
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryCode)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="AR">🇦🇷 Argentina</option>
                <option value="CL">🇨🇱 Chile</option>
                <option value="BR">🇧🇷 Brasil</option>
                <option value="UY">🇺🇾 Uruguay</option>
                <option value="PY">🇵🇾 Paraguay</option>
                <option value="BO">🇧🇴 Bolivia</option>
                <option value="REGIONAL">🌎 Regional</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                Pilar:
              </label>
              <select
                value={pillar}
                onChange={(e) => setPillar(e.target.value as StrategicPillar)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="DEFENSE_SECURITY">Defensa & Seguridad</option>
                <option value="GEOPOLITICS_DIPLOMACY">Geopolítica</option>
                <option value="ECONOMY_COMMODITIES">Economía & Granos/Litio</option>
                <option value="ENERGY_INFRASTRUCTURE">Energía & Puertos</option>
                <option value="CLIMATE_CRISIS">Cuencas & Clima</option>
                <option value="CYBER_CRIME">Ciberseguridad</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                Nivel de Alerta:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as AlertLevel)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="CRITICAL">Crítico / Flash</option>
                <option value="HIGH">Elevado</option>
                <option value="MEDIUM">Moderado</option>
                <option value="ROUTINE">Rutina</option>
              </select>
            </div>
          </div>

          {/* Source and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                Fuente / Originador:
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Ej: Prefectura Naval / Reporte Aduanero"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                Ubicación / Coordenada:
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Ej: Paso de los Libres, Corrientes"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
              Etiquetas (separadas por comas):
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Ej: Hidrovía, Barcazas, Dragado, Grano"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 flex justify-end space-x-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Inyectando...' : 'Transmitir Cable'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
