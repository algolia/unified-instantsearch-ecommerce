import React, { createPortal } from 'preact/compat';

import './SearchButton.scss';
import { useAppContext } from '../hooks';
import { getDomElement } from '../utils';

export const SearchButton = ({ onClick }) => {
  const { config } = useAppContext();

  return createPortal(
    <button
      type="button"
      className="uni-SearchButton"
      title="Search"
      onClick={(event) => {
        event.target.blur();
        onClick();
      }}
    >
      <SearchIcon />

      <div className="uni-SearchButton-InputContent">{config.inputContent}</div>

      {config.keyboardShortcuts?.length > 0 && (
        <kbd className="uni-SearchButton-Shortcut">
          {config.keyboardShortcuts[0]}
        </kbd>
      )}
    </button>,
    getDomElement(config.inputContainer)
  );
};

function SearchIcon(props) {
  return (
    <svg
      className="uni-SearchButton-Icon"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      strokeWidth="1.4"
      {...props}
    >
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
