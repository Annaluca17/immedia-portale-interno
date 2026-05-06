import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export default function AppViewer({ appUrl, appLabel }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [appUrl]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>
            Caricamento {appLabel}...
          </p>
        </div>
      )}

      {error && (
        <div style={styles.errorOverlay}>
          <p style={styles.errorText}>Impossibile caricare l&apos;applicazione.</p>
          <p style={styles.errorSub}>Aprila direttamente:</p>
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.errorLink}
          >
            <ExternalLink size={14} />
            <span>{appLabel}</span>
          </a>
        </div>
      )}

      <iframe
        key={appUrl}
        src={appUrl}
        title={appLabel}
        onLoad={handleLoad}
        onError={handleError}
        allow="clipboard-read; clipboard-write"
        style={{
          ...styles.iframe,
          visibility: loading || error ? 'hidden' : 'visible',
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  },
  loadingOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    background: 'var(--immedia-bg-light)',
    zIndex: 1,
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid var(--immedia-bg-sky)',
    borderTopColor: 'var(--immedia-cyan)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-cyan)',
    fontWeight: '500',
  },
  errorOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'var(--immedia-bg-light)',
    zIndex: 1,
    padding: '40px',
  },
  errorText: {
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    color: 'var(--immedia-text-dark)',
    fontWeight: '500',
  },
  errorSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-text-muted)',
  },
  errorLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--immedia-cyan)',
    textDecoration: 'none',
    marginTop: '4px',
  },
};
