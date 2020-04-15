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
          className="ais-InfiniteHits-loadPrevious"
          onClick={props.refinePrevious}
        >
          Show previous
        </button>
      )}

      <ol className="ais-InfiniteHits-list">
        {props.hits.map((hit) => (
          <li key={hit.objectID} className="ais-InfiniteHits-item">
            <config.hitComponent hit={hit} trackClickOnHit={trackClickOnHit} />
          </li>
        ))}
      </ol>

      {props.hasMore && (
        <button ref={setObservedNode} className="ais-InfiniteHits-loadMore">
          Load more
        </button>
      )}
    </div>
  );
});
