import React from 'react';

import { connectRange } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import Rheostat from "rheostat";

class RangeSlider extends React.Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        currentRefinement: PropTypes.object,
        refine: PropTypes.func.isRequired,
        canRefine: PropTypes.bool.isRequired
    };

    state = { currentValues: { min: this.props.min, max: this.props.max } };

    componentWillReceiveProps(sliderState) {
        if (sliderState.canRefine) {
            if (sliderState.currentRefinement.min > sliderState.currentRefinement.max)
                sliderState.currentRefinement.min = sliderState.currentRefinement.max - 1
            this.setState({
                currentValues: {
                    min: sliderState.currentRefinement.min,
                    max: sliderState.currentRefinement.max
                }
            });
        }
    }

    onValuesUpdated = sliderState => {
        this.setState({
            currentValues: {
                min: Math.max(sliderState.values[0], this.props.min),
                max: Math.min(sliderState.values[1], this.props.max)
            }
        });
    };

    onChange = sliderState => {
        if (sliderState.values[0] > sliderState.values[1])
            sliderState.values.reverse()

        if (
            this.props.currentRefinement.min !== Math.max(sliderState.values[0], this.props.min) ||
            this.props.currentRefinement.max !== Math.min(sliderState.values[1], this.props.max)
        ) {
            this.props.refine({
                min: sliderState.values[0],
                max: sliderState.values[1]
            });
        }
    };

    render() {
        const { min, max, currentRefinement } = this.props;
        const { currentValues } = this.state;
        return min !== max ? (
            <div className="ais-RangeSlider-wrapper">
                <div className="value">{currentValues.min}</div>
                <Rheostat
                    className="ais-RangeSlider"
                    min={min}
                    max={max}
                    snap={true}
                    values={[currentRefinement.min, currentRefinement.max]}
                    onChange={this.onChange}
                    onValuesUpdated={this.onValuesUpdated}
                />
                <div className="value">{currentValues.max}</div>
            </div>
        ) : (
                <div className="ais-RefinementList-item">No range to display.</div>
            );
    }
}

export default connectRange(RangeSlider)