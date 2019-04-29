import algoliasearch from "algoliasearch/lite";
import qs from "qs";
import config from './../shared/config.json';

export const searchClient = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_SEARCH_API_KEY);

export const createURL = ({ query, refinementList, page }) => {
    const refinementsState = Object.keys(refinementList).reduce((acc, currentRefinement) => {
        if (!refinementList[currentRefinement]) {
            return acc;
        }

        return { ...acc, [currentRefinement]: refinementList[currentRefinement].join('~') }
    }, { });

    const routeState = {
        query,
        ...refinementsState,
        page,
    };

    return `?${qs.stringify(routeState)}`;
};

export const urlToSearchState = ({ search }) => {
    const routeState = qs.parse(search.slice(1));
    const { query, page } = routeState;

    const refinementList = Object
        .keys(routeState)
        .filter(urlParam => urlParam !== 'query' && urlParam !== 'page')
        .reduce((acc, currentRefinement) => {
            return { ...acc, [currentRefinement]: routeState[currentRefinement].split('~') }
        }, {});

    return {
        query,
        refinementList,
        page
    };
};

export const searchStateToUrl = ({ location }, searchState) => searchState ? `${location.pathname}${createURL(searchState)}` : '';