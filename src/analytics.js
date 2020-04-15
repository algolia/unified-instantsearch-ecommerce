import searchInsights from 'search-insights';

import config from './config';

export const initAnalytics = () => {
  searchInsights.init({
    appId: config.appId,
    apiKey: config.searchApiKey,
  });
};

export const trackClickOnHit = (
  indexName,
  eventName,
  queryID,
  objectID,
  position
) => {
  searchInsights.clickedObjectIDsAfterSearch({
    index: indexName,
    eventName,
    queryID,
    objectIDs: [objectID],
    positions: [position],
  });
};
