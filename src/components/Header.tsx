import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  RefreshCw, 
  ShieldCheck, 
  PlusCircle, 
  Bot, 
  FileText, 
  MapPin, 
  Activity, 
  Database,
  Cpu,
  ShieldAlert,
  Layers
} from 'lucide-react';
import { SystemMetrics } from '../types';

interface HeaderProps {
  activeTab: 'wire' | 'commodities' | 'geoint' | 'reports' | 'analyst' | 'sources';
  setActiveTab: (tab: 'wire' | 'commodities' | 'geoint' | 'reports' | 'analyst' | 'sources') => void;
  metrics: SystemMetrics | null;
  onSync: () => void;
  isSyncing: boolean;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  metrics,
  onSync,
  isSyncing,
  onOpenAddModal,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc3 = new Intl.DateTimeFormat('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(`${utc3} ART`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
      {/* Top Status Strip */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 py-0.5 pl-2 pr-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">LIVE REGIONAL NODE</span>
          </div>
          <span className="text-slate-800">|</span>
          <span className="text-slate-400 font-mono text-[11px] hidden md:inline">
            NODOS: 🇦🇷 AR • 🇨🇱 CL • 🇧🇷 BR • 🇺🇾 UY • 🇵🇾 PY • 🇧🇴 BO
          </span>
        </div>

        <div className="flex items-center space-x-4 font-mono text-[11px]">
          <div className="flex items-center space-x-1.5 text-blue-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>GEMINI 3.7 FLASH: {metrics?.geminiOperational ? 'ONLINE' : 'LOCAL'}</span>
          </div>
          <span className="text-slate-800 hidden sm:inline">|</span>
          <div className="text-slate-400 font-medium">{timeStr}</div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                CONOSUR<span className="text-blue-400">INTEL</span>
              </h1>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border border-blue-500/30 bg-blue-950/40 text-blue-300">
                OSINT v2.6
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Centro de Inteligencia Estratégica de Fuentes Abiertas // Cono Sur & Cuenca del Plata
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onSync}
            disabled={isSyncing}
            id="btn-sync-feeds"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all disabled:opacity-50"
            title="Sincronizar feeds RSS y fuentes abiertas en vivo"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Rastreando...' : 'Sincronizar OSINT'}</span>
          </button>

          <button
            onClick={onOpenAddModal}
            id="btn-add-intel"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-[0_0_12px_rgba(37,99,235,0.3)]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Ingresar Cable</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex space-x-2 border-t border-slate-800/80 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('wire')}
            id="nav-tab-wire"
            className={`flex items-center space-x-2 py-3 px-3.5 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'wire'
                ? 'text-blue-400 border-blue-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Cables en Vivo</span>
            {metrics?.criticalAlerts ? (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {metrics.criticalAlerts}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveTab('commodities')}
            id="nav-tab-commodities"
            className={`flex items-center space-x-2 py-3 px-3.5 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'commodities'
                ? 'text-amber-400 border-amber-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Commodities & Recursos</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              STRATHOS
            </span>
          </button>

          <button
            onClick={() => setActiveTab('geoint')}
            id="nav-tab-geoint"
            className={`flex items-center space-x-2 py-3 px-3.5 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'geoint'
                ? 'text-blue-400 border-blue-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Geoint & Nodos Críticos</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            id="nav-tab-reports"
            className={`flex items-center space-x-2 py-3 px-3.5 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'reports'
                ? 'text-blue-400 border-blue-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Informes Automatizados</span>
          </button>

          <button
            onClick={() => setActiveTab('analyst')}
            id="nav-tab-analyst"
            className={`flex items-center space-x-2 py-3 px-3.5 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'analyst'
                ? 'text-blue-400 border-blue-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Copilot Analista IA</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            id="nav-tab-sources"
            className={`flex items-center space-x-2 py-3 px-3.5 font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'sources'
                ? 'text-blue-400 border-blue-500 font-semibold'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Fuentes & Matriz País</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

