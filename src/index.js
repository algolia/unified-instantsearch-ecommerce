import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './reset.scss';
import './theme.scss';
import './App.scss';

import config from './config';
import styles from './config/styles';
import { App } from './App';

ReactDOM.render(
  <Router>
    <Route
      path="*"
      component={(props) => <App {...props} config={config} styles={styles} />}
    />
  </Router>,
  document.querySelector(config.inputSelector)
);
