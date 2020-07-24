import { getDomElement } from '../utils';

const rules = {
  inputContainer: {
    validate(input) {
      const inputContainer = getDomElement(input);
      const isElement = inputContainer instanceof HTMLElement;
      const isInputElement = inputContainer instanceof HTMLInputElement;

      const response = {
        valid: isElement && !isInputElement,
        context: {
          isElement,
          isInputElement,
        },
      };

      return response;
    },
    errorMessage(context) {
      if (!context?.isElement) {
        return 'The `inputContainer` option must refer to a valid HTML element.';
      }
      if (context?.isInputElement) {
        return 'The `inputContainer` option must refer to a container (e.g., <div>), not an <input>.';
      }

      return '';
    },
  },
  refinements: {
    validate(input) {
      const acceptedTypes = ['hierarchical', 'category', 'list', 'slider'];
      const unknownType = input.find(
        ({ type }) => !acceptedTypes.includes(type)
      );

      const response = {
        valid: !unknownType,
        context: {
          unknownType,
        },
      };

      return response;
    },
    errorMessage(context) {
      return `The refinement type "${context?.unknownType?.type}" is not supported.`;
    },
  },
};

export default rules;
