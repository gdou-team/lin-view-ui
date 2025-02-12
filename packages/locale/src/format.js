import { isPlainObject, isUndef } from "@lin-view-ui/utils";

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
export default function format() {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */

  function template(string, ...args) {
    if (args.length === 1 && isPlainObject(args[0])) {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      // let result;

      if (string[index - 1] === "{" && string[index + match.length] === "}") {
        return i;
      }
      const result = hasOwn(args, i) ? args[i] : null;
      if (isUndef(result)) {
        return "";
      }

      return result;
    });
  }

  return template;
}
