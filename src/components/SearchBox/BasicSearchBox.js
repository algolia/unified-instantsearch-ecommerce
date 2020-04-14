import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

export const BasicSearchBox = connectSearchBox((props) => {
  return (
    <div className="euip-searchBar">
      <div className="euip-searchBar-inner">
        <input
          type="text"
          value={props.currentRefinement}
          onChange={(event) => props.refine(event.currentTarget.value)}
          className="euip-searchBar-input"
          placeholder="Rechercher un produit, une marque…"
          autoFocus
        />
      </div>
      <span className="euip-searchBar-close" onClick={props.onClose}>
        ×
      </span>
    </div>
  );
});
