import { schemeCategory10, schemeAccent, schemeDark2, schemePaired, schemePastel1, schemePastel2, schemeSet1, schemeSet2, schemeSet3, schemeBrBG, schemePRGn, schemePiYG, schemePuOr, schemeRdBu, schemeRdGy, schemeRdYlBu, schemeRdYlGn, schemeSpectral, schemeBlues, schemeGreens, schemeGreys, schemeOranges, schemePurples, schemeReds, schemeBuGn, schemeBuPu, schemeGnBu, schemeOrRd, schemePuBuGn, schemePuBu, schemePuRd, schemeRdPu, schemeYlGnBu, schemeYlGn, schemeYlOrBr, schemeYlOrRd, interpolateBrBG, interpolatePRGn, interpolatePiYG, interpolatePuOr, interpolateRdBu, interpolateRdGy, interpolateRdYlBu, interpolateRdYlGn, interpolateSpectral, interpolateBlues, interpolateGreens, interpolateGreys, interpolateOranges, interpolatePurples, interpolateReds, interpolateViridis, interpolateInferno, interpolateMagma, interpolatePlasma, interpolateWarm, interpolateCool, interpolateCubehelixDefault, interpolateBuGn, interpolateBuPu, interpolateGnBu, interpolateOrRd, interpolatePuBuGn, interpolatePuBu, interpolatePuRd, interpolateRdPu, interpolateYlGnBu, interpolateYlGn, interpolateYlOrBr, interpolateYlOrRd, interpolateRainbow, interpolateSinebow } from 'd3-scale-chromatic';
import { useMemo } from 'react';
import get from 'lodash.get';
import isPlainObject from 'lodash.isplainobject';
import { scaleOrdinal } from 'd3-scale';
import { rgb } from 'd3-color';
import PropTypes from 'prop-types';
import { spring } from 'react-motion';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var categoricalColorSchemes = {
  nivo: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'],
  category10: schemeCategory10,
  accent: schemeAccent,
  dark2: schemeDark2,
  paired: schemePaired,
  pastel1: schemePastel1,
  pastel2: schemePastel2,
  set1: schemeSet1,
  set2: schemeSet2,
  set3: schemeSet3
};
var categoricalColorSchemeIds = Object.keys(categoricalColorSchemes);
var isCategoricalColorScheme = function isCategoricalColorScheme(scheme) {
  return categoricalColorSchemeIds.includes(scheme);
};
var divergingColorSchemes = {
  brown_blueGreen: schemeBrBG,
  purpleRed_green: schemePRGn,
  pink_yellowGreen: schemePiYG,
  purple_orange: schemePuOr,
  red_blue: schemeRdBu,
  red_grey: schemeRdGy,
  red_yellow_blue: schemeRdYlBu,
  red_yellow_green: schemeRdYlGn,
  spectral: schemeSpectral
};
var divergingColorSchemeIds = Object.keys(divergingColorSchemes);
var isDivergingColorScheme = function isDivergingColorScheme(scheme) {
  return divergingColorSchemeIds.includes(scheme);
};
var sequentialColorSchemes = {
  blues: schemeBlues,
  greens: schemeGreens,
  greys: schemeGreys,
  oranges: schemeOranges,
  purples: schemePurples,
  reds: schemeReds,
  blue_green: schemeBuGn,
  blue_purple: schemeBuPu,
  green_blue: schemeGnBu,
  orange_red: schemeOrRd,
  purple_blue_green: schemePuBuGn,
  purple_blue: schemePuBu,
  purple_red: schemePuRd,
  red_purple: schemeRdPu,
  yellow_green_blue: schemeYlGnBu,
  yellow_green: schemeYlGn,
  yellow_orange_brown: schemeYlOrBr,
  yellow_orange_red: schemeYlOrRd
};
var sequentialColorSchemeIds = Object.keys(sequentialColorSchemes);
var isSequentialColorScheme = function isSequentialColorScheme(scheme) {
  return sequentialColorSchemeIds.includes(scheme);
};
var colorSchemes = _objectSpread({}, categoricalColorSchemes, divergingColorSchemes, sequentialColorSchemes);
var colorSchemeIds = Object.keys(colorSchemes);
var colorInterpolators = {
  brown_blueGreen: interpolateBrBG,
  purpleRed_green: interpolatePRGn,
  pink_yellowGreen: interpolatePiYG,
  purple_orange: interpolatePuOr,
  red_blue: interpolateRdBu,
  red_grey: interpolateRdGy,
  red_yellow_blue: interpolateRdYlBu,
  red_yellow_green: interpolateRdYlGn,
  spectral: interpolateSpectral,
  blues: interpolateBlues,
  greens: interpolateGreens,
  greys: interpolateGreys,
  oranges: interpolateOranges,
  purples: interpolatePurples,
  reds: interpolateReds,
  viridis: interpolateViridis,
  inferno: interpolateInferno,
  magma: interpolateMagma,
  plasma: interpolatePlasma,
  warm: interpolateWarm,
  cool: interpolateCool,
  cubehelixDefault: interpolateCubehelixDefault,
  blue_green: interpolateBuGn,
  blue_purple: interpolateBuPu,
  green_blue: interpolateGnBu,
  orange_red: interpolateOrRd,
  purple_blue_green: interpolatePuBuGn,
  purple_blue: interpolatePuBu,
  purple_red: interpolatePuRd,
  red_purple: interpolateRdPu,
  yellow_green_blue: interpolateYlGnBu,
  yellow_green: interpolateYlGn,
  yellow_orange_brown: interpolateYlOrBr,
  yellow_orange_red: interpolateYlOrRd,
  rainbow: interpolateRainbow,
  sinebow: interpolateSinebow
};
var colorInterpolatorIds = Object.keys(colorInterpolators);

var getOrdinalColorScale = function getOrdinalColorScale(instruction, identity) {
  if (typeof instruction === 'function') return instruction;
  var getIdentity = typeof identity === 'function' ? identity : function (d) {
    return get(d, identity);
  };
  if (Array.isArray(instruction)) {
    var scale = scaleOrdinal(instruction);
    var generator = function generator(d) {
      return scale(getIdentity(d));
    };
    generator.scale = scale;
    return generator;
  }
  if (isPlainObject(instruction)) {
    if (instruction.datum !== undefined) {
      return function (datum) {
        return get(datum, instruction.datum);
      };
    }
    if (instruction.scheme !== undefined) {
      if (isCategoricalColorScheme(instruction.scheme)) {
        var _scale = scaleOrdinal(colorSchemes[instruction.scheme]);
        var _generator = function _generator(d) {
          return _scale(getIdentity(d));
        };
        _generator.scale = _scale;
        return _generator;
      }
      if (isDivergingColorScheme(instruction.scheme)) {
        if (instruction.size !== undefined && (instruction.size < 3 || instruction.size > 11)) {
          throw new Error("Invalid size '".concat(instruction.size, "' for diverging color scheme '").concat(instruction.scheme, "', must be between 3~11"));
        }
        var _scale2 = scaleOrdinal(colorSchemes[instruction.scheme][instruction.size || 11]);
        var _generator2 = function _generator2(d) {
          return _scale2(getIdentity(d));
        };
        _generator2.scale = _scale2;
        return _generator2;
      }
      if (isSequentialColorScheme(instruction.scheme)) {
        if (instruction.size !== undefined && (instruction.size < 3 || instruction.size > 9)) {
          throw new Error("Invalid size '".concat(instruction.size, "' for sequential color scheme '").concat(instruction.scheme, "', must be between 3~9"));
        }
        var _scale3 = scaleOrdinal(colorSchemes[instruction.scheme][instruction.size || 9]);
        var _generator3 = function _generator3(d) {
          return _scale3(getIdentity(d));
        };
        _generator3.scale = _scale3;
        return _generator3;
      }
    }
    throw new Error("Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property");
  }
  return function () {
    return instruction;
  };
};
var useOrdinalColorScale = function useOrdinalColorScale(instruction, identity) {
  return useMemo(function () {
    return getOrdinalColorScale(instruction, identity);
  }, [instruction, identity]);
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getInheritedColorGenerator = function getInheritedColorGenerator(inheritedColor, theme) {
  if (typeof inheritedColor === 'function') return function (node) {
    return inheritedColor(node);
  };
  if (isPlainObject(inheritedColor)) {
    if (inheritedColor.theme !== undefined) {
      if (theme === undefined) {
        throw new Error("Unable to use color from theme as no theme was provided");
      }
      var themeColor = get(theme, inheritedColor.theme);
      if (themeColor === undefined) {
        throw new Error("Color from theme is undefined at path: '".concat(inheritedColor.theme, "'"));
      }
      return function () {
        return themeColor;
      };
    }
    if (inheritedColor.from !== undefined) {
      var getColor = function getColor(datum) {
        return get(datum, inheritedColor.from);
      };
      if (Array.isArray(inheritedColor.modifiers)) {
        var modifiers = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        try {
          var _loop = function _loop() {
            var modifier = _step.value;
            var _modifier = _slicedToArray(modifier, 2),
                modifierType = _modifier[0],
                amount = _modifier[1];
            if (modifierType === 'brighter') {
              modifiers.push(function (color) {
                return color.brighter(amount);
              });
            } else if (modifierType === 'darker') {
              modifiers.push(function (color) {
                return color.darker(amount);
              });
            } else if (modifierType === 'opacity') {
              modifiers.push(function (color) {
                color.opacity = amount;
                return color;
              });
            } else {
              throw new Error("Invalid color modifier: '".concat(modifierType, "', must be one of: 'brighter', 'darker', 'opacity'"));
            }
          };
          for (var _iterator = inheritedColor.modifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        if (modifiers.length === 0) return getColor;
        return function (datum) {
          return modifiers.reduce(function (color, modify) {
            return modify(color);
          }, rgb(getColor(datum))).toString();
        };
      }
      return getColor;
    }
    throw new Error("Invalid color spec, you should either specify 'theme' or 'from' when using a config object");
  }
  return function () {
    return inheritedColor;
  };
};
var useInheritedColor = function useInheritedColor(parentColor, theme) {
  return useMemo(function () {
    return getInheritedColorGenerator(parentColor, theme);
  }, [parentColor, theme]);
};

var ordinalColorsPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.string), PropTypes.shape({
  scheme: PropTypes.oneOf(colorSchemeIds).isRequired,
  size: PropTypes.number
}), PropTypes.shape({
  datum: PropTypes.string.isRequired
}), PropTypes.string]);
var colorPropertyAccessorPropType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);
var inheritedColorPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({
  theme: PropTypes.string.isRequired
}), PropTypes.shape({
  from: PropTypes.string.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.array)
})]);

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var interpolateColor = function interpolateColor(color, springConfig) {
  var colorComponents = rgb(color);
  if (!springConfig) {
    return {
      colorR: colorComponents.r,
      colorG: colorComponents.g,
      colorB: colorComponents.b
    };
  }
  var configWithPrecision = _objectSpread$1({}, springConfig, {
    precision: 1
  });
  return {
    colorR: spring(colorComponents.r, configWithPrecision),
    colorG: spring(colorComponents.g, configWithPrecision),
    colorB: spring(colorComponents.b, configWithPrecision)
  };
};
var getInterpolatedColor = function getInterpolatedColor(_ref) {
  var colorR = _ref.colorR,
      colorG = _ref.colorG,
      colorB = _ref.colorB;
  return "rgb(".concat(Math.round(Math.max(colorR, 0)), ",").concat(Math.round(Math.max(colorG, 0)), ",").concat(Math.round(Math.max(colorB, 0)), ")");
};

export { categoricalColorSchemeIds, categoricalColorSchemes, colorInterpolatorIds, colorInterpolators, colorPropertyAccessorPropType, colorSchemeIds, colorSchemes, divergingColorSchemeIds, divergingColorSchemes, getInheritedColorGenerator, getInterpolatedColor, getOrdinalColorScale, inheritedColorPropType, interpolateColor, isCategoricalColorScheme, isDivergingColorScheme, isSequentialColorScheme, ordinalColorsPropType, sequentialColorSchemeIds, sequentialColorSchemes, useInheritedColor, useOrdinalColorScale };
