import React from 'react';

import SearchBar from "./SearchBar";
import Banner from "./Banner";

const Top = ({ displayOverlay }) => (
  <React.Fragment>
      <SearchBar displayOverlay={displayOverlay} />
      <Banner />
  </React.Fragment>
);

export default Top;