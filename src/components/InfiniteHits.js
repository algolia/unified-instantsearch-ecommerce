import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';

import config from '../config.js';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { trackClickOnHit } from '../analytics';

export const InfiniteHits = connectInfiniteHits((props) => {
  const { setObservedNode } = useIntersectionObserver({
    callback: props.refineNext,
    threshold: 0,
  });

  return (
    <div className="ais-InfiniteHits">
      {props.hasPrevious && (
        <button
          className="ais-InfiniteHits-previous"
          onClick={props.refinePrevious}
        >
          Show previous
        </button>
      )}

      <ol className="ais-InfiniteHits-list">
        {props.hits.map((hit) => (
          <config.hitComponent
            key={hit.objectID}
            hit={hit}
            trackClickOnHit={trackClickOnHit}
          />
        ))}
      </ol>

      {props.hasMore && <button ref={setObservedNode}>Load more</button>}
    </div>
  );
});
