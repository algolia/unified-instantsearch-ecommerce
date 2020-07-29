import React from 'preact/compat';
import { connectHits } from 'react-instantsearch-dom';

import { useAppContext } from '../hooks';
import { Pagination } from './Pagination';

export const Hits = connectHits((props) => {
  const { view, ConnectedHit, topAnchor } = useAppContext();

  const onPageClick = React.useCallback(
    function onPageClick() {
      topAnchor.current.scrollTop = 0;
    },
    [topAnchor]
  );

  return (
    <div className="ais-Hits">
      <ol
        className={[
          'ais-Hits-list uni-Hits',
          view === 'grid' ? 'uni-Hits--gridView' : 'uni-Hits--listView',
        ].join(' ')}
      >
        {props.hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item uni-Hits-item">
            <ConnectedHit hit={hit} />
          </li>
        ))}
      </ol>

      <Pagination onClick={onPageClick} />
    </div>
  );
});
