import React from 'react';
import { Stats } from 'react-instantsearch-dom';

import config from '../config';

export const CustomStats = ({ page }) => {
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
      <Stats
        translations={{
          stats: resultsStats,
        }}
      />
      <div className="ais-Stats-page">{pageStats(page)}</div>
    </div>
  );
};
