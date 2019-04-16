import React from 'react';

import { Panel } from 'react-instantsearch-dom';

class LeftColumn extends React.Component {

    render() {
        return (
            <div className="euip-leftColumn">
                <Panel header="Categories" className="closed">
                    <p>Panel content</p>
                </Panel>
                <Panel header="Colors" className="opened">
                    <p>Panel content</p>
                </Panel>
                <Panel header="Sizes" className="opened">
                    <p>Panel content</p>
                </Panel>
                <Panel header="Price" className="closed">
                    <p>Panel content</p>
                </Panel>
            </div>
        )
    }

}

export default LeftColumn;