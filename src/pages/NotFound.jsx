import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.code}>404</p>
        <h1 style={styles.title}>Pagina non trovata</h1>
        <p style={styles.desc}>
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <button
          style={styles.btn}
          onClick={() => navigate('/')}
          aria-label="Torna alla home"
        >
          <Home size={15} />
          <span>Torna alla home</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    background: 'var(--immedia-bg-light)',
    padding: '40px',
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '400px',
  },
  code: {
    fontFamily: 'var(--font-heading)',
    fontSize: '72px',
    fontWeight: '800',
    color: 'var(--immedia-bg-sky)',
    lineHeight: '1',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
  },
  desc: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-text-muted)',
    lineHeight: '1.6',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'var(--immedia-cyan)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background var(--transition-fast)',
  },
};
