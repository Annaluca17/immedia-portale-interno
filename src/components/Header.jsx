import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('immedia_auth');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <img
          src="/logo-icon.png"
          alt="Immedia"
          style={styles.logoIcon}
        />
        <span style={styles.title}>Portale Strumenti Interni</span>
      </div>

      <div style={styles.right}>
        <span style={styles.badge}>Uso Interno</span>
        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
          title="Esci dal portale"
          aria-label="Esci dal portale"
        >
          <LogOut size={16} />
          <span>Esci</span>
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: '56px',
    background: 'var(--immedia-navy)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    flexShrink: 0,
    zIndex: 10,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    objectFit: 'contain',
    flexShrink: 0,
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '15px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.01em',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  badge: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '4px',
    padding: '2px 8px',
    letterSpacing: '0.04em',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '6px 10px',
    borderRadius: 'var(--radius-sm)',
    transition: 'color var(--transition-fast), background var(--transition-fast)',
  },
};
