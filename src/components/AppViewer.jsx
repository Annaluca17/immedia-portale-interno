import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, RotateCw, Star } from 'lucide-react';
import { trova, rotta } from '../data/registro.js';
import { segnaRecente, ePreferito, commutaPreferito } from '../data/preferenze.js';

const ATTESA_MASSIMA = 10000;

// Le app incorniciate ricevono ?embed=1 e nascondono la propria intestazione:
// il nome dello strumento lo mostra gia la barra qui sopra.
function conEmbed(url) {
  const separatore = url.includes('?') ? '&' : '?';
  return `${url}${separatore}embed=1`;
}

export default function AppViewer({ voce, percorso }) {
  const [stato, setStato] = useState('caricamento');
  const [ricarica, setRicarica] = useState(0);
  const [preferito, setPreferito] = useState(() => ePreferito(percorso));
  const timer = useRef(null);
  const src = conEmbed(voce.url);

  useEffect(() => {
    setStato('caricamento');
    clearTimeout(timer.current);
    // L'iframe non emette onError per un blocco di framing o un 4xx remoto:
    // l'unico segnale affidabile e che il load non arrivi entro un tempo dato.
    timer.current = setTimeout(() => {
      setStato((precedente) => (precedente === 'caricamento' ? 'lento' : precedente));
    }, ATTESA_MASSIMA);
    return () => clearTimeout(timer.current);
  }, [src, ricarica]);

  // Si conta come "aperto di recente" quando lo strumento arriva davvero, non
  // quando la rotta cambia: un caricamento fallito non sporca l'elenco.
  useEffect(() => {
    if (stato === 'pronto') segnaRecente(percorso);
  }, [stato, percorso]);

  useEffect(() => {
    setPreferito(ePreferito(percorso));
  }, [percorso]);

  const alCaricamento = useCallback(() => {
    clearTimeout(timer.current);
    setStato('pronto');
  }, []);

  // L'app incorniciata segnala quale modulo ha aperto: teniamo allineato
  // l'indirizzo del portale senza ricaricare nulla.
  useEffect(() => {
    function ascolta(evento) {
      if (evento.data?.tipo !== 'immedia:modulo') return;
      const gruppo = percorso.length > 1 ? percorso[0] : null;
      if (!gruppo) return;
      const fratello = evento.data.modulo
        ? trova([gruppo])?.children?.find((c) => c.url?.includes(`modulo=${evento.data.modulo}`))
        : null;
      const nuova = fratello ? rotta([gruppo, fratello.id]) : rotta([gruppo]);
      if (nuova !== window.location.pathname) {
        window.history.replaceState(null, '', nuova);
      }
    }
    window.addEventListener('message', ascolta);
    return () => window.removeEventListener('message', ascolta);
  }, [percorso]);

  return (
    <div style={styles.container}>
      <div style={styles.barra}>
        <div style={styles.identita}>
          <span style={styles.nome}>{voce.label}</span>
          {stato === 'caricamento' && <span style={styles.stato}>caricamento…</span>}
          {stato === 'lento' && <span style={styles.statoLento}>non risponde</span>}
        </div>
        <div style={styles.azioni}>
          <button
            style={{ ...styles.azione, ...(preferito ? styles.azionePreferita : {}) }}
            onClick={() => {
              commutaPreferito(percorso);
              setPreferito((p) => !p);
            }}
            title={preferito ? 'Togli dai preferiti' : 'Aggiungi ai preferiti'}
            aria-pressed={preferito}
          >
            <Star size={13} fill={preferito ? 'currentColor' : 'none'} />
            <span>Preferito</span>
          </button>
          <button
            style={styles.azione}
            onClick={() => setRicarica((n) => n + 1)}
            title="Ricarica lo strumento"
          >
            <RotateCw size={13} />
            <span>Ricarica</span>
          </button>
          <a
            style={styles.azione}
            href={voce.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Apri in una nuova scheda"
          >
            <ExternalLink size={13} />
            <span>Nuova scheda</span>
          </a>
        </div>
      </div>

      <div style={styles.telaio}>
        {stato === 'caricamento' && (
          <div style={styles.overlay}>
            <div style={styles.spinner} />
            <p style={styles.testo}>Caricamento {voce.label}…</p>
          </div>
        )}

        {stato === 'lento' && (
          <div style={styles.overlay}>
            <p style={styles.testoErrore}>
              {voce.label} non ha risposto entro dieci secondi.
            </p>
            <p style={styles.testoAiuto}>
              Puo essere una partenza lenta: riprova a caricarlo, oppure aprilo direttamente.
            </p>
            <div style={styles.azioniErrore}>
              <button style={styles.bottone} onClick={() => setRicarica((n) => n + 1)}>
                <RotateCw size={14} />
                <span>Riprova</span>
              </button>
              <a style={styles.bottoneLink} href={voce.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                <span>Apri in una nuova scheda</span>
              </a>
            </div>
          </div>
        )}

        <iframe
          key={`${src}#${ricarica}`}
          src={src}
          title={voce.label}
          onLoad={alCaricamento}
          allow="clipboard-read; clipboard-write"
          style={{
            ...styles.iframe,
            visibility: stato === 'pronto' ? 'visible' : 'hidden',
          }}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  barra: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    height: '38px',
    flexShrink: 0,
    padding: '0 14px',
    background: 'var(--immedia-bg-white)',
    borderBottom: '1px solid var(--color-border)',
  },
  identita: { display: 'flex', alignItems: 'baseline', gap: '10px', minWidth: 0 },
  nome: {
    fontFamily: 'var(--font-heading)',
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  stato: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    color: 'var(--immedia-text-light)',
  },
  statoLento: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    color: 'var(--color-warning)',
  },
  azioni: { display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 },
  azione: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 8px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    background: 'transparent',
    color: 'var(--immedia-text-med)',
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  azionePreferita: { color: 'var(--immedia-gold)', borderColor: 'rgba(196,136,32,0.4)' },
  telaio: { position: 'relative', flex: 1, minHeight: 0 },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
    background: 'var(--immedia-bg-white)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: 'var(--immedia-bg-light)',
    zIndex: 2,
    padding: '24px',
    textAlign: 'center',
  },
  spinner: {
    width: '28px',
    height: '28px',
    border: '3px solid var(--immedia-bg-sky)',
    borderTopColor: 'var(--immedia-cyan)',
    borderRadius: '50%',
    animation: 'spin 900ms linear infinite',
  },
  testo: { fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--immedia-text-muted)' },
  testoErrore: {
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
  },
  testoAiuto: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--immedia-text-muted)',
    maxWidth: '44ch',
  },
  azioniErrore: { display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap', justifyContent: 'center' },
  bottone: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--immedia-cyan)',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  bottoneLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '7px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    background: 'var(--immedia-bg-white)',
    color: 'var(--immedia-ocean)',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none',
  },
};
