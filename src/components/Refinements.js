import React from 'react';
import { RefinementList } from 'react-instantsearch-dom';

import config from '../config';
import { Panel } from './Panel';
import { ColorList } from './ColorList';
import { Slider } from './Slider';
import { SizeList } from '../SizeList';

function RefinementWidget({ type, ...props }) {
  switch (type) {
    case 'color':
      return <ColorList {...props} />;

    case 'size':
      return <SizeList {...props} />;

    case 'price':
      return <Slider {...props} />;

    default:
      return (
        <RefinementList
          translations={{
            showMore: (expanded) =>
              expanded ? '- View fewer filters' : '+ View more filters',
          }}
          {...props}
        />
      );
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
