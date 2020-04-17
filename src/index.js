import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './reset.scss';
import './theme.scss';
import './App.scss';

import { App } from './App';
import config from './config';

ReactDOM.render(
  <Router>
    <Route path="*" component={(props) => <App {...props} config={config} />} />
  </Router>,
  document.querySelector(config.inputSelector)
);
