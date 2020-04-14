import React from 'react';

const config = {
  appId: '',
  searchApiKey: '',
  indexName: '',
  placeholderId: '',
  querySuggestions: false,
  suggestions: {
    appId: '',
    searchApiKey: '',
    indexName: '',
    maxSuggestions: 10,
  },
  googleAnalytics: false,
  instantSearchConfigure: {
    analytics: true,
    clickAnalytics: true,
    hitsPerPage: 20,
  },
  hits: {
    render: ({ hit, trackClickOnHit }) => {
      return (
        <div
          className="ais-InfiniteHits-item"
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
          <picture className="ais-InfiniteHits-image">
            <img src={hit.image} alt={hit.name} />
          </picture>
          <section className="ais-InfiniteHits-content">
            <p className="ais-InfiniteHits-category">{hit.category}</p>
            <p className="ais-InfiniteHits-title">{hit.name}</p>
            <p className="ais-InfiniteHits-description">{hit.description}</p>
            <p className="ais-InfiniteHits-price">{`${hit.price} €`}</p>
          </section>
        </div>
      );
    },
  },
  refinements: [
    {
      type: 'basic',
      attribute: 'brand',
      header: 'Marques',
      extra: {
        searchable: true,
      },
    },
    {
      type: 'color',
      attribute: 'color',
      header: 'Couleur',
      extra: {
        limit: 14,
        showMoreLimit: 40,
        showMore: true,
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
      },
    },
    {
      type: 'price',
      attribute: 'price',
      header: 'Prix',
    },
  ],
  sorts: [{ indexName: '', label: 'Tri: recommandé', default: true }],
  translations: {
    refinementList: {
      brand: 'Marque',
      color: 'Couleur',
      size: 'Taille',
      price: 'Prix',
    },
  },
};

export default config;
