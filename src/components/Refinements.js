import React from 'preact/compat';
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
      return null;
  }
}

function getPanelId(refinement) {
  return refinement.options.attributes
    ? refinement.options.attributes.join(':')
    : refinement.options.attribute;
}

export function Refinements() {
  const { config, isMobile } = useAppContext();
  const [panels, setPanels] = React.useState(
    config.refinements.reduce(
      (acc, current) => ({
        ...acc,
        [getPanelId(current)]: isMobile ? false : !current.isCollapsed,
      }),
      {}
    )
  );

  function onToggle(panelId) {
    setPanels((prevPanels) => {
      // We want to close other panels on mobile to have an accordion effect.
      const otherPanels = isMobile
        ? Object.keys(prevPanels).reduce(
            (acc, panelKey) => ({ ...acc, [panelKey]: false }),
            {}
          )
        : prevPanels;

      return {
        ...otherPanels,
        [panelId]: !prevPanels[panelId],
      };
    });
  }

  return config.refinements.map((refinement) => {
    const panelId = getPanelId(refinement);

    return (
      <Panel
        key={panelId}
        header={refinement.header}
        isOpened={panels[panelId]}
        onToggle={() => onToggle(panelId)}
      >
        <RefinementWidget type={refinement.type} {...refinement.options} />
      </Panel>
    );
  });
}
