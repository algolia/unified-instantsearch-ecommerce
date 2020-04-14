import React, { Fragment } from 'react';

import { toggableSidebar } from './../shared/toggables/ToggableSidebar';
import { Refinements } from './../shared/refinements/Refinements';
import { CurrentRefinementsTags } from '../shared/CurrentRefinementsTags';

export const RefinementsSidebar = toggableSidebar(() => (
  <Fragment>
    <CurrentRefinementsTags />
    <Refinements closed={true} />
  </Fragment>
));
