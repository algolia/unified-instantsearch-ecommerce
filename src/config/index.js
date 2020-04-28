import React from 'react';

import { Hit } from './Hit';

const config = {
  inputSelector: '#search-button',
  inputContent: (
    <>
      <span>Search for a product, brand, color, …</span> <kbd>/</kbd>
    </>
  ),
  keyboardShortcuts: ['/'],
  appId: 'latency',
  searchApiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  index: {
    indexName: 'instant_search',
    searchParameters: {
      analytics: true,
      clickAnalytics: true,
      hitsPerPage: 18,
      attributesToSnippet: ['description:25'],
    },
  },
  suggestionsIndex: {
    indexName: 'instant_search_demo_query_suggestions',
    maxSuggestions: 6,
    searchParameters: {
      hitsPerPage: 6,
    },
  },
  hitComponent: Hit,
  googleAnalytics: false,
  sorts: [
    {
      label: 'Featured',
      value: 'instant_search',
    },
    {
      label: 'Price ascending',
      value: 'instant_search_price_asc',
    },
    {
      label: 'Price descending',
      value: 'instant_search_price_desc',
    },
  ],
  refinements: [
    {
      type: 'category',
      header: 'Categories',
      name: 'Category',
      options: {
        attribute: 'categories',
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
      type: 'slider',
      header: 'Prix',
      name: 'Prix',
      options: {
        attribute: 'price',
        transformValue: (value) => (
          <>
            <span className="uni-Hit-Currency">£</span>
            {value}
          </>
        ),
      },
    },
  ],
};

export default config;
