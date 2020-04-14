import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './app';
import { initAnalytics } from './shared/Analytics';

initAnalytics();

ReactDOM.render(
  <Router>
    <Route path="*" component={App} />
  </Router>,
  document.getElementById('euip-root')
);
