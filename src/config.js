import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

const config = {
  appId: 'E8KS2J9PMC',
  searchApiKey: '9a2480ff719c1092d2ef9ad3c6d36cf1',
  indexName: 'mika_asos',
  inputSelector: '#search-button',
  suggestions: {
    indexName: 'mika_asos_qs',
    maxSuggestions: 6,
  },
  googleAnalytics: false,
  searchParameters: {
    analytics: true,
    clickAnalytics: true,
    hitsPerPage: 18,
  },
  hitComponent: Hit,
  refinements: [
    {
      type: 'basic',
      attribute: 'brand',
      header: 'Marques',
      extra: {
        searchable: true,
        showMore: true,
        limit: 6,
        showMoreLimit: 20,
        translations: {
          showMore: (expanded) =>
            expanded ? '- View fewer filters' : '+ View more filters',
        },
      },
    },
    {
      type: 'color',
      attribute: 'colors',
      header: 'Couleur',
      extra: {
        limit: 14,
        searchable: true,
        showMoreLimit: 40,
        showMore: true,
        translations: {
          showMore(expanded) {
            return expanded ? '- View fewer filters' : '+ View more filters';
          },
        },
      },
    },
    {
      type: 'size',
      attribute: 'sizes',
      header: 'Tailles',
      extra: {
        patterns: [
          '^([2-5]?X?L|XX?S|S|M)$',
          '^(EU [1-9][0-9]?|100)$',
          '^(UK [1-9][0-9]?)$',
        ],
        showMore: true,
        sortSizesByNbResults: false,
        translations: {
          showMore(expanded) {
            return expanded ? '- View fewer filters' : '+ View more filters';
          },
        },
      },
    },
    {
      type: 'price',
      attribute: 'price',
      header: 'Prix',
    },
  ],
  sorts: [
    { value: 'mika_asos', label: 'Produits recommandés' },
    { value: 'mika_asos_price_asc', label: 'Prix croissant' },
    { value: 'mika_asos_price_desc', label: 'Prix décroissant' },
  ],
  translations: {
    sortTitle: 'Trier',
    refinementTitle: 'Filtrer',
    refinementList: {
      brand: 'Marque',
      color: 'Couleur',
      size: 'Taille',
      price: 'Prix',
    },
  },
};

function Hit({ hit, trackClickOnHit }) {
  return (
    <article
      className="hit"
      onClick={() =>
        trackClickOnHit(
          config.indexName,
          'Click on product',
          hit.__queryID,
          hit.objectID,
          hit.__position
        )
      }
    >
      <header className="hit-header">
        <img src={hit.image} alt={hit.description} className="hit-image" />
      </header>

      <div className="hit-body">
        <div className="hit-category">
          {hit.brand} · {hit.gender}
        </div>

        <h1>
          <Highlight attribute="description" tagName="mark" hit={hit} />
        </h1>
      </div>

      <footer className="hit-footer">
        <span className="hit-currency">£</span>
        <strong>{hit.price.toLocaleString()}</strong>{' '}
      </footer>
    </article>
  );
}

export default config;
