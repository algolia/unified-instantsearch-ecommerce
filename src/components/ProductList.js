import React from 'preact/compat';

import { Hits } from './Hits';
import { InfiniteHits } from './InfiniteHits';

import { useAppContext } from '../hooks';

export const ProductList = (props) => {
  const { isMobile } = useAppContext();

  if (isMobile) {
    return <InfiniteHits {...props} />;
  }

  return <Hits {...props} />;
};
