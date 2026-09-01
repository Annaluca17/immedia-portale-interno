import { Terminal, FolderOpen, ExternalLink, Copy, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { segnaRecente } from '../data/preferenze.js';

// Alcuni strumenti girano sul PC dell'operatore e non si possono incorniciare.
// Invece di lasciarli fuori dal portale, il portale ne mostra la scheda
// d'avvio: dove sta la cartella, cosa lanciare, cosa serve prima.
export default function SchedaDesktop({ voce, percorso }) {
  const [copiato, setCopiato] = useState(false);
  const avvio = voce.avvio || {};

  useEffect(() => {
    if (percorso) segnaRecente(percorso);
  }, [percorso]);

  const copiaCartella = async () => {
    try {
      await navigator.clipboard.writeText(avvio.cartella || '');
      setCopiato(true);
      setTimeout(() => setCopiato(false), 2000);
    } catch {
      setCopiato(false);
    }
  };

  return (
    <div style={styles.pagina}>
      <div style={styles.testata}>
        <span style={styles.etichetta}>
          <Terminal size={12} />
          <span>{voce.stato === 'in-pubblicazione' ? 'Pronto, da pubblicare' : 'Strumento da PC'}</span>
        </span>
        <h1 style={styles.titolo}>{voce.label}</h1>
        <p style={styles.descrizione}>{voce.description}</p>
      </div>

      {avvio.cartella && (
        <section style={styles.blocco}>
          <h2 style={styles.sottotitolo}>
            <FolderOpen size={15} />
            <span>Dove si trova</span>
          </h2>
          <div style={styles.percorsoRiga}>
            <code style={styles.percorso}>{avvio.cartella}</code>
            <button style={styles.copia} onClick={copiaCartella} title="Copia il percorso">
              {copiato ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiato ? 'Copiato' : 'Copia'}</span>
            </button>
          </div>
        </section>
      )}

      {avvio.comandi?.length > 0 && (
        <section style={styles.blocco}>
          <h2 style={styles.sottotitolo}>
            <Terminal size={15} />
            <span>Cosa lanciare</span>
          </h2>
          <div style={styles.comandi}>
            {avvio.comandi.map((c) => (
              <div key={c.file} style={styles.comando}>
                <code style={styles.file}>{c.file}</code>
                <span style={styles.cosa}>{c.cosa}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {avvio.prerequisiti && (
        <section style={styles.blocco}>
          <h2 style={styles.sottotitolo}><span>Prima di partire</span></h2>
          <p style={styles.prerequisiti}>{avvio.prerequisiti}</p>
        </section>
      )}

      {avvio.repo && (
        <a style={styles.repo} href={avvio.repo} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={14} />
          <span>Repository e istruzioni complete</span>
        </a>
      )}
    </div>
  );
}

const styles = {
  pagina: {
    padding: '32px 36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '26px',
    maxWidth: '760px',
    overflowY: 'auto',
    height: '100%',
  },
  testata: { display: 'flex', flexDirection: 'column', gap: '8px' },
  etichetta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    alignSelf: 'flex-start',
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--immedia-gold)',
    background: 'rgba(196,136,32,0.1)',
    border: '1px solid rgba(196,136,32,0.3)',
    borderRadius: '4px',
    padding: '3px 8px',
  },
  titolo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
  },
  descrizione: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-text-med)',
    maxWidth: '62ch',
    lineHeight: 1.6,
  },
  blocco: { display: 'flex', flexDirection: 'column', gap: '10px' },
  sottotitolo: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'var(--font-heading)',
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  percorsoRiga: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    background: 'var(--immedia-bg-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '10px 12px',
  },
  percorso: {
    fontFamily: 'ui-monospace, Consolas, monospace',
    fontSize: '12.5px',
    color: 'var(--immedia-text-dark)',
    wordBreak: 'break-all',
    flex: 1,
    minWidth: '200px',
  },
  copia: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 9px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    background: 'transparent',
    color: 'var(--immedia-text-med)',
    fontFamily: 'var(--font-body)',
    fontSize: '11.5px',
    cursor: 'pointer',
  },
  comandi: { display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' },
  comando: {
    display: 'grid',
    gridTemplateColumns: 'minmax(150px, 200px) 1fr',
    gap: '14px',
    alignItems: 'baseline',
    background: 'var(--immedia-bg-white)',
    padding: '11px 12px',
  },
  file: {
    fontFamily: 'ui-monospace, Consolas, monospace',
    fontSize: '12.5px',
    color: 'var(--immedia-ocean)',
    fontWeight: 600,
  },
  cosa: { fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--immedia-text-med)' },
  prerequisiti: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--immedia-text-med)',
    maxWidth: '62ch',
    lineHeight: 1.6,
  },
  repo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    alignSelf: 'flex-start',
    padding: '8px 14px',
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
