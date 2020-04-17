import React from 'react';
import ReactDOM from 'react-dom';

import { useAppContext } from '../hooks';

export const SearchButton = ({ onClick }) => {
  const { config } = useAppContext();

  return ReactDOM.createPortal(
    <button
      type="button"
      className="Unified-SearchButton"
      onClick={(event) => {
        event.target.blur();
        onClick();
      }}
    >
      {config.inputContent}
    </button>,
    document.querySelector(config.inputSelector)
  );
};

export default SearchButton;
