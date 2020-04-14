import React from 'react';
import PropTypes from 'prop-types';

import { Panel } from 'react-instantsearch-dom';

export const toggablePanel = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        opened: !props.closed,
      };

      this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel = () => {
      this.setState((prevState) => ({ opened: !prevState.opened }));
    };

    render() {
      const { header } = this.props;
      const { opened } = this.state;

      return (
        <div className="ais-Panel-wrapper">
          <Panel header={header} className={opened ? 'opened' : 'closed'}>
            <WrappedComponent {...this.props} opened={opened} />
          </Panel>
          <span className="ais-Panel-collapse" onClick={this.togglePanel} />
        </div>
      );
    }
  };
};

toggablePanel.propTypes = {
  header: PropTypes.string.isRequired,
  attribute: PropTypes.string.isRequired,
};
