import React from 'preact/compat';
import { connectCurrentRefinements } from 'react-instantsearch-dom';

import './CurrentRefinements.scss';
import { useAppContext } from '../hooks';

function getRefinement(refinement, config) {
  const refinementConfig = config.refinements.find((x) =>
    x.options.attributes
      ? x.options.attributes[0] === refinement.attribute
      : x.options.attribute === refinement.attribute
  );

  switch (refinementConfig.type) {
    case 'category': {
      return [
        {
          category: refinementConfig.label,
          label: refinement.currentRefinement,
          value: refinement.value,
        },
      ];
    }

    case 'color':
    case 'size': {
      return refinement.items.map((item) => ({
        category: refinementConfig.label,
        label: item.label.split(';')[0],
        value: item.value,
      }));
    }

    case 'list': {
      return refinement.items.map((item) => ({
        category: refinementConfig.label,
        label: item.label,
        value: item.value,
      }));
    }

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
          category: refinementConfig.label,
          label,
          value: refinement.value,
        },
      ];
    }

    case 'hierarchical': {
      return [
        {
          category: refinementConfig.label,
          label: refinement.currentRefinement,
          value: refinement.value,
        },
      ];
    }

    default: {
      return null;
    }
  }
}

export const CurrentRefinements = connectCurrentRefinements(
  function CurrentRefinements({ items, refine }) {
    const { config, setSearchContext } = useAppContext();

    const refinements = items.reduce((acc, current) => {
      return [...acc, ...getRefinement(current, config)];
    }, []);

    React.useEffect(() => {
      setSearchContext({
        refinementCount: refinements.length,
      });
    }, [setSearchContext, refinements.length]);

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
