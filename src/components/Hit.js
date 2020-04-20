import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import './Hit.scss';

export function Hit({ hit, insights }) {
  return (
    <article
      className="uni-Hit"
      onClick={() =>
        insights('clickedObjectIDsAfterSearch', {
          eventName: 'Product Clicked',
        })
      }
    >
      <a href={`https://asos.com/${hit.url}`}>
        <header className="uni-Hit-Header">
          <img src={hit.image} alt={hit.description} />
        </header>

        <div className="uni-Hit-Body">
          <h2>{[hit.brand, hit.gender].filter(Boolean).join(' · ')}</h2>

          <h1>
            <Highlight attribute="description" tagName="mark" hit={hit} />
          </h1>
        </div>

        <footer className="uni-Hit-Footer">
          <span className="uni-Hit-Currency">£</span>
          <strong>{hit.price.toLocaleString()}</strong>{' '}
        </footer>
      </a>
    </article>
  );
}
