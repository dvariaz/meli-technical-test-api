/**
 * Validator function to know if a data structure is empty
 * @param {*} element
 * @returns
 */
function isEmpty(element) {
  switch (typeof element) {
    case "undefined": {
      return true;
    }
    case "number": {
      return Number.isNaN(element);
    }
    case "bigint": {
      return false;
    }
    case "string": {
      return element.length === 0;
    }
    case "boolean": {
      return !element;
    }
    case "object": {
      if (Array.isArray(element)) {
        return element.length === 0;
      } else {
        if (element === null) {
          return true;
        } else {
          return Object.keys(element).length === 0;
        }
      }
    }
    default: {
      throw new Error("Typeof unidentified");
    }
  }
}

module.exports = {
  isEmpty,
};
