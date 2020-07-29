import React from 'preact/compat';

import { getAttributeValueByPath, parseAttribute } from '../utils';

export function ReverseHighlight({
  hit,
  attribute,
  tagName = 'mark',
  ...rest
}) {
  let parts = [];

  try {
    parts = parseReverseHighlightedAttribute({
      hit,
      attribute,
      highlightPreTag: `<ais-highlight-0000000000>`,
      highlightPostTag: `</ais-highlight-0000000000>`,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error.message);
  }

  return (
    <span {...rest}>
      {parts.map((part, index) => {
        if (part.isHighlighted) {
          return React.createElement(
            tagName,
            { key: index, className: 'ais-Highlight-highlighted' },
            part.value
          );
        }

        return React.createElement(
          'span',
          { key: index, className: 'ais-Highlight-nonHighlighted' },
          part.value
        );
      })}
    </span>
  );
}

function parseReverseHighlightedAttribute({
  hit,
  attribute,
  highlightPreTag,
  highlightPostTag,
}) {
  const highlightedValue = getAttributeValueByPath(
    hit,
    `_highlightResult.${attribute}.value`
  );

  const parts = parseAttribute({
    highlightPreTag,
    highlightPostTag,
    highlightedValue,
  });

  // We don't want to highlight the whole word when no parts match.
  if (!parts.some((part) => part.isHighlighted)) {
    return parts.map((part) => ({ ...part, isHighlighted: false }));
  }

  return parts.map((part) => ({ ...part, isHighlighted: !part.isHighlighted }));
}
