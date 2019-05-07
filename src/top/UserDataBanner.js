import React from 'react';

import { QueryRuleCustomData } from 'react-instantsearch-dom';

const UserDataBanner = () =>
    <QueryRuleCustomData>
        {({ items }) =>
            items.map(({ banner, title, link }) => {
                if (!banner) {
                    return null;
                }

                return (
                    <a href={link} key={title}>
                        <img className="euip-Banner--content" src={banner} alt={title} />
                    </a>
                );
            })
        }
    </QueryRuleCustomData>

export default UserDataBanner;