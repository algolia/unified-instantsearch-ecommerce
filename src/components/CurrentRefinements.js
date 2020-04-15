import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import config from '../config';

export const CurrentRefinements = connectCurrentRefinements(
  ({ items, refine }) => {
    // This reduce loops over the items
    // If the items key present then it's a currentRefinement type else it's a range
    const tags = items.reduce(
      (acc, curr) => [
        ...acc,
        ...('items' in curr
          ? [
              ...curr.items.map((refinement) => ({
                group:
                  config.translations.refinementList[curr.attribute] ||
                  curr.attribute,
                label: refinement.label.split(';')[0],
                value: refinement.value,
              })),
            ]
          : [
              {
                group:
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
                key={`${tag.group}:${tag.value}`}
              >
                <span className="ais-CurrentRefinements-label">
                  {tag.group}:
                </span>
                <span className="ais-CurrentRefinements-category">
                  <span className="ais-CurrentRefinements-categoryLabel">
                    {tag.label}
                  </span>
                  <button
                    className="ais-CurrentRefinements-delete"
                    onClick={(event) => {
                      event.preventDefault();
                      refine(tag.value);
                    }}
                  >
                    ✕
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
