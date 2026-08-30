import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { intelCollector } from './server/feedCollector.js';
import { REGIONAL_SOURCES } from './server/sourcesConfig.js';
import { STRATEGIC_NODES, COUNTRY_PROFILES } from './server/seedData.js';
import { CONO_SUR_COMMODITIES } from './server/commoditiesData.js';
import { generateStrategicReport, askIntelAnalyst } from './server/geminiService.js';
import { CountryCode, StrategicPillar, AlertLevel, CommodityCategory } from './src/types.js';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'OSINT Cono Sur Regional Intelligence Engine',
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString(),
    });
  });

  // Intel Items with filtering
  app.get('/api/intel/items', (req, res) => {
    let items = intelCollector.getItems();
    const { country, pillar, level, search, bookmarked } = req.query;

    if (country && country !== 'ALL') {
      items = items.filter(i => i.country === country);
    }
    if (pillar && pillar !== 'ALL') {
      items = items.filter(i => i.pillar === pillar);
    }
    if (level && level !== 'ALL') {
      items = items.filter(i => i.level === level);
    }
    if (bookmarked === 'true') {
      items = items.filter(i => !!i.bookmarked);
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.source.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    res.json({
      items,
      total: items.length,
      lastSync: intelCollector.getLastSyncTime(),
    });
  });

  // Sync Live Feeds
  app.post('/api/intel/sync', async (req, res) => {
    try {
      const result = await intelCollector.syncLiveFeeds();
      res.json({
        success: true,
        ...result,
        totalItems: intelCollector.getItems().length,
        lastSync: intelCollector.getLastSyncTime(),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error syncing feeds' });
    }
  });

  // Add custom intel item
  app.post('/api/intel/items', (req, res) => {
    const { title, summary, source, country, pillar, level, tags, location } = req.body;
    if (!title || !summary || !source || !country || !pillar || !level) {
      return res.status(400).json({ error: 'Missing required intel fields' });
    }

    const newItem = intelCollector.addCustomItem({
      title,
      summary,
      source,
      country: country as CountryCode,
      pillar: pillar as StrategicPillar,
      level: level as AlertLevel,
      tags: Array.isArray(tags) ? tags : ['Reporte Manual'],
      location,
    });

    res.json({ success: true, item: newItem });
  });

  // Toggle bookmark
  app.post('/api/intel/bookmark/:id', (req, res) => {
    const { id } = req.params;
    const isBookmarked = intelCollector.toggleBookmark(id);
    res.json({ id, bookmarked: isBookmarked });
  });

  // Sources Directory
  app.get('/api/intel/sources', (req, res) => {
    res.json({
      sources: REGIONAL_SOURCES,
      countries: ['AR', 'CL', 'BR', 'UY', 'PY', 'BO', 'REGIONAL'],
    });
  });

  // Strategic Geoint Nodes
  app.get('/api/intel/nodes', (req, res) => {
    res.json({
      nodes: STRATEGIC_NODES,
    });
  });

  // Commodities & Strategic Resources Monitor
  app.get('/api/intel/commodities', (req, res) => {
    let commodities = [...CONO_SUR_COMMODITIES];
    const { category, country, search } = req.query;

    if (category && category !== 'ALL') {
      commodities = commodities.filter(c => c.category === category);
    }
    if (country && country !== 'ALL') {
      commodities = commodities.filter(c => c.keyCountries.includes(country as CountryCode));
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      commodities = commodities.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.strategicRelevance.toLowerCase().includes(q) ||
        c.logisticsAxis.toLowerCase().includes(q) ||
        c.geopoliticalDrivers.some(d => d.toLowerCase().includes(q))
      );
    }

    res.json({
      commodities,
      total: commodities.length,
      lastUpdated: new Date().toISOString(),
      marketStatus: 'OPEN // ROTTERDAM / CBOT / LME / ROSARIO'
    });
  });

  // Country Profiles & Risk Matrix
  app.get('/api/intel/profiles', (req, res) => {
    res.json({
      profiles: COUNTRY_PROFILES,
    });
  });

  // System Stats
  app.get('/api/intel/stats', (req, res) => {
    const items = intelCollector.getItems();
    const criticalCount = items.filter(i => i.level === 'CRITICAL').length;
    const highCount = items.filter(i => i.level === 'HIGH').length;

    res.json({
      totalItems: items.length,
      criticalAlerts: criticalCount,
      highAlerts: highCount,
      activeSources: REGIONAL_SOURCES.length,
      lastSync: intelCollector.getLastSyncTime(),
      geminiOperational: !!process.env.GEMINI_API_KEY,
    });
  });

  // Generate Strategic Intelligence Report via Gemini
  app.post('/api/intel/generate-report', async (req, res) => {
    try {
      const { reportType, targetCountries, pillar, customPrompt } = req.body;
      const allItems = intelCollector.getItems();

      // Filter relevant items for context
      let relevantItems = allItems;
      if (targetCountries && Array.isArray(targetCountries) && targetCountries.length > 0) {
        relevantItems = relevantItems.filter(i => targetCountries.includes(i.country) || i.country === 'REGIONAL');
      }
      if (pillar && pillar !== 'ALL') {
        relevantItems = relevantItems.filter(i => i.pillar === pillar);
      }

      const report = await generateStrategicReport({
        reportType: reportType || 'SITREP',
        targetCountries: targetCountries || ['AR', 'CL', 'BR', 'UY', 'PY', 'BO'],
        pillar: pillar || 'ALL',
        customPrompt,
        contextItems: relevantItems,
      });

      res.json({ report });
    } catch (error: any) {
      console.error('Error generating report:', error);
      res.status(500).json({ error: error.message || 'Error generating intelligence report' });
    }
  });

  // Ask Intel Analyst Copilot
  app.post('/api/intel/ask-analyst', async (req, res) => {
    try {
      const { query, countryFilter } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      let items = intelCollector.getItems();
      if (countryFilter && countryFilter !== 'ALL') {
        items = items.filter(i => i.country === countryFilter || i.country === 'REGIONAL');
      }

      const result = await askIntelAnalyst(query, items);
      res.json(result);
    } catch (error: any) {
      console.error('Error asking analyst:', error);
      res.status(500).json({ error: error.message || 'Error executing intelligence query' });
    }
  });

  // Background feed sync on startup
  setTimeout(() => {
    intelCollector.syncLiveFeeds().catch(err => console.log('Initial feed sync finished with status:', err));
  }, 2000);

  // Periodic feed sync every 15 minutes
  setInterval(() => {
    intelCollector.syncLiveFeeds().catch(err => console.log('Interval feed sync error:', err));
  }, 15 * 60 * 1000);

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OSINT Cono Sur Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
