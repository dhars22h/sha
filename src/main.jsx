import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// One-time migration: clear stale storefront products from localStorage
// so the app always uses the correctly-bundled product images from products.js
try {
  localStorage.removeItem('shans_products');
} catch (_) {}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
