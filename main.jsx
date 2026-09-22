import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LOGO } from './assets';
import './index.css';

// no /public folder in this flat layout, so the favicon is attached here
const icon = document.createElement('link');
icon.rel = 'icon';
icon.type = 'image/png';
icon.href = LOGO.favicon;
document.head.appendChild(icon);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
