const STORAGE_KEY = 'weather_search_history';
const MAX_ITEMS = 10;

/**
 * Hakee historian taulukon localStoragesta (voi palauttaa tyhjän listan)
 */
export function loadHistory() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

/**
 * Lisää kaupungin historian kärkeen ja leikkaa vanhimmat pois
 */
export function addToHistory(city) {
  if (!city) return;
  const hist = loadHistory();
  const filtered = hist.filter(c => c.toLowerCase() !== city.toLowerCase());
  filtered.unshift(city);
  const sliced = filtered.slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sliced));
  return sliced;
}

/**
 * Tyhjentää historian
 */
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}