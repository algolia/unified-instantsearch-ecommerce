import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

import './Banner.scss';

export const Banner = () => {
  return (
    <QueryRuleCustomData>
      {({ items }) => {
        return items.map(({ banner, title, link }) => {
          if (!banner) {
            return null;
          }

          return (
            <div className="Unified-Banner" key={banner}>
              <a href={link}>
                <img src={banner} alt={title} />
              </a>
            </div>
          );
        });
      }}
    </QueryRuleCustomData>
  );
};
