import React from 'react';
import ReactDOM from 'react-dom';

import config from '../config';

export const FakeSearchBar = ({ onClick }) => {
  return ReactDOM.createPortal(
    <input
      type="text"
      placeholder="Que recherchez-vous… ?"
      onClick={(event) => {
        event.target.blur();
        onClick();
      }}
    />,
    document.querySelector(config.inputSelector)
  );
};

export default FakeSearchBar;
