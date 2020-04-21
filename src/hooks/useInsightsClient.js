import React from 'react';
import searchInsights from 'search-insights';

export function useInsightsClient(appId, apiKey) {
  React.useEffect(() => {
    searchInsights.init({
      appId,
      apiKey,
    });
  }, [appId, apiKey]);

  // When Search Insights is available on the global scope (`window.aa`), it
  // it's wrapped in a "functional interface" that calls the right method
  // with the passed arguments.
  // Since we use the ESM import to avoid users to load the library on their
  // page, we need to wrap the methods calls in a similar functional interface.
  // See https://github.com/algolia/search-insights.js/blob/76f8bcd6f0ff711465ea5eddf9852045352675e2/lib/_getFunctionalInterface.ts
  return (functionName, ...functionArguments) => {
    if (functionName && typeof searchInsights[functionName] === 'function') {
      searchInsights[functionName](...functionArguments);
    }
  };
}
