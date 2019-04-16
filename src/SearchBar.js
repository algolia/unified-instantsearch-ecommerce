import React from 'react';

class SearchBar extends React.Component {

    render() {
        return (
            <div className="euip-searchBar">
                <div className="euip-searchBar-inner">
                    <input type="text"
                           className="euip-searchBar-input"
                           placeholder="Rechercher un produit, une marque, une catégorie…"
                           autoFocus
                    />
                </div>
            </div>
        )
    }

}

export default SearchBar;