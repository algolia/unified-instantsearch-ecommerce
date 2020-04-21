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
      <a href={`https://asos.com/${hit.url}`} className="uni-Hit-inner">
        <div className="uni-Hit-image">
          <img src={hit.image} alt={hit.description} />
        </div>

        <div className="uni-Hit-Body">
          <header className="uni-Hit-header">
            <h2 className="uni-Hit-category">
              {[hit.brand, hit.gender].filter(Boolean).join(' · ')}
            </h2>

            <h1 className="uni-Hit-title">
              <Highlight attribute="description" tagName="mark" hit={hit} />
            </h1>
          </header>

          {view === 'list' && (
            <p className="uni-Hit-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse placerat lectus non dui suscipit cursus. Ut interdum
              ac nisi eget egestas.
            </p>
          )}

          <footer>
            <span className="uni-Hit-Currency">£</span>
            <strong>{hit.price.toLocaleString()}</strong>{' '}
          </footer>
        </div>
      </a>
    </article>
  );
}
