import qs from 'qs';

function removeEmptyValues(object) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (
      value === '' ||
      (key === 'refinementList' &&
        Object.values(value).every((x) => x === '')) ||
      (key === 'page' && value === 1)
    ) {
      return acc;
    }

    acc[key] = value;

    return acc;
  }, {});
}

export const createURL = (searchState) => {
  const { configure, indices, ...state } = removeEmptyValues(searchState);

  if (state.page === 1) {
    delete state.page;
  }

  return `?${qs.stringify(state)}`;
};

export const getUrlFromState = ({ location }, searchState) => {
  return searchState ? `${location.pathname}${createURL(searchState)}` : '';
};

export const getStateFromUrl = ({ search }) => {
  return search ? qs.parse(search.slice(1)) : {};
};
