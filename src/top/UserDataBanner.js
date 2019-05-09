import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

const UserDataBanner = ({ toggleResults }) =>
    <QueryRuleCustomData>
        {({ items }) => {
            if (!items.length)
                toggleResults(true)
            return items.reduce((acc, { banner, title, link, displaySearchResults }) => {
                if (!banner) {
                    return acc;
                }

                if (acc.length === 0) {
                    toggleResults(displaySearchResults !== undefined ? displaySearchResults : true)

                    acc.push(
                        <a href={link} key={title}>
                            <img className="euip-Banner--content" src={banner} alt={title} />
                        </a>
                    );
                }
                return acc
            }, [])
        }}
    </QueryRuleCustomData>

export default UserDataBanner;