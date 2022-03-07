import React from 'preact/compat';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

export const ResetButton = connectCurrentRefinements(function ResetButton(
  props
) {
  return (
    <button
      type="button"
      className="uni-Refinements-button uni-Refinements-resetButton"
      disabled={props.items.length === 0}
      onClick={() => {
        props.refine(props.items);
        props.onClick();
      }}
    >
      Clear all
    </button>
  );
});
