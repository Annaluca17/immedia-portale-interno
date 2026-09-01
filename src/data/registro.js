import { apps, aiAssistants } from './apps.js';

// Una voce e apribile quando ha un indirizzo o istruzioni d'avvio. Anche un
// gruppo puo esserlo: i due hub si aprono pure come contenitore, mostrando la
// propria griglia di moduli.
export function apribile(voce) {
  return Boolean(voce.url) || Boolean(voce.avvio);
}

// Percorre l'albero in profondita restituendo ogni voce con il suo percorso.
export function elenca(voci = apps, percorso = []) {
  return voci.flatMap((voce) => {
    const suo = [...percorso, voce.id];
    const figli = voce.children ? elenca(voce.children, suo) : [];
    return [{ voce, percorso: suo, genitori: percorso }, ...figli];
  });
}

// I singoli strumenti: quel che si conta e quel che si cerca. I gruppi restano
// fuori anche quando sono apribili, per non contarli due volte.
export function strumenti() {
  return elenca().filter((n) => apribile(n.voce) && n.voce.tipo !== 'gruppo');
}

// Risolve un percorso di qualunque profondita: ['previdenza', 'tfr'].
export function trova(segmenti) {
  let livello = apps;
  let voce = null;
  for (const id of segmenti) {
    voce = livello.find((v) => v.id === id);
    if (!voce) return null;
    livello = voce.children || [];
  }
  return voce;
}

export function rotta(percorso) {
  return `/app/${percorso.join('/')}`;
}

// Da 'previdenza/tfr' alla voce e al suo percorso, per rileggere preferiti e
// recenti, che sono salvati come stringhe.
export function daChiave(chiave) {
  const percorso = chiave.split('/').filter(Boolean);
  const voce = trova(percorso);
  return voce && apribile(voce) ? { voce, percorso } : null;
}

// L'assistente non sta nell'albero: lo si cerca a parte.
export function assistente(id) {
  return aiAssistants.find((a) => a.id === id) || null;
}

function normalizza(testo) {
  return (testo || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Cerca su nome, descrizione, alias e nome del gruppo che la contiene.
export function cerca(query) {
  const q = normalizza(query).trim();
  if (!q) return [];
  const parole = q.split(/\s+/);

  const candidati = [
    ...strumenti(),
    ...aiAssistants.map((voce) => ({ voce, percorso: [voce.id], genitori: [] })),
  ];

  return candidati
    .map((nodo) => {
      const gruppo = nodo.genitori.length ? trova(nodo.genitori)?.label : '';
      const campi = [
        nodo.voce.label,
        gruppo,
        (nodo.voce.alias || []).join(' '),
        nodo.voce.description,
      ].map(normalizza);

      if (!parole.every((p) => campi.some((c) => c.includes(p)))) return null;

      // Un riscontro nel nome vale piu di uno nella descrizione.
      const peso = parole.reduce((somma, p) => {
        if (campi[0].startsWith(p)) return somma + 4;
        if (campi[0].includes(p)) return somma + 3;
        if (campi[2].includes(p)) return somma + 2;
        return somma + 1;
      }, 0);

      return { ...nodo, gruppo, peso };
    })
    .filter(Boolean)
    .sort((a, b) => b.peso - a.peso);
}
