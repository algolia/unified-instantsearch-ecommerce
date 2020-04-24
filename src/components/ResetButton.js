import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

export const ResetButton = connectCurrentRefinements(function ResetButton(
  props
) {
  return (
    <button
      className="uni-Refinements-button uni-Refinements-resetButton"
      onClick={() => {
        props.refine(props.items);
        props.onClick();
      }}
      disabled={props.items.length === 0}
    >
      Reset filters
    </button>
  );
});
