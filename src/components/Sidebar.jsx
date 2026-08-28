import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Receipt, TrendingUp, Calculator, FileText, Landmark, Gavel,
  Database, Bot, Zap, Coins, ChevronDown, ChevronRight, ExternalLink,
} from 'lucide-react';
import { apps, aiAssistants, categories } from '../data/apps.js';

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
  coins: Coins,
};

function AppIcon({ name, size = 16 }) {
  const Icon = iconMap[name];
  return Icon ? <Icon size={size} /> : null;
}

function isAppActive(location, appId, subId) {
  if (subId) return location.pathname === `/app/${appId}/${subId}`;
  return location.pathname === `/app/${appId}`;
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [inpsExpanded, setInpsExpanded] = useState(
    location.pathname.startsWith('/app/inps-tools')
  );

  const calcApps = apps.filter((a) => a.category === 'calcolo');
  const gestApps = apps.filter((a) => a.category === 'gestione');
  const inpsApp = apps.find((a) => a.id === 'inps-tools');

  const handleNav = (path) => {
    navigate(path);
  };

  const handleExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>

        {/* CALCOLO */}
        <SectionLabel label={categories.calcolo.label} />
        {calcApps.map((app) => (
          <NavItem
            key={app.id}
            icon={app.icon}
            label={app.shortLabel}
            active={isAppActive(location, app.id)}
            onClick={() => handleNav(`/app/${app.id}`)}
          />
        ))}

        {/* GESTIONE */}
        <SectionLabel label={categories.gestione.label} />
        {gestApps.map((app) => (
          <NavItem
            key={app.id}
            icon={app.icon}
            label={app.shortLabel}
            badge={app.badge}
            active={isAppActive(location, app.id)}
            onClick={() => handleNav(`/app/${app.id}`)}
          />
        ))}

        {/* ELABORAZIONE INPS */}
        <SectionLabel label={categories.elaborazione.label} />
        <NavItem
          icon={inpsApp.icon}
          label={inpsApp.shortLabel}
          active={location.pathname.startsWith('/app/inps-tools')}
          expandable
          expanded={inpsExpanded}
          onExpand={() => setInpsExpanded(!inpsExpanded)}
          onClick={() => setInpsExpanded(!inpsExpanded)}
        />
        {inpsExpanded && inpsApp.subApps.map((sub) => (
          <NavSubItem
            key={sub.id}
            label={sub.label}
            active={isAppActive(location, 'inps-tools', sub.id)}
            onClick={() => handleNav(`/app/inps-tools/${sub.id}`)}
          />
        ))}

        {/* AI ASSISTANTS */}
        <SectionLabel label="Assistenti AI" />
        {aiAssistants.map((ai) => (
          <NavItem
            key={ai.id}
            icon={ai.icon}
            label={ai.shortLabel}
            external
            onClick={() => handleExternal(ai.url)}
          />
        ))}

      </nav>

      <footer style={styles.footer}>
        © 2025 Immedia S.p.A. — Uso esclusivo interno
      </footer>
    </aside>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={styles.sectionLabel}>{label}</div>
  );
}

function NavItem({ icon, label, active, badge, expandable, expanded, onClick, external }) {
  const [hovered, setHovered] = useState(false);

  const itemStyle = {
    ...styles.navItem,
    ...(active ? styles.navItemActive : {}),
    ...(hovered && !active ? styles.navItemHover : {}),
  };

  const labelStyle = {
    ...styles.navLabel,
    ...(active ? styles.navLabelActive : {}),
  };

  return (
    <button
      style={itemStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
      aria-label={label}
    >
      <span style={{ ...styles.navIcon, ...(active ? { color: 'var(--immedia-ocean)' } : {}) }}>
        <AppIcon name={icon} size={16} />
      </span>
      <span style={labelStyle}>{label}</span>

      <span style={styles.navRight}>
        {badge && (
          <span style={styles.badge}>{badge}</span>
        )}
        {external && (
          <ExternalLink size={12} style={{ opacity: 0.5 }} />
        )}
        {expandable && (
          expanded
            ? <ChevronDown size={14} style={{ opacity: 0.6 }} />
            : <ChevronRight size={14} style={{ opacity: 0.6 }} />
        )}
        {active && !expandable && !external && (
          <span style={styles.activeDot} />
        )}
      </span>
    </button>
  );
}

function NavSubItem({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);

  const itemStyle = {
    ...styles.navItem,
    ...styles.navSubItem,
    ...(active ? styles.navItemActive : {}),
    ...(hovered && !active ? styles.navItemHover : {}),
  };

  const labelStyle = {
    ...styles.navLabel,
    ...(active ? styles.navLabelActive : {}),
    fontSize: '12px',
  };

  return (
    <button
      style={itemStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
      aria-label={label}
    >
      <span style={labelStyle}>{label}</span>
      {active && <span style={styles.activeDot} />}
    </button>
  );
}

const styles = {
  sidebar: {
    width: '224px',
    flexShrink: 0,
    background: 'var(--immedia-bg-white)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  nav: {
    flex: 1,
    padding: '12px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  sectionLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: '600',
    color: 'var(--immedia-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '12px 8px 4px',
    marginTop: '4px',
  },
  navItem: {
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
  navItemActive: {
    background: 'var(--immedia-bg-ice)',
  },
  navItemHover: {
    background: '#F3F4F6',
  },
  navSubItem: {
    paddingLeft: '36px',
  },
  navIcon: {
    color: 'var(--immedia-text-muted)',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  navLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '400',
    color: 'var(--immedia-text-med)',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  navLabelActive: {
    color: 'var(--immedia-ocean)',
    fontWeight: '600',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },
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
  activeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--immedia-cyan)',
    flexShrink: 0,
  },
  footer: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    color: 'var(--immedia-text-muted)',
    textAlign: 'center',
    padding: '12px 8px',
    borderTop: '1px solid var(--color-border)',
  },
};
