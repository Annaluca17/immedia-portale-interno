import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Shell from './components/Shell.jsx';
import LoginGate from './components/LoginGate.jsx';
import AppViewer from './components/AppViewer.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { apps } from './data/apps.js';

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

function AppRoute() {
  const location = useLocation();
  const pathAfterApp = location.pathname.replace(/^\/app\/?/, '');
  const parts = pathAfterApp.split('/').filter(Boolean);
  const appId = parts[0];
  const subId = parts[1];

  if (appId === 'inps-tools' && subId) {
    const inpsApp = apps.find((a) => a.id === 'inps-tools');
    const sub = inpsApp?.subApps?.find((s) => s.id === subId);
    if (sub) {
      return <AppViewer appUrl={sub.url} appLabel={sub.label} />;
    }
  }

  const app = apps.find((a) => a.id === appId);
  if (app && app.url) {
    return <AppViewer appUrl={app.url} appLabel={app.label} />;
  }

  return <Navigate to="/" replace />;
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
