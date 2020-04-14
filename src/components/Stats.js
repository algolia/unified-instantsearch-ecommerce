import React from 'react';
import { Stats as DefaultStats } from 'react-instantsearch-dom';

import config from '../config';

export const Stats = ({ page = 1 }) => {
  const resultsStats =
    config.translations && config.translations.resultsStats
      ? config.translations.resultsStats
      : (nbHits, timeSpentMS) => `${nbHits} results found in ${timeSpentMS} ms`;
  const pageStats =
    config.translations && config.translations.pageStats
      ? config.translations.pageStats
      : (page) => `Page: ${page}`;

  return (
    <div className="euip-Stats">
      <DefaultStats
        translations={{
          stats: resultsStats,
        }}
      />

      <div className="ais-Stats-page">{pageStats(page)}</div>
    </div>
  );
};
