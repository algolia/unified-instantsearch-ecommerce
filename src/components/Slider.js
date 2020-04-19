import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import Rheostat from 'rheostat';

import './Slider.scss';

export const Slider = connectRange(
  ({ min, max, currentRefinement, refine, transformValue = (x) => x }) => {
    const [currentMin, setCurrentMin] = React.useState(null);
    const [currentMax, setCurrentMax] = React.useState(null);

    function computeMinValue(value) {
      return Math.min(Math.max(value, min), max);
    }

    function computeMaxValue(value) {
      return Math.max(Math.min(value, max), min);
    }

    function onChange({ values }) {
      if (
        currentRefinement.min !== values[0] ||
        currentRefinement.max !== values[1]
      ) {
        let computedMin = computeMinValue(values[0]);
        let computedMax = computeMaxValue(values[1]);

        if (computedMin === computedMax && computedMin > min) {
          computedMin -= 1;
        } else if (computedMin === computedMax && computedMax < max) {
          computedMax += 1;
        }

        refine({
          min: computedMin,
          max: computedMax,
        });
      }
    }

    function onValuesUpdated({ values }) {
      setCurrentMin(computeMinValue(values[0]));
      setCurrentMax(computeMaxValue(values[1]));
    }

    // `min` and `max` values are passed as `undefined` on the first render.
    React.useEffect(() => {
      setCurrentMin(min);
      setCurrentMax(max);
    }, [min, max]);

    if (min === max) {
      return null;
    }

    return (
      <div className="uni-Slider">
        <div className="uni-Slider-bar">
          <Rheostat
            className="uni-Rheostat"
            min={min}
            max={max}
            snap={true}
            values={[currentRefinement.min, currentRefinement.max]}
            onChange={onChange}
            onValuesUpdated={onValuesUpdated}
          />
        </div>

        <div className="uni-Slider-values">
          <div className="uni-Slider-value uni-Slider-value--min">
            {transformValue(currentMin)}
          </div>
          <div className="uni-Slider-value uni-Slider-value--max">
            {transformValue(currentMax)}
          </div>
        </div>
      </div>
    );
  }
);
