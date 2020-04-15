import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from './App';
import config from './config';
import { initAnalytics } from './analytics';

import './reset.scss';
import './theme.scss';
import './App.scss';

initAnalytics();

ReactDOM.render(
  <Router>
    <Route path="*" component={App} />
  </Router>,
  document.querySelector(config.inputSelector)
);
