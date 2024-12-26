// Dil işlemleri için yardımcı fonksiyonlar
export const DEFAULT_LANGUAGE = 'tr';

export function getStoredLanguage(): string {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  return localStorage.getItem('language') || DEFAULT_LANGUAGE;
}

export function setStoredLanguage(language: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
} 