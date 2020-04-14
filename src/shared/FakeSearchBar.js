import React from 'react';
import ReactDOM from 'react-dom';

import config from './../config';

class FakeSearchBar extends React.Component {
  render() {
    const { onInputClick } = this.props;

    return ReactDOM.createPortal(
      <input
        id="euip-fake-input"
        type="text"
        placeholder="Que recherchez-vous… ?"
        onClick={(e) => {
          e.target.blur();
          onInputClick();
        }}
      />,
      document.getElementById(config.placeholderId)
    );
  }
}

export default FakeSearchBar;
