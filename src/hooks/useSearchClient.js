import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import { version } from '../version';
import {
  NO_RESULTS_INDEX_NAME,
  QUERY_SUGGESTIONS_INDEX_NAME,
} from '../constants';

export function useSearchClient(config) {
  const appId = config.appId;
  const apiKey = config.searchApiKey;
  const searchClient = React.useMemo(() => {
    const client = algoliasearch(appId, apiKey);
    client.addAlgoliaAgent(`unified-ui (${version})`);

    return {
      ...client,
      search(requests) {
        const modifiedRequests = requests.map((searchParameters) => {
          // In React InstantSearch, `Index` components inherit search
          // parameters from their parents. However, when displaying results
          // for result suggestions or query suggestions, we want to reset these
          // search parameters because we expect different results.
          // We cannot reset these search parameters with React components, we
          // need to use a client proxy.
          if (searchParameters.indexName === NO_RESULTS_INDEX_NAME) {
            return {
              ...searchParameters,
              indexName: config.index.indexName,
              params: {
                ...searchParameters.params,
                facetFilters: [],
              },
            };
          } else if (
            searchParameters.indexName === QUERY_SUGGESTIONS_INDEX_NAME
          ) {
            return {
              ...searchParameters,
              indexName: config.suggestionsIndex.indexName,
              params: {
                ...searchParameters.params,
                facetFilters: [],
              },
            };
          }

          return searchParameters;
        });

        return client.search(modifiedRequests);
      },
    };
  }, [
    appId,
    apiKey,
    config.index.indexName,
    config.suggestionsIndex.indexName,
  ]);

  return searchClient;
}
