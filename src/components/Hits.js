import React from 'react';
import { connectHits, Pagination } from 'react-instantsearch-dom';

import { useAppContext } from '../hooks';

export const Hits = connectHits(function Hits(props) {
  const { view } = useAppContext();

  return (
    <div className="ais-Hits">
      <ol
        className={[
          'ais-Hits-list',
          view === 'grid' ? 'uni-Hits--gridView' : 'uni-Hits--listView',
        ].join(' ')}
      >
        {props.hits.map((hit) => (
          <li key={hit.objectID} className="ais-Hits-item">
            <props.hitComponent hit={hit} view={view} />
          </li>
        ))}
      </ol>

      <Pagination
        showFirst={false}
        padding={2}
        translations={{
          previous: (
            <svg width={10} height={10} viewBox="0 0 10 10">
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.143"
              >
                <path d="M9 5H1M5 9L1 5l4-4" />
              </g>
            </svg>
          ),
          next: (
            <svg width={10} height={10} viewBox="0 0 10 10">
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.143"
              >
                <path d="M1 5h8M5 9l4-4-4-4" />
              </g>
            </svg>
          ),
        }}
      />
    </div>
  );
});
