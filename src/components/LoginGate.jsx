import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ACCESS_PWD = (import.meta.env.VITE_ACCESS_PASSWORD ?? '').trim();

export default function LoginGate() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Chi arriva da un link condiviso a uno strumento deve ritrovarsi li dopo
  // l'accesso, non sulla home.
  const destinazione = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password.trim() === ACCESS_PWD) {
      localStorage.setItem('immedia_auth', 'true');
      navigate(destinazione, { replace: true });
    } else {
      setError('Password non corretta. Riprova.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <img
            src="/logo-immedia.png"
            alt="Immedia S.p.A."
            style={styles.logo}
          />
        </div>

        <h1 style={styles.title}>Portale Strumenti Interni</h1>
        <p style={styles.subtitle}>Accesso riservato al personale Immedia S.p.A.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldWrap}>
            <label htmlFor="password" style={styles.label}>
              Password di accesso
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Inserisci la password"
              style={styles.input}
              autoFocus
              autoComplete="current-password"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        {ACCESS_PWD === '' && (
          <p style={styles.devWarning}>
            ⚠ Variabile VITE_ACCESS_PASSWORD non configurata.
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'var(--immedia-bg-light)',
    padding: '20px',
  },
  card: {
    background: 'var(--immedia-bg-white)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-md)',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  logoWrap: { marginBottom: '16px' },
  logo: { maxWidth: '180px', height: 'auto', display: 'block' },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    textAlign: 'center',
    marginBottom: '4px',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-text-muted)',
    textAlign: 'center',
    marginBottom: '12px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '8px',
  },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--immedia-text-med)',
  },
  input: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 14px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    color: 'var(--immedia-text-dark)',
    background: 'var(--immedia-bg-white)',
    width: '100%',
  },
  error: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: '#DC2626',
    textAlign: 'center',
  },
  button: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'var(--immedia-cyan)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    width: '100%',
    cursor: 'pointer',
    marginTop: '4px',
  },
  devWarning: {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    color: '#C48820',
    textAlign: 'center',
    marginTop: '8px',
  },
};
