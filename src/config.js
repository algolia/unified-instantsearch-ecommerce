import React from 'react';

const config = {
  inputSelector: '#search-button',
  appId: 'E8KS2J9PMC',
  searchApiKey: '9a2480ff719c1092d2ef9ad3c6d36cf1',
  index: {
    indexName: 'mika_asos',
    searchParameters: {
      analytics: true,
      clickAnalytics: true,
      hitsPerPage: 18,
    },
  },
  suggestionsIndex: {
    indexName: 'mika_asos_qs',
    maxSuggestions: 6,
    searchParameters: {
      hitsPerPage: 6,
    },
  },
  googleAnalytics: false,
  sorts: [
    { value: 'mika_asos', label: 'Produits recommandés' },
    { value: 'mika_asos_price_asc', label: 'Prix croissant' },
    { value: 'mika_asos_price_desc', label: 'Prix décroissant' },
  ],
  refinements: [
    {
      header: 'Brands',
      name: 'Brand',
      options: {
        attribute: 'brand',
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
      header: 'Colors',
      name: 'Color',
      options: {
        attribute: 'colors',
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
      header: 'Sizes',
      name: 'Size',
      isCollapsed: true,
      options: {
        attribute: 'sizes',
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
      header: 'Prix',
      name: 'Prix',
      options: {
        attribute: 'price',
        transformValue: (value) => (
          <>
            <span className="Unified-Hit-Currency">£</span>
            {value}
          </>
        ),
      },
    },
  ],
};

export default config;
