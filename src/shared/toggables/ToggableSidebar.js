import React from 'react';

const toggableSidebar = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                opened: false
            };
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevState.opened !== this.state.opened) {
                const globalWrapper = document.getElementById('euip-wrapper');

                if (this.state.opened) {
                    globalWrapper.classList.add('with-slidebar-open');
                } else {
                    globalWrapper.classList.remove('with-slidebar-open');
                }
            }
        }

        toggleSidebar = () => {
            this.setState(prevState => ({ opened: !prevState.opened }));
        };

        render() {
            const { triggerComponent, className } = this.props;
            const { opened } = this.state;

            return (
                <div className={`euip-SidebarPanel ${className || ''} ${opened ? 'opened' : 'closed'}`}>
                    <div className="euip-SidebarPanel-trigger" onClick={() => this.toggleSidebar()}>
                        {triggerComponent}
                    </div>
                    <div className={`euip-SidebarPanel-sidebar`}>
                        <div className="euip-SidebarPanel-inner">
                            <WrappedComponent toggleSidebar={this.toggleSidebar} />
                        </div>
                        <span className="euip-SidebarPanel-close" onClick={() => this.toggleSidebar()} />
                    </div>
                </div>
            )
        }
    }
};

export default toggableSidebar;