import AppCard from '../components/AppCard.jsx';
import { apps, aiAssistants } from '../data/apps.js';

export default function Home() {
  return (
    <div style={styles.page}>
      {/* Intestazione */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Applicazioni disponibili</h1>
        <p style={styles.pageSubtitle}>
          Seleziona uno strumento dalla barra laterale o accedi direttamente dalle card.
        </p>
      </div>

      {/* Griglia app principali */}
      <div style={styles.grid}>
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>

      {/* Sezione AI */}
      <div style={styles.aiSection}>
        <div style={styles.aiHeader}>
          <h2 style={styles.aiTitle}>Assistenti AI</h2>
          <p style={styles.aiSubtitle}>
            Strumenti di intelligenza artificiale per il supporto operativo interno.
          </p>
        </div>
        <div style={styles.aiGrid}>
          {aiAssistants.map((ai) => (
            <AppCard key={ai.id} app={ai} isAI />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '32px 36px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    minHeight: '100%',
  },
  pageHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  pageTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-text-muted)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  aiSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingTop: '8px',
    borderTop: '1px solid var(--color-border)',
  },
  aiHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  aiTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
  },
  aiSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    color: 'var(--immedia-text-muted)',
  },
  aiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '640px',
  },
};
