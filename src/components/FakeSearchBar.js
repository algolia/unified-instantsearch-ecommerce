import React from 'react';
import ReactDOM from 'react-dom';

import config from '../config';

export const FakeSearchBar = ({ onInputClick }) => {
  return ReactDOM.createPortal(
    <input
      id="euip-fake-input"
      type="text"
      placeholder="Que recherchez-vous… ?"
      onClick={(event) => {
        event.target.blur();
        onInputClick();
      }}
    />,
    document.querySelector(config.inputSelector)
  );
};

export default FakeSearchBar;