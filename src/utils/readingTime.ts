// src/utils/readingTime.ts
export function readingTime(body: string, lang: 'es' | 'en' = 'es'): string {  
  const wpm = lang === 'es' ? 200 : 238;
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wpm);
  return lang === 'es' ? `${minutes} min de lectura` : `${minutes} min read`;
}
