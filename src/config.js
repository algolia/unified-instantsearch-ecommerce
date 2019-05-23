import React from 'react';

const config = {
  ALGOLIA_APP_ID: "E8KS2J9PMC",
  ALGOLIA_SEARCH_API_KEY: "9a2480ff719c1092d2ef9ad3c6d36cf1",
  INDEX_NAME: "ASOS",
  PLACEHOLDER_ID: "euip-search-placeholder",
  QUERY_SUGGESTIONS: false,
  SUGGESTIONS: {
    appID: "E8KS2J9PMC",
    apiKey: "9a2480ff719c1092d2ef9ad3c6d36cf1",
    indexName: "ASOS_QS",
    maxSuggestions: 0
  },
  GOOGLE_ANALYTICS: false,
  INSTANT_SEARCH_CONFIGURE: {
    analytics: true,
    clickAnalytics: true
  },
  HITS: {
    imageAttribute: "image",
    priceAttribute: "price",
    categoryAttribute: "",
    descriptionAttribute: "",
    titleAttribute: "name",
    currency: "£",
    render: ({ hit, trackClickOnHit }) => {
      return (
        <div className="ais-InfiniteHits-item"
          onClick={() => trackClickOnHit(
            config.INDEX_NAME,
            'Click on product',
            hit.__queryID,
            hit.objectID,
            hit.__position
          )}>
          <picture className="ais-InfiniteHits-image">
            <img src={hit[config.HITS.imageAttribute]} alt={hit[config.HITS.titleAttribute]} />
          </picture>
          <section className="ais-InfiniteHits-content">
            <p className="ais-InfiniteHits-category">{config.HITS.categoryAttribute ? hit[config.HITS.categoryAttribute] : hit.category}</p>
            <p className="ais-InfiniteHits-title">{config.HITS.titleAttribute ? hit[config.HITS.titleAttribute] : hit.title}</p>
            <p className="ais-InfiniteHits-description">{config.HITS.descriptionAttribute ? hit[config.HITS.descriptionAttribute] : hit.description}</p>
            <p className="ais-InfiniteHits-price">{`${config.HITS.priceAttribute ? hit[config.HITS.priceAttribute] : hit.price} ${config.HITS.currency}`}</p>
          </section>
        </div>
      )
    },
  },
  REFINEMENTS: [
    {
      type: "basic",
      attribute: "brand",
      header: "Marques",
      extra: {
        "searchable": true
      }
    },
    {
      type: "color",
      attribute: "color",
      header: "Couleur",
      extra: {
        limit: 14,
        showMoreLimit: 40,
        showMore: true
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
        sortSizesByNbResults: false
      }
    },
    {
      type: "price",
      attribute: "price",
      header: "Prix"
    }
  ]
};

export default config;