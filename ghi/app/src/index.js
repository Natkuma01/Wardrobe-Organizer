import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();


async function loadShoes() {
  const response = await fetch('http://localhost:8090/api/shoes/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App shoes={data.shoes} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}
loadShoes();