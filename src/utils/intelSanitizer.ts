import { IntelItem } from '../types';

const MAX_ITEM_AGE_DAYS = 60;
const MAX_ITEM_AGE_MS = MAX_ITEM_AGE_DAYS * 24 * 60 * 60 * 1000;

const ANIMAL_NOISE_TERMS = [
  'aquarium',
  'san diego',
  'marine mammal',
  'león marino',
  'leones marinos',
  'sea lion pup',
  'sea lion rescue',
  'otaria flavescens',
  'predation of salmon',
  'predation of steelhead',
  'plastic band wrapped around neck',
  'bird flu could wipe out',
  'injured sea lion',
  'sea lion killing bill'
];

/**
 * Validates if the item date is recent (not older than 60 days).
 */
export function isRecentDate(timestamp?: string): boolean {
  if (!timestamp) return true;
  const itemDate = new Date(timestamp);
  if (isNaN(itemDate.getTime())) return true;
  const now = Date.now();
  // Filter out items older than 60 days (e.g., historical items from 2024 or earlier)
  if (itemDate.getTime() < now - MAX_ITEM_AGE_MS) {
    return false;
  }
  return true;
}

/**
 * Checks if the text is accidental animal/zoological noise rather than the offshore energy project.
 */
export function isSeaLionAnimalNoise(text: string): boolean {
  const lower = text.toLowerCase();
  const hasAnimalNoise = ANIMAL_NOISE_TERMS.some(t => lower.includes(t));
  if (!hasAnimalNoise) return false;

  // If it explicitly mentions offshore/energy/oil company terms, it's valid
  const hasEnergyContext = 
    lower.includes('navitas') || 
    lower.includes('rockhopper') || 
    lower.includes('borders & southern') || 
    lower.includes('petroleum') || 
    lower.includes('fpso') || 
    lower.includes('offshore energy') || 
    lower.includes('hidrocarburo');

  return !hasEnergyContext;
}

/**
 * Extracts a clean publisher name from title and removes exposed search queries.
 */
export function sanitizeSourceName(
  rawSource: string, 
  title?: string, 
  sourceUrl?: string, 
  fallbackName?: string
): { cleanSource: string; cleanTitle?: string } {
  let cleanTitle = title || '';
  let extractedPublisher = '';

  // Extract publisher from "Title - Publisher" standard format
  if (cleanTitle.includes(' - ')) {
    const parts = cleanTitle.split(' - ');
    if (parts.length >= 2) {
      const candidate = parts[parts.length - 1].trim();
      // Valid publisher names are concise and do not contain query syntax
      if (
        candidate.length > 1 && 
        candidate.length < 45 && 
        !candidate.includes('"') && 
        !candidate.includes(' OR ') && 
        !candidate.includes(' AND ') && 
        !candidate.includes('(') &&
        !candidate.toLowerCase().includes('google news')
      ) {
        extractedPublisher = candidate;
        cleanTitle = parts.slice(0, parts.length - 1).join(' - ').trim();
      }
    }
  }

  // Check if rawSource is an exposed boolean query or Google News string
  const isExposedQuery = 
    !rawSource ||
    rawSource.includes('Google News') ||
    rawSource.includes(' OR ') ||
    rawSource.includes(' AND ') ||
    rawSource.includes('"') ||
    rawSource.includes('(') ||
    rawSource.includes(')') ||
    rawSource.startsWith('topic-') ||
    rawSource.startsWith('osint-') ||
    rawSource.length > 50;

  if (!isExposedQuery) {
    // Strip trailing "- Google News" if present
    const cleaned = rawSource.replace(/\s*-\s*Google News.*$/i, '').trim();
    if (cleaned.length > 1) {
      return { cleanSource: cleaned, cleanTitle };
    }
  }

  // Use extracted publisher from title if available
  if (extractedPublisher) {
    return { cleanSource: extractedPublisher, cleanTitle };
  }

  // Extract domain name if sourceUrl exists
  if (sourceUrl) {
    try {
      const urlObj = new URL(sourceUrl);
      const host = urlObj.hostname.replace(/^www\./, '').replace(/\.(com|org|net|gov|co|ar|cl|br|uy|py|bo|uk|es).*$/, '');
      if (host && host.length > 2 && host.length < 30) {
        const capitalized = host.charAt(0).toUpperCase() + host.slice(1);
        return { cleanSource: capitalized, cleanTitle };
      }
    } catch {}
  }

  // Fallback to sanitized fallbackName
  const fallback = fallbackName || 'OSINT Cono Sur';
  const cleanFallback = fallback.replace(/["()]/g, '').replace(/\s*-\s*Google News.*$/i, '').trim();
  return { cleanSource: cleanFallback, cleanTitle };
}

/**
 * Sanitizes a complete IntelItem: cleans title and source, and checks validity.
 */
export function sanitizeIntelItem(item: IntelItem): IntelItem | null {
  // 1. Date freshness gate (discard older than 60 days, e.g. 2024 news)
  if (!isRecentDate(item.timestamp)) {
    return null;
  }

  // 2. Animal noise filter for "Sea Lion"
  const fullText = `${item.title} ${item.summary} ${item.content || ''}`;
  if (isSeaLionAnimalNoise(fullText)) {
    return null;
  }

  // 3. Clean source & title
  const { cleanSource, cleanTitle } = sanitizeSourceName(
    item.source,
    item.title,
    item.sourceUrl,
    'OSINT Atlántico Sur'
  );

  return {
    ...item,
    title: cleanTitle || item.title,
    source: cleanSource
  };
}
