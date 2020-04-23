import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';

import { useAppContext, useIntersectionObserver } from '../hooks';

export const InfiniteHits = connectInfiniteHits((props) => {
  const { view, ConnectedHit } = useAppContext();
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

      <ol
        className={[
          'ais-InfiniteHits-list',
          view === 'grid' ? 'uni-Hits--gridView' : 'uni-Hits--listView',
        ].join(' ')}
      >
        {props.hits.map((hit) => (
          <li key={hit.objectID} className="ais-InfiniteHits-item">
            <ConnectedHit hit={hit} />
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
