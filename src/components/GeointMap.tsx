import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Anchor, 
  Zap, 
  Pickaxe, 
  ShieldAlert, 
  Compass, 
  ChevronRight
} from 'lucide-react';
import { StrategicNode, IntelItem } from '../types';
import { COUNTRY_NAMES } from '../utils/formatters';

interface GeointMapProps {
  nodes: StrategicNode[];
  items: IntelItem[];
  onSelectItem: (item: IntelItem) => void;
}

export const GeointMap: React.FC<GeointMapProps> = ({ nodes, items, onSelectItem }) => {
  const [selectedNode, setSelectedNode] = useState<StrategicNode>(nodes[0] || null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredNodes = nodes.filter((n) => {
    if (filterCategory !== 'ALL' && n.category !== filterCategory) return false;
    return true;
  });

  // Calculate SVG projection coordinates from Lat/Lng
  // Lat: -15 (North - Brasília) to -55 (South - Magallanes)
  // Lng: -76 (West - Pacific) to -43 (East - Atlantic)
  const mapWidth = 600;
  const mapHeight = 720;
  const minLat = -56.0;
  const maxLat = -14.0;
  const minLng = -76.0;
  const maxLng = -43.0;

  const projectCoord = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    return { x, y };
  };

  const getNodeIcon = (category: StrategicNode['category']) => {
    switch (category) {
      case 'PORT':
        return <Anchor className="w-3.5 h-3.5 text-blue-400" />;
      case 'ENERGY_DAM':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'MINING_LITHIUM':
        return <Pickaxe className="w-3.5 h-3.5 text-emerald-400" />;
      case 'BORDER_CHECKPOINT':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  const getStatusBadge = (status: StrategicNode['status']) => {
    switch (status) {
      case 'OPERATIONAL':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            OPERATIVO // NORMAL
          </span>
        );
      case 'ALERT':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">
            ALERTA // MONITOREO
          </span>
        );
      case 'CONGESTED':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            CONGESTIONADO
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  // Find related intel items for selected node
  const relatedItems = selectedNode
    ? items.filter(
        (i) =>
          i.country === selectedNode.country ||
          i.title.toLowerCase().includes(selectedNode.name.toLowerCase().slice(0, 8)) ||
          selectedNode.keyCommoditiesOrAssets.some((comm) =>
            i.title.toLowerCase().includes(comm.toLowerCase()) || i.summary.toLowerCase().includes(comm.toLowerCase())
          )
      ).slice(0, 3)
    : [];

  return (
    <div className="space-y-4">
      {/* Category Filter Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-200">Capas de Inteligencia Geoespacial:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              filterCategory === 'ALL'
                ? 'bg-blue-600 text-white font-semibold shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            Todos ({nodes.length})
          </button>
          <button
            onClick={() => setFilterCategory('PORT')}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              filterCategory === 'PORT'
                ? 'bg-blue-600 text-white font-semibold shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            Puertos & Hidrovías
          </button>
          <button
            onClick={() => setFilterCategory('MINING_LITHIUM')}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              filterCategory === 'MINING_LITHIUM'
                ? 'bg-blue-600 text-white font-semibold shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            Triángulo del Litio & Cobre
          </button>
          <button
            onClick={() => setFilterCategory('ENERGY_DAM')}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              filterCategory === 'ENERGY_DAM'
                ? 'bg-blue-600 text-white font-semibold shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            Energía & Gasoductos
          </button>
          <button
            onClick={() => setFilterCategory('BORDER_CHECKPOINT')}
            className={`px-3 py-1.5 rounded-lg text-xs transition cursor-pointer ${
              filterCategory === 'BORDER_CHECKPOINT'
                ? 'bg-blue-600 text-white font-semibold shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            Pasos & Fronteras
          </button>
        </div>
      </div>

      {/* Main Geoint Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual Map Canvas Container */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 relative flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Tactical Grid Background & Radar Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

          {/* Map Header */}
          <div className="flex items-center justify-between z-10 mb-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <span>GEOINT CONO SUR // PROYECCIÓN C4ISR</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              COORD: 15°S - 56°S / 76°W - 43°W
            </div>
          </div>

          {/* SVG Map Projection */}
          <div className="relative w-full aspect-[6/7] max-h-[580px] mx-auto z-10 flex items-center justify-center">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-full drop-shadow-md select-none"
            >
              <defs>
                {/* Radar sweep glow */}
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="alertGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Schematic Map Contours of Southern Cone (AR, CL, BR, UY, PY, BO) */}
              <g fill="#0f172a" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3">
                {/* Pacific Coastline & Andes Spine */}
                <path
                  d="M 120 40 Q 140 180 135 280 T 150 480 T 170 620 L 195 680 L 220 675 L 205 600 Q 230 450 250 350 L 320 280 L 400 180 L 480 80 Z"
                  fill="#090d16"
                  stroke="#1e293b"
                  strokeWidth="2"
                  strokeDasharray="none"
                />
              </g>

              {/* Maritime Boundaries & Hydrovia Corridors Lines */}
              {/* Hidrovía Paraná-Paraguay Corridor */}
              <path
                d="M 330 180 Q 325 240 315 310 T 295 410 T 320 460"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeOpacity="0.7"
                strokeDasharray="4 2"
              />
              <text x="330" y="270" fill="#60a5fa" fontSize="9" fontFamily="monospace" opacity="0.8">
                HIDROVÍA PARANÁ-PARAGUAY
              </text>

              {/* Corredor Bioceánico Capricórnio Axis */}
              <line
                x1="450"
                y1="190"
                x2="140"
                y2="200"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                strokeOpacity="0.7"
              />
              <text x="210" y="185" fill="#fbbf24" fontSize="9" fontFamily="monospace" opacity="0.8">
                EJE BIOCEÁNICO
              </text>

              {/* Plot Strategic Nodes */}
              {filteredNodes.map((node) => {
                const { x, y } = projectCoord(node.lat, node.lng);
                const isSelected = selectedNode?.id === node.id;
                const isAlert = node.status === 'ALERT';

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => setSelectedNode(node)}
                  >
                    {/* Pulsing ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 18 : 12}
                      fill={isAlert ? 'url(#alertGlow)' : 'url(#nodeGlow)'}
                      className={isAlert ? 'animate-ping' : ''}
                      opacity={isSelected ? 0.9 : 0.4}
                    />

                    {/* Outer ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 8 : 6}
                      fill="#020617"
                      stroke={isSelected ? '#3b82f6' : isAlert ? '#f87171' : '#64748b'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {/* Center point */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 3.5 : 2.5}
                      fill={isAlert ? '#ef4444' : isSelected ? '#3b82f6' : '#60a5fa'}
                    />

                    {/* Node Label */}
                    <text
                      x={x + 10}
                      y={y + 4}
                      fill={isSelected ? '#60a5fa' : '#cbd5e1'}
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight={isSelected ? "bold" : "normal"}
                      fontFamily="monospace"
                      className="drop-shadow"
                    >
                      {node.name.split('(')[0].trim()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Footer Legend */}
          <div className="z-10 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Nodo Puerto
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Energía / Gas
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Litio / Minería
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Alerta / Frontera
              </span>
            </div>
            <span>Haz clic en un nodo para inspección táctica</span>
          </div>
        </div>

        {/* Selected Node Inspector Panel */}
        <div className="lg:col-span-5 space-y-4">
          {selectedNode ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    {getNodeIcon(selectedNode.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">
                      PAÍS: {COUNTRY_NAMES[selectedNode.country]?.flag} {COUNTRY_NAMES[selectedNode.country]?.name}
                    </span>
                    <h3 className="text-base font-bold text-white">{selectedNode.name}</h3>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase text-slate-400">Estado Operativo:</span>
                  {getStatusBadge(selectedNode.status)}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  {selectedNode.details}
                </div>
              </div>

              {/* Coordinates */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <MapPin className="w-3.5 h-3.5" />
                  GEO-COORDENADAS:
                </span>
                <span className="text-slate-200 font-semibold">
                  {selectedNode.lat.toFixed(4)}° S, {selectedNode.lng.toFixed(4)}° W
                </span>
              </div>

              {/* Commodities / Strategic Assets */}
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block mb-2">
                  Recursos & Activos Estratégicos Asociados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.keyCommoditiesOrAssets.map((asset, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-blue-300 text-xs font-mono border border-blue-500/20"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Intelligence Feed */}
              {relatedItems.length > 0 && (
                <div className="pt-3 border-t border-slate-800">
                  <span className="text-xs font-mono uppercase text-slate-400 block mb-2 flex items-center justify-between">
                    <span>Cables Recientes en este Eje:</span>
                    <span className="text-[10px] text-blue-400 font-bold">{relatedItems.length} reportes</span>
                  </span>

                  <div className="space-y-2">
                    {relatedItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectItem(item)}
                        className="p-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <div className="text-xs font-semibold text-slate-200 truncate">{item.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.source}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-blue-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
              Selecciona un nodo en el mapa para ver la ficha de inteligencia geoespacial.
            </div>
          )}

          {/* Quick Nodes List */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
            <span className="text-xs font-mono uppercase text-slate-400 block mb-3 font-semibold">
              Índice Rápido de Nodos ({filteredNodes.length}):
            </span>
            <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
              {filteredNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNode(n)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-mono flex items-center justify-between transition cursor-pointer ${
                    selectedNode?.id === n.id
                      ? 'bg-blue-950/80 border border-blue-500 text-blue-300'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">
                    {COUNTRY_NAMES[n.country]?.flag} {n.name.split('(')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                    {n.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
