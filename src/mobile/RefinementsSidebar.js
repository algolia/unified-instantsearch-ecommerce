import React from 'react';

import toggableSidebar from './../shared/toggables/ToggableSidebar';
import Refinements from "./../shared/refinements/Refinements";

const RefinementsSidebar = () => (
    <Refinements closed={true} />
);

export default toggableSidebar(RefinementsSidebar);