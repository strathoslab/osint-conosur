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
import { 
  INITIAL_INTEL_ITEMS, 
  CONO_SUR_COMMODITIES, 
  STRATEGIC_NODES, 
  COUNTRY_PROFILES, 
  REGIONAL_SOURCES 
} from './data/staticData';
import { syncClientFeeds } from './utils/clientFeedCollector';
import { generateClientReport, generateClientAnalystAnswer } from './utils/clientIntelligenceEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<'wire' | 'commodities' | 'geoint' | 'reports' | 'analyst' | 'sources'>('wire');
  
  // Initialize with static fallback or saved localStorage data
  const [items, setItems] = useState<IntelItem[]>(() => {
    try {
      const saved = localStorage.getItem('osint_cono_sur_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_INTEL_ITEMS;
  });

  const [commodities, setCommodities] = useState<CommodityItem[]>(CONO_SUR_COMMODITIES);
  const [nodes, setNodes] = useState<StrategicNode[]>(STRATEGIC_NODES);
  const [profiles, setProfiles] = useState<Record<string, CountryProfile>>(COUNTRY_PROFILES);
  const [sources, setSources] = useState<SourceItem[]>(REGIONAL_SOURCES as SourceItem[]);
  
  const [metrics, setMetrics] = useState<SystemMetrics>(() => ({
    totalItems: INITIAL_INTEL_ITEMS.length,
    criticalAlerts: INITIAL_INTEL_ITEMS.filter(i => i.level === 'CRITICAL').length,
    activeSources: REGIONAL_SOURCES.length,
    lastSync: new Date().toISOString(),
    feedsOnline: REGIONAL_SOURCES.length,
    geminiOperational: true
  }));
  
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<IntelItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState<boolean>(false);
  const [historyReports, setHistoryReports] = useState<GeneratedReport[]>(() => {
    try {
      const saved = localStorage.getItem('osint_cono_sur_reports');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper to recompute metrics from current state
  const updateMetrics = useCallback((currentItems: IntelItem[]) => {
    setMetrics({
      totalItems: currentItems.length,
      criticalAlerts: currentItems.filter(i => i.level === 'CRITICAL').length,
      activeSources: REGIONAL_SOURCES.length,
      lastSync: new Date().toISOString(),
      feedsOnline: REGIONAL_SOURCES.length,
      geminiOperational: true
    });
  }, []);

  // Fetch from backend API if available, fallback gracefully to static data
  const fetchAllData = useCallback(async () => {
    try {
      const [itemsRes, commoditiesRes, nodesRes, profilesRes, sourcesRes, statsRes] = await Promise.allSettled([
        fetch('/api/intel/items'),
        fetch('/api/intel/commodities'),
        fetch('/api/intel/nodes'),
        fetch('/api/intel/profiles'),
        fetch('/api/intel/sources'),
        fetch('/api/intel/stats'),
      ]);

      if (itemsRes.status === 'fulfilled' && itemsRes.value.ok) {
        const contentType = itemsRes.value.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await itemsRes.value.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
            localStorage.setItem('osint_cono_sur_items', JSON.stringify(data.items));
          }
        }
      }

      if (commoditiesRes.status === 'fulfilled' && commoditiesRes.value.ok) {
        const contentType = commoditiesRes.value.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await commoditiesRes.value.json();
          if (data.commodities) setCommodities(data.commodities);
        }
      }

      if (nodesRes.status === 'fulfilled' && nodesRes.value.ok) {
        const contentType = nodesRes.value.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await nodesRes.value.json();
          if (data.nodes) setNodes(data.nodes);
        }
      }

      if (profilesRes.status === 'fulfilled' && profilesRes.value.ok) {
        const contentType = profilesRes.value.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await profilesRes.value.json();
          if (data.profiles) setProfiles(data.profiles);
        }
      }

      if (sourcesRes.status === 'fulfilled' && sourcesRes.value.ok) {
        const contentType = sourcesRes.value.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await sourcesRes.value.json();
          if (data.sources) setSources(data.sources);
        }
      }

      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        const contentType = statsRes.value.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await statsRes.value.json();
          setMetrics(data);
        }
      }
    } catch {
      // Running statically without backend: Fallback already loaded
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    // Background auto-refresh every 3.5 minutes (210,000 ms)
    const autoRefreshInterval = setInterval(() => {
      syncClientFeeds(items).then(({ updatedItems, newCount }) => {
        if (newCount > 0) {
          setItems(updatedItems);
          localStorage.setItem('osint_cono_sur_items', JSON.stringify(updatedItems));
          updateMetrics(updatedItems);
          showToast(`Auto-actualización OSINT: ${newCount} nuevos cables detectados.`, 'info');
        }
      }).catch(() => {});
    }, 210000);

    return () => clearInterval(autoRefreshInterval);
  }, [fetchAllData, items, updateMetrics]);

  // Sync Live Feeds Action (Server-first with client-side CORS proxy cascade)
  const handleSyncFeeds = async () => {
    setIsSyncing(true);
    try {
      let serverSyncSucceeded = false;
      let serverNewCount = 0;

      try {
        const res = await fetch('/api/intel/sync', { method: 'POST' });
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (data.success) {
              serverSyncSucceeded = true;
              serverNewCount = data.newItemsCount || 0;
              await fetchAllData();
            }
          }
        }
      } catch {
        // Server offline / static GitHub Pages mode
      }

      // Always perform client-side deep sync if running client-side or if server returned 0 new items
      const { updatedItems, newCount, feedsChecked } = await syncClientFeeds(items);
      const totalNew = serverNewCount + newCount;

      setItems(updatedItems);
      localStorage.setItem('osint_cono_sur_items', JSON.stringify(updatedItems));
      updateMetrics(updatedItems);

      if (totalNew > 0) {
        showToast(
          `Sincronización completada: ${totalNew} cables nuevos incorporados al Wire (${feedsChecked} fuentes analizadas).`,
          'success'
        );
      } else {
        showToast(
          `Fuentes sincronizadas (${feedsChecked} fuentes activas). Todos los cables están al día.`,
          'success'
        );
      }
    } catch (err) {
      console.error('Sync error:', err);
      showToast('Error durante la sincronización de feeds.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      fetch(`/api/intel/bookmark/${id}`, { method: 'POST' }).catch(() => {});
    } catch {}

    setItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item));
      try {
        localStorage.setItem('osint_cono_sur_items', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    if (selectedItemForDetail && selectedItemForDetail.id === id) {
      setSelectedItemForDetail((prev) => prev ? { ...prev, bookmarked: !prev.bookmarked } : null);
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
    const newItem: IntelItem = {
      id: `manual-${Date.now()}`,
      ...itemData,
      timestamp: new Date().toISOString(),
      verified: true,
      bookmarked: true
    };

    try {
      fetch('/api/intel/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      }).catch(() => {});
    } catch {}

    setItems((prev) => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem('osint_cono_sur_items', JSON.stringify(updated));
      } catch {}
      updateMetrics(updated);
      return updated;
    });

    showToast('Cable de inteligencia inyectado con éxito en la red.', 'success');
  };

  // Generate Strategic Report via Gemini / Client Engine
  const handleGenerateReport = async (params: {
    reportType: 'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM';
    targetCountries: CountryCode[];
    pillar?: StrategicPillar | 'ALL';
    customPrompt?: string;
  }): Promise<GeneratedReport> => {
    setIsGeneratingReport(true);
    try {
      let report: GeneratedReport | null = null;
      try {
        const res = await fetch('/api/intel/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (data.report) report = data.report;
          }
        }
      } catch {
        // Backend not available
      }

      if (!report) {
        // Run client-side report generator
        await new Promise((r) => setTimeout(r, 600));
        report = generateClientReport({
          ...params,
          items
        });
      }

      if (report) {
        setHistoryReports((prev) => {
          const updated = [report!, ...prev];
          try {
            localStorage.setItem('osint_cono_sur_reports', JSON.stringify(updated));
          } catch {}
          return updated;
        });
        showToast('Informe de inteligencia generado con éxito.', 'success');
        return report;
      }
      throw new Error('No se pudo generar el informe.');
    } catch (err: any) {
      showToast(`Error generando informe: ${err.message}`, 'error');
      throw err;
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Ask Analyst Copilot
  const handleAskAnalyst = async (query: string, countryFilter?: CountryCode | 'ALL') => {
    try {
      const res = await fetch('/api/intel/ask-analyst', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, countryFilter }),
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          return await res.json();
        }
      }
    } catch {
      // Backend offline
    }

    await new Promise((r) => setTimeout(r, 500));
    return generateClientAnalystAnswer(query, countryFilter, items);
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
