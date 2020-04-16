import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import config from '../config';
import './CurrentRefinements.scss';

export const CurrentRefinements = connectCurrentRefinements(
  ({ items, refine }) => {
    const tags = items.reduce(
      (acc, curr) => [
        ...acc,
        ...(curr.items
          ? [
              ...curr.items.map((refinement) => ({
                category:
                  config.translations.refinementList[curr.attribute] ||
                  curr.attribute,
                label: refinement.label.split(';')[0],
                value: refinement.value,
              })),
            ]
          : [
              {
                category:
                  config.translations.refinementList[curr.attribute] ||
                  curr.attribute,
                label: `${curr.currentRefinement.min || 'min'} – ${
                  curr.currentRefinement.max || 'max'
                }`,
                value: curr.value,
              },
            ]),
      ],
      []
    );

    if (tags.length === 0) {
      return null;
    }

    return (
      <div className="ais-CurrentRefinements">
        <ul className="ais-CurrentRefinements-list">
          {tags.map((tag) => {
            return (
              <li
                className="ais-CurrentRefinements-item"
                key={[tag.category, tag.label].join(':')}
              >
                <div className="ais-CurrentRefinements-label">
                  {tag.category}
                </div>
                <div className="ais-CurrentRefinements-category">
                  <span className="ais-CurrentRefinements-categoryLabel">
                    {tag.label}
                  </span>
                </div>
                <button
                  className="ais-CurrentRefinements-delete"
                  onClick={(event) => {
                    event.preventDefault();
                    refine(tag.value);
                  }}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
