import React from 'react';

export const toggableSidebar = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        opened: false,
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
      this.setState((prevState) => ({ opened: !prevState.opened }));
    };

    render() {
      const { triggerComponent, className, title } = this.props;
      const { opened } = this.state;

      return (
        <div
          className={`euip-SidebarPanel ${className || ''} ${
            opened ? 'opened' : 'closed'
          }`}
        >
          <div
            className="euip-SidebarPanel-trigger"
            onClick={() => this.toggleSidebar()}
          >
            {triggerComponent}
          </div>
          <div className={`euip-SidebarPanel-sidebar`}>
            <div className="euip-SidebarPanel-inner">
              <div className="euip-SidebarPanel-title">{title}</div>
              <WrappedComponent
                {...this.props}
                toggleSidebar={this.toggleSidebar}
              />
            </div>
            <span
              className="euip-SidebarPanel-close"
              onClick={() => this.toggleSidebar()}
            >
              ×
            </span>
            <span
              className="euip-SidebarPanel-fill-close"
              onClick={() => this.toggleSidebar()}
            ></span>
          </div>
        </div>
      );
    }
  };
};
