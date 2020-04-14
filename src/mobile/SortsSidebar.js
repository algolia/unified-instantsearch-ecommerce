import React from 'react';

import toggableSidebar from './../shared/toggables/ToggableSidebar';
import SortBy from './SortBy';

import config from './../config';

const SortsSidebar = ({ setSearchStateSortBy }) => (
  <SortBy
    setSearchStateSortBy={setSearchStateSortBy}
    defaultRefinement={
      config.sorts.filter((sort) => sort.default === true)[0].indexName
    }
    items={config.sorts.map((sort) => ({
      value: sort.indexName,
      label: sort.label,
    }))}
  />
);

export default toggableSidebar(SortsSidebar);
