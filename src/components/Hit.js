import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

import './Hit.scss';

export function Hit({ hit, insights, view }) {
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
        <div className="uni-Hit-image">
          <img src={hit.image} alt={hit.description} />
        </div>

        <div className="uni-Hit-Body">
          <header className="uni-Hit-Header">
            <h2>{[hit.brand, hit.gender].filter(Boolean).join(' · ')}</h2>

            <h1>
              <Highlight attribute="description" tagName="mark" hit={hit} />
            </h1>
          </header>

          {view === 'list' && (
            <p className="uni-Hit-Description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse placerat lectus non dui suscipit cursus. Ut interdum
              ac nisi eget egestas.
            </p>
          )}

          <footer className="uni-Hit-Footer">
            <span className="uni-Hit-Currency">£</span>
            <strong>{hit.price.toLocaleString()}</strong>{' '}
          </footer>
        </div>
      </a>
    </article>
  );
}
