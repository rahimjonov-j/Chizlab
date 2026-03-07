const BOOKS_API_URL = "https://json-api.uz/api/project/chizmachilik/materials";
const STORAGE_KEY = "books_cache_v1";
// Keep cache longer so users don't see repeat loaders on short revisits.
const TTL_MS = 24 * 60 * 60 * 1000;

let memoryCache = null;
let memoryTs = 0;
let pendingRequest = null;

function now() {
  return Date.now();
}

function isFresh(ts) {
  return Boolean(ts) && now() - ts < TTL_MS;
}

function normalizeBooks(data) {
  return Array.isArray(data) ? data : [];
}

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.data)) return null;

    return {
      data: parsed.data,
      ts: Number(parsed.ts) || 0,
    };
  } catch {
    return null;
  }
}

function writeStorage(data, ts) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        data,
        ts,
      })
    );
  } catch {
    // ignore storage quota/read-only errors
  }
}

export function getCachedBooks() {
  if (memoryCache && isFresh(memoryTs)) {
    return memoryCache;
  }

  const stored = readStorage();
  if (stored && isFresh(stored.ts)) {
    memoryCache = stored.data;
    memoryTs = stored.ts;
    return stored.data;
  }

  return null;
}

async function requestBooksFromApi() {
  const res = await fetch(BOOKS_API_URL);
  if (!res.ok) {
    throw new Error(`Books fetch failed: ${res.status}`);
  }

  const json = await res.json();
  return normalizeBooks(json?.data);
}

export async function getBooks({ force = false } = {}) {
  if (!force) {
    const cached = getCachedBooks();
    if (cached) {
      return { data: cached, fromCache: true };
    }
  }

  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = requestBooksFromApi()
    .then((data) => {
      const ts = now();
      memoryCache = data;
      memoryTs = ts;
      writeStorage(data, ts);
      return { data, fromCache: false };
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
}

export function clearBooksCache() {
  memoryCache = null;
  memoryTs = 0;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
