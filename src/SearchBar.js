import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBar = ({ currentRefinement, refine }) => (
    <div className="euip-searchBar">
        <div className="euip-searchBar-inner">
            <input type="text"
                   value={currentRefinement}
                   onChange={e => refine(e.currentTarget.value)}
                   className="euip-searchBar-input"
                   placeholder="Rechercher un produit, une marque, une catégorie…"
                   autoFocus
            />
        </div>
    </div>
);

export default connectSearchBox(SearchBar);