import { IntelItem, CountryCode, StrategicPillar, AlertLevel } from '../types';
import { REGIONAL_SOURCES, SourceDefinition } from '../data/staticData';

// Blacklist of non-geopolitical / sports / entertainment terms
const BLACKLISTED_TERMS = [
  'fútbol', 'futbol', 'futebol', 'gol ', 'goles', 'partido de', 'campeonato', 'torneo',
  'copa libertadores', 'copa sudamericana', 'champions league', 'liga profesional', 'brasileirão',
  'boca juniors', 'river plate', 'flamengo', 'palmeiras', 'colo-colo', 'colo colo', 'u de chile',
  'peñarol', 'nacional de montevideo', 'olimpia', 'cerro porteño', 'bolívar', 'the strongest',
  'messi', 'ronaldo', 'vinicius', 'neymar', 'scaloni', 'bielsa', 'director técnico', 'árbitro',
  'penal', 'delantero', 'mediocampista', 'defensor', 'plantel', 'fichaje', 'refuerzo', 'estadio',
  'espectáculos', 'farandula', 'farándula', 'chimentos', 'reality', 'gran hermano', 'showmatch',
  'horóscopo', 'telenovela', 'receta', 'astrología', 'zodiaco', 'famosos', 'alfombra roja',
  'celebridad', 'tenis', 'fórmula 1', 'f1 ', 'gran premio', 'boxeo', 'básquet', 'rugby', 'pumas',
  'influencer', 'tiktoker', 'streamer', 'estreno de cine'
];

const STRATEGIC_KEYWORDS = [
  'defensa', 'militar', 'armada', 'fuerza aérea', 'fuerzas armadas', 'ejército', 'cancillería',
  'canciller', 'relaciones exteriores', 'ministro', 'presidente', 'embajador', 'tratado',
  'soberanía', 'frontera', 'hidrovía', 'hidrovia', 'puerto', 'aduana', 'litio', 'cobre',
  'vaca muerta', 'gasoducto', 'oleoducto', 'petróleo', 'itaipú', 'itaipu', 'yacyretá', 'yacyreta',
  'banco central', 'reservas', 'inflación', 'deuda', 'aranceles', 'mercosur', 'brics', 'seguridad',
  'narcotráfico', 'crimen organizado', 'pcc', 'comando vermelho', 'ciberataque', 'ransomware',
  'inteligencia', 'senad', 'prefectura', 'gendarmería', 'policía federal', 'antártida', 'atlántico sur',
  'bioceánico', 'bioceanico', 'soja', 'granos', 'minería', 'mineria', 'codelco', 'ypfb', 'ypf',
  'petrobras', 'transición energética', 'acuerdo bilateral', 'inversión', 'exportación', 'comercio exterior'
];

// Targeted Google News OSINT topic feeds that update 24/7 with 100% reliable XML
const STRATEGIC_LIVE_FEEDS: { country: CountryCode; pillar: StrategicPillar; name: string; url: string }[] = [
  {
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    name: 'OSINT Argentina (Defensa & Atlántico Sur)',
    url: 'https://news.google.com/rss/search?q=argentina+(defensa+OR+"fuerzas+armadas"+OR+"atlantico+sur"+OR+radares+OR+soberania)&hl=es-419&gl=AR&ceid=AR:es-419'
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
  
  const hasBlacklist = BLACKLISTED_TERMS.some(term => fullText.includes(term));
  if (hasBlacklist) return false;

  return STRATEGIC_KEYWORDS.some(kw => fullText.includes(kw));
}

function determinePillar(text: string, defaultPillar?: StrategicPillar): StrategicPillar {
  const t = text.toLowerCase();
  if (t.includes('ciber') || t.includes('ransomware') || t.includes('hacker') || t.includes('malware')) {
    return 'CYBER_CRIME';
  }
  if (t.includes('militar') || t.includes('armada') || t.includes('defensa') || t.includes('narcotráfico') || t.includes('policía') || t.includes('gendarmería') || t.includes('radar') || t.includes('frontera') || t.includes('pcc') || t.includes('senad')) {
    return 'DEFENSE_SECURITY';
  }
  if (t.includes('gas') || t.includes('petróleo') || t.includes('hidroeléctrica') || t.includes('itaipú') || t.includes('itaipu') || t.includes('vaca muerta') || t.includes('gasoducto') || t.includes('dragado') || t.includes('puerto') || t.includes('represa') || t.includes('oleoducto') || t.includes('hidrovía') || t.includes('hidrovia')) {
    return 'ENERGY_INFRASTRUCTURE';
  }
  if (t.includes('soja') || t.includes('cobre') || t.includes('litio') || t.includes('grano') || t.includes('banco central') || t.includes('exportación') || t.includes('commodit') || t.includes('divisas') || t.includes('mineral') || t.includes('codelco') || t.includes('minería')) {
    return 'ECONOMY_COMMODITIES';
  }
  if (t.includes('clima') || t.includes('sequía') || t.includes('inundación') || t.includes('incendio') || t.includes('ambiental') || t.includes('bajante') || t.includes('caudal')) {
    return 'CLIMATE_CRISIS';
  }
  return defaultPillar || 'GEOPOLITICS_DIPLOMACY';
}

function determineLevel(text: string): AlertLevel {
  const t = text.toLowerCase();
  if (t.includes('urgente') || t.includes('alerta roja') || t.includes('ataque') || t.includes('incautación récord') || t.includes('toneladas') || t.includes('quiebre') || t.includes('bloqueo') || t.includes('emergencia')) {
    return 'CRITICAL';
  }
  if (t.includes('alerta') || t.includes('acuerdo') || t.includes('tensión') || t.includes('negociación') || t.includes('litio') || t.includes('sanción') || t.includes('operativo') || t.includes('gasoducto') || t.includes('dragado')) {
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
  if (lower.includes('antártida') || lower.includes('atlántico')) tags.push('Atlántico Sur');
  if (lower.includes('banco central') || lower.includes('reservas') || lower.includes('divisas')) tags.push('Macroeconomía');
  if (lower.includes('gasoducto') || lower.includes('gas natural')) tags.push('Gasoductos');
  
  return tags.length > 0 ? Array.from(new Set(tags)) : ['Geopolítica Cono Sur'];
}

// Fetch with cascading proxies
async function fetchWithProxyCascade(targetUrl: string): Promise<string | null> {
  const proxies = [
    (url: string) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];

  for (const proxyGen of proxies) {
    try {
      const proxyUrl = proxyGen(targetUrl);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(proxyUrl, {
        signal: controller.signal,
        headers: { 'Accept': 'application/xml, text/xml, */*' }
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const text = await response.text();
        if (text && (text.includes('<rss') || text.includes('<feed') || text.includes('<item') || text.includes('<entry>'))) {
          return text;
        }
      }
    } catch {
      // Try next proxy
    }
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
    
    const xmlItems = doc.querySelectorAll('item, entry');

    xmlItems.forEach((node, index) => {
      if (index >= 8) return;

      let rawTitle = node.querySelector('title')?.textContent?.trim() || '';
      let description = node.querySelector('description, summary, content')?.textContent?.trim() || '';
      let link = node.querySelector('link')?.textContent?.trim() || 
                 node.querySelector('link')?.getAttribute('href') || 
                 sourceInfo.url;
      const pubDate = node.querySelector('pubDate, updated, published, dc\\:date')?.textContent?.trim();

      let detectedSource = sourceInfo.name;
      if (rawTitle.includes(' - ')) {
        const parts = rawTitle.split(' - ');
        if (parts.length >= 2) {
          detectedSource = parts[parts.length - 1].trim();
          rawTitle = parts.slice(0, parts.length - 1).join(' - ').trim();
        }
      }

      const cleanSummary = description
        .replace(/<[^>]*>?/gm, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&#8217;/g, "'")
        .slice(0, 300);

      if (!rawTitle || rawTitle.length < 10) return;

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

  const allFeedsToQuery: { name: string; url: string; country: CountryCode; defaultPillar?: StrategicPillar }[] = [];

  STRATEGIC_LIVE_FEEDS.forEach(f => {
    allFeedsToQuery.push({
      name: f.name,
      url: f.url,
      country: f.country,
      defaultPillar: f.pillar
    });
  });

  REGIONAL_SOURCES.filter(s => !!s.rssUrl).forEach(s => {
    allFeedsToQuery.push({
      name: s.name,
      url: s.rssUrl!,
      country: s.country
    });
  });

  const fetchPromises = allFeedsToQuery.map(async (feed) => {
    try {
      const xmlText = await fetchWithProxyCascade(feed.url);
      if (xmlText) {
        feedsChecked++;
        const parsed = parseXmlFeed(xmlText, feed);
        parsed.forEach(item => {
          if (item.title) {
            newItems.push(item as IntelItem);
          }
        });
      }
    } catch {
      // Continue
    }
  });

  await Promise.allSettled(fetchPromises);

  if (newItems.length === 0) {
    return { updatedItems: existingItems, newCount: 0, feedsChecked };
  }

  const seenTitles = new Set<string>();
  const merged: IntelItem[] = [];
  let addedCount = 0;

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

  for (const item of existingItems) {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 35);
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      merged.push(item);
    }
  }

  merged.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    updatedItems: merged.slice(0, 120),
    newCount: addedCount,
    feedsChecked
  };
}
