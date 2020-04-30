/* eslint-disable import/no-commonjs */

function generate(values, template) {
  const properties = Object.assign(
    {},
    ...Object.keys(values).map((value) => {
      return template(value);
    })
  );

  return properties;
}

function generateCustomMedia(values, { namespace = '', hyphens = true } = {}) {
  const properties = generate(values, (value) => {
    const prefix = `${hyphens ? '--' : ''}${namespace}-breakpoint`;

    return {
      [`${prefix}-${value}-min`]: `(min-width: ${values[value]}px)`,
      [`${prefix}-above-${value}`]: `(min-width: ${values[value] + 1}px)`,
      [`${prefix}-${value}-max`]: `(max-width: ${values[value]}px)`,
      [`${prefix}-below-${value}-max`]: `(max-width: ${values[value] - 1}px)`,
    };
  });

  return properties;
}

function generateCustomProperties(
  values,
  { namespace = '', hyphens = true } = {}
) {
  const properties = generate(values, (value) => {
    return {
      [`${hyphens ? '--' : ''}${namespace}-${value}`]: values[value],
    };
  });

  return properties;
}

module.exports = {
  generateCustomMedia,
  generateCustomProperties,
};
