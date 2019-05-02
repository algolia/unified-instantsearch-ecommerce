import searchInsights from 'search-insights';

import config from "../config";

export const initAnalytics = () => {
    searchInsights.init({
        appId: config.ALGOLIA_APP_ID,
        apiKey: config.ALGOLIA_SEARCH_API_KEY
    });
};

export const trackClickOnHit = (indexName, eventName, queryID, objectID, position) => {
    searchInsights.clickedObjectIDsAfterSearch({
        index: indexName,
        eventName: eventName,
        queryID: queryID,
        objectIDs: [objectID],
        positions: [position],
    })
};