import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as Router from 'react-router-dom';
import App from './App';
import './styles/styles.scss';
import './config/configureMobX';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router.BrowserRouter>
    <App />
  </Router.BrowserRouter>,
);
