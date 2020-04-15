import React from 'react';
import { connectStats } from 'react-instantsearch-dom';

export const Stats = connectStats((props) => {
  return (
    <div className="ais-Stats">
      <span className="ais-Stats-text">
        <span className="ais-Stats-mainText">
          {props.nbHits.toLocaleString()} products
        </span>{' '}
        found
      </span>
    </div>
  );
});
