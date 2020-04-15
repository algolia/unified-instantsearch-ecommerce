import React from 'react';

import { Hits } from './Hits';
import { InfiniteHits } from './InfiniteHits';

export const ProductList = () => {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    if (window.matchMedia('(min-width: 600px)').matches) {
      setIsMobile(false);
    }
  }, []);

  if (isMobile) {
    return <InfiniteHits />;
  }

  return <Hits />;
};
