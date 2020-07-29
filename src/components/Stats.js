import React from 'preact/compat';
import { connectStats } from 'react-instantsearch-dom';

export const Stats = connectStats(function Stats(props) {
  return (
    <div className="ais-Stats">
      <h1 className="ais-Stats-text">
        <span className="ais-Stats-mainText">
          {props.nbHits.toLocaleString()} products
        </span>{' '}
        found
      </h1>
    </div>
  );
});
