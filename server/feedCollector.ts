import { XMLParser } from 'fast-xml-parser';
import { IntelItem, CountryCode, StrategicPillar, AlertLevel } from '../src/types.js';
import { REGIONAL_SOURCES } from './sourcesConfig.js';
import { INITIAL_INTEL_ITEMS } from './seedData.js';

// Comprehensive sports, entertainment, petty crimes, and lifestyle exclusion list
const BLACKLIST_PATTERNS = [
  // 1. Football & Sports terms
  'futbol', 'fútbol', 'futebol', 'partido de', 'partido por la', 'partido entre', 'copa libertadores', 
  'copa sudamericana', 'copa américa', 'copa america', 'champions league', 'conmebol', 'fifa', 
  'afa', 'anfp', 'cbf', 'auf', 'torneo clausura', 'torneo apertura', 'liga profesional', 'brasileirão', 
  'brasileirao', 'copa do brasil', 'director técnico', 'director tecnico', ' dt ', 'entrenador', 'delantero', 'goleador', 
  'defensa central', 'lateral izquierdo', 'portero', 'arquero', 'gol de', 'goles', 'tiro libre', 
  'penal', 'árbitro', 'arbitro', 'var ', 'fixture', 'plantel', 'fichaje', 'refuerzo', 'mercado de pases',
  'boca juniors', 'river plate', 'san lorenzo', 'racing club', 'independiente', 'velez', 'estudiantes de la plata',
  'flamengo', 'palmeiras', 'corinthians', 'são paulo fc', 'santos fc', 'gremio', 'internacional de porto alegre', 
  'cruzeiro', 'atletico mineiro', 'colo colo', 'colo-colo', 'universidad de chile', 'u de chile', 'universidad católica', 
  'peñarol', 'nacional de montevideo', 'olimpia', 'cerro porteño', 'guaraní', 'libertad de paraguay',
  'the strongest', 'club bolívar', 'oriente petrolero', 'jorge wilstermann',
  'messi', 'neymar', 'vinicius', 'cr7', 'ronaldo', 'haaland', 'mbappé', 'mbappe', 'scaloni', 'bielsa', 
  'diniz', 'dorival', 'anibal moreno', 'cavani', 'suarez', 'suárez', 'maracaná', 'la bombonera', 'monumental',
  'balón de oro', 'tenis', 'atp', 'wta', 'nadal', 'djokovic', 'alcaraz', 'sinner', 'formula 1', 'fórmula 1', 'f1 ', 
  'colapinto', 'verstappen', 'hamilton', 'gran premio', 'boxeo', 'ufc', 'mma', 'básquet', 'basquetbol', 'nba',
  'rugby', 'pumas', 'all blacks', 'golf', 'pádel', 'padel',

  // 2. Entertainment / Showbiz / Gossip
  'espectáculos', 'espectaculos', 'farandula', 'farándula', 'celebridad', 'horóscopo', 'horoscopo', 
  'astrología', 'astrologia', 'reality', 'telenovela', 'actriz', 'actor', 'cinefilo', 'música', 'musica', 'concierto', 
  'recital', 'lollapalooza', 'gran hermano', 'showmatch', 'chismes', 'boda', 'divorcio', 'alfombra roja',
  'influencer', 'tiktoker', 'streamer', 'twitch', 'youtuber', 'estreno de cine', 'netflix', 'spotify',
  'panelista', 'famosos', 'famosa', 'romance', 'noviazgo', 'separación de', 'infidelidad', 'casamiento',
  'luna de miel', 'bikini', 'mar del plata teatro', 'carlos paz teatro', 'taquilla', 'viral de tiktok',
  'viral en redes', 'meme', 'premios oscar', 'emmy', 'grammy', 'martín fierro', 'entradas agotadas',

  // 3. Petty Crimes, Domestic Accidents & Road Traffic (crónica roja urbana cotidiana)
  'accidente de tránsito', 'accidente de transito', 'choque frontal', 'choque en cadena', 'siniestro vial',
  'vuelco de', 'despiste', 'semáforo', 'atropelló a', 'atropello a', 'motochorro', 'motochorros',
  'arrebato', 'robo de celular', 'robo de billetera', 'asalto a mano armada', 'entradera', 'salidera',
  'ladrones ingresaron', 'delincuentes armados', 'aprehendieron a', 'homicidio en riña', 'apuñalado en',
  'pelea de boliche', 'femicidio', 'abuso sexual', 'violencia de género', 'violencia familiar',
  'estafa telefónica', 'estafa telefonica', 'estafas virtuales', 'cuento del tío', 'cuento del tio',
  'clonación de tarjeta', 'usurpación de terreno', 'pelea vecinal', 'ruidos molestos', 'incendio de vivienda',

  // 4. Lifestyle, Astrology & Daily Meteorology
  'signos del zodíaco', 'signo del zodiaco', 'carta astral', 'tarot', 'quiniela', 'lotería', 'loteria',
  'quini 6', 'telekino', 'bingo', 'receta de', 'cómo preparar', 'ingredientes para', 'calorías',
  'dieta para', 'adelgazar', 'rutina facial', 'cuidado de la piel', 'tips de belleza', 'moda verano',
  'moda otoño', 'pronóstico del tiempo para el fin de semana', 'lluvia en la ciudad', 'calor agobiante en'
];

// Strategic keywords that confirm high-value intelligence
const STRATEGIC_KEYWORDS = [
  // Atlántico Sur, Soberanía, Hidrocarburos & Geopolítica Marítima
  'atlántico sur', 'atlantico sur', 'malvinas', 'falklands', 'falkland islands', 'georgias del sur', 'sandwich del sur',
  'antártida', 'antartida', 'tratado antártico', 'pasaje de drake', 'canal beagle', 'estrecho de magallanes',
  'milla 201', 'agujero azul', 'zona económica exclusiva', 'pesca ilegal', 'indnr', 'buque potero', 'poteros',
  'calamar illex', 'calamar loligo', 'merluza negra', 'prefectura naval', 'armada argentina', 'patrullero oceánico', 'patrullero oceanico',
  'rompehielos irízar', 'rompehielos irizar', 'base naval ushuaia', 'base marambio', 'puerto belgrano',
  'soberanía marítima', 'soberania maritima', 'vigilancia aeroespacial', 'copla', 'plataforma continental',
  'sea lion', 'navitas', 'navitas petroleum', 'rockhopper', 'rockhopper exploration', 'borders & southern',
  'borders and southern', 'darwin discovery', 'cuenca malvinas norte', 'cuenca malvinas sur', 'fpso', 'pl032',
  'fifca', 'fortuna limited', 'penguin news', 'mount pleasant', 'bfsai', 'fcdo', 'ministry of defence',
  'global fishing watch', 'marinetraffic', 'vesselfinder', 'offshore energy', 'rusi', 'chatham house', 'observatorio malvinas',

  // Defensa, Ciberseguridad & Fronteras
  'defensa', 'militar', 'fuerzas armadas', 'ejército', 'ejercito', 'armada', 'fuerza aérea', 'emco',
  'soberanía', 'soberania', 'radar', 'radares', 'invap', 'patrulla', 'frontera', 'paso fronterizo', 'seguridad interior',
  'seguridad fronteriza', 'ciberseguridad', 'ciberdefensa', 'ransomware', 'ataque cibernético', 'infraestructura crítica',
  'narcotráfico', 'narcotrafico', 'pcc', 'primeiro comando da capital', 'comando vermelho', 'crimen organizado',
  'incautación', 'incautacion', 'senad', 'policía federal', 'policia federal', 'gendarmería', 'gendarmeria',

  // Geopolítica de Estado & Diplomacia
  'canciller', 'cancillería', 'cancilleria', 'relaciones exteriores', 'itamaraty', 'diplomacia', 'embajada',
  'embajador', 'cumbre', 'mercosur', 'brics', 'oea', 'onu', 'acuerdo bilateral', 'tratado', 'comitiva',
  'banco central', 'reservas', 'inflación', 'inflacion', 'divisas', 'arancel', 'balanza comercial',
  'comercio exterior', 'commodities',

  // Infraestructura Crítica & Recursos Estratégicos
  'litio', 'cobre', 'soja', 'harina de soja', 'grano', 'trigo', 'maíz', 'maiz', 'vaca muerta', 'hidrocarburos',
  'gasoducto', 'oleoducto', 'gnl', 'petróleo', 'petroleo', 'itaipú', 'itaipu', 'yacyretá', 'yacyreta',
  'hidrovía', 'hidrovia', 'río paraná', 'rio parana', 'río paraguay', 'rio paraguay', 'puerto', 'dragado',
  'corredor bioceánico', 'bioceanico', 'codelco', 'ypfb', 'ypf', 'petrobras', 'anp', 'carp',
  'sequía', 'bajante fluvial', 'emergencia hídrica', 'crisis energética', 'minería', 'mineria',
  'extracción directa de litio', 'salar de atacama', 'salar de uyuni'
];

const STRATEGIC_TOPIC_FEEDS: { country: CountryCode; pillar: StrategicPillar; name: string; url: string }[] = [
  // Atlántico Sur & Antártida (Specific Dedicated Feeds)
  {
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    name: 'OSINT Atlántico Sur & Soberanía Malvinas',
    url: 'https://news.google.com/rss/search?q=("atlantico+sur"+OR+malvinas+OR+"falkland"+OR+"antartida"+OR+"pasaje+de+drake"+OR+"canal+beagle"+OR+"base+marambio"+OR+"tratado+antartico")&hl=es-419&gl=AR&ceid=AR:es-419'
  },
  {
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    name: 'OSINT Control Marítimo ZEE, Milla 201 & Pesca',
    url: 'https://news.google.com/rss/search?q=("milla+201"+OR+"mar+argentino"+OR+"pesca+ilegal"+OR+"zona+economica+exclusiva"+OR+"prefectura+naval"+OR+"patrullero+oceanico"+OR+"armada+argentina")&hl=es-419&gl=AR&ceid=AR:es-419'
  },
  {
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    name: 'OSINT Polo Ushuaia, Magallanes & Antártida',
    url: 'https://news.google.com/rss/search?q=("base+naval+ushuaia"+OR+"polo+logistico+antartico"+OR+"estrecho+de+magallanes"+OR+"rompehielos+irizar"+OR+"p-3+orion"+OR+"radares+tierra+del+fuego")&hl=es-419&gl=AR&ceid=AR:es-419'
  },
  {
    country: 'REGIONAL',
    pillar: 'ENERGY_INFRASTRUCTURE',
    name: 'OSINT Sea Lion & Hidrocarburos Atlántico Sur',
    url: 'https://news.google.com/rss/search?q=("Sea+Lion"+OR+"Navitas+Petroleum"+OR+"Rockhopper+Exploration"+OR+"Borders+and+Southern"+OR+"Falklands+oil"+OR+"Malvinas+petroleo"+OR+"offshore+energy")&hl=en&gl=US&ceid=US:en'
  },
  {
    country: 'REGIONAL',
    pillar: 'ECONOMY_COMMODITIES',
    name: 'OSINT Pesca Atlántico Sur & FIFCA',
    url: 'https://news.google.com/rss/search?q=("Falkland+Islands+fisheries"+OR+FIFCA+OR+"calamar+Loligo"+OR+"squid+fishery"+OR+"Milla+201"+OR+"pesca+ilegal+Malvinas")&hl=es-419&gl=AR&ceid=AR:es-419'
  },
  {
    country: 'AR',
    pillar: 'GEOPOLITICS_DIPLOMACY',
    name: 'OSINT Diplomacia Soberanía Malvinas & FCDO',
    url: 'https://news.google.com/rss/search?q=("Cancilleria+Argentina"+OR+"FCDO"+OR+"Mount+Pleasant"+OR+"soberania+Malvinas"+OR+"Falklands+referendum")&hl=es-419&gl=AR&ceid=AR:es-419'
  },

  // Regional Pillars
  {
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    name: 'OSINT Argentina (Defensa & Fuerzas Armadas)',
    url: 'https://news.google.com/rss/search?q=argentina+(defensa+OR+"fuerzas+armadas"+OR+"armada+argentina"+OR+radares+OR+"fuerza+aerea"+OR+invap)&hl=es-419&gl=AR&ceid=AR:es-419'
  },
  {
    country: 'AR',
    pillar: 'ENERGY_INFRASTRUCTURE',
    name: 'Energía Cono Sur (Vaca Muerta & Gasoductos)',
    url: 'https://news.google.com/rss/search?q=("vaca+muerta"+OR+"gasoducto+norte"+OR+"hidrocarburos"+OR+gnl)+argentina&hl=es-419&gl=AR&ceid=AR:es-419'
  },
  {
    country: 'CL',
    pillar: 'ECONOMY_COMMODITIES',
    name: 'Chile Estratégico (Litio, Cobre & Minería)',
    url: 'https://news.google.com/rss/search?q=chile+(litio+OR+cobre+OR+codelco+OR+"estrategia+nacional+del+litio"+OR+"puerto+antofagasta")&hl=es-419&gl=CL&ceid=CL:es-419'
  },
  {
    country: 'BR',
    pillar: 'DEFENSE_SECURITY',
    name: 'Brasil Geopolítica & Fronteras',
    url: 'https://news.google.com/rss/search?q=brasil+("defesa+nacional"+OR+"seguranca+fronteiras"+OR+"itaipu"+OR+"porto+de+santos"+OR+mercosul)&hl=pt-419&gl=BR&ceid=BR:pt-419'
  },
  {
    country: 'PY',
    pillar: 'ENERGY_INFRASTRUCTURE',
    name: 'Paraguay & Hidrovía Paraná',
    url: 'https://news.google.com/rss/search?q=paraguay+(hidrovia+OR+"rio+paraguay"+OR+"senad"+OR+"itaipu+anexo+c"+OR+"corredor+bioceanico")&hl=es-419&gl=PY&ceid=PY:es-419'
  },
  {
    country: 'UY',
    pillar: 'ENERGY_INFRASTRUCTURE',
    name: 'Uruguay Puertos & Geoeconomía',
    url: 'https://news.google.com/rss/search?q=uruguay+("puerto+de+montevideo"+OR+dragado+OR+celulosa+OR+mercosur)&hl=es-419&gl=UY&ceid=UY:es-419'
  },
  {
    country: 'BO',
    pillar: 'ECONOMY_COMMODITIES',
    name: 'Bolivia Recursos (Litio Uyuni & Gas)',
    url: 'https://news.google.com/rss/search?q=bolivia+(litio+OR+uyuni+OR+ypfb+OR+mutun+OR+"gas+natural")&hl=es-419&gl=BO&ceid=BO:es-419'
  },
  {
    country: 'REGIONAL',
    pillar: 'GEOPOLITICS_DIPLOMACY',
    name: 'Cono Sur Geopolítica Regional',
    url: 'https://news.google.com/rss/search?q=("cono+sur"+OR+mercosur)+AND+(comercio+OR+tratado+OR+cancilleria+OR+cumbre)&hl=es-419&gl=AR&ceid=AR:es-419'
  }
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

    const allFeeds = [
      ...STRATEGIC_TOPIC_FEEDS.map(f => ({
        id: `topic-${f.country.toLowerCase()}`,
        name: f.name,
        country: f.country,
        rssUrl: f.url,
        url: f.url
      })),
      ...REGIONAL_SOURCES.filter(s => !!s.rssUrl).map(s => ({
        id: s.id,
        name: s.name,
        country: s.country,
        rssUrl: s.rssUrl!,
        url: s.url
      }))
    ];

    // Fetch sources in parallel with strict timeout
    const fetchPromises = allFeeds.map(async (source) => {
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
