import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import Rheostat from 'rheostat';

import './Slider.scss';

export const Slider = connectRange(function Slider(props) {
  const {
    min,
    max,
    currentRefinement,
    refine,
    transformValue = (x) => x,
  } = props;
  const [currentMin, setCurrentMin] = React.useState(currentRefinement.min);
  const [currentMax, setCurrentMax] = React.useState(currentRefinement.max);

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
      refine({
        min: currentMin,
        max: currentMax,
      });
    }
  }

  function onValuesUpdated({ values }) {
    setCurrentMin(computeMinValue(values[0]));
    setCurrentMax(computeMaxValue(values[1]));
  }

  // `min` and `max` values are passed as `undefined` on the first render.
  React.useEffect(() => {
    if (currentMin === undefined) {
      setCurrentMin(min);
    }

    if (currentMax === undefined) {
      setCurrentMax(max);
    }
  }, [min, max, currentMin, currentMax, setCurrentMin, setCurrentMax]);

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
});
