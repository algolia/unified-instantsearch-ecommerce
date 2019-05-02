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
            this.openPanel = this.openPanel.bind(this);
        }

        togglePanel = () => {
            this.setState((currentState) => ({ opened: !currentState.opened }))
        };

        openPanel = (opened = true) => {
            this.setState({ opened });
        };

        render() {
            const { opened } = this.state;
            return (
                <div>
                    <Panel header={WrappedComponent.header} className={opened ? 'opened' : 'closed'}>
                        {opened &&
                            <WrappedComponent {...this.props} opened={opened} />
                        }
              
                        {opened && <WrappedComponent {...this.props} opened={opened} />}
              
                        <span className="ais-Panel-collapse" onClick={this.togglePanel} />
                    </Panel>
                </div>
            )
        }
    }
};

export default toggablePanel;