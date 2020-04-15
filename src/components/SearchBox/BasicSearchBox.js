import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import { UncontrolledSearchBox } from './UncontrolledSearchBox';

export const BasicSearchBox = connectSearchBox((props) => {
  const inputRef = React.useRef(null);

  return (
    <UncontrolledSearchBox
      inputRef={inputRef}
      placeholder={props.placeholder}
      query={props.currentRefinement}
      onChange={(event) => {
        props.refine(event.currentTarget.value);
      }}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      onReset={() => {
        props.refine('');

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    />
  );
});
