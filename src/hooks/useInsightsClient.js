import React from 'react';
import searchInsights from 'search-insights';

export function useInsightsClient(appId, apiKey) {
  React.useEffect(
    () =>
      searchInsights.init({
        appId,
        apiKey,
      }),

    [appId, apiKey]
  );

  return searchInsights.sendEvent;
}
