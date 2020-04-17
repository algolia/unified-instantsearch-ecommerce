import React from 'react';
import ReactDOM from 'react-dom';

import { useAppContext } from '../hooks';

export const FakeSearchBar = ({ onClick }) => {
  const { config } = useAppContext();

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
