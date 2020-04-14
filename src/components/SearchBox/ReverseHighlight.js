import React from 'react';

export function ReverseHighlight({
  hit,
  attribute,
  tagName = 'mark',
  ...rest
}) {
  console.log({ hit });

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

  console.log({ parts });

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

function parseAttribute({
  highlightPreTag,
  highlightPostTag,
  highlightedValue,
}) {
  const splitByPreTag = highlightedValue.split(highlightPreTag);
  const firstValue = splitByPreTag.shift();
  const elements = !firstValue
    ? []
    : [{ value: firstValue, isHighlighted: false }];

  if (highlightPostTag === highlightPreTag) {
    let isHighlighted = true;

    splitByPreTag.forEach((split) => {
      elements.push({ value: split, isHighlighted });
      isHighlighted = !isHighlighted;
    });
  } else {
    splitByPreTag.forEach((split) => {
      const splitByPostTag = split.split(highlightPostTag);

      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true,
      });

      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false,
        });
      }
    });
  }

  return elements;
}

function getAttributeValueByPath(hit, path) {
  const parts = path.split('.');
  const value = parts.reduce((current, key) => current && current[key], hit);

  if (typeof value !== 'string') {
    throw new Error(
      `The attribute ${JSON.stringify(path)} does not exist on the hit.`
    );
  }

  return value;
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
