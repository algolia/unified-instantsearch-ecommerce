import React from 'react';

import { Panel } from 'react-instantsearch-dom';

export const withPanel = (WrappedComponent) => {
  return function ToggableComponent(props) {
    const [isOpened, setIsOpened] = React.useState(!props.closed);

    return (
      <div className="ais-Panel-wrapper">
        <Panel header={props.header} className={isOpened ? 'opened' : 'closed'}>
          <WrappedComponent {...props} opened={isOpened} />
        </Panel>
        <span
          className="ais-Panel-collapse"
          onClick={() => setIsOpened((prevValue) => !prevValue)}
        />
      </div>
    );
  };
};
