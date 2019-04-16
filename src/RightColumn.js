import React from 'react';
import { Hits } from 'react-instantsearch-dom';

class RightColumn extends React.Component {

    render() {
        return (
            <div className="euip-rightColumn">
                    <Hits />
            </div>
        )
    }

}

export default RightColumn;