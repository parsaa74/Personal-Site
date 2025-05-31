import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { unstable_useBlocker as useBlocker, unstable_usePrompt as usePrompt } from 'react-router-dom';

// Note: future flags syntax changed, we'll just remove the flags
// and update any deprecated APIs directly

import App from './App';
import './styles/fonts.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #000000;
    color: #ffffff;
    font-family: 'Moderat';
    overflow-x: hidden;
  }

  #root {
    isolation: isolate;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 