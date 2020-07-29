import React from 'preact/compat';
import { connectStats } from 'react-instantsearch-dom';

export const SeeResultsButton = connectStats(function SeeResultsButton(props) {
  return (
    <button
      className="uni-Refinements-button uni-Refinements-resultButton"
      onClick={props.onClick}
    >
      See {props.nbHits.toLocaleString()} results
    </button>
  );
});
