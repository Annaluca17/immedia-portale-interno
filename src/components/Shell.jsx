import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import { useLocation } from 'react-router-dom';

export default function Shell({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home';

  return (
    <div style={styles.root}>
      <Header />
      <div style={styles.body}>
        <Sidebar />
        <main
          style={{
            ...styles.main,
            overflowY: isHome ? 'auto' : 'hidden',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    overflow: 'hidden',
    background: 'var(--immedia-bg-light)',
  },
};
