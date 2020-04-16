const config = {
  appId: '',
  searchApiKey: '',
  indexName: '',
  inputSelector: '',
  querySuggestions: false,
  suggestions: {
    indexName: '',
    maxSuggestions: 10,
  },
  googleAnalytics: false,
  searchParameters: {
    analytics: true,
    clickAnalytics: true,
    hitsPerPage: 20,
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
