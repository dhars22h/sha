import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './context/AppProviders';
import StorefrontRoutes from './routes/StorefrontRoutes';
import AdminRoutes from './admin/routes/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<StorefrontRoutes />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
