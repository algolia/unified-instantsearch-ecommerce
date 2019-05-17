import React from 'react';

import toggableSidebar from './ToggableSidebar';
import LeftColumn from "../left-column/LeftColumn";

const RefinementsSidebar = () => (
    <LeftColumn closed={true} />
);

export default toggableSidebar(RefinementsSidebar);