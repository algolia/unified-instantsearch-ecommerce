import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

const Banner = () => {
    return (
        <QueryRuleCustomData>
            {({ items }) => {
                return items.reduce((acc, { banner, title, link }) => {
                    if (!banner) {
                        return acc;
                    }

                    if (acc.length === 0) {
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
    )
};

export default Banner;