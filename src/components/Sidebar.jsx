import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, ExternalLink, Search, X } from 'lucide-react';
import { apps, aiAssistants } from '../data/apps.js';
import { cerca, rotta, apribile } from '../data/registro.js';
import AppIcon from './AppIcon.jsx';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Un gruppo si apre da solo quando contiene la voce corrente.
  const gruppoCorrente = location.pathname.replace(/^\/app\/?/, '').split('/')[0];
  const [aperti, setAperti] = useState(() =>
    Object.fromEntries(apps.map((g) => [g.id, g.id === gruppoCorrente]))
  );

  const risultati = useMemo(() => cerca(query), [query]);
  const inRicerca = query.trim().length > 0;

  const apri = (voce, percorso) => {
    if (voce.tipo === 'esterno') {
      window.open(voce.url, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(rotta(percorso));
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.ricercaBox}>
        <Search size={14} style={styles.lente} />
        <input
          style={styles.ricerca}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca uno strumento"
          aria-label="Cerca uno strumento"
        />
        {inRicerca && (
          <button style={styles.pulisci} onClick={() => setQuery('')} aria-label="Azzera la ricerca">
            <X size={13} />
          </button>
        )}
      </div>

      <nav style={styles.nav}>
        {inRicerca ? (
          risultati.length === 0 ? (
            <p style={styles.nessuno}>Nessuno strumento per «{query}».</p>
          ) : (
            <>
              <Etichetta testo={`${risultati.length} risultat${risultati.length === 1 ? 'o' : 'i'}`} />
              {risultati.map(({ voce, percorso, gruppo }) => (
                <Voce
                  key={percorso.join('/')}
                  voce={voce}
                  sottotitolo={gruppo}
                  attiva={location.pathname === rotta(percorso)}
                  onClick={() => apri(voce, percorso)}
                />
              ))}
            </>
          )
        ) : (
          <>
            {apps.map((gruppo) => (
              <div key={gruppo.id}>
                <Voce
                  voce={gruppo}
                  gruppo
                  espanso={aperti[gruppo.id]}
                  attiva={gruppoCorrente === gruppo.id}
                  onClick={() => {
                    // Un hub si apre anche come contenitore, e resta espanso per
                    // mostrare i moduli; un gruppo puro si limita ad aprirsi e chiudersi.
                    if (apribile(gruppo)) {
                      setAperti((s) => ({ ...s, [gruppo.id]: true }));
                      apri(gruppo, [gruppo.id]);
                    } else {
                      setAperti((s) => ({ ...s, [gruppo.id]: !s[gruppo.id] }));
                    }
                  }}
                />
                {aperti[gruppo.id] &&
                  (gruppo.children || []).filter(apribile).map((figlio) => (
                    <Voce
                      key={figlio.id}
                      voce={figlio}
                      annidata
                      attiva={location.pathname === rotta([gruppo.id, figlio.id])}
                      onClick={() => apri(figlio, [gruppo.id, figlio.id])}
                    />
                  ))}
              </div>
            ))}

            <Etichetta testo="Assistenti AI" />
            {aiAssistants.map((ai) => (
              <Voce key={ai.id} voce={ai} onClick={() => apri(ai, [ai.id])} />
            ))}
          </>
        )}
      </nav>

      <footer style={styles.footer}>© 2025 Immedia S.p.A. — Uso esclusivo interno</footer>
    </aside>
  );
}

function Etichetta({ testo }) {
  return <div style={styles.etichetta}>{testo}</div>;
}

function Voce({ voce, attiva, gruppo, annidata, espanso, sottotitolo, onClick }) {
  const [sopra, setSopra] = useState(false);

  return (
    <button
      style={{
        ...styles.voce,
        ...(annidata ? styles.voceAnnidata : {}),
        ...(gruppo ? styles.voceGruppo : {}),
        ...(attiva ? styles.voceAttiva : {}),
        ...(sopra && !attiva ? styles.voceSopra : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setSopra(true)}
      onMouseLeave={() => setSopra(false)}
      title={voce.label}
    >
      {voce.icon && (
        <span style={{ ...styles.icona, ...(attiva ? { color: 'var(--immedia-ocean)' } : {}) }}>
          <AppIcon name={voce.icon} size={15} />
        </span>
      )}

      <span style={styles.testi}>
        <span
          style={{
            ...styles.testo,
            ...(gruppo ? styles.testoGruppo : {}),
            ...(annidata ? styles.testoAnnidato : {}),
            ...(attiva ? styles.testoAttivo : {}),
          }}
        >
          {voce.label}
        </span>
        {sottotitolo && <span style={styles.sottotitolo}>{sottotitolo}</span>}
      </span>

      <span style={styles.destra}>
        {voce.badge && <span style={styles.badge}>{voce.badge}</span>}
        {voce.tipo === 'desktop' && <span style={styles.badgeDesktop}>PC</span>}
        {voce.tipo === 'esterno' && <ExternalLink size={12} style={{ opacity: 0.5 }} />}
        {gruppo && (espanso ? <ChevronDown size={14} style={{ opacity: 0.6 }} /> : <ChevronRight size={14} style={{ opacity: 0.6 }} />)}
        {attiva && !gruppo && voce.tipo !== 'esterno' && <span style={styles.pallino} />}
      </span>
    </button>
  );
}

const styles = {
  sidebar: {
    width: '256px',
    flexShrink: 0,
    background: 'var(--immedia-bg-white)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  ricercaBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px 6px',
    flexShrink: 0,
  },
  lente: { position: 'absolute', left: '20px', color: 'var(--immedia-text-light)', pointerEvents: 'none' },
  ricerca: {
    width: '100%',
    padding: '7px 26px 7px 30px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--immedia-bg-light)',
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    color: 'var(--immedia-text-dark)',
    outline: 'none',
  },
  pulisci: {
    position: 'absolute',
    right: '18px',
    display: 'flex',
    border: 'none',
    background: 'transparent',
    color: 'var(--immedia-text-light)',
    cursor: 'pointer',
    padding: 0,
  },
  nav: {
    flex: 1,
    padding: '4px 8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  etichetta: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    color: 'var(--immedia-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '12px 8px 4px',
  },
  nessuno: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    color: 'var(--immedia-text-muted)',
    padding: '14px 8px',
    lineHeight: 1.5,
  },
  voce: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '7px 8px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background var(--transition-fast)',
    fontFamily: 'var(--font-body)',
  },
  voceGruppo: { marginTop: '8px' },
  voceAnnidata: { paddingLeft: '30px' },
  voceAttiva: { background: 'var(--immedia-bg-ice)' },
  voceSopra: { background: '#F3F4F6' },
  icona: { color: 'var(--immedia-text-muted)', display: 'flex', alignItems: 'center', flexShrink: 0 },
  testi: { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 },
  testo: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '400',
    color: 'var(--immedia-text-med)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  testoGruppo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    textTransform: 'uppercase',
    // I nomi di famiglia sono lunghi: senza spaziatura extra entrano tutti.
    letterSpacing: '0.02em',
  },
  testoAnnidato: { fontSize: '12.5px' },
  testoAttivo: { color: 'var(--immedia-ocean)', fontWeight: '600' },
  sottotitolo: {
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    color: 'var(--immedia-text-light)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  destra: { display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 },
  badge: {
    fontFamily: 'var(--font-body)',
    fontSize: '9px',
    fontWeight: '600',
    color: 'var(--immedia-gold)',
    background: 'rgba(196,136,32,0.1)',
    border: '1px solid rgba(196,136,32,0.3)',
    borderRadius: '3px',
    padding: '1px 5px',
    letterSpacing: '0.03em',
  },
  badgeDesktop: {
    fontFamily: 'var(--font-body)',
    fontSize: '9px',
    fontWeight: '600',
    color: 'var(--immedia-text-muted)',
    background: '#F3F4F6',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '1px 5px',
    letterSpacing: '0.03em',
  },
  pallino: { width: '6px', height: '6px', borderRadius: '50%', background: 'var(--immedia-cyan)', flexShrink: 0 },
  footer: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    color: 'var(--immedia-text-muted)',
    textAlign: 'center',
    padding: '12px 8px',
    borderTop: '1px solid var(--color-border)',
    flexShrink: 0,
  },
};
