import React, { Fragment } from 'react';

import toggableSidebar from './../shared/toggables/ToggableSidebar';
import Refinements from './../shared/refinements/Refinements';
import CurrentRefinementsTags from '../shared/CurrentRefinementsTags';

const RefinementsSidebar = () => (
  <Fragment>
    <CurrentRefinementsTags />
    <Refinements closed={true} />
  </Fragment>
);

export default toggableSidebar(RefinementsSidebar);
