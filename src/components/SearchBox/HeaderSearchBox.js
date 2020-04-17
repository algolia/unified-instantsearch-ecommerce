import React from 'react';

import { useAppContext } from '../../hooks';
import { ConnectedPredictiveSearchBox } from './ConnectedPredictiveSearchBox';
import { ConnectedSearchBox } from './ConnectedSearchBox';

export const HeaderSearchBox = (props) => {
  const { config } = useAppContext();

  if (config.suggestionsIndex) {
    return (
      <div className="Unified-SearchBox">
        <ConnectedPredictiveSearchBox
          translations={{
            placeholder: 'Search for a product, brand, color, …',
          }}
          {...props}
          suggestionsIndex={config.suggestionsIndex}
        />
      </div>
    );
  }

  return (
    <div className="Unified-SearchBox">
      <ConnectedSearchBox
        translations={{
          placeholder: 'Search for a product, brand, color, …',
        }}
        {...props}
      />
    </div>
  );
};
