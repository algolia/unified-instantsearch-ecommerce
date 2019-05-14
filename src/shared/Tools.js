import algoliasearch from "algoliasearch/lite";
import qs from "qs";

import config from './../config.json';

export const searchClient = algoliasearch(config.ALGOLIA_APP_ID, config.ALGOLIA_SEARCH_API_KEY);

export const createURL = ({ query, refinementList, page, location }) => {
    const refinementsState = Object.keys(refinementList).reduce((acc, currentRefinement) => {
        if (!refinementList[currentRefinement]) {
            return acc;
        }

        return { ...acc, [currentRefinement]: refinementList[currentRefinement].join('~') }
    }, { });

    const routeState = {
        query,
        ...refinementsState,
        page
    };

    return `?${qs.stringify(routeState)}`;
};

export const urlToSearchState = ({ search }) => {
    const routeState = qs.parse(search.slice(1));
    const { query = '', page = 1  } = routeState;

    const excludedParametersFromRefinement = ['query', 'page'];

    const refinementList = Object
        .keys(routeState)
        .filter(urlParam => excludedParametersFromRefinement.indexOf(urlParam) === -1)
        .reduce((acc, currentRefinement) => ({ ...acc, [currentRefinement]: routeState[currentRefinement].split('~') }), {});

    return {
        query,
        refinementList,
        page: parseInt(page),
        configure: config.INSTANT_SEARCH_CONFIGURE
    };
};

export const searchStateToUrl = ({ location }, searchState) => searchState ? `${location.pathname}${createURL(searchState)}` : '';

export const getRulesContextFromSearchState = searchState => {
    const { refinementList }  = searchState;

    return Object.keys(refinementList).reduce((all, refinementName) => {
        all = {...all, [`${refinementName}`]: values => values};

        return all;
    }, { });
};

export const shouldDisplayOverlayAtLaunch = searchState => {
    const { query, refinementList, page } = searchState;

    if (typeof page === 'undefined') {
        return false
    }

    if ((typeof query === 'undefined' || !query.trim().length)
        && (typeof refinementList === 'undefined' || !Object.keys(refinementList).length)) {
        return false;
    }

    return true;
};