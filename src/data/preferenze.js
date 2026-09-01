// Preferiti e recenti vivono nel browser di chi usa il portale: non sono dati
// condivisi e non devono impedire il caricamento se il browser li nega
// (finestra anonima, cookie bloccati). Ogni accesso e protetto.

const CHIAVE_PREFERITI = 'immedia_preferiti';
const CHIAVE_RECENTI = 'immedia_recenti';
const MAX_RECENTI = 6;

function leggi(chiave) {
  try {
    const grezzo = localStorage.getItem(chiave);
    const valore = grezzo ? JSON.parse(grezzo) : [];
    return Array.isArray(valore) ? valore.filter((v) => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function scrivi(chiave, valore) {
  try {
    localStorage.setItem(chiave, JSON.stringify(valore));
  } catch {
    // Spazio esaurito o storage negato: le preferenze sono una comodita,
    // non un requisito. Si prosegue senza.
  }
}

export function leggiPreferiti() {
  return leggi(CHIAVE_PREFERITI);
}

export function ePreferito(percorso) {
  return leggiPreferiti().includes(percorso.join('/'));
}

// Restituisce l'elenco aggiornato, cosi chi chiama puo rinfrescare lo stato.
export function commutaPreferito(percorso) {
  const chiave = percorso.join('/');
  const attuali = leggiPreferiti();
  const nuovi = attuali.includes(chiave)
    ? attuali.filter((v) => v !== chiave)
    : [...attuali, chiave];
  scrivi(CHIAVE_PREFERITI, nuovi);
  return nuovi;
}

export function leggiRecenti() {
  return leggi(CHIAVE_RECENTI);
}

export function segnaRecente(percorso) {
  const chiave = percorso.join('/');
  const nuovi = [chiave, ...leggiRecenti().filter((v) => v !== chiave)].slice(0, MAX_RECENTI);
  scrivi(CHIAVE_RECENTI, nuovi);
  return nuovi;
}
