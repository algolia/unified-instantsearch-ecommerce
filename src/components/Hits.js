import React from 'react';
import { connectHits, Pagination } from 'react-instantsearch-dom';

import config from '../config';
import { trackClickOnHit } from '../analytics';

export const Hits = connectHits((props) => {
  return (
    <div className="ais-Hits">
      <ol className="ais-Hits-list">
        {props.hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <config.hitComponent hit={hit} trackClickOnHit={trackClickOnHit} />
          </li>
        ))}
      </ol>

      <Pagination padding={2} />
    </div>
  );
});
