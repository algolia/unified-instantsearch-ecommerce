import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';
import GroupSizeRefinementList from 'instantsearch-group-size-refinement-list-react';

import config from '../config';
import { Panel } from './Panel';
import { ColorList } from './ColorList';
import { Slider } from './Slider';

function RefinementWidget({ type, ...props }) {
  switch (type) {
    case 'basic':
      return <RefinementList {...props} />;

    case 'color':
      return <ColorList {...props} />;

    case 'size':
      return (
        <GroupSizeRefinementList
          {...props}
          patterns={props.patterns.map((pattern) => new RegExp(pattern))}
        />
      );

    case 'price':
      return <Slider {...props} />;

    default:
      throw new Error(`The refinement type "${type}" does not exist.`);
  }
}

export const Refinements = () => {
  return config.refinements.map((refinement) => (
    <Panel
      key={refinement.options.attribute}
      header={refinement.header}
      isOpened={!refinement.isCollapsed}
    >
      <RefinementWidget type={refinement.type} {...refinement.options} />
    </Panel>
  ));
};
