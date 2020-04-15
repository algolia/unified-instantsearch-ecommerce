import React from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';

import { UncontrolledSearchBox } from './SearchBox/UncontrolledSearchBox';

export const ColorList = connectRefinementList((props) => {
  const [isShowingMore, setIsShowingMore] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef(null);

  const items = isShowingMore ? props.items : props.items.slice(0, props.limit);

  return (
    <div className="ColorList ais-RefinementList">
      {props.searchable && (
        <div className="ais-RefinementList-searchBox">
          <UncontrolledSearchBox
            inputRef={inputRef}
            placeholder="Search colors…"
            query={query}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setQuery(value);
              props.searchForItems(value);
            }}
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();

              if (props.isFromSearch && props.items.length > 0) {
                props.refine(props.items[0].value);
                setQuery('');
              }

              if (inputRef.current) {
                inputRef.current.blur();
              }
            }}
            onReset={() => {
              setQuery('');
              props.searchForItems('');

              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          />
        </div>
      )}

      <ul className="ais-RefinementList-list">
        {items.map((item) => {
          const labelParts = item.label.split(';');

          if (labelParts.length !== 2) {
            throw new Error(
              'The Color widget expects colors with the following format: "Aluminium;#7f8084".'
            );
          }

          const [colorName, colorCode] = labelParts;

          return (
            <li
              key={item.label}
              className={[
                'ais-RefinementList-item',
                item.isRefined && 'ais-RefinementList-item--selected',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <label className="ais-RefinementList-label">
                <input
                  className="ais-RefinementList-checkbox"
                  style={{
                    backgroundColor: colorCode,
                  }}
                  type="checkbox"
                  value={item.value}
                  checked={item.isRefined}
                  onChange={(event) => {
                    event.preventDefault();
                    props.refine(item.value);
                  }}
                />
                <span className="ais-RefinementList-labelText">
                  {colorName}
                </span>
                <span className="ais-RefinementList-count">{item.count}</span>
              </label>
            </li>
          );
        })}
      </ul>

      {props.showMore && props.items.length > props.limit && (
        <button
          onClick={() => setIsShowingMore((prevValue) => !prevValue)}
          className="ais-RefinementList-showMore"
        >
          {isShowingMore ? '- View fewer colors' : '+ View more colors'}
        </button>
      )}
    </div>
  );
});