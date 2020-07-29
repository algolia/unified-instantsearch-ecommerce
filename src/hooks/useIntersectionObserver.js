import React from 'preact/compat';

export function useIntersectionObserver({
  callback,
  root,
  rootMargin,
  threshold,
}) {
  const [node, setNode] = React.useState(null);
  const observer = React.useRef(null);

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    function onIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }

    observer.current = new IntersectionObserver(onIntersection, {
      root,
      rootMargin,
      threshold,
    });

    if (node) {
      observer.current.observe(node);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [node, root, rootMargin, threshold, callback]);

  return {
    setObservedNode: setNode,
  };
}
