import React, { render } from 'preact/compat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './reset.scss';
import './theme.scss';
import './App.scss';

import config from './config';
import rules from './config/rules';
import { App } from './App';
import { getDomElement, validateConfig } from './utils';

validateConfig(config, rules);

render(
  <Router>
    <Routes>
      <Route path="*" element={<App config={config} />} />
    </Routes>
  </Router>,
  getDomElement(config.inputContainer)
);
