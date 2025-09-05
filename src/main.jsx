import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter y Route
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Define la ruta dinámica con :id_organizacion */}
        <Route path="/encuesta/:id_organizacion" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);