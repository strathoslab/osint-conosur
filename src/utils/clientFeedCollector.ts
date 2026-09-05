import { IntelItem, CountryCode, StrategicPillar, AlertLevel } from '../types';
import { REGIONAL_SOURCES } from '../data/staticData';

// Blacklist of non-geopolitical / sports / entertainment / domestic petty crime / lifestyle terms
const BLACKLISTED_TERMS = [
  // 1. SPORTS (fútbol, tenis, automovilismo, básquet, boxeo, etc.)
  'fútbol', 'futbol', 'futebol', 'gol ', 'goles', 'partido de', 'campeonato', 'torneo',
  'copa libertadores', 'copa sudamericana', 'champions league', 'liga profesional', 'brasileirão', 'brasileirao',
  'boca juniors', 'river plate', 'racing club', 'san lorenzo', 'independiente', 'flamengo', 'palmeiras',
  'corinthians', 'são paulo fc', 'santos fc', 'colo-colo', 'colo colo', 'u de chile', 'universidad de chile',
  'peñarol', 'nacional de montevideo', 'olimpia', 'cerro porteño', 'bolívar', 'the strongest',
  'messi', 'ronaldo', 'vinicius', 'neymar', 'mbappé', 'mbappe', 'scaloni', 'bielsa', 'director técnico', 'director tecnico',
  'árbitro', 'arbitro', 'var ', 'penal', 'delantero', 'mediocampista', 'defensor', 'arquero', 'plantel', 'fichaje',
  'mercado de pases', 'refuerzo', 'estadio', 'tribuna', 'hinchada', 'barrabrava', 'superclásico', 'clasico',
  'tenis', 'grand slam', 'roland garros', 'wimbledon', 'us open', 'atp', 'wta', 'alcaraz', 'djokovic', 'sinner',
  'pádel', 'padel', 'fórmula 1', 'formula 1', 'f1 ', 'colapinto', 'verstappen', 'hamilton', 'gran premio',
  'automovilismo', 'tc2000', 'turismo carretera', 'boxeo', 'pelea por el título', 'ufc', 'mma', 'ko ', 'básquet',
  'basquet', 'nba', 'rugby', 'pumas', 'all blacks', 'golf',

  // 2. SHOWBIZ, ENTERTAINMENT & CELEBRITIES
  'espectáculos', 'espectaculos', 'farandula', 'farándula', 'chimentos', 'intrusos', 'showmatch', 'bailando',
  'gran hermano', 'masterchef', 'reality', 'romance', 'noviazgo', 'separación de', 'separacion de', 'divorcio',
  'infidelidad', 'casamiento', 'boda', 'luna de miel', 'panelista', 'famosos', 'famosa', 'celebridad',
  'alfombra roja', 'gala', 'look', 'vestido', 'bikini', 'mar del plata teatro', 'carlos paz teatro',
  'estreno de cine', 'estreno en cines', 'taquilla', 'netflix', 'hbo max', 'disney+', 'amazon prime',
  'serie de', 'temporada de', 'capítulo de', 'trailer oficial', 'influencer', 'tiktoker', 'streamer',
  'youtuber', 'viral de tiktok', 'viral en redes', 'meme', 'premios oscar', 'emmy', 'grammy', 'martín fierro',
  'recital', 'concierto', 'entradas agotadas', 'sold out', 'movistar arena', 'lollapalooza',

  // 3. PETTY CRIMES, DOMESTIC ACCIDENTS & ROAD TRAFFIC (crónica roja urbana cotidiana)
  'accidente de tránsito', 'accidente de transito', 'choque frontal', 'choque en cadena', 'siniestro vial',
  'vuelco de', 'despiste', 'semáforo', 'atropelló a', 'atropello a', 'motochorro', 'motochorros',
  'arrebato', 'robo de celular', 'robo de billetera', 'asalto a mano armada', 'entradera', 'salidera',
  'ladrones ingresaron', 'delincuentes armados', 'aprehendieron a', 'homicidio en riña', 'apuñalado en',
  'pelea de boliche', 'femicidio', 'abuso sexual', 'violencia de género', 'violencia familiar',
  'estafa telefónica', 'estafa telefonica', 'estafas virtuales', 'cuento del tío', 'cuento del tio',
  'clonación de tarjeta', 'usurpación de terreno', 'pelea vecinal', 'ruidos molestos', 'incendio de vivienda',

  // 4. LIFESTYLE, ASTROLOGY & DAILY METEOROLOGY
  'horóscopo', 'horoscopo', 'signos del zodíaco', 'signo del zodiaco', 'astrología', 'astrologia',
  'carta astral', 'tarot', 'quiniela', 'lotería', 'loteria', 'quini 6', 'telekino', 'bingo',
  'receta de', 'cómo preparar', 'ingredientes para', 'calorías', 'dieta para', 'adelgazar',
  'rutina facial', 'cuidado de la piel', 'tips de belleza', 'moda verano', 'moda otoño',
  'pronóstico del tiempo para el fin de semana', 'lluvia en la ciudad', 'calor agobiante en'
];

// High-confidence primary strategic terms: presence of ANY of these indicates strategic relevance
const PRIMARY_STRATEGIC_TERMS = [
  // Atlántico Sur, Soberanía & Geopolítica Marítima
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
  'defensa nacional', 'fuerzas armadas', 'fuerza aérea', 'fuerza aerea', 'ejército argentino', 'marina de guerra',
  'radar', 'radares', 'invap', 'c4isr', 'p-3 orion', 'p3 orion', 'ciberdefensa', 'ciberseguridad',
  'ransomware', 'ataque cibernético', 'infraestructura crítica', 'triple frontera', 'paso fronterizo',
  'seguridad fronteriza', 'narcotráfico', 'narcotrafico', 'crimen organizado', 'pcc', 'primeiro comando da capital',
  'comando vermelho', 'senad', 'gendarmería', 'gendarmeria',

  // Infraestructura Crítica & Geopolítica Energética
  'hidrovía', 'hidrovia', 'río paraná', 'rio parana', 'río paraguay', 'rio paraguay', 'dragado',
  'vaca muerta', 'gasoducto', 'oleoducto', 'gnl', 'shale gas', 'cuenca neuquina', 'ypf', 'petrobras', 'ypfb',
  'itaipú', 'itaipu', 'anexo c', 'yacyretá', 'yacyreta', 'represa hidroeléctrica', 'corredor bioceánico',
  'puerto de santos', 'puerto de montevideo', 'puerto de rosario', 'up-river',

  // Minería Estratégica & Commodities
  'litio', 'salar de atacama', 'salar de uyuni', 'hombre muerto', 'cauchari', 'extracción directa de litio',
  'cobre', 'codelco', 'concentrado de cobre', 'soja', 'harina de soja', 'complejo oleaginoso',

  // Geopolítica de Estado & Macroeconomía
  'cancillería', 'cancilleria', 'relaciones exteriores', 'itamaraty', 'tratado bilateral', 'acuerdo bilateral',
  'cumbre presidencial', 'mercosur', 'brics', 'fmi', 'banco central', 'reservas internacionales',
  'política monetaria', 'aranceles aduaneros', 'balanza comercial'
];

// Secondary context terms (require co-occurrence with a country/block and strategic context)
const SECONDARY_TERMS = [
  'gobierno', 'ministerio', 'ministro', 'presidente', 'embajada', 'embajador', 'comercio exterior',
  'exportación', 'exportaciones', 'importación', 'inversión extranjera', 'aduanas', 'aranceles',
  'acuerdo', 'tratado', 'crisis energética', 'tensión diplomática'
];

const GEOPOLITICAL_ACTORS = [
  'argentina', 'brasil', 'chile', 'paraguay', 'uruguay', 'bolivia', 'mercosur', 'brics',
  'estados unidos', 'china', 'unión europea', 'fmi'
];

// Targeted Google News OSINT topic feeds that update 24/7 with 100% reliable XML
const STRATEGIC_LIVE_FEEDS: { country: CountryCode; pillar: StrategicPillar; name: string; url: string }[] = [
  // Atlántico Sur & Antártida (Specific Dedicated Channels)
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

function isContentStrategic(title: string, summary: string): boolean {
  const fullText = `${title} ${summary}`.toLowerCase();
  
  // 1. Strict blacklist rejection (sports, entertainment, petty crimes, lifestyle)
  for (const term of BLACKLISTED_TERMS) {
    if (fullText.includes(term)) {
      return false;
    }
  }

  // 2. Primary strategic keyword verification
  for (const kw of PRIMARY_STRATEGIC_TERMS) {
    if (fullText.includes(kw)) {
      return true;
    }
  }

  // 3. Secondary contextual verification: requires co-occurrence of actor AND secondary term
  const hasActor = GEOPOLITICAL_ACTORS.some(actor => fullText.includes(actor));
  const hasSecondary = SECONDARY_TERMS.some(term => fullText.includes(term));
  
  return hasActor && hasSecondary;
}

function determinePillar(text: string, defaultPillar?: StrategicPillar): StrategicPillar {
  const t = text.toLowerCase();
  if (t.includes('ciber') || t.includes('ransomware') || t.includes('hacker') || t.includes('malware') || t.includes('ciberdefensa')) {
    return 'CYBER_CRIME';
  }
  if (
    t.includes('militar') || t.includes('armada') || t.includes('defensa') || t.includes('narcotráfico') || 
    t.includes('policía') || t.includes('gendarmería') || t.includes('radar') || t.includes('frontera') || 
    t.includes('pcc') || t.includes('senad') || t.includes('atlántico sur') || t.includes('atlantico sur') ||
    t.includes('malvinas') || t.includes('milla 201') || t.includes('pesca ilegal') || t.includes('prefectura')
  ) {
    return 'DEFENSE_SECURITY';
  }
  if (
    t.includes('gas') || t.includes('petróleo') || t.includes('hidroeléctrica') || t.includes('itaipú') || 
    t.includes('itaipu') || t.includes('vaca muerta') || t.includes('gasoducto') || t.includes('dragado') || 
    t.includes('puerto') || t.includes('represa') || t.includes('oleoducto') || t.includes('hidrovía') || t.includes('hidrovia')
  ) {
    return 'ENERGY_INFRASTRUCTURE';
  }
  if (
    t.includes('soja') || t.includes('cobre') || t.includes('litio') || t.includes('grano') || 
    t.includes('banco central') || t.includes('exportación') || t.includes('commodit') || t.includes('divisas') || 
    t.includes('mineral') || t.includes('codelco') || t.includes('minería')
  ) {
    return 'ECONOMY_COMMODITIES';
  }
  if (t.includes('clima') || t.includes('sequía') || t.includes('inundación') || t.includes('incendio') || t.includes('ambiental') || t.includes('bajante') || t.includes('caudal')) {
    return 'CLIMATE_CRISIS';
  }
  return defaultPillar || 'GEOPOLITICS_DIPLOMACY';
}

function determineLevel(text: string): AlertLevel {
  const t = text.toLowerCase();
  if (
    t.includes('urgente') || t.includes('alerta roja') || t.includes('ataque') || 
    t.includes('incautación récord') || t.includes('toneladas') || t.includes('quiebre') || 
    t.includes('bloqueo') || t.includes('emergencia') || t.includes('incursión')
  ) {
    return 'CRITICAL';
  }
  if (
    t.includes('alerta') || t.includes('acuerdo') || t.includes('tensión') || t.includes('negociación') || 
    t.includes('litio') || t.includes('sanción') || t.includes('operativo') || t.includes('gasoducto') || 
    t.includes('dragado') || t.includes('milla 201') || t.includes('pesca ilegal')
  ) {
    return 'HIGH';
  }
  return 'MEDIUM';
}

function extractTags(text: string, country: CountryCode): string[] {
  const tags: string[] = [];
  const lower = text.toLowerCase();
  
  if (country !== 'REGIONAL') tags.push(country);
  if (lower.includes('hidrovía') || lower.includes('hidrovia') || lower.includes('paraná')) tags.push('Hidrovía');
  if (lower.includes('vaca muerta')) tags.push('Vaca Muerta');
  if (lower.includes('litio')) tags.push('Litio');
  if (lower.includes('cobre')) tags.push('Cobre');
  if (lower.includes('itaipú') || lower.includes('itaipu')) tags.push('Itaipú');
  if (lower.includes('soja') || lower.includes('granos')) tags.push('Soja & Granos');
  if (lower.includes('frontera') || lower.includes('triple frontera')) tags.push('Seguridad Fronteriza');
  if (lower.includes('narcotráfico') || lower.includes('pcc')) tags.push('Crimen Organizado');
  if (lower.includes('puerto') || lower.includes('montevideo') || lower.includes('santos') || lower.includes('rosario')) tags.push('Puertos & Logística');
  if (
    lower.includes('antártida') || lower.includes('antartida') || lower.includes('atlántico') || 
    lower.includes('atlantico') || lower.includes('malvinas') || lower.includes('milla 201') || 
    lower.includes('mar argentino') || lower.includes('ushuaia') || lower.includes('magallanes')
  ) {
    tags.push('Atlántico Sur');
  }
  if (lower.includes('milla 201') || lower.includes('pesca ilegal') || lower.includes('agujero azul')) tags.push('Milla 201');
  if (lower.includes('radar') || lower.includes('invap')) tags.push('Radares INVAP');
  if (lower.includes('banco central') || lower.includes('reservas') || lower.includes('divisas')) tags.push('Macroeconomía');
  if (lower.includes('gasoducto') || lower.includes('gas natural')) tags.push('Gasoductos');
  
  return tags.length > 0 ? Array.from(new Set(tags)) : ['Geopolítica Cono Sur'];
}

// Robust fetch using JSON API endpoints (rss2json, allorigins JSON, and raw proxies)
async function fetchFeedContent(targetUrl: string): Promise<{ items: Partial<IntelItem>[] } | string | null> {
  // Method 1: rss2json API (converts RSS/Atom to JSON automatically and has high CORS stability)
  try {
    const rss2JsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(targetUrl)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(rss2JsonUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const parsedItems: Partial<IntelItem>[] = data.items.map((it: any) => ({
          title: it.title || '',
          summary: (it.description || it.content || '').replace(/<[^>]*>?/gm, '').slice(0, 300),
          sourceUrl: it.link || targetUrl,
          timestamp: it.pubDate ? new Date(it.pubDate).toISOString() : new Date().toISOString(),
          source: it.author || data.feed?.title || ''
        }));
        return { items: parsedItems };
      }
    }
  } catch {
    // Try raw proxies
  }

  // Method 2: AllOrigins JSON proxy
  try {
    const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(allOriginsUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.contents && typeof data.contents === 'string' && (data.contents.includes('<rss') || data.contents.includes('<feed') || data.contents.includes('<item') || data.contents.includes('<entry>'))) {
        return data.contents;
      }
    }
  } catch {
    // Try direct XML proxy
  }

  // Method 3: Direct CORS Proxy
  try {
    const corsProxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(corsProxyUrl, {
      signal: controller.signal,
      headers: { 'Accept': 'application/xml, text/xml, */*' }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const text = await res.text();
      if (text && (text.includes('<rss') || text.includes('<feed') || text.includes('<item') || text.includes('<entry>'))) {
        return text;
      }
    }
  } catch {
    // Fallback failed
  }

  return null;
}

// Client-side parser for XML feeds
function parseXmlFeed(
  xmlText: string, 
  sourceInfo: { name: string; url: string; country: CountryCode; defaultPillar?: StrategicPillar }
): Partial<IntelItem>[] {
  const items: Partial<IntelItem>[] = [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');
    
    // Support both RSS 2.0 items and Atom entries
    const xmlItems = doc.querySelectorAll('item, entry');

    xmlItems.forEach((node, index) => {
      if (index >= 8) return;

      let rawTitle = node.querySelector('title')?.textContent?.trim() || '';
      let description = node.querySelector('description, summary, content')?.textContent?.trim() || '';
      let link = node.querySelector('link')?.textContent?.trim() || 
                 node.querySelector('link')?.getAttribute('href') || 
                 sourceInfo.url;
      const pubDate = node.querySelector('pubDate, updated, published, dc\\:date')?.textContent?.trim();

      // For Google News feeds, the source is after the last hyphen (e.g. "Title - Clarín")
      let detectedSource = sourceInfo.name;
      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        if (parts.length >= 2) {
          detectedSource = parts[parts.length - 1].trim();
          rawTitle = parts.slice(0, parts.length - 1).join(' - ').trim();
        }
      }

      // Clean HTML tags and entities
      const cleanSummary = description
        .replace(/<[^>]*>?/gm, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&#8217;/g, "'")
        .slice(0, 300);

      if (!rawTitle || rawTitle.length < 10) return;

      // Filter strategic relevance
      if (!isContentStrategic(rawTitle, cleanSummary)) {
        return;
      }

      const combinedText = `${rawTitle} ${cleanSummary}`;
      const pillar = determinePillar(combinedText, sourceInfo.defaultPillar);
      const level = determineLevel(combinedText);
      const tags = extractTags(combinedText, sourceInfo.country);

      let parsedTimestamp = new Date().toISOString();
      if (pubDate) {
        const d = new Date(pubDate);
        if (!isNaN(d.getTime())) {
          parsedTimestamp = d.toISOString();
        }
      }

      items.push({
        id: `osint-feed-${sourceInfo.country.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: rawTitle,
        summary: cleanSummary || rawTitle,
        content: cleanSummary,
        source: detectedSource || sourceInfo.name,
        sourceUrl: link,
        country: sourceInfo.country,
        pillar,
        level,
        timestamp: parsedTimestamp,
        tags,
        verified: true
      });
    });
  } catch (err) {
    console.warn(`Error parsing RSS XML:`, err);
  }
  return items;
}

export async function syncClientFeeds(existingItems: IntelItem[]): Promise<{ updatedItems: IntelItem[]; newCount: number; feedsChecked: number }> {
  const newItems: IntelItem[] = [];
  let feedsChecked = 0;

  // 1. Gather all feeds: Strategic Topic Feeds + Direct regional media RSS
  const allFeedsToQuery: { name: string; url: string; country: CountryCode; defaultPillar?: StrategicPillar }[] = [];

  // Add the 8 high-reliability topic feeds
  STRATEGIC_LIVE_FEEDS.forEach(f => {
    allFeedsToQuery.push({
      name: f.name,
      url: f.url,
      country: f.country,
      defaultPillar: f.pillar
    });
  });

  // Add direct regional RSS sources
  REGIONAL_SOURCES.filter(s => !!s.rssUrl).forEach(s => {
    allFeedsToQuery.push({
      name: s.name,
      url: s.rssUrl!,
      country: s.country
    });
  });

  // Execute in parallel batches
  const fetchPromises = allFeedsToQuery.map(async (feed) => {
    try {
      const result = await fetchFeedContent(feed.url);
      if (result) {
        feedsChecked++;
        if (typeof result === 'string') {
          const parsed = parseXmlFeed(result, feed);
          parsed.forEach(item => {
            if (item.title) {
              newItems.push(item as IntelItem);
            }
          });
        } else if (result.items && Array.isArray(result.items)) {
          result.items.forEach(rawItem => {
            if (!rawItem.title) return;
            const combinedText = `${rawItem.title} ${rawItem.summary || ''}`;
            if (!isContentStrategic(rawItem.title, rawItem.summary || '')) return;

            newItems.push({
              id: `osint-json-${feed.country.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              title: rawItem.title,
              summary: rawItem.summary || rawItem.title,
              content: rawItem.summary || rawItem.title,
              source: rawItem.source || feed.name,
              sourceUrl: rawItem.sourceUrl || feed.url,
              country: feed.country,
              pillar: determinePillar(combinedText, feed.defaultPillar),
              level: determineLevel(combinedText),
              timestamp: rawItem.timestamp || new Date().toISOString(),
              tags: extractTags(combinedText, feed.country),
              verified: true
            });
          });
        }
      }
    } catch {
      // Continue
    }
  });

  await Promise.allSettled(fetchPromises);

  // If no new items obtained, return existing
  if (newItems.length === 0) {
    return { updatedItems: existingItems, newCount: 0, feedsChecked };
  }

  // Deduplicate against existing items and within newly fetched items
  const seenTitles = new Set<string>();
  const merged: IntelItem[] = [];
  let addedCount = 0;

  // Add new items first
  for (const item of newItems) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 35);
    const alreadyExists = existingItems.some(existing => 
      existing.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 35) === key
    );

    if (!seenTitles.has(key) && !alreadyExists) {
      seenTitles.add(key);
      merged.push(item);
      addedCount++;
    }
  }

  // Add existing items
  for (const item of existingItems) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 35);
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      merged.push(item);
    }
  }

  // Sort by timestamp descending (newest first)
  merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    updatedItems: merged.slice(0, 120),
    newCount: addedCount,
    feedsChecked
  };
}
