import React from 'react'; // Import React
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import Certificate from './certificate'; // Correct the import path

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Certificate />
    <App/>
  </React.StrictMode>,
  rootElement
);