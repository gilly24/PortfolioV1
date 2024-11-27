import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new client API
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Update this line
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
