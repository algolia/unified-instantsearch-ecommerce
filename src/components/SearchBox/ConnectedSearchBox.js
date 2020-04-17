import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import { SearchBox } from './SearchBox';

export const ConnectedSearchBox = connectSearchBox((props) => {
  return (
    <SearchBox
      translations={{ placeholder: 'Search for a product, brand, color, …' }}
      {...props}
      onChange={(event) => {
        props.refine(event.currentTarget.value);
      }}
      onKeyDown={() => {}}
      onSubmit={() => {}}
      onReset={() => {
        props.refine('');
      }}
    />
  );
});
