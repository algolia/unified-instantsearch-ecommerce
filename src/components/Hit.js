import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import './Hit.scss';

export function Hit({ hit, insights }) {
  return (
    <article
      className="Unified-Hit"
      onClick={() =>
        insights('clickedObjectIDsAfterSearch', {
          eventName: 'Product Clicked',
        })
      }
    >
      <a href={`https://asos.com/${hit.url}`}>
        <header className="Unified-Hit-Header">
          <img src={hit.image} alt={hit.description} />
        </header>

        <div className="Unified-Hit-Body">
          <h2>{[hit.brand, hit.gender].filter(Boolean).join(' · ')}</h2>

          <h1>
            <Highlight attribute="description" tagName="mark" hit={hit} />
          </h1>
        </div>

        <footer className="Unified-Hit-Footer">
          <span className="Unified-Hit-Currency">£</span>
          <strong>{hit.price.toLocaleString()}</strong>{' '}
        </footer>
      </a>
    </article>
  );
}
