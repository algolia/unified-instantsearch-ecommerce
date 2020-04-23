import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import { SearchBox as SearchBoxComponent } from './SearchBox';

export const ConnectedSearchBox = connectSearchBox(function SearchBox(props) {
  return (
    <SearchBoxComponent
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
