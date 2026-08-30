import { XMLParser } from 'fast-xml-parser';
import { IntelItem, CountryCode, StrategicPillar, AlertLevel } from '../src/types.js';
import { REGIONAL_SOURCES } from './sourcesConfig.js';
import { INITIAL_INTEL_ITEMS } from './seedData.js';

// Comprehensive sports and entertainment exclusion list
const BLACKLIST_PATTERNS = [
  // Football & Sports terms
  'futbol', 'fútbol', 'futebol', 'partido de', 'partido por la', 'partido entre', 'copa libertadores', 
  'copa sudamericana', 'copa américa', 'copa america', 'champions league', 'conmebol', 'fifa', 
  'afa', 'anfp', 'cbf', 'auf', 'torneo clausura', 'torneo apertura', 'liga profesional', 'brasileirão', 
  'brasileirao', 'copa do brasil', 'director técnico', ' dt ', 'entrenador', 'delantero', 'goleador', 
  'defensa central', 'lateral izquierdo', 'portero', 'arquero', 'gol de', 'goles', 'tiro libre', 
  'penal', 'árbitro', 'arbitro', 'var ', 'fixture', 'plantel', 'fichaje', 'refuerzo', 'mercado de pases',
  'boca juniors', 'river plate', 'san lorenzo', 'racing club', 'independiente', 'velez', 'estudiantes de la plata',
  'flamengo', 'palmeiras', 'corinthians', 'são paulo fc', 'santos fc', 'gremio', 'internacional de porto alegre', 
  'cruzeiro', 'atletico mineiro', 'colo colo', 'universidad de chile', 'u de chile', 'universidad católica', 
  'peñarol', 'nacional de montevideo', 'olimpia', 'cerro porteño', 'guaraní', 'libertad de paraguay',
  'the strongest', 'club bolívar', 'oriente petrolero', 'jorge wilstermann',
  'messi', 'neymar', 'vinicius', 'cr7', 'ronaldo', 'haaland', 'mbappé', 'mbappe', 'scaloni', 'bielsa', 
  'diniz', 'dorival', 'anibal moreno', 'cavani', 'suarez', 'suárez', 'maracaná', 'la bombonera', 'monumental',
  'balón de oro', 'tenis', 'atp', 'wta', 'nadal', 'djokovic', 'alcaraz', 'formula 1', 'fórmula 1', 'f1 ', 
  'gran premio', 'boxeo', 'ufc', 'básquet', 'basquetbol', 'nba', 'rugby', 'pumas', 'all blacks',

  // Entertainment / Showbiz / Gossip
  'espectáculos', 'espectaculos', 'farandula', 'farándula', 'celebridad', 'horóscopo', 'horoscopo', 
  'astrología', 'reality', 'telenovela', 'actriz', 'actor', 'cinefilo', 'música', 'musica', 'concierto', 
  'recital', 'lollapalooza', 'gran hermano', 'showmatch', 'chismes', 'boda', 'divorcio', 'alfombra roja',
  'influencer', 'tiktoker', 'streamer', 'twitch', 'youtuber', 'estreno de cine', 'netflix', 'spotify'
];

// Strategic keywords that confirm high-value intelligence
const STRATEGIC_KEYWORDS = [
  'defensa', 'militar', 'fuerzas armadas', 'ejército', 'ejercito', 'armada', 'fuerza aérea', 'emco',
  'soberanía', 'soberania', 'radar', 'invap', 'patrulla', 'frontera', 'paso fronterizo', 'seguridad interior',
  'canciller', 'cancillería', 'cancilleria', 'relaciones exteriores', 'itamaraty', 'diplomacia', 'embajada',
  'embajador', 'cumbre', 'mercosur', 'brics', 'oea', 'onu', 'acuerdo bilateral', 'tratado', 'comitiva',
  'litio', 'cobre', 'soja', 'harina de soja', 'grano', 'trigo', 'maíz', 'maiz', 'vaca muerta', 'hidrocarburos',
  'gasoducto', 'oleoducto', 'gnl', 'petróleo', 'petroleo', 'itaipú', 'itaipu', 'yacyretá', 'yacyreta',
  'hidrovía', 'hidrovia', 'río paraná', 'rio parana', 'río paraguay', 'rio paraguay', 'puerto', 'dragado',
  'corredor bioceánico', 'bioceanico', 'banco central', 'reservas', 'inflación', 'inflacion', 'divisas',
  'arancel', 'balanza comercial', 'comercio exterior', 'commodities', 'senad', 'policía federal', 'policia federal',
  'narcotráfico', 'narcotrafico', 'pcc', 'comando vermelho', 'crimen organizado', 'incautación', 'incautacion',
  'ciberseguridad', 'ciberdefensa', 'ransomware', 'geopolítica', 'geopolitica', 'geoint', 'osint',
  'antártida', 'antartida', 'magallanes', 'pasaje de drake', 'canal beagle', 'malvinas', 'codelco', 'ypfb',
  'ypf', 'petrobras', 'anp', 'carp', 'sequía', 'bajante fluvial', 'emergencia hídrica', 'crisis energética'
];

class RegionalIntelCollector {
  private items: IntelItem[] = [];
  private lastFetchTime: Date | null = null;
  private isFetching: boolean = false;
  private xmlParser: XMLParser;

  constructor() {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseTagValue: true,
      trimValues: true,
    });

    // Initialize with filtered seed items
    this.items = INITIAL_INTEL_ITEMS.filter(item => this.isStrategicallyValid(item.title + ' ' + item.summary));
  }

  public isBlacklistedContent(text: string): boolean {
    const t = text.toLowerCase();
    return BLACKLIST_PATTERNS.some(pattern => {
      // Check for standalone word or phrase
      if (pattern.startsWith(' ') || pattern.endsWith(' ')) {
        return t.includes(pattern);
      }
      const regex = new RegExp(`\\b${pattern}\\b`, 'i');
      return regex.test(t) || t.includes(pattern);
    });
  }

  public isStrategicallyRelevant(text: string): boolean {
    const t = text.toLowerCase();
    return STRATEGIC_KEYWORDS.some(kw => t.includes(kw));
  }

  public isStrategicallyValid(text: string): boolean {
    if (this.isBlacklistedContent(text)) return false;
    return this.isStrategicallyRelevant(text);
  }

  public getItems(): IntelItem[] {
    return this.items
      .filter(item => !this.isBlacklistedContent(item.title + ' ' + item.summary))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  public getItemById(id: string): IntelItem | undefined {
    return this.items.find(item => item.id === id);
  }

  public addCustomItem(item: Omit<IntelItem, 'id' | 'timestamp' | 'verified'>): IntelItem {
    const newItem: IntelItem = {
      ...item,
      id: `intel-manual-${Date.now()}`,
      timestamp: new Date().toISOString(),
      verified: true
    };
    this.items.unshift(newItem);
    return newItem;
  }

  public toggleBookmark(id: string): boolean {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.bookmarked = !item.bookmarked;
      return item.bookmarked;
    }
    return false;
  }

  public getLastSyncTime(): string {
    return this.lastFetchTime ? this.lastFetchTime.toISOString() : new Date().toISOString();
  }

  public async syncLiveFeeds(): Promise<{ newItemsCount: number; errorsCount: number }> {
    if (this.isFetching) {
      return { newItemsCount: 0, errorsCount: 0 };
    }

    this.isFetching = true;
    let newItemsCount = 0;
    let errorsCount = 0;

    const sourcesWithRss = REGIONAL_SOURCES.filter(s => !!s.rssUrl);

    // Fetch sources in parallel with strict timeout
    const fetchPromises = sourcesWithRss.map(async (source) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4500); // 4.5s timeout

        const response = await fetch(source.rssUrl!, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) OSINT-ConoSur-Strategic-Bot/2.6',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*'
          }
        });
        clearTimeout(timeout);

        if (!response.ok) return [];

        const xmlData = await response.text();
        const parsed = this.xmlParser.parse(xmlData);

        const rssItems = this.extractRssItems(parsed);
        const processedItems: IntelItem[] = [];

        for (const raw of rssItems.slice(0, 10)) { // Inspect recent items from feed
          const title = this.cleanText(raw.title || '');
          const link = raw.link || '';
          const description = this.cleanText(raw.description || raw.summary || '');
          const pubDate = raw.pubDate || raw.published || raw.updated || new Date().toISOString();
          const combinedText = `${title} ${description}`;

          if (!title || title.length < 12) continue;

          // STRICT RELEVANCE GATE: Reject football, sports, gossip or items without strategic focus
          if (!this.isStrategicallyValid(combinedText)) {
            continue;
          }

          // Check if already in database
          const existing = this.items.some(i => 
            i.title.toLowerCase() === title.toLowerCase() || 
            (i.sourceUrl && typeof link === 'string' && i.sourceUrl === link)
          );

          if (!existing) {
            const detectedPillar = this.detectPillar(combinedText);
            const detectedLevel = this.detectThreatLevel(combinedText);
            const tags = this.extractTags(combinedText, source.country);

            const newItem: IntelItem = {
              id: `feed-${source.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              title,
              summary: description.length > 280 ? description.substring(0, 277) + '...' : description || title,
              content: description,
              source: source.name,
              sourceUrl: typeof link === 'string' ? link : link?.['@_href'] || source.url,
              country: source.country,
              pillar: detectedPillar,
              level: detectedLevel,
              timestamp: new Date(pubDate).toISOString(),
              tags,
              verified: true
            };

            processedItems.push(newItem);
          }
        }

        return processedItems;
      } catch {
        errorsCount++;
        return [];
      }
    });

    try {
      const results = await Promise.all(fetchPromises);
      for (const batch of results) {
        if (batch && batch.length > 0) {
          for (const it of batch) {
            // Final sanity check before inserting
            if (this.isStrategicallyValid(it.title + ' ' + it.summary)) {
              this.items.unshift(it);
              newItemsCount++;
            }
          }
        }
      }

      // Purge any lingering invalid items from the in-memory array
      this.items = this.items.filter(item => this.isStrategicallyValid(item.title + ' ' + item.summary));
      this.lastFetchTime = new Date();
    } finally {
      this.isFetching = false;
    }

    return { newItemsCount, errorsCount };
  }

  private extractRssItems(parsed: any): any[] {
    if (!parsed) return [];
    if (parsed.rss && parsed.rss.channel && parsed.rss.channel.item) {
      return Array.isArray(parsed.rss.channel.item) ? parsed.rss.channel.item : [parsed.rss.channel.item];
    }
    if (parsed.feed && parsed.feed.entry) {
      return Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry];
    }
    return [];
  }

  private cleanText(str: any): string {
    if (!str) return '';
    if (typeof str !== 'string') {
      if (str['#text']) return String(str['#text']).replace(/<[^>]*>?/gm, '').trim();
      return String(str).replace(/<[^>]*>?/gm, '').trim();
    }
    return str.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').trim();
  }

  private detectPillar(text: string): StrategicPillar {
    const t = text.toLowerCase();

    // 1. DEFENSE & SECURITY
    if (
      t.includes('defensa') || t.includes('militar') || t.includes('fuerzas armadas') || 
      t.includes('armada') || t.includes('fuerza aérea') || t.includes('ejército') ||
      t.includes('droga') || t.includes('narcotráfico') || t.includes('pcc') || 
      t.includes('comando vermelho') || t.includes('frontera') || t.includes('radar') || 
      t.includes('patrulla') || t.includes('seguridad interior') || t.includes('senad') ||
      t.includes('policía federal') || t.includes('policia federal') || t.includes('soberanía') ||
      t.includes('pesca ilegal') || t.includes('gendarmería') || t.includes('prefectura')
    ) {
      return 'DEFENSE_SECURITY';
    }

    // 2. ECONOMY & COMMODITIES
    if (
      t.includes('litio') || t.includes('cobre') || t.includes('soja') || t.includes('grano') || 
      t.includes('trigo') || t.includes('maíz') || t.includes('maiz') || t.includes('harina de soja') || 
      t.includes('banco central') || t.includes('inflación') || t.includes('divisas') || 
      t.includes('arancel') || t.includes('commodities') || t.includes('fmi') || 
      t.includes('balanza comercial') || t.includes('dólar') || t.includes('exportación') || 
      t.includes('mineral de hierro') || t.includes('cosecha') || t.includes('molienda')
    ) {
      return 'ECONOMY_COMMODITIES';
    }

    // 3. ENERGY & INFRASTRUCTURE
    if (
      t.includes('vaca muerta') || t.includes('gas natural') || t.includes('petróleo') || 
      t.includes('puerto') || t.includes('hidrovía') || t.includes('itaipú') || 
      t.includes('yacyretá') || t.includes('gasoducto') || t.includes('oleoducto') || 
      t.includes('corredor bioceánico') || t.includes('dragado') || t.includes('canal') || 
      t.includes('ferrocarril') || t.includes('central hidroeléctrica') || t.includes('gnl') ||
      t.includes('ypf') || t.includes('petrobras') || t.includes('ypfb') || t.includes('codelco')
    ) {
      return 'ENERGY_INFRASTRUCTURE';
    }

    // 4. CYBERSECURITY
    if (
      t.includes('ciber') || t.includes('ataque cibernético') || t.includes('hack') || 
      t.includes('ransomware') || t.includes('filtración de datos') || t.includes('intrusión') || 
      t.includes('pix') || t.includes('infraestructura crítica')
    ) {
      return 'CYBER_CRIME';
    }

    // 5. CLIMATE & WATER CRISIS
    if (
      t.includes('río paraná') || t.includes('río paraguay') || t.includes('sequía') || 
      t.includes('bajante') || t.includes('caudal') || t.includes('incendio forestal') || 
      t.includes('inundación') || t.includes('cuenca del plata') || t.includes('sismo')
    ) {
      return 'CLIMATE_CRISIS';
    }

    // 6. GEOPOLITICS & DIPLOMACY (Specific high-level state relations)
    return 'GEOPOLITICS_DIPLOMACY';
  }

  private detectThreatLevel(text: string): AlertLevel {
    const t = text.toLowerCase();
    if (
      t.includes('urgente') || t.includes('crítico') || t.includes('alerta roja') || 
      t.includes('ataque') || t.includes('bloqueo') || t.includes('interrupción') || 
      t.includes('incautación récord') || t.includes('pérdida crítica') || t.includes('crisis institucional')
    ) {
      return 'CRITICAL';
    }
    if (
      t.includes('alerta') || t.includes('tensión') || t.includes('riesgo') || 
      t.includes('despliegue') || t.includes('sanción') || t.includes('investigación') || 
      t.includes('conflicto') || t.includes('disputa') || t.includes('huelga portuaria')
    ) {
      return 'HIGH';
    }
    if (
      t.includes('acuerdo') || t.includes('reunión') || t.includes('análisis') || 
      t.includes('avance') || t.includes('proyección') || t.includes('producción') || 
      t.includes('licitación') || t.includes('tratado')
    ) {
      return 'MEDIUM';
    }
    return 'ROUTINE';
  }

  private extractTags(text: string, country: CountryCode): string[] {
    const tags: string[] = [];
    const t = text.toLowerCase();

    if (country !== 'REGIONAL') tags.push(country);
    if (t.includes('hidrovía') || t.includes('hidrovia')) tags.push('Hidrovía');
    if (t.includes('litio')) tags.push('Litio');
    if (t.includes('cobre')) tags.push('Cobre');
    if (t.includes('vaca muerta')) tags.push('Vaca Muerta');
    if (t.includes('bioceánico') || t.includes('bioceanico')) tags.push('Corredor Bioceánico');
    if (t.includes('itaipú') || t.includes('itaipu')) tags.push('Itaipú');
    if (t.includes('soja') || t.includes('granos') || t.includes('harina de soja')) tags.push('Agroexportación');
    if (t.includes('trigo')) tags.push('Trigo');
    if (t.includes('puerto') || t.includes('puertos')) tags.push('Puertos');
    if (t.includes('pcc') || t.includes('narcotráfico') || t.includes('crimen organizado')) tags.push('Crimen Organizado');
    if (t.includes('mercosur')) tags.push('Mercosur');
    if (t.includes('ciber') || t.includes('ransomware')) tags.push('Ciberseguridad');
    if (t.includes('defensa') || t.includes('fuerzas armadas') || t.includes('radar')) tags.push('Defensa');
    if (t.includes('gasoducto') || t.includes('gas natural') || t.includes('petróleo')) tags.push('Energía');
    if (t.includes('atlántico sur') || t.includes('magallanes') || t.includes('antártida')) tags.push('Atlántico Sur');

    if (tags.length === 0) tags.push('Estratégico');
    return Array.from(new Set(tags));
  }
}

export const intelCollector = new RegionalIntelCollector();
