import React from 'preact/compat';

import { useSearchContext } from '../hooks';

import { FilterIcon } from './FilterIcon';

export const FiltersButton = ({ onClick }) => {
  const { refinementCount } = useSearchContext();

  return (
    <button
      type="button"
      data-layout="mobile"
      className="uni-FiltersButton"
      onClick={onClick}
    >
      <FilterIcon />
      Filters
      {refinementCount > 0 && (
        <span className="uni-FiltersButton-Count">{refinementCount}</span>
      )}
    </button>
  );
};
