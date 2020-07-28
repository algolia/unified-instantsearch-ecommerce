import invariant from 'invariant';

export function parseAttribute({
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

export function getAttributeValueByPath(hit, path) {
  const parts = path.split('.');
  const value = parts.reduce((current, key) => current && current[key], hit);

  if (typeof value !== 'string') {
    throw new Error(
      `The attribute ${JSON.stringify(path)} does not exist on the hit.`
    );
  }

  return value;
}

export function getDomElement(value) {
  const isSelectorString = typeof value === 'string';

  return isSelectorString ? document.querySelector(value) : value;
}

export function validateConfig(config, rules) {
  Object.keys(config).forEach((optionName) => {
    const input = config[optionName];
    const rule = rules[optionName];

    if (rule) {
      const { valid, context } = rule.validate(input);

      invariant(valid, rule.errorMessage({ ...context, input }));
    }
  });
}
