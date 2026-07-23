import { faqs, FAQ } from '../data/faqData';

export type { FAQ };
export { faqs };

// Synonym & Hinglish Normalization Map
const SYNONYM_MAP: Record<string, string[]> = {
  price: ['cost', 'rent', 'tariff', 'rate', 'charges', 'kitne', 'paisa', 'rupees', 'amount', 'fee', 'price', 'pricing'],
  location: ['address', 'where', 'reach', 'map', 'nh11c', 'achrol', 'jaipur', 'kahan', 'kidhar', 'bhejo', 'batao', 'road', 'direction', 'directions'],
  contact: ['phone', 'number', 'whatsapp', 'email', 'reception', 'call', 'mobile', 'details'],
  couple: ['unmarried', 'couples', 'pair', 'ladka', 'ladki', 'local', 'couple-friendly', 'partners'],
  timings: ['checkin', 'checkout', 'time', 'kab', 'baje', 'schedule', 'hours', 'timing', 'when'],
  food: ['khana', 'restaurant', 'breakfast', 'dinner', 'lunch', 'nashta', 'veg', 'nonveg', 'milega', 'thali', 'dining', 'menu'],
  wifi: ['internet', 'net', 'wi-fi', 'wireless', 'speed', 'broadband', 'connection'],
  pool: ['swimming', 'swim', 'water', 'poolside'],
  events: ['wedding', 'shadi', 'shaadi', 'marriage', 'event', 'party', 'birthday', 'banquet', 'hall', 'lawn', 'conference'],
  offers: ['discount', 'offer', 'deal', 'cheap', 'best', 'code', 'promo', 'coupon'],
  parking: ['gadi', 'car', 'vehicle', 'bus', 'park', 'valet'],
  rooms: ['deluxe', 'suite', 'heritage', 'rajwada', 'bed', 'mattress', 'occupancy', 'stay', 'rooms', 'room']
};

// Clean text for matching
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Tokenize string into meaningful words
export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  const words = normalized.split(' ');
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'to', 'of', 'in', 'at', 'for', 'on', 'with', 'do', 'does', 'you', 'your', 'my', 'ka', 'ki', 'ke', 'hai', 'kya', 'par', 'se', 'me']);
  return words.filter(w => w.length > 1 && !stopWords.has(w));
}

// Levenshtein distance for fuzzy matching
export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
}

// Calculate fuzzy similarity score between 0 and 1
export function fuzzySimilarity(str1: string, str2: string): number {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;

  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;

  const distance = levenshteinDistance(s1, s2);
  return Math.max(0, (maxLen - distance) / maxLen);
}

// Expand tokens with synonym canonical tags
export function expandSynonyms(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    for (const [key, synonyms] of Object.entries(SYNONYM_MAP)) {
      if (key === token || synonyms.includes(token)) {
        expanded.add(key);
        synonyms.forEach(syn => expanded.add(syn));
      }
    }
  }

  return Array.from(expanded);
}

export interface SearchResult {
  faq: FAQ | null;
  score: number;
  answer: string;
  matchedKeywords: string[];
}

export const FALLBACK_ANSWER = `I'm sorry, I couldn't find that specific information in my database.

Please contact Hotel Jaipur Rajwada Reception directly:
• Phone: +91 78779 58308
• WhatsApp: +91 78779 58308
• Email: info@hoteljaipurrajwada.com

Our team is available 24/7 to assist you!`;

export function searchFAQ(query: string): SearchResult {
  const cleanQuery = normalizeText(query);
  if (!cleanQuery) {
    return {
      faq: null,
      score: 0,
      answer: FALLBACK_ANSWER,
      matchedKeywords: []
    };
  }

  const queryTokens = tokenize(query);
  const expandedQueryTokens = expandSynonyms(queryTokens);

  let bestMatch: FAQ | null = null;
  let highestScore = 0;
  let bestMatchedKeywords: string[] = [];

  for (const faq of faqs) {
    let currentScore = 0;
    const matchedKeys: string[] = [];

    const normQuestion = normalizeText(faq.question);
    const normAltQuestions = faq.altQuestions.map(normalizeText);
    const allQuestions = [normQuestion, ...normAltQuestions];

    // 1. Check for exact or near-exact question match
    for (const q of allQuestions) {
      if (q === cleanQuery) {
        currentScore += 10.0;
      } else if (cleanQuery.includes(q) || q.includes(cleanQuery)) {
        currentScore += 5.0;
      } else {
        const sim = fuzzySimilarity(cleanQuery, q);
        if (sim > 0.6) {
          currentScore += sim * 4.0;
        }
      }
    }

    // 2. Token overlap & Keyword matching
    const faqAllText = normalizeText(`${faq.question} ${faq.altQuestions.join(' ')} ${faq.keywords.join(' ')} ${faq.category}`);
    const faqTokens = tokenize(faqAllText);

    for (const token of expandedQueryTokens) {
      if (faqTokens.includes(token) || faq.keywords.includes(token)) {
        currentScore += 2.0;
        if (!matchedKeys.includes(token)) {
          matchedKeys.push(token);
        }
      } else {
        // Fuzzy token match for typos
        for (const faqTok of faqTokens) {
          if (token.length > 3 && faqTok.length > 3 && fuzzySimilarity(token, faqTok) > 0.8) {
            currentScore += 1.2;
            if (!matchedKeys.includes(faqTok)) matchedKeys.push(faqTok);
            break;
          }
        }
      }
    }

    // 3. Category boost
    if (expandedQueryTokens.some(t => faq.category.toLowerCase().includes(t))) {
      currentScore += 1.5;
    }

    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestMatch = faq;
      bestMatchedKeywords = matchedKeys;
    }
  }

  // Threshold to determine if match is confident
  if (bestMatch && highestScore >= 1.5) {
    return {
      faq: bestMatch,
      score: highestScore,
      answer: bestMatch.answer,
      matchedKeywords: bestMatchedKeywords
    };
  }

  return {
    faq: null,
    score: highestScore,
    answer: FALLBACK_ANSWER,
    matchedKeywords: []
  };
}
