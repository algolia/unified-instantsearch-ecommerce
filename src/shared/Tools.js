import qs from 'qs';

import config from './../config.js';

export const createURL = ({
  query = '',
  refinementList = {},
  range = {},
  page = 1,
  sortBy,
  location,
}) => {
  const refinementsState = Object.keys(refinementList).reduce(
    (acc, currentRefinement) => {
      if (!refinementList[currentRefinement]) {
        return acc;
      }

      return {
        ...acc,
        [currentRefinement]: refinementList[currentRefinement].join('~'),
      };
    },
    {}
  );

  const rangesState = Object.keys(range).reduce((acc, currentRange) => {
    if (!range[currentRange]) {
      return acc;
    }

    return {
      ...acc,
      [`${currentRange} range`]: `${range[currentRange].min || ''}-${
        range[currentRange].max || ''
      }`,
    };
  }, {});

  const routeState = {
    query,
    ...refinementsState,
    ...rangesState,
    sortBy,
    page,
  };

  return `?${qs.stringify(routeState)}`;
};

export const urlToSearchState = ({ search }) => {
  const routeState = qs.parse(search.slice(1));
  const { query = '', page = 1, sortBy = '' } = routeState;
  const excludedParametersFromRefinement = ['query', 'page', 'sortBy'];

  let searchState = {
    query,
    page: parseInt(page),
    configure: config.searchParameters,
  };

  searchState.refinementList = Object.keys(routeState)
    .filter(
      (urlParam) =>
        excludedParametersFromRefinement.indexOf(urlParam) === -1 &&
        !urlParam.endsWith(' range')
    )
    .reduce(
      (acc, currentRefinement) => ({
        ...acc,
        [currentRefinement]: routeState[currentRefinement].split('~'),
      }),
      {}
    );

  searchState.range = Object.keys(routeState)
    .filter((urlParam) => urlParam.endsWith(' range'))
    .reduce((acc, currentRefinement) => {
      const [min, max] = routeState[currentRefinement].split('-');
      return {
        ...acc,
        [currentRefinement.match(/([\w ]*) range/)[1]]: {
          min: min || undefined,
          max: max || undefined,
        },
      };
    }, {});

  if (sortBy !== '') {
    searchState.sortBy = sortBy;
  }

  return searchState;
};

export const searchStateToUrl = ({ location }, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : '';

export const getRulesContextFromSearchState = (searchState) => {
  const { refinementList = {} } = searchState;

  return Object.keys(refinementList).reduce((all, refinementName) => {
    all = { ...all, [refinementName]: (values) => values };
    return all;
  }, {});
};
