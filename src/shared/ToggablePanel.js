import React from 'react';

import { Panel } from 'react-instantsearch-dom';

const toggablePanel = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                opened: !props.closed
            };

            this.togglePanel = this.togglePanel.bind(this);
        }

        togglePanel = () => {
            this.setState((currentState) => ({ opened: !currentState.opened }))
        };

        render() {
            const { opened } = this.state;
            return (
                <div>
                    <Panel header={WrappedComponent.header} className={opened ? 'opened' : 'closed'}>
                        <WrappedComponent {...this.props} opened={opened} />
                        <span className="ais-Panel-collapse" onClick={this.togglePanel} />
                    </Panel>
                </div>
            )
        }
    }
};

export default toggablePanel;