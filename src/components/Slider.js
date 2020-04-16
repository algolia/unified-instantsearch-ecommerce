import React from 'react';
import { connectRange } from 'react-instantsearch-dom';
import Rheostat from 'rheostat';

import './Slider.scss';

export const Slider = connectRange((props) => {
  const [currentMin, setCurrentMin] = React.useState(null);
  const [currentMax, setCurrentMax] = React.useState(null);
  const { min, max } = props;

  function computeMinValue(value) {
    return Math.min(Math.max(value, props.min), props.max);
  }

  function computeMaxValue(value) {
    return Math.max(Math.min(value, props.max), props.min);
  }

  function onChange({ values }) {
    if (
      props.currentRefinement.min !== values[0] ||
      props.currentRefinement.max !== values[1]
    ) {
      let computedMin = computeMinValue(values[0]);
      let computedMax = computeMaxValue(values[1]);

      if (computedMin === computedMax && computedMin > props.min) {
        computedMin -= 1;
      } else if (computedMin === computedMax && computedMax < props.max) {
        computedMax += 1;
      }

      props.refine({
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

  if (props.min === props.max) {
    return null;
  }

  return (
    <div className="Unified-Slider">
      <div className="Unified-Slider-bar">
        <Rheostat
          className="Unified-Rheostat"
          min={props.min}
          max={props.max}
          snap={true}
          values={[props.currentRefinement.min, props.currentRefinement.max]}
          onChange={onChange}
          onValuesUpdated={onValuesUpdated}
        />
      </div>

      <div className="Unified-Slider-values">
        <div className="Unified-Slider-value Unified-Slider-value--min">
          {currentMin}
        </div>
        <div className="Unified-Slider-value Unified-Slider-value--max">
          {currentMax}
        </div>
      </div>
    </div>
  );
});
