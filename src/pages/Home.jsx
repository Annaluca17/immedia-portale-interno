import { useCallback, useState } from 'react';
import AppCard from '../components/AppCard.jsx';
import AppIcon from '../components/AppIcon.jsx';
import { apps, aiAssistants } from '../data/apps.js';
import { apribile, strumenti, daChiave } from '../data/registro.js';
import { leggiPreferiti, leggiRecenti } from '../data/preferenze.js';

export default function Home() {
  const quanti = strumenti().length + aiAssistants.length;
  const [versione, setVersione] = useState(0);
  const rileggi = useCallback(() => setVersione((n) => n + 1), []);

  // Le chiavi salvate possono riferirsi a voci non piu esistenti: si scartano.
  const preferiti = leggiPreferiti().map(daChiave).filter(Boolean);
  const recenti = leggiRecenti()
    .map(daChiave)
    .filter(Boolean)
    .filter((r) => !preferiti.some((p) => p.percorso.join('/') === r.percorso.join('/')))
    .slice(0, 4);

  return (
    <div style={styles.pagina}>
      <div style={styles.testata}>
        <h1 style={styles.titolo}>Applicazioni disponibili</h1>
        <p style={styles.sottotitolo}>
          {quanti} strumenti, raccolti per momento di lavoro. Cerca dalla barra laterale
          quando sai gia cosa ti serve.
        </p>
      </div>

      {(preferiti.length > 0 || recenti.length > 0) && (
        <section key={`personali-${versione}`} style={styles.famiglia}>
          <h2 style={styles.nomeFamiglia}>
            <span style={styles.iconaFamiglia}>
              <AppIcon name="star" size={15} />
            </span>
            <span>I tuoi strumenti</span>
            <span style={styles.conteggio}>{preferiti.length + recenti.length}</span>
          </h2>
          {preferiti.length > 0 && (
            <div style={styles.griglia}>
              {preferiti.map(({ voce, percorso }) => (
                <AppCard
                  key={`pref-${percorso.join('/')}`}
                  voce={voce}
                  percorso={percorso}
                  ai={percorso.length === 1}
                  onPreferitiCambiati={rileggi}
                />
              ))}
            </div>
          )}
          {recenti.length > 0 && (
            <>
              <p style={styles.sottoetichetta}>Aperti di recente</p>
              <div style={styles.griglia}>
                {recenti.map(({ voce, percorso }) => (
                  <AppCard
                    key={`rec-${percorso.join('/')}`}
                    voce={voce}
                    percorso={percorso}
                    ai={percorso.length === 1}
                    onPreferitiCambiati={rileggi}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {apps.map((gruppo) => {
        const figli = (gruppo.children || []).filter(apribile);
        if (figli.length === 0) return null;
        return (
          <section key={gruppo.id} style={styles.famiglia}>
            <h2 style={styles.nomeFamiglia}>
              <span style={styles.iconaFamiglia}>
                <AppIcon name={gruppo.icon} size={15} />
              </span>
              <span>{gruppo.label}</span>
              <span style={styles.conteggio}>{figli.length}</span>
            </h2>
            <div style={styles.griglia}>
              {figli.map((figlio) => (
                <AppCard
                  key={`${figlio.id}-${versione}`}
                  voce={figlio}
                  percorso={[gruppo.id, figlio.id]}
                  onPreferitiCambiati={rileggi}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section style={styles.famiglia}>
        <h2 style={styles.nomeFamiglia}>
          <span style={styles.iconaFamiglia}>
            <AppIcon name="bot" size={15} />
          </span>
          <span>Assistenti AI</span>
          <span style={styles.conteggio}>{aiAssistants.length}</span>
        </h2>
        <div style={styles.griglia}>
          {aiAssistants.map((ai) => (
            <AppCard
              key={`${ai.id}-${versione}`}
              voce={ai}
              percorso={[ai.id]}
              ai
              onPreferitiCambiati={rileggi}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  pagina: {
    padding: '30px 36px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '34px',
    minHeight: '100%',
  },
  testata: { display: 'flex', flexDirection: 'column', gap: '6px' },
  titolo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '22px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
  },
  sottotitolo: {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--immedia-text-muted)',
    maxWidth: '62ch',
  },
  famiglia: { display: 'flex', flexDirection: 'column', gap: '14px' },
  sottoetichetta: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--immedia-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginTop: '2px',
  },
  nomeFamiglia: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    fontFamily: 'var(--font-heading)',
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--immedia-navy)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    paddingBottom: '9px',
    borderBottom: '1px solid var(--color-border)',
  },
  iconaFamiglia: { display: 'flex', color: 'var(--immedia-cyan)' },
  conteggio: {
    fontFamily: 'var(--font-body)',
    fontSize: '10.5px',
    fontWeight: '600',
    color: 'var(--immedia-text-muted)',
    background: 'var(--immedia-bg-light)',
    border: '1px solid var(--color-border)',
    borderRadius: '10px',
    padding: '1px 7px',
    letterSpacing: 0,
  },
  griglia: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
    gap: '16px',
  },
};
