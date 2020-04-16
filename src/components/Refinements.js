import React from 'react';

import { RefinementBasic } from './RefinementBasic';
import { RefinementColor } from './RefinementColor';
import { RefinementSize } from './RefinementSize';
import { RefinementPrice } from './RefinementPrice';

import config from '../config';

const PANELS = {
  basic: RefinementBasic,
  color: RefinementColor,
  size: RefinementSize,
  price: RefinementPrice,
};

export const Refinements = () => {
  const refinements = config.refinements;

  return refinements.map((refinement) =>
    React.createElement(PANELS[refinement.type], {
      key: refinement.options.attribute,
      ...refinement,
    })
  );
};
