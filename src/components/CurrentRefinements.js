import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import config from '../config.js';

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
      <div class="ais-CurrentRefinements">
        <ul class="ais-CurrentRefinements-list">
          {tags.map((tag) => {
            return (
              <li
                class="ais-CurrentRefinements-item"
                key={`${tag.group}:${tag.value}`}
              >
                <span class="ais-CurrentRefinements-label">{tag.group}:</span>
                <span class="ais-CurrentRefinements-category">
                  <span class="ais-CurrentRefinements-categoryLabel">
                    {tag.label}
                  </span>
                  <button
                    class="ais-CurrentRefinements-delete"
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
