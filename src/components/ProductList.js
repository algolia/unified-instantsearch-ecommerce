import React from 'react';

import { Hits } from './Hits';
import { InfiniteHits } from './InfiniteHits';

export const ProductList = (props) => {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    if (window.matchMedia('(min-width: 640px)').matches) {
      setIsMobile(false);
    }
  }, []);

  if (isMobile) {
    return <InfiniteHits {...props} />;
  }

  return <Hits {...props} />;
};
