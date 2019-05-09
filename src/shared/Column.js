import React from 'react';

const Column = (props) => {
    const reactChildren = React.Children.map(props.children, child => {
        return React.cloneElement(child, { ...props });
    });
    return (<div style={{ display: props.displayResults ? 'inline' : 'none' }}>
        {reactChildren}
    </div>)
}

export default Column;