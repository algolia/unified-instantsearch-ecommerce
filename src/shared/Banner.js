import React from 'react';
import { QueryRuleCustomData } from 'react-instantsearch-dom';

class Banner extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    return (
      <QueryRuleCustomData>
        {({ items }) => {
          return items.map(({ banner, title, link }, idx) => {
            if (!banner) {
              return null;
            }

            return (
              <a href={link} key={idx}>
                <img
                  className="euip-Banner--content"
                  src={banner}
                  alt={title}
                />
              </a>
            );
          });
        }}
      </QueryRuleCustomData>
    );
  }
}

export default Banner;
