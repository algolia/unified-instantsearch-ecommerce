import React from 'react';
import ReactDOM from 'react-dom';

class FakeSearchBar extends React.Component {
    render() {
        const { onInputClick } = this.props;

        return ReactDOM.createPortal(
            <input id="euip-fake-input" type="text" placeholder="Fake input here…" onClick={onInputClick} />,
            document.getElementById('fake-id-placeholder')
        );
    }
}

export default FakeSearchBar;