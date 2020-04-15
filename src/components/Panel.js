import React from 'react';

export function Panel({
  isOpened: initialIsOpened = true,
  header,
  footer,
  children,
  ...rest
}) {
  const [isOpened, setIsOpened] = React.useState(initialIsOpened);

  return (
    <div
      className={[
        'ais-Panel',
        'ais-Panel--collapsible',
        isOpened === false && 'ais-Panel--collapsed',
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="ais-Panel-header">
        <span>{header}</span>

        <button
          className="ais-Panel-collapseButton"
          aria-expanded={isOpened}
          onClick={() => setIsOpened((prevValue) => !prevValue)}
        >
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
        </button>
      </div>

      <div className="ais-Panel-body">{children}</div>

      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}
