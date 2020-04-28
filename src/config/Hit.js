import React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';

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
          <img src={hit.image} alt={hit.name} />
        </div>

        <div className="uni-Hit-Body">
          <header className="uni-Hit-header">
            <h2 className="uni-Hit-category">{hit.categories[0]}</h2>

            <h1 className="uni-Hit-title">
              <Highlight attribute="name" tagName="mark" hit={hit} />
            </h1>
          </header>

          {view === 'list' && (
            <p className="uni-Hit-description">
              <Snippet attribute="description" tagName="mark" hit={hit} />
            </p>
          )}

          <footer>
            <span className="uni-Hit-Currency">$</span>
            <strong>{hit.price.toLocaleString()}</strong>
          </footer>
        </div>

        <div className="uni-Hit-Actions">
          <button
            title="Like this product"
            className="uni-Hit-ActionButton"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              insights('convertedObjectIDsAfterSearch', {
                eventName: 'Product Liked',
              });
            }}
          >
            <LikeIcon />
          </button>
        </div>
      </a>
    </article>
  );
}

function LikeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
