import React from 'react';

import PanelBasic from './RefinementBasic';
import PanelColor from './RefinementColor';
import PanelSize from './RefinementSize';
import PanelPrice from './RefinementPrice';

import config from './../../config.js';

const PANELS = {
  basic: PanelBasic,
  color: PanelColor,
  size: PanelSize,
  price: PanelPrice,
};

const Refinements = (props) => {
  const refinements = config.refinements;

  return (
    <React.Fragment>
      {refinements.map((refinement, idx) =>
        React.createElement(PANELS[refinement.type], {
          key: idx,
          ...refinement,
          ...props,
        })
      )}
    </React.Fragment>
  );
};

export default Refinements;
