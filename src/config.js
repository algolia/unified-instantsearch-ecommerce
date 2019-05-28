import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

const config = {
  appId: "E8KS2J9PMC",
  searchApiKey: "9a2480ff719c1092d2ef9ad3c6d36cf1",
  indexName: "ASOS",
  placeholderId: "euip-search-placeholder",
  querySuggestions: true,
  suggestions: {
    appId: "E8KS2J9PMC",
    searchApiKey: "9a2480ff719c1092d2ef9ad3c6d36cf1",
    indexName: "ASOS_QS",
    maxSuggestions: 10
  },
  googleAnalytics: false,
  instantSearchConfigure: {
    analytics: true,
    clickAnalytics: true,
    hitsPerPage: 20
  },
  hits: {
    render: ({ hit, trackClickOnHit }) => {
      return (
        <div className="ais-InfiniteHits-item"
          onClick={() => trackClickOnHit(
            config.indexName,
            'Click on product',
            hit.__queryID,
            hit.objectID,
            hit.__position
          )}>
          <picture className="ais-InfiniteHits-image">
            <img src={hit.image} alt={hit.name} />
          </picture>
          <section className="ais-InfiniteHits-content">
            <p className="ais-InfiniteHits-category">{hit.categories_as_list.join(' > ')}</p>
            <p className="ais-InfiniteHits-title">
              <Highlight hit={hit} attribute="name" />
            </p>
            <p className="ais-InfiniteHits-description">{hit.description}</p>
            <p className="ais-InfiniteHits-price">{`${hit.price} €`}</p>
          </section>
        </div>
      )
    },
  },
  refinements: [
    {
      type: "basic",
      attribute: "brand",
      header: "Marques",
      extra: {
        showMore: true,
        limit: 6,
        showMoreLimit: 20,
        translations: {
          showMore: expanded => expanded ? 'Voir moins' : 'Voir plus'
        }
      }
    },
    {
      type: "color",
      attribute: "color",
      header: "Couleur",
      extra: {
        limit: 14,
        showMoreLimit: 40,
        showMore: true,
        translations: { showMore: "Voir plus", showLess: "Voir moins" }
      }
    },
    {
      type: "size",
      attribute: "sizes",
      header: "Tailles",
      extra: {
        patterns: [
          "^([2-5]?X?L|XX?S|S|M)$",
          "^(EU [1-9][0-9]?|100)$",
          "^(UK [1-9][0-9]?)$"
        ],
        showMore: true,
        sortSizesByNbResults: false,
        translations: { showMore: "Voir plus", showLess: "Voir moins" }
      }
    },
    {
      type: "price",
      attribute: "price",
      header: "Prix"
    }
  ],
  sorts: [
    { indexName: "ASOS", label: "Tri: recommandé", default: true },
    { indexName: "ASOS_PRICE_ASC", label: "Tri: prix asc." },
    { indexName: "ASOS_PRICE_DESC", label: "Tri: prix desc." },
  ],
  translations: {
    refinementList: {
      brand: "Marque",
      color: "Couleur",
      size: "Taille",
      price: "Prix"
    }
  }
};

export default config;