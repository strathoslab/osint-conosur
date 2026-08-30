import { IntelItem, CountryCode, StrategicPillar, AlertLevel } from '../types';
import { REGIONAL_SOURCES, SourceDefinition } from '../data/staticData';

// Blacklist of non-geopolitical / sports / entertainment terms
const BLACKLISTED_TERMS = [
  'fútbol', 'futbol', 'gol ', 'goles', 'partido', 'campeonato', 'torneo',
  'copa libertadores', 'copa sudamericana', 'champions league', 'liga profesional',
  'boca juniors', 'river plate', 'flamengo', 'palmeiras', 'colo-colo', 'u de chile',
  'peñarol', 'nacional de montevideo', 'olimpia', 'cerro porteño', 'bolívar',
  'the strongest', 'messi', 'ronaldo', 'vinicius', 'neymar', 'scaloni', 'bielsa',
  'director técnico', 'árbitro', 'penal', 'delantero', 'mediocampista', 'defensor',
  'plantel', 'fichaje', 'refuerzo', 'estadio', 'espectáculos', 'farandula',
  'chimentos', 'reality', 'gran hermano', 'showmatch', 'horóscopo', 'telenovela',
  'receta', 'astrología', 'zodiaco', 'famosos', 'alfombra roja', 'celebridad',
  'tenis', 'fórmula 1', 'gran premio', 'boxeo', 'básquet', 'rugby', 'pumas'
];

const STRATEGIC_KEYWORDS = [
  'defensa', 'militar', 'armada', 'fuerza aérea', 'ejército', 'cancillería',
  'relaciones exteriores', 'ministro', 'presidente', 'embajador', 'tratado',
  'soberanía', 'frontera', 'hidrovía', 'puerto', 'aduana', 'litio', 'cobre',
  'vaca muerta', 'gasoducto', 'petróleo', 'itaipú', 'yacyretá', 'banco central',
  'reservas', 'inflación', 'deuda', 'aranceles', 'mercosur', 'brics', 'seguridad',
  'narcotráfico', 'crimen organizado', 'ciberataque', 'ransomware', 'inteligencia',
  'senad', 'prefectura', 'gendarmería', 'policía federal', 'antártida', 'atlántico sur'
];

function isContentStrategic(title: string, summary: string): boolean {
  const fullText = `${title} ${summary}`.toLowerCase();
  
  // 1. If it has any blacklisted sports/entertainment term, discard immediately
  const hasBlacklist = BLACKLISTED_TERMS.some(term => fullText.includes(term));
  if (hasBlacklist) return false;

  // 2. Must match at least one strategic keyword
  return STRATEGIC_KEYWORDS.some(kw => fullText.includes(kw));
}

function determinePillar(text: string): StrategicPillar {
  const t = text.toLowerCase();
  if (t.includes('ciber') || t.includes('ransomware') || t.includes('hacker') || t.includes('malware')) {
    return 'CYBER_CRIME';
  }
  if (t.includes('militar') || t.includes('armada') || t.includes('defensa') || t.includes('narcotráfico') || t.includes('policía') || t.includes('gendarmería') || t.includes('radar') || t.includes('frontera')) {
    return 'DEFENSE_SECURITY';
  }
  if (t.includes('gas') || t.includes('petróleo') || t.includes('hidroeléctrica') || t.includes('itaipú') || t.includes('vaca muerta') || t.includes('gasoducto') || t.includes('dragado') || t.includes('puerto') || t.includes('represa')) {
    return 'ENERGY_INFRASTRUCTURE';
  }
  if (t.includes('soja') || t.includes('cobre') || t.includes('litio') || t.includes('grano') || t.includes('banco central') || t.includes('exportación') || t.includes('commodit') || t.includes('divisas') || t.includes('mineral')) {
    return 'ECONOMY_COMMODITIES';
  }
  if (t.includes('clima') || t.includes('sequía') || t.includes('inundación') || t.includes('incendio') || t.includes('ambiental') || t.includes('bajante')) {
    return 'CLIMATE_CRISIS';
  }
  return 'GEOPOLITICS_DIPLOMACY';
}

function determineLevel(text: string): AlertLevel {
  const t = text.toLowerCase();
  if (t.includes('urgente') || t.includes('alerta roja') || t.includes('ataque') || t.includes('incautación') || t.includes('toneladas') || t.includes('quiebre') || t.includes('bloqueo')) {
    return 'CRITICAL';
  }
  if (t.includes('acuerdo') || t.includes('tensión') || t.includes('negociación') || t.includes('litio') || t.includes('sanción') || t.includes('operativo') || t.includes('gasoducto')) {
    return 'HIGH';
  }
  return 'MEDIUM';
}

function extractTags(text: string): string[] {
  const tags: string[] = [];
  const lower = text.toLowerCase();
  
  if (lower.includes('hidrovía') || lower.includes('paraná')) tags.push('Hidrovía');
  if (lower.includes('vaca muerta')) tags.push('Vaca Muerta');
  if (lower.includes('litio')) tags.push('Litio');
  if (lower.includes('cobre')) tags.push('Cobre');
  if (lower.includes('itaipú')) tags.push('Itaipú');
  if (lower.includes('soja')) tags.push('Soja');
  if (lower.includes('frontera') || lower.includes('triple frontera')) tags.push('Seguridad Fronteriza');
  if (lower.includes('narcotráfico') || lower.includes('pcc')) tags.push('Narcotráfico');
  if (lower.includes('puerto') || lower.includes('montevideo') || lower.includes('santos')) tags.push('Puertos & Logística');
  if (lower.includes('antártida') || lower.includes('atlántico')) tags.push('Atlántico Sur');
  if (lower.includes('banco central') || lower.includes('reservas')) tags.push('Macroeconomía');
  
  return tags.length > 0 ? tags : ['Geopolítica Regional'];
}

// Client-side parser using browser DOMParser
function parseRssXml(xmlText: string, source: SourceDefinition): Partial<IntelItem>[] {
  const items: Partial<IntelItem>[] = [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');
    const xmlItems = doc.querySelectorAll('item');

    xmlItems.forEach((node, index) => {
      if (index >= 6) return;
      const title = node.querySelector('title')?.textContent?.trim() || '';
      const description = node.querySelector('description')?.textContent?.trim() || '';
      const link = node.querySelector('link')?.textContent?.trim() || source.url;
      const pubDate = node.querySelector('pubDate')?.textContent?.trim();

      // Clean HTML tags from summary
      const cleanSummary = description.replace(/<[^>]*>?/gm, '').slice(0, 280);

      if (!title || !isContentStrategic(title, cleanSummary)) {
        return;
      }

      const combinedText = `${title} ${cleanSummary}`;
      const pillar = determinePillar(combinedText);
      const level = determineLevel(combinedText);
      const tags = extractTags(combinedText);

      items.push({
        id: `client-${source.id}-${Date.now()}-${index}`,
        title,
        summary: cleanSummary || title,
        source: source.name,
        sourceUrl: link,
        country: source.country,
        pillar,
        level,
        timestamp: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        tags,
        verified: source.reliabilityScore.startsWith('A')
      });
    });
  } catch (err) {
    console.warn(`Error parsing RSS for ${source.name}:`, err);
  }
  return items;
}

export async function syncClientFeeds(existingItems: IntelItem[]): Promise<IntelItem[]> {
  const newItems: IntelItem[] = [];
  const sourcesWithRss = REGIONAL_SOURCES.filter(s => !!s.rssUrl).slice(0, 8);

  const fetchPromises = sourcesWithRss.map(async (source) => {
    if (!source.rssUrl) return;
    try {
      // Use public CORS proxies to bypass browser restrictions on GitHub Pages
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(source.rssUrl)}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      
      const response = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) return;
      const xmlText = await response.text();
      const parsed = parseRssXml(xmlText, source);
      
      parsed.forEach(item => {
        if (item.title) {
          newItems.push(item as IntelItem);
        }
      });
    } catch {
      // Silently continue if single proxy fails
    }
  });

  await Promise.allSettled(fetchPromises);

  if (newItems.length === 0) {
    return existingItems;
  }

  // Deduplicate by title similarity
  const merged = [...newItems, ...existingItems];
  const seen = new Set<string>();
  const result: IntelItem[] = [];

  for (const item of merged) {
    const key = item.title.toLowerCase().slice(0, 40);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result.slice(0, 100);
}
