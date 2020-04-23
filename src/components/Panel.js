import React from 'react';

import './Panel.scss';

const PanelContext = React.createContext();

function usePanelContext() {
  const context = React.useContext(PanelContext);

  if (!context) {
    throw new Error('`usePanelContext` must be used within a Panel.');
  }

  return context;
}

export function Panel({
  isOpened: initialIsOpened = true,
  header,
  footer,
  children,
  ...rest
}) {
  const [isOpened, setIsOpened] = React.useState(initialIsOpened);
  const [canRefine, setCanRefine] = React.useState(true);

  return (
    <div
      className={[
        'ais-Panel',
        'ais-Panel--collapsible',
        canRefine === false && 'ais-Panel-noRefinement',
        isOpened === false && 'ais-Panel--collapsed',
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="ais-Panel-header">
        <button
          className="ais-Panel-headerButton"
          aria-expanded={isOpened}
          onClick={() => setIsOpened((prevValue) => !prevValue)}
        >
          <div>{header}</div>

          <div className="ais-Panel-collapseButton">
            {isOpened ? (
              <svg viewBox="0 0 13 13" width={13} height={13}>
                <path fill="currentColor" d="M0 6h13v1H0z" fillRule="evenodd" />
              </svg>
            ) : (
              <svg viewBox="0 0 13 13" width={13} height={13}>
                <path
                  fill="currentColor"
                  d="M6 6V0h1v6h6v1H7v6H6V7H0V6h6z"
                  fillRule="evenodd"
                />
              </svg>
            )}
          </div>
        </button>
      </div>

      <div className="ais-Panel-body">
        <PanelContext.Provider value={{ setCanRefine }}>
          {children}
        </PanelContext.Provider>
      </div>

      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}
export const PanelWrapper = (props) => {
  const { setCanRefine } = usePanelContext();

  React.useEffect(() => {
    setCanRefine(props.canRefine);
  }, [setCanRefine, props.canRefine, props.isFromSearch]);

  return props.children;
};
