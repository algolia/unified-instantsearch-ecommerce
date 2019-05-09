import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

const UserDataBanner = ({ toggleResults }) =>
    <QueryRuleCustomData>
        {({ items }) => {
            if (!items.length)
                toggleResults(true)
            return items.map(({ banner, title, link, displaySearchResults }) => {
                if (!banner) {
                    return null;
                }

                toggleResults(displaySearchResults !== undefined ? displaySearchResults : true)

                return (
                    <a href={link} key={title}>
                        <img className="euip-Banner--content" src={banner} alt={title} />
                    </a>
                );
            })
        }}
    </QueryRuleCustomData>

export default UserDataBanner;