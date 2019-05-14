import React from 'react';
import { Configure } from 'react-instantsearch-dom';

import config from './../config.json';

class Configuration extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        return (
            <Configure {...config.INSTANT_SEARCH_CONFIGURE} />
        )
    }
}

export default Configuration;