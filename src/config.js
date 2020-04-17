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
      type: 'category',
      header: 'Categories',
      name: 'Category',
      options: {
        attribute: 'category',
        searchable: true,
        showMore: true,
        limit: 6,
        showMoreLimit: 20,
      },
    },
    {
      header: 'Brands',
      name: 'Brand',
      options: {
        attribute: 'brand',
        searchable: true,
        showMore: true,
        limit: 6,
        showMoreLimit: 20,
        translations: {
          showMore: (expanded) =>
            expanded ? '- View fewer brands' : '+ View more brands',
        },
      },
    },
    {
      type: 'color',
      header: 'Colors',
      name: 'Color',
      options: {
        attribute: 'colors',
        searchable: true,
      },
    },
    {
      type: 'size',
      header: 'Sizes',
      name: 'Size',
      isCollapsed: true,
      options: {
        attribute: 'sizes',
      },
    },
    {
      type: 'slider',
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
