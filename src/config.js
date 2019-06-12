import React from 'react';
import { Highlight } from 'react-instantsearch-dom';

const config = {
  appId: "E8KS2J9PMC",
  searchApiKey: "9a2480ff719c1092d2ef9ad3c6d36cf1",
  indexName: "mika_asos",
  placeholderId: "euip-search-placeholder",
  querySuggestions: true,
  suggestions: {
    appId: "E8KS2J9PMC",
    searchApiKey: "9a2480ff719c1092d2ef9ad3c6d36cf1",
    indexName: "mika_asos_qs",
    maxSuggestions: 10
  },
  googleAnalytics: false,
  instantSearchConfigure: {
    analytics: true,
    clickAnalytics: true,
    hitsPerPage: 18
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
            <img src={hit.image} alt={hit.description} />
          </picture>
          <section className="ais-InfiniteHits-content">
            <p className="ais-InfiniteHits-category">{hit.category}</p>
            <p className="ais-InfiniteHits-title">
              <Highlight hit={hit} attribute="description" />
            </p>
            <p className="ais-InfiniteHits-description">{hit.gender}</p>
            <p className="ais-InfiniteHits-price">{`${hit.amount}`}</p>
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
      attribute: "colors",
      header: "Couleur",
      extra: {
        limit: 14,
        showMoreLimit: 40,
        showMore: true,
        translations: {
          showMore(expanded) {
            return expanded ? 'Voir moins' : 'Voir plus';
          }
        }
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
        translations: {
          showMore(expanded) {
            return expanded ? 'Voir moins' : 'Voir plus';
          }
        }
      }
    },
    {
      type: "price",
      attribute: "price",
      header: "Prix"
    }
  ],
  sorts: [
    { indexName: "mika_asos", label: "Produits recommandés", default: true },
    { indexName: "mika_asos_price_asc", label: "Prix croissant" },
    { indexName: "mika_asos_price_desc", label: "Prix décroissant" },
  ],
  translations: {
    resultsStats: (nbHits, timeSpentMS) => `${nbHits} results found in ${timeSpentMS} ms`,
    pageStats: (page) => `Page: ${page}`,
    showPrevious: (prevPage) => `Afficher la page ${prevPage}`,
    sortTitle: "Trier",
    refinementTitle: "Filtrer",
    refinementList: {
      brand: "Marque",
      color: "Couleur",
      size: "Taille",
      price: "Prix"
    }
  }
};

export default config;