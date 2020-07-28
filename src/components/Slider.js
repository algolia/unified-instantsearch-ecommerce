import React from 'preact/compat';
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

  const computeMinValue = React.useCallback(
    function computeMinValue(value) {
      return Math.max(value, min);
    },
    [min]
  );

  const computeMaxValue = React.useCallback(
    function computeMaxValue(value) {
      return Math.min(value, max);
    },
    [max]
  );

  function onChange({ values }) {
    const nextCurrentMin = computeMinValue(values[0]);
    const nextCurrentMax = computeMaxValue(values[1]);

    if (currentMin !== nextCurrentMin) {
      setCurrentMin(nextCurrentMin);
    }

    if (currentMax !== nextCurrentMax) {
      setCurrentMax(nextCurrentMax);
    }

    refine({ min: nextCurrentMin, max: nextCurrentMax });
  }

  function onValuesUpdated({ values }) {
    setCurrentMin(computeMinValue(values[0]));
    setCurrentMax(computeMaxValue(values[1]));
  }

  React.useEffect(() => {
    setCurrentMin(computeMinValue(currentRefinement.min));
    setCurrentMax(computeMaxValue(currentRefinement.max));
  }, [
    currentRefinement.min,
    currentRefinement.max,
    setCurrentMin,
    setCurrentMax,
    computeMinValue,
    computeMaxValue,
  ]);

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
          values={[
            computeMinValue(currentRefinement.min),
            computeMaxValue(currentRefinement.max),
          ]}
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
