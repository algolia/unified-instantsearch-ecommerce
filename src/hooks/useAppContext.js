import React from 'react';

import { AppContext } from '../App';

export function useAppContext() {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error(
      'The component needs to be wrapped in the `App` componenet.'
    );
  }

  return context;
}
