import React from 'preact/compat';

import { SearchContext } from '../App';

export function useSearchContext() {
  const context = React.useContext(SearchContext);

  if (!context) {
    throw new Error(
      '`useSearchContext` must be used within the `Search` component.'
    );
  }

  return context;
}
