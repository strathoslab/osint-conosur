import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  LiveWire 
} from './components/LiveWire';
import { 
  CommoditiesMonitor 
} from './components/CommoditiesMonitor';
import { 
  CommoditiesTicker 
} from './components/CommoditiesTicker';
import { 
  GeointMap 
} from './components/GeointMap';
import { 
  ReportGenerator 
} from './components/ReportGenerator';
import { 
  AnalystCopilot 
} from './components/AnalystCopilot';
import { 
  SourcesDirectory, 
  SourceItem 
} from './components/SourcesDirectory';
import { 
  IntelItemDetailModal 
} from './components/IntelItemDetailModal';
import { 
  AddIntelModal 
} from './components/AddIntelModal';
import { 
  IntelItem, 
  StrategicNode, 
  CountryProfile, 
  SystemMetrics, 
  CountryCode, 
  StrategicPillar, 
  AlertLevel, 
  GeneratedReport,
  CommodityItem 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'wire' | 'commodities' | 'geoint' | 'reports' | 'analyst' | 'sources'>('wire');
  const [items, setItems] = useState<IntelItem[]>([]);
  const [commodities, setCommodities] = useState<CommodityItem[]>([]);
  const [nodes, setNodes] = useState<StrategicNode[]>([]);
  const [profiles, setProfiles] = useState<Record<string, CountryProfile>>({});
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<IntelItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [historyReports, setHistoryReports] = useState<GeneratedReport[]>([]);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Initial Data Fetching
  const fetchAllData = useCallback(async () => {
    try {
      const [itemsRes, commoditiesRes, nodesRes, profilesRes, sourcesRes, statsRes] = await Promise.all([
        fetch('/api/intel/items'),
        fetch('/api/intel/commodities'),
        fetch('/api/intel/nodes'),
        fetch('/api/intel/profiles'),
        fetch('/api/intel/sources'),
        fetch('/api/intel/stats'),
      ]);

      if (itemsRes.ok) {
        const data = await itemsRes.json();
        setItems(data.items || []);
      }
      if (commoditiesRes.ok) {
        const data = await commoditiesRes.json();
        setCommodities(data.commodities || []);
      }
      if (nodesRes.ok) {
        const data = await nodesRes.json();
        setNodes(data.nodes || []);
      }
      if (profilesRes.ok) {
        const data = await profilesRes.json();
        setProfiles(data.profiles || {});
      }
      if (sourcesRes.ok) {
        const data = await sourcesRes.json();
        setSources(data.sources || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setMetrics(data);
      }
    } catch (error) {
      console.error('Error fetching intelligence data:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Sync Live Feeds Action
  const handleSyncFeeds = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/intel/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(
          `Sincronización completada: ${data.newItemsCount} cables nuevos detectados en fuentes abiertas.`,
          'success'
        );
        fetchAllData();
      } else {
        showToast('No se detectaron cables nuevos en este ciclo.', 'info');
      }
    } catch (err) {
      console.error('Sync error:', err);
      showToast('Error al conectar con los servidores de fuentes abiertas.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/intel/bookmark/${id}`, { method: 'POST' });
      if (res.ok) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item))
        );
        if (selectedItemForDetail && selectedItemForDetail.id === id) {
          setSelectedItemForDetail((prev) => prev ? { ...prev, bookmarked: !prev.bookmarked } : null);
        }
      }
    } catch (err) {
      console.error('Bookmark error:', err);
    }
  };

  // Add Custom Intel Item
  const handleAddIntelItem = async (itemData: {
    title: string;
    summary: string;
    source: string;
    country: CountryCode;
    pillar: StrategicPillar;
    level: AlertLevel;
    tags: string[];
    location?: { name: string; lat?: number; lng?: number };
  }) => {
    try {
      const res = await fetch('/api/intel/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      if (res.ok) {
        const data = await res.json();
        setItems((prev) => [data.item, ...prev]);
        showToast('Cable de inteligencia inyectado con éxito en la red.', 'success');
        fetchAllData();
      }
    } catch (err) {
      console.error('Error adding item:', err);
      showToast('Error al ingresar el cable.', 'error');
      throw err;
    }
  };

  // Generate Strategic Report via Gemini
  const handleGenerateReport = async (params: {
    reportType: 'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM';
    targetCountries: CountryCode[];
    pillar?: StrategicPillar | 'ALL';
    customPrompt?: string;
  }): Promise<GeneratedReport> => {
    setIsGeneratingReport(true);
    try {
      const res = await fetch('/api/intel/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (data.report) {
        setHistoryReports((prev) => [data.report, ...prev]);
        showToast('Informe de inteligencia generado con éxito con Gemini 3.7 Flash.', 'success');
        return data.report;
      }
      throw new Error(data.error || 'Failed to generate report');
    } catch (err: any) {
      showToast(`Error generando informe: ${err.message}`, 'error');
      throw err;
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Ask Analyst Copilot
  const handleAskAnalyst = async (query: string, countryFilter?: CountryCode | 'ALL') => {
    const res = await fetch('/api/intel/ask-analyst', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, countryFilter }),
    });
    return await res.json();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom duration-300">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl border text-xs font-mono flex items-center space-x-2 ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                : toastMessage.type === 'error'
                ? 'bg-red-950 border-red-500 text-red-200'
                : 'bg-slate-900 border-blue-500 text-blue-200'
            }`}
          >
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Tactical Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        metrics={metrics}
        onSync={handleSyncFeeds}
        isSyncing={isSyncing}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Real-time Commodity Ticker Strip */}
      <CommoditiesTicker
        commodities={commodities}
        onSelectCommodity={() => setActiveTab('commodities')}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
        {activeTab === 'wire' && (
          <LiveWire
            items={items}
            profiles={profiles}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            onToggleBookmark={handleToggleBookmark}
            onSync={handleSyncFeeds}
            isSyncing={isSyncing}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}

        {activeTab === 'commodities' && (
          <CommoditiesMonitor
            commodities={commodities}
            items={items}
            onSelectIntelItem={(item) => setSelectedItemForDetail(item)}
            onNavigateToWireWithFilter={(keyword) => {
              setActiveTab('wire');
            }}
            onGenerateReport={(type, countries, prompt) => {
              setActiveTab('reports');
              handleGenerateReport({
                reportType: type || 'GEOECONOMIC',
                targetCountries: countries || ['AR', 'CL', 'BR', 'UY', 'PY', 'BO'],
                pillar: 'ECONOMY_COMMODITIES',
                customPrompt: prompt,
              });
            }}
          />
        )}

        {activeTab === 'geoint' && (
          <GeointMap
            nodes={nodes}
            items={items}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
          />
        )}

        {activeTab === 'reports' && (
          <ReportGenerator
            onGenerateReport={handleGenerateReport}
            isGenerating={isGeneratingReport}
            historyReports={historyReports}
          />
        )}

        {activeTab === 'analyst' && (
          <AnalystCopilot onAskAnalyst={handleAskAnalyst} />
        )}

        {activeTab === 'sources' && (
          <SourcesDirectory sources={sources} profiles={profiles} />
        )}
      </main>

      {/* Item Detail Modal */}
      <IntelItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Ingest Intel Modal */}
      <AddIntelModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddItem={handleAddIntelItem}
      />

      {/* Tactical Footer */}
      <footer className="border-t border-slate-850 bg-slate-950 py-4 px-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            OSINT CONO SUR // RED REGIONAL DE FUENTES ABIERTAS (AR • CL • UY • BR • PY • BO)
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>STANAG 2022 OSINT STANDARD</span>
            <span>•</span>
            <span className="text-blue-400">GEMINI 3.7 FLASH POWERED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
