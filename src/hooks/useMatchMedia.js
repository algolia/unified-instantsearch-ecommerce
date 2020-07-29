import React from 'preact/compat';

export function useMatchMedia(config) {
  const [isMobile, setIsMobile] = React.useState(
    () =>
      !window.matchMedia(`(min-width: ${config.styles.breakpoints.md}px)`)
        .matches
  );

  React.useEffect(() => {
    function onChange(event) {
      setIsMobile(!event.matches);
    }

    const mediaQuery = window.matchMedia(
      `(min-width: ${config.styles.breakpoints.md}px)`
    );

    mediaQuery.addListener(onChange);

    return () => {
      mediaQuery.removeListener(onChange);
    };
  }, [config.styles.breakpoints.md]);

  return { isMobile };
}
