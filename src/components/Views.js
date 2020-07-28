import React from 'preact/compat';

import { IconViewGrid, IconViewList } from './Icons';

export function Views(props) {
  return (
    <ul className="uni-BodyHeader-view">
      <button
        title="Switch to grid view"
        className={[
          'uni-BodyHeader-viewButton',
          props.view === 'grid' && 'uni-BodyHeader-viewButton--active',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={props.view === 'grid'}
        onClick={() => props.setView('grid')}
      >
        <IconViewGrid />
      </button>

      <button
        title="Switch to list view"
        className={[
          'uni-BodyHeader-viewButton',
          props.view === 'list' && 'uni-BodyHeader-viewButton--active',
        ]
          .filter(Boolean)
          .join(' ')}
        disabled={props.view === 'list'}
        onClick={() => props.setView('list')}
      >
        <IconViewList />
      </button>
    </ul>
  );
}
