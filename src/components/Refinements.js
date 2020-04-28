import React from 'react';
import {
  RefinementList,
  HierarchicalMenu,
  Menu,
} from 'react-instantsearch-dom';

import { useAppContext } from '../hooks';
import { Panel } from './Panel';
import { ColorList } from './ColorList';
import { Slider } from './Slider';
import { SizeList } from './SizeList';

function RefinementWidget({ type, ...props }) {
  switch (type) {
    case 'color':
      return <ColorList {...props} />;

    case 'size':
      return <SizeList {...props} />;

    case 'slider':
      return <Slider {...props} />;

    case 'list':
      return (
        <RefinementList
          translations={{
            showMore: (expanded) =>
              expanded ? '- View fewer filters' : '+ View more filters',
          }}
          {...props}
        />
      );

    case 'category':
      return (
        <Menu
          translations={{
            showMore: (expanded) =>
              expanded ? '- View fewer categories' : '+ View more categories',
          }}
          {...props}
        />
      );

    case 'hierarchical':
      return (
        <HierarchicalMenu
          translations={{
            showMore: (expanded) =>
              expanded ? '- View fewer categories' : '+ View more categories',
          }}
          {...props}
        />
      );

    default:
      throw new Error(`The refinement type "${type}" is not supported.`);
  }
}

export const Refinements = () => {
  const { config, isMobile } = useAppContext();

  return config.refinements.map((refinement) => (
    <Panel
      key={
        refinement.options.attributes
          ? refinement.options.attributes.join(':')
          : refinement.options.attribute
      }
      header={refinement.header}
      isOpened={isMobile ? false : !refinement.isCollapsed}
    >
      <RefinementWidget type={refinement.type} {...refinement.options} />
    </Panel>
  ));
};
