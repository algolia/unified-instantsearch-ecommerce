import React from 'react';
import algoliasearch from 'algoliasearch/lite';

import { version } from '../version';

export function useSearchClient(appId, apiKey) {
  const searchClient = React.useMemo(() => {
    const client = algoliasearch(appId, apiKey);
    client.addAlgoliaAgent(`unified-ui (${version})`);

    return client;
  }, [appId, apiKey]);

  return searchClient;
}
