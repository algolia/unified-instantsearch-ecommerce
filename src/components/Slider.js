import React, { useState, useEffect } from 'react';
import { connectRange } from 'react-instantsearch-dom';
import {
  Slider as RCSSlider,
  Rail,
  Handles,
  Tracks,
  Ticks,
} from 'react-compound-slider';

import './Slider.scss';

function Handle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <>
      {/* Dummy element to make the tooltip draggable */}
      <div
        style={{
          position: 'absolute',
          left: `${percent}%`,
          width: 40,
          height: 25,
          transform: 'translate(-50%, -100%)',
          cursor: disabled ? 'not-allowed' : 'grab',
          zIndex: 1,
        }}
        aria-hidden={true}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        className="slider-handle"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          cursor: disabled ? 'not-allowed' : 'grab',
        }}
        {...getHandleProps(id)}
      />
    </>
  );
}

export const Slider = connectRange(
  ({ min, max, refine, currentRefinement, canRefine }) => {
    const [ticksValues, setTicksValues] = useState([
      currentRefinement.min,
      currentRefinement.max,
    ]);

    useEffect(() => {
      setTicksValues([currentRefinement.min, currentRefinement.max]);
    }, [currentRefinement]);

    const onChange = (values) => {
      refine({ min: values[0], max: values[1] });
    };

    if (
      !canRefine ||
      ticksValues[0] === undefined ||
      ticksValues[1] === undefined
    ) {
      return null;
    }

    return (
      <RCSSlider
        mode={2}
        step={1}
        domain={[min, max]}
        values={[currentRefinement.min, currentRefinement.max]}
        disabled={!canRefine}
        onChange={onChange}
        onUpdate={setTicksValues}
        rootStyle={{ position: 'relative', marginTop: '1.5rem' }}
        className="ais-RangeSlider"
      >
        <Rail>
          {({ getRailProps }) => (
            <div className="slider-rail" {...getRailProps()} />
          )}
        </Rail>

        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div>
              {tracks.map(({ id, source, target }) => (
                <div
                  key={id}
                  className="slider-track"
                  style={{
                    left: `${source.percent}%`,
                    width: `${target.percent - source.percent}%`,
                  }}
                  {...getTrackProps()}
                />
              ))}
            </div>
          )}
        </Tracks>

        <Handles>
          {({ handles, getHandleProps }) => (
            <div>
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={[min, max]}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>

        <Ticks values={ticksValues}>
          {({ ticks }) => (
            <div>
              {ticks.map(({ id, count, value, percent }) => (
                <div
                  key={id}
                  className="slider-tick"
                  style={{
                    marginLeft: `${-(100 / count) / 2}%`,
                    width: `${100 / count}%`,
                    left: `${percent}%`,
                  }}
                >
                  {value.toLocaleString()}
                </div>
              ))}
            </div>
          )}
        </Ticks>
      </RCSSlider>
    );
  }
);
