import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Receipt, TrendingUp, Calculator, FileText, Landmark, Gavel,
  Database, Bot, Zap, ExternalLink, ArrowRight,
} from 'lucide-react';

const iconMap = {
  receipt: Receipt,
  'trending-up': TrendingUp,
  calculator: Calculator,
  'file-text': FileText,
  landmark: Landmark,
  gavel: Gavel,
  database: Database,
  bot: Bot,
  zap: Zap,
};

function AppIcon({ name, size = 20 }) {
  const Icon = iconMap[name];
  return Icon ? <Icon size={size} /> : null;
}

export default function AppCard({ app, isAI = false }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    ...styles.card,
    ...(hovered ? styles.cardHover : {}),
    borderTop: isAI
      ? '3px solid var(--immedia-gold)'
      : '3px solid var(--immedia-cyan)',
  };

  const handleOpen = (url, path) => {
    if (url && (app.openExternal || isAI)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (path) {
      navigate(path);
    }
  };

  const isGroup = !!app.subApps;

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header card */}
      <div style={styles.cardHeader}>
        <div style={{
          ...styles.iconWrap,
          background: isAI ? 'rgba(196,136,32,0.08)' : 'var(--immedia-bg-ice)',
          color: isAI ? 'var(--immedia-gold)' : 'var(--immedia-cyan)',
        }}>
          <AppIcon name={app.icon} size={20} />
        </div>

        <div style={styles.badgeWrap}>
          {isAI && <span style={styles.aiBadge}>AI</span>}
          {app.badge && <span style={styles.advBadge}>{app.badge}</span>}
        </div>
      </div>

      {/* Titolo + descrizione */}
      <h3 style={styles.cardTitle}>{app.label}</h3>
      <p style={styles.cardDesc}>{app.description}</p>

      {/* Footer — azioni */}
      <div style={styles.cardFooter}>
        {isAI && (
          <button
            style={styles.btnPrimary}
            onClick={() => handleOpen(app.url)}
            aria-label={`Avvia ${app.label}`}
          >
            <ExternalLink size={13} />
            <span>Avvia</span>
          </button>
        )}

        {!isAI && !isGroup && (
          <button
            style={styles.btnPrimary}
            onClick={() => handleOpen(null, `/app/${app.id}`)}
            aria-label={`Apri ${app.label}`}
          >
            <ArrowRight size={13} />
            <span>Apri</span>
          </button>
        )}

        {isGroup && (
          <div style={styles.subBtns}>
            {app.subApps.map((sub) => (
              <button
                key={sub.id}
                style={styles.btnOutline}
                onClick={() => navigate(`/app/inps-tools/${sub.id}`)}
                title={sub.label}
                aria-label={sub.label}
              >
                {sub.id === 'uniemens' ? 'UniEmens' : 'INPS Extractor'}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--immedia-bg-white)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transition: 'box-shadow var(--transition-normal), transform var(--transition-normal)',
    cursor: 'default',
  },
  cardHover: {
    boxShadow: 'var(--shadow-md)',
    transform: 'translateY(-2px)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  iconWrap: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeWrap: {
    display: 'flex',
    gap: '6px',
  },
  aiBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '700',
    color: 'var(--immedia-gold)',
    background: 'rgba(196,136,32,0.1)',
    border: '1px solid rgba(196,136,32,0.3)',
    borderRadius: '4px',
    padding: '2px 7px',
    letterSpacing: '0.05em',
  },
  advBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    color: 'var(--immedia-gold)',
    background: 'rgba(196,136,32,0.1)',
    border: '1px solid rgba(196,136,32,0.3)',
    borderRadius: '4px',
    padding: '2px 7px',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    lineHeight: '1.3',
  },
  cardDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    color: 'var(--immedia-text-muted)',
    lineHeight: '1.5',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    flex: 1,
  },
  cardFooter: {
    marginTop: '8px',
    display: 'flex',
    gap: '8px',
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'var(--immedia-cyan)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: '7px 14px',
    cursor: 'pointer',
    transition: 'background var(--transition-fast)',
  },
  subBtns: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  btnOutline: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--immedia-cyan)',
    background: 'transparent',
    border: '1.5px solid var(--immedia-cyan)',
    borderRadius: 'var(--radius-sm)',
    padding: '6px 12px',
    cursor: 'pointer',
    transition: 'background var(--transition-fast), color var(--transition-fast)',
    whiteSpace: 'nowrap',
  },
};
