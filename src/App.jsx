import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Shell from './components/Shell.jsx';
import LoginGate from './components/LoginGate.jsx';
import AppViewer from './components/AppViewer.jsx';
import SchedaDesktop from './components/SchedaDesktop.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { trova, apribile } from './data/registro.js';

function isAuthenticated() {
  return localStorage.getItem('immedia_auth') === 'true';
}

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// Risolve un percorso di qualunque profondita: /app/previdenza/tfr.
function AppRoute() {
  const location = useLocation();
  const segmenti = location.pathname
    .replace(/^\/app\/?/, '')
    .split('/')
    .filter(Boolean);

  const voce = trova(segmenti);
  if (!voce || !apribile(voce)) return <Navigate to="/" replace />;

  if (voce.tipo === 'desktop') {
    return <SchedaDesktop voce={voce} percorso={segmenti} />;
  }
  return <AppViewer voce={voce} percorso={segmenti} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginGate />} />

      <Route
        path="/*"
        element={
          <RequireAuth>
            <Shell>
              <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="app/*" element={<AppRoute />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Shell>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
