import React from 'react';

const Column = ({ displayResults, children }) =>
    <div style={{ display: displayResults ? 'inline' : 'none' }}>{children}</div>

export default Column;