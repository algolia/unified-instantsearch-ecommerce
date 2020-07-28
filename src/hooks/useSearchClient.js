import React from 'preact/compat';
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
    client.addAlgoliaAgent(`unified-ecommerce (${version})`);

    return {
      ...client,
      search(requests) {
        const modifiedRequests = requests.map((searchParameters) => {
          const detachedSearchParams = {
            ...searchParameters.params,
            page: 0,
            facetFilters: [],
            numericFilters: [],
            optionalFilters: [],
            tagFilters: [],
          };

          // In React InstantSearch, `Index` components inherit search
          // parameters from their parents. However, when displaying results
          // for result suggestions or Query Suggestions, we want to reset these
          // search parameters because we expect different results.
          // We cannot reset these search parameters with React components, we
          // need to use a client proxy.
          if (searchParameters.indexName === NO_RESULTS_INDEX_NAME) {
            return {
              ...searchParameters,
              indexName: config.index.indexName,
              params: detachedSearchParams,
            };
          } else if (
            searchParameters.indexName === QUERY_SUGGESTIONS_INDEX_NAME
          ) {
            if (!config.suggestionsIndex) {
              throw new Error(
                'A search request was sent to the Query Suggestions index but the index name is not specified in the user configuration (`suggestionsIndex.indexName`).'
              );
            }

            return {
              ...searchParameters,
              indexName: config.suggestionsIndex.indexName,
              params: detachedSearchParams,
            };
          }

          return searchParameters;
        });

        return client.search(modifiedRequests);
      },
    };
  }, [appId, apiKey, config.index.indexName, config.suggestionsIndex]);

  return searchClient;
}
