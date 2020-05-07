/**
 * This is a patch for `react-fast-compare` that ignores circular dependencies
 * during object comparisons to work with Preact elements.
 *
 * Preact elements use circular dependencies which is not supported by the
 * original `react-fast-compare` library, used in React InstantSearch.
 *
 * This function is used as a webpack alias.
 *
 * Custom code is prepended by `![CUSTOM ADDITION]`.
 */

/* eslint-disable complexity, no-continue, no-self-compare */

const hasElementType = typeof Element !== 'undefined';
const hasMap = typeof Map === 'function';
const hasSet = typeof Set === 'function';
const hasArrayBuffer =
  typeof ArrayBuffer === 'function' && Boolean(ArrayBuffer.isView);

// See: https://github.com/FormidableLabs/react-fast-compare/blob/ad48a7ca7823d9073accf8d02b8cf47d0b315f62/index.js
export default function isEqual(a, b) {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) return false;

    let length;
    let i;
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) if (!isEqual(a[i], b[i])) return false;
      return true;
    }

    let it;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!isEqual(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
      return true;
    }

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    if (hasElementType && a instanceof Element) return false;

    // custom handling for React
    for (i = length; i-- !== 0; ) {
      if (keys[i] === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a React element.
        continue;
      }

      // ![CUSTOM ADDITION]
      // Preact elements have cyclic references so we need to ignore comparing
      // them.
      if (isCyclic(a[keys[i]])) {
        continue;
      }

      if (!isEqual(a[keys[i]], b[keys[i]])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}

// See: https://stackoverflow.com/a/55545121/9940315
function isCyclic(object) {
  const seenObjects = new WeakMap(); // use to keep track of which objects have been seen.

  function detectCycle(obj) {
    // If 'obj' is an actual object (i.e., has the form of '{}'), check
    // if it's been seen already.
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      if (seenObjects.has(obj)) {
        return true;
      }

      // If 'obj' hasn't been seen, add it to 'seenObjects'.
      // Since 'obj' is used as a key, the value of 'seenObjects[obj]'
      // is irrelevant and can be set as literally anything you want. I
      // just went with 'undefined'.
      seenObjects.set(obj, undefined);

      // Recurse through the object, looking for more circular references.
      for (const key in obj) {
        if (detectCycle(obj[key])) {
          return true;
        }
      }

      // If 'obj' is an array, check if any of its elements are
      // an object that has been seen already.
    } else if (Array.isArray(obj)) {
      for (const i in obj) {
        if (detectCycle(obj[i])) {
          return true;
        }
      }
    }

    return false;
  }

  return detectCycle(object);
}
