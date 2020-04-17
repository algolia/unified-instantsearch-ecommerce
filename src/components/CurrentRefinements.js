import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import config from '../config';
import './CurrentRefinements.scss';

function findRefinementNameByAttribute(attribute) {
  return (
    config.refinements.find(
      (refinement) => refinement.options.attribute === attribute
    ).name || attribute
  );
}

function findRefinementTypeByAttribute(attribute) {
  return config.refinements.find(
    (refinement) => refinement.options.attribute === attribute
  ).type;
}

function getRefinement(refinement) {
  const refinementType = findRefinementTypeByAttribute(refinement.attribute);

  switch (refinementType) {
    case 'category': {
      return [
        {
          category: findRefinementNameByAttribute(refinement.attribute),
          label: refinement.currentRefinement,
          value: refinement.value,
        },
      ];
    }

    case 'color':
    case 'size':
      return refinement.items.map((item) => ({
        category: findRefinementNameByAttribute(refinement.attribute),
        label: item.label.split(';')[0],
        value: item.value,
      }));

    case 'slider': {
      let label = '';

      if (
        refinement.currentRefinement.min &&
        refinement.currentRefinement.max
      ) {
        label = `${refinement.currentRefinement.min} – ${refinement.currentRefinement.max}`;
      } else if (refinement.currentRefinement.min === undefined) {
        label = `≤ ${refinement.currentRefinement.max}`;
      } else if (refinement.currentRefinement.max === undefined) {
        label = `≥ ${refinement.currentRefinement.min}`;
      }

      return [
        {
          category: findRefinementNameByAttribute(refinement.attribute),
          label,
          value: refinement.value,
        },
      ];
    }

    default:
      return refinement.items.map((item) => ({
        category: findRefinementNameByAttribute(refinement.attribute),
        label: item.label,
        value: item.value,
      }));
  }
}

export const CurrentRefinements = connectCurrentRefinements(
  ({ items, refine }) => {
    const refinements = items.reduce((acc, current) => {
      return [...acc, ...getRefinement(current)];
    }, []);

    if (refinements.length === 0) {
      return null;
    }

    return (
      <div className="ais-CurrentRefinements">
        <ul className="ais-CurrentRefinements-list">
          {refinements.map((refinement) => {
            return (
              <li
                className="ais-CurrentRefinements-item"
                key={[refinement.category, refinement.label].join(':')}
              >
                <div className="ais-CurrentRefinements-label">
                  {refinement.category}
                </div>
                <div className="ais-CurrentRefinements-category">
                  <span className="ais-CurrentRefinements-categoryLabel">
                    {refinement.label}
                  </span>
                </div>
                <button
                  className="ais-CurrentRefinements-delete"
                  onClick={(event) => {
                    event.preventDefault();
                    refine(refinement.value);
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
