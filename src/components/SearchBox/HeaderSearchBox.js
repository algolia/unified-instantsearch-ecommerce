import React from 'react';

import config from '../../config';
import { ConnectedPredictiveSearchBox } from './ConnectedPredictiveSearchBox';
import { ConnectedSearchBox } from './ConnectedSearchBox';

export const HeaderSearchBox = (props) => {
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
