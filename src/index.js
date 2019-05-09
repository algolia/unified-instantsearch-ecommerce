import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import App from './app';
import rootReducer from './reducers'
import { initAnalytics } from './shared/Analytics';

initAnalytics();
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="*" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
