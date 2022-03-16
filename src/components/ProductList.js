import React from 'preact/compat';

import { useAppContext } from '../hooks';

import { Hits } from './Hits';
import { InfiniteHits } from './InfiniteHits';

export function ProductList(props) {
  const { isMobile } = useAppContext();

  if (isMobile) {
    return <InfiniteHits {...props} />;
  }

  return <Hits {...props} />;
}
