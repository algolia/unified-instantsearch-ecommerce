import React from 'preact/compat';
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
      <a href={hit.url} className="uni-Hit-inner">
        <div className="uni-Hit-image">
          <img src={hit.image} alt={hit.name} loading="lazy" />
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
            <span className="uni-Hit-currency">$</span>
            <span className="uni-Hit-price">{hit.price.toLocaleString()}</span>
          </footer>
        </div>

        <div className="uni-Hit-Actions">
          <button
            title="Add to cart"
            className="uni-Hit-ActionButton"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              insights('convertedObjectIDsAfterSearch', {
                eventName: 'Product Added to Cart',
              });
            }}
          >
            <CartIcon />
          </button>
        </div>
      </a>
    </article>
  );
}

function CartIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M5 1H1l0 0H5l2.7 13.4c0.2 1 1 1.6 2 1.6h9.7c1 0 1.8-0.7 2-1.6L23 6H6" />
    </svg>
  );
}
