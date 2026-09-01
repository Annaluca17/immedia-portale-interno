import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ExternalLink, Terminal, Star } from 'lucide-react';
import { rotta } from '../data/registro.js';
import { ePreferito, commutaPreferito } from '../data/preferenze.js';
import AppIcon from './AppIcon.jsx';

export default function AppCard({ voce, percorso, ai = false, onPreferitiCambiati }) {
  const [sopra, setSopra] = useState(false);
  const [preferito, setPreferito] = useState(() => ePreferito(percorso));
  const navigate = useNavigate();

  const esterna = voce.tipo === 'esterno';
  const desktop = voce.tipo === 'desktop';

  const apri = () => {
    if (esterna) {
      window.open(voce.url, '_blank', 'noopener,noreferrer');
      return;
    }
    navigate(rotta(percorso));
  };

  const commuta = () => {
    commutaPreferito(percorso);
    setPreferito((p) => !p);
    onPreferitiCambiati?.();
  };

  return (
    <div
      style={{
        ...styles.card,
        ...(sopra ? styles.cardSopra : {}),
        borderTop: `3px solid ${ai ? 'var(--immedia-gold)' : 'var(--immedia-cyan)'}`,
      }}
      onMouseEnter={() => setSopra(true)}
      onMouseLeave={() => setSopra(false)}
    >
      <div style={styles.testata}>
        <div
          style={{
            ...styles.icona,
            background: ai ? 'rgba(196,136,32,0.08)' : 'var(--immedia-bg-ice)',
            color: ai ? 'var(--immedia-gold)' : 'var(--immedia-cyan)',
          }}
        >
          <AppIcon name={voce.icon} size={20} />
        </div>
        <div style={styles.badgeWrap}>
          <button
            style={{ ...styles.stella, ...(preferito ? styles.stellaAttiva : {}) }}
            onClick={commuta}
            title={preferito ? 'Togli dai preferiti' : 'Aggiungi ai preferiti'}
            aria-pressed={preferito}
          >
            <Star size={14} fill={preferito ? 'currentColor' : 'none'} />
          </button>
          {ai && <span style={styles.badgeAi}>AI</span>}
          {desktop && (
            <span style={styles.badgeDesktop}>
              <Terminal size={10} />
              <span>Da PC</span>
            </span>
          )}
          {voce.stato === 'beta' && <span style={styles.badgeBeta}>Beta</span>}
          {voce.stato === 'in-pubblicazione' && (
            <span style={styles.badgeAttesa}>Da pubblicare</span>
          )}
        </div>
      </div>

      <h3 style={styles.titolo}>{voce.label}</h3>
      <p style={styles.descrizione}>{voce.description}</p>

      <div style={styles.piede}>
        <button style={esterna ? styles.bottoneEsterno : styles.bottone} onClick={apri}>
          {esterna ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
          <span>{esterna ? 'Apri' : desktop ? 'Istruzioni' : 'Apri'}</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    background: 'var(--immedia-bg-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px 20px 16px',
    transition: 'box-shadow var(--transition-normal), transform var(--transition-fast)',
    height: '100%',
  },
  cardSopra: { boxShadow: 'var(--shadow-md)', transform: 'translateY(-2px)' },
  testata: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' },
  icona: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeWrap: { display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center' },
  stella: {
    display: 'flex',
    padding: '3px',
    border: 'none',
    background: 'transparent',
    color: 'var(--immedia-text-light)',
    cursor: 'pointer',
    borderRadius: 'var(--radius-sm)',
  },
  stellaAttiva: { color: 'var(--immedia-gold)' },
  badgeBeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    color: 'var(--immedia-ocean)',
    background: 'var(--immedia-bg-ice)',
    border: '1px solid var(--immedia-bg-sky)',
    borderRadius: '3px',
    padding: '2px 6px',
  },
  badgeAttesa: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    color: 'var(--color-warning)',
    background: 'rgba(217,119,6,0.1)',
    border: '1px solid rgba(217,119,6,0.3)',
    borderRadius: '3px',
    padding: '2px 6px',
  },
  badgeAi: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '700',
    color: 'var(--immedia-gold)',
    background: 'rgba(196,136,32,0.1)',
    border: '1px solid rgba(196,136,32,0.3)',
    borderRadius: '3px',
    padding: '2px 6px',
  },
  badgeAvanzato: {
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    color: 'var(--immedia-gold)',
    background: 'rgba(196,136,32,0.1)',
    border: '1px solid rgba(196,136,32,0.3)',
    borderRadius: '3px',
    padding: '2px 6px',
  },
  badgeDesktop: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontFamily: 'var(--font-body)',
    fontSize: '9.5px',
    fontWeight: '600',
    color: 'var(--immedia-text-muted)',
    background: '#F3F4F6',
    border: '1px solid var(--color-border)',
    borderRadius: '3px',
    padding: '2px 6px',
  },
  titolo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    lineHeight: 1.3,
  },
  descrizione: {
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    color: 'var(--immedia-text-muted)',
    lineHeight: 1.55,
    flex: 1,
  },
  piede: { display: 'flex', marginTop: '4px' },
  bottone: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--immedia-cyan)',
    color: '#fff',
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  bottoneEsterno: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    background: 'var(--immedia-bg-white)',
    color: 'var(--immedia-ocean)',
    fontFamily: 'var(--font-body)',
    fontSize: '12.5px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
