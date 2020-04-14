import React from 'react';
import { connectSortBy } from 'react-instantsearch-dom';

export const SortBy = connectSortBy((props) => {
  const [selectedItem, setSelectedItem] = React.useState(props.items[0].value);

  function onInputChanged(value) {
    props.refine(value);
    props.setSearchStateSortBy(value);
    setSelectedItem(value);
  }

  return (
    <React.Fragment>
      {props.items.map((item, idx) => (
        <div key={idx} className="euip-SortBy">
          <input
            type="radio"
            name="euip-sort"
            id={`euip-sort-${item.value}`}
            value={item.value}
            checked={selectedItem === item.value}
            onChange={() => onInputChanged(item.value)}
            className="euip-SortBy-input"
          />
          <label
            htmlFor={`euip-sort-${item.value}`}
            className="euip-SortBy-label"
          >
            {item.label}
          </label>
        </div>
      ))}
    </React.Fragment>
  );
});
