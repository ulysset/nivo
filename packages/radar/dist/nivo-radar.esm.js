import React, { memo, useMemo, useState, useCallback } from 'react';
import { scaleLinear } from 'd3-scale';
import { useTheme, useMotionConfig, SmartMotion, blendModePropType, positionFromAngle, radiansToDegrees, getLabelGenerator, DotsItem, closedCurvePropType, motionPropTypes, withContainer, getAccessorFor, useDimensions, useCurveInterpolation, SvgWrapper, ResponsiveWrapper } from '@nivo/core';
import { useInheritedColor, inheritedColorPropType, getInheritedColorGenerator, ordinalColorsPropType, useOrdinalColorScale } from '@nivo/colors';
import { LegendPropShape, BoxLegendSvg } from '@nivo/legends';
import PropTypes from 'prop-types';
import { lineRadial, curveLinearClosed, arc } from 'd3-shape';
import range from 'lodash/range';
import { TransitionMotion, spring } from 'react-motion';
import sortBy from 'lodash/sortBy';
import { format } from 'd3-format';
import { useTooltip, TableTooltip, Chip } from '@nivo/tooltip';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var RadarShapes = memo(function (_ref) {
  var data = _ref.data,
      keys = _ref.keys,
      colorByKey = _ref.colorByKey,
      radiusScale = _ref.radiusScale,
      angleStep = _ref.angleStep,
      curveInterpolator = _ref.curveInterpolator,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      fillOpacity = _ref.fillOpacity,
      blendMode = _ref.blendMode;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.springConfig;
  var getBorderColor = useInheritedColor(borderColor, theme);
  var lineGenerator = useMemo(function () {
    return lineRadial().radius(function (d) {
      return radiusScale(d);
    }).angle(function (d, i) {
      return i * angleStep;
    }).curve(curveInterpolator);
  }, [radiusScale, angleStep, curveInterpolator]);
  if (animate !== true) {
    return React.createElement("g", null, keys.map(function (key) {
      return React.createElement("path", {
        key: key,
        d: lineGenerator(data.map(function (d) {
          return d[key];
        })),
        fill: colorByKey[key],
        fillOpacity: fillOpacity,
        stroke: getBorderColor({
          key: key,
          color: colorByKey[key]
        }),
        strokeWidth: borderWidth,
        style: {
          mixBlendMode: blendMode
        }
      });
    }));
  }
  return React.createElement("g", null, keys.map(function (key) {
    return React.createElement(SmartMotion, {
      key: key,
      style: function style(spring) {
        return {
          d: spring(lineGenerator(data.map(function (d) {
            return d[key];
          })), springConfig),
          fill: spring(colorByKey[key], springConfig),
          stroke: spring(getBorderColor({
            key: key,
            color: colorByKey[key]
          }), springConfig)
        };
      }
    }, function (style) {
      return React.createElement("path", _extends({
        fillOpacity: fillOpacity,
        strokeWidth: borderWidth,
        style: {
          mixBlendMode: blendMode
        }
      }, style));
    });
  }));
});
RadarShapes.displayName = 'RadarShapes';
RadarShapes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  colorByKey: PropTypes.object.isRequired,
  radiusScale: PropTypes.func.isRequired,
  angleStep: PropTypes.number.isRequired,
  curveInterpolator: PropTypes.func.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: inheritedColorPropType.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  blendMode: blendModePropType.isRequired
};

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var textAnchorFromAngle = function textAnchorFromAngle(_angle) {
  var angle = radiansToDegrees(_angle) + 90;
  if (angle <= 10 || angle >= 350 || angle >= 170 && angle <= 190) return 'middle';
  if (angle > 180) return 'end';
  return 'start';
};
var renderLabel = function renderLabel(label, theme, labelComponent) {
  var labelNode;
  if (labelComponent === undefined) {
    labelNode = React.createElement("text", {
      style: theme.axis.ticks.text,
      dominantBaseline: "central",
      textAnchor: label.anchor
    }, label.id);
  } else {
    labelNode = React.createElement(labelComponent, label);
  }
  return React.createElement("g", {
    key: label.id,
    transform: "translate(".concat(label.x, ", ").concat(label.y, ")")
  }, labelNode);
};
var RadarGridLabels = memo(function (_ref) {
  var radius = _ref.radius,
      angles = _ref.angles,
      indices = _ref.indices,
      labelComponent = _ref.label,
      labelOffset = _ref.labelOffset;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.springConfig;
  var labels = indices.map(function (index, i) {
    var position = positionFromAngle(angles[i], radius + labelOffset);
    var textAnchor = textAnchorFromAngle(angles[i]);
    return _objectSpread({
      id: index,
      angle: radiansToDegrees(angles[i]),
      anchor: textAnchor
    }, position);
  });
  if (animate !== true) {
    return React.createElement("g", null, labels.map(function (label) {
      return renderLabel(label, theme, labelComponent);
    }));
  }
  return React.createElement(TransitionMotion, {
    styles: labels.map(function (label) {
      return {
        key: label.id,
        data: label,
        style: {
          x: spring(label.x, springConfig),
          y: spring(label.y, springConfig)
        }
      };
    })
  }, function (interpolatedStyles) {
    return React.createElement("g", null, interpolatedStyles.map(function (_ref2) {
      var data = _ref2.data;
      return renderLabel(data, theme, labelComponent);
    }));
  });
});
RadarGridLabels.displayName = 'RadarGridLabels';
RadarGridLabels.propTypes = {
  radius: PropTypes.number.isRequired,
  angles: PropTypes.arrayOf(PropTypes.number).isRequired,
  indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  label: PropTypes.func,
  labelOffset: PropTypes.number.isRequired
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var levelWillEnter = function levelWillEnter() {
  return {
    r: 0
  };
};
var RadarGridLevels = memo(function (_ref) {
  var shape = _ref.shape,
      radii = _ref.radii,
      angleStep = _ref.angleStep,
      dataLength = _ref.dataLength;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.springConfig;
  var levelsTransitionProps = {
    willEnter: levelWillEnter,
    willLeave: function willLeave() {
      return {
        r: spring(0, springConfig)
      };
    },
    styles: radii.map(function (r, i) {
      return {
        key: "level.".concat(i),
        style: {
          r: spring(r, springConfig)
        }
      };
    })
  };
  if (shape === 'circular') {
    if (animate !== true) {
      return React.createElement("g", null, radii.map(function (r, i) {
        return React.createElement("circle", _extends$1({
          key: "level.".concat(i),
          fill: "none",
          r: r
        }, theme.grid.line));
      }));
    }
    return React.createElement(TransitionMotion, levelsTransitionProps, function (interpolatedStyles) {
      return React.createElement("g", null, interpolatedStyles.map(function (_ref2) {
        var key = _ref2.key,
            style = _ref2.style;
        return React.createElement("circle", _extends$1({
          key: key,
          fill: "none",
          r: Math.max(style.r, 0)
        }, theme.grid.line));
      }));
    });
  }
  var radarLineGenerator = lineRadial().angle(function (i) {
    return i * angleStep;
  }).curve(curveLinearClosed);
  var points = range(dataLength);
  if (animate !== true) {
    return React.createElement("g", null, radii.map(function (radius, i) {
      return React.createElement("path", _extends$1({
        key: "level.".concat(i),
        fill: "none",
        d: radarLineGenerator.radius(radius)(points)
      }, theme.grid.line));
    }));
  }
  return React.createElement(TransitionMotion, levelsTransitionProps, function (interpolatedStyles) {
    return React.createElement("g", null, interpolatedStyles.map(function (_ref3) {
      var key = _ref3.key,
          style = _ref3.style;
      return React.createElement("path", _extends$1({
        key: key,
        fill: "none",
        d: radarLineGenerator.radius(style.r)(points)
      }, theme.grid.line));
    }));
  });
});
RadarGridLevels.displayName = 'RadarGridLevels';
RadarGridLevels.propTypes = {
  shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
  radii: PropTypes.arrayOf(PropTypes.number).isRequired,
  angleStep: PropTypes.number.isRequired,
  dataLength: PropTypes.number.isRequired
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var RadarGrid = memo(function (_ref) {
  var indices = _ref.indices,
      levels = _ref.levels,
      shape = _ref.shape,
      radius = _ref.radius,
      angleStep = _ref.angleStep,
      label = _ref.label,
      labelOffset = _ref.labelOffset;
  var theme = useTheme();
  var _useMemo = useMemo(function () {
    return {
      radii: range(levels).map(function (i) {
        return radius / levels * (i + 1);
      }).reverse(),
      angles: range(indices.length).map(function (i) {
        return i * angleStep - Math.PI / 2;
      })
    };
  }, [indices, levels, radius, angleStep]),
      radii = _useMemo.radii,
      angles = _useMemo.angles;
  return React.createElement("g", null, angles.map(function (angle, i) {
    var position = positionFromAngle(angle, radius);
    return React.createElement("line", _extends$2({
      key: "axis.".concat(i),
      x1: 0,
      y1: 0,
      x2: position.x,
      y2: position.y
    }, theme.grid));
  }), React.createElement(RadarGridLevels, {
    shape: shape,
    radii: radii,
    angleStep: angleStep,
    dataLength: indices.length
  }), React.createElement(RadarGridLabels, {
    radius: radius,
    angles: angles,
    indices: indices,
    labelOffset: labelOffset,
    label: label
  }));
});
RadarGrid.displayName = 'RadarGrid';
RadarGrid.propTypes = {
  indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
  radius: PropTypes.number.isRequired,
  levels: PropTypes.number.isRequired,
  angleStep: PropTypes.number.isRequired,
  label: PropTypes.func,
  labelOffset: PropTypes.number.isRequired
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var RadarTooltipItem = memo(function (_ref) {
  var datum = _ref.datum,
      keys = _ref.keys,
      index = _ref.index,
      colorByKey = _ref.colorByKey,
      radius = _ref.radius,
      startAngle = _ref.startAngle,
      endAngle = _ref.endAngle,
      arcGenerator = _ref.arcGenerator,
      tooltipFormat = _ref.tooltipFormat;
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHover = _useState2[0],
      setIsHover = _useState2[1];
  var theme = useTheme();
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var tooltip = useMemo(function () {
    var format$1 = !tooltipFormat || typeof tooltipFormat === 'function' ? tooltipFormat : format(tooltipFormat);
    return React.createElement(TableTooltip, {
      title: React.createElement("strong", null, index),
      rows: sortBy(keys.map(function (key) {
        return [React.createElement(Chip, {
          key: key,
          color: colorByKey[key]
        }), key, format$1 ? format$1(datum[key], key) : datum[key]];
      }), '2').reverse(),
      theme: theme
    });
  }, [datum, keys, index, colorByKey, theme, tooltipFormat]);
  var showItemTooltip = useCallback(function (event) {
    setIsHover(true);
    showTooltipFromEvent(tooltip, event);
  }, [showTooltipFromEvent, tooltip]);
  var hideItemTooltip = useCallback(function () {
    setIsHover(false);
    hideTooltip();
  }, [hideTooltip, setIsHover]);
  var _useMemo = useMemo(function () {
    var position = positionFromAngle(startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2, radius);
    return {
      path: arcGenerator({
        startAngle: startAngle,
        endAngle: endAngle
      }),
      tipX: position.x,
      tipY: position.y
    };
  }, [startAngle, endAngle, radius, arcGenerator]),
      path = _useMemo.path,
      tipX = _useMemo.tipX,
      tipY = _useMemo.tipY;
  return React.createElement(React.Fragment, null, isHover && React.createElement("line", {
    x1: 0,
    y1: 0,
    x2: tipX,
    y2: tipY,
    style: theme.crosshair.line
  }), React.createElement("path", {
    d: path,
    fill: "#F00",
    fillOpacity: 0,
    onMouseEnter: showItemTooltip,
    onMouseMove: showItemTooltip,
    onMouseLeave: hideItemTooltip
  }));
});
RadarTooltipItem.displayName = 'RadarTooltipItem';
RadarTooltipItem.propTypes = {
  datum: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  colorByKey: PropTypes.object.isRequired,
  startAngle: PropTypes.number.isRequired,
  endAngle: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  arcGenerator: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

var RadarTooltip = memo(function (_ref) {
  var data = _ref.data,
      keys = _ref.keys,
      getIndex = _ref.getIndex,
      colorByKey = _ref.colorByKey,
      radius = _ref.radius,
      angleStep = _ref.angleStep,
      tooltipFormat = _ref.tooltipFormat;
  var arc$1 = arc().outerRadius(radius).innerRadius(0);
  var halfAngleStep = angleStep * 0.5;
  var rootStartAngle = -halfAngleStep;
  return React.createElement("g", null, data.map(function (d) {
    var index = getIndex(d);
    var startAngle = rootStartAngle;
    var endAngle = startAngle + angleStep;
    rootStartAngle += angleStep;
    return React.createElement(RadarTooltipItem, {
      key: index,
      datum: d,
      keys: keys,
      index: index,
      colorByKey: colorByKey,
      startAngle: startAngle,
      endAngle: endAngle,
      radius: radius,
      arcGenerator: arc$1,
      tooltipFormat: tooltipFormat
    });
  }));
});
RadarTooltip.displayName = 'RadarTooltip';
RadarTooltip.propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  getIndex: PropTypes.func.isRequired,
  colorByKey: PropTypes.object.isRequired,
  radius: PropTypes.number.isRequired,
  angleStep: PropTypes.number.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var RadarDots = function RadarDots(_ref) {
  var data = _ref.data,
      keys = _ref.keys,
      getIndex = _ref.getIndex,
      colorByKey = _ref.colorByKey,
      radiusScale = _ref.radiusScale,
      angleStep = _ref.angleStep,
      symbol = _ref.symbol,
      size = _ref.size,
      color = _ref.color,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      enableLabel = _ref.enableLabel,
      label = _ref.label,
      labelFormat = _ref.labelFormat,
      labelYOffset = _ref.labelYOffset;
  var theme = useTheme();
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.springConfig;
  var fillColor = getInheritedColorGenerator(color, theme);
  var strokeColor = getInheritedColorGenerator(borderColor, theme);
  var getLabel = getLabelGenerator(label, labelFormat);
  var points = data.reduce(function (acc, datum, i) {
    var index = getIndex(datum);
    keys.forEach(function (key) {
      var pointData = {
        index: index,
        key: key,
        value: datum[key],
        color: colorByKey[key]
      };
      acc.push({
        key: "".concat(key, ".").concat(index),
        label: enableLabel ? getLabel(pointData) : null,
        style: _objectSpread$1({
          fill: fillColor(pointData),
          stroke: strokeColor(pointData)
        }, positionFromAngle(angleStep * i - Math.PI / 2, radiusScale(datum[key]))),
        data: pointData
      });
    });
    return acc;
  }, []);
  if (animate !== true) {
    return React.createElement("g", null, points.map(function (point) {
      return React.createElement(DotsItem, {
        key: point.key,
        x: point.style.x,
        y: point.style.y,
        symbol: symbol,
        size: size,
        color: point.style.fill,
        borderWidth: borderWidth,
        borderColor: point.style.stroke,
        label: point.label,
        labelYOffset: labelYOffset,
        theme: theme,
        datum: point.data
      });
    }));
  }
  return React.createElement(TransitionMotion, {
    styles: points.map(function (point) {
      return {
        key: point.key,
        data: point,
        style: {
          x: spring(point.style.x, springConfig),
          y: spring(point.style.y, springConfig),
          size: spring(size, springConfig)
        }
      };
    })
  }, function (interpolatedStyles) {
    return React.createElement("g", null, interpolatedStyles.map(function (_ref2) {
      var key = _ref2.key,
          style = _ref2.style,
          point = _ref2.data;
      return React.createElement(DotsItem, _extends$3({
        key: key
      }, style, {
        symbol: symbol,
        color: point.style.fill,
        borderWidth: borderWidth,
        borderColor: point.style.stroke,
        label: point.label,
        labelYOffset: labelYOffset,
        theme: theme,
        datum: point.data
      }));
    }));
  });
};
RadarDots.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  getIndex: PropTypes.func.isRequired,
  colorByKey: PropTypes.object.isRequired,
  radiusScale: PropTypes.func.isRequired,
  angleStep: PropTypes.number.isRequired,
  symbol: PropTypes.func,
  size: PropTypes.number.isRequired,
  color: inheritedColorPropType.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: inheritedColorPropType.isRequired,
  enableLabel: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelFormat: PropTypes.string,
  labelYOffset: PropTypes.number
};
RadarDots.defaultProps = {
  size: 6,
  color: {
    from: 'color'
  },
  borderWidth: 0,
  borderColor: {
    from: 'color'
  },
  enableLabel: false,
  label: 'value'
};

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var RadarPropTypes = _objectSpread$2({
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  indexBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
  maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]).isRequired,
  curve: closedCurvePropType.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: inheritedColorPropType.isRequired,
  gridLevels: PropTypes.number,
  gridShape: PropTypes.oneOf(['circular', 'linear']),
  gridLabel: PropTypes.func,
  gridLabelOffset: PropTypes.number,
  enableDots: PropTypes.bool.isRequired,
  dotSymbol: PropTypes.func,
  dotSize: PropTypes.number,
  dotColor: inheritedColorPropType,
  dotBorderWidth: PropTypes.number,
  dotBorderColor: inheritedColorPropType,
  enableDotLabel: PropTypes.bool,
  dotLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dotLabelFormat: PropTypes.string,
  dotLabelYOffset: PropTypes.number,
  colors: ordinalColorsPropType.isRequired,
  fillOpacity: PropTypes.number.isRequired,
  blendMode: blendModePropType.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  legends: PropTypes.arrayOf(PropTypes.shape(LegendPropShape)).isRequired
}, motionPropTypes);
var RadarDefaultProps = {
  maxValue: 'auto',
  curve: 'linearClosed',
  borderWidth: 2,
  borderColor: {
    from: 'color'
  },
  gridLevels: 5,
  gridShape: 'circular',
  gridLabelOffset: 16,
  enableDots: true,
  colors: {
    scheme: 'nivo'
  },
  fillOpacity: 0.25,
  blendMode: 'normal',
  isInteractive: true,
  legends: [],
  animate: true,
  motionDamping: 13,
  motionStiffness: 90
};

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
var Radar = memo(function (_ref) {
  var data = _ref.data,
      keys = _ref.keys,
      indexBy = _ref.indexBy,
      maxValue = _ref.maxValue,
      curve = _ref.curve,
      partialMargin = _ref.margin,
      width = _ref.width,
      height = _ref.height,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      gridLevels = _ref.gridLevels,
      gridShape = _ref.gridShape,
      gridLabel = _ref.gridLabel,
      gridLabelOffset = _ref.gridLabelOffset,
      enableDots = _ref.enableDots,
      dotSymbol = _ref.dotSymbol,
      dotSize = _ref.dotSize,
      dotColor = _ref.dotColor,
      dotBorderWidth = _ref.dotBorderWidth,
      dotBorderColor = _ref.dotBorderColor,
      enableDotLabel = _ref.enableDotLabel,
      dotLabel = _ref.dotLabel,
      dotLabelFormat = _ref.dotLabelFormat,
      dotLabelYOffset = _ref.dotLabelYOffset,
      colors = _ref.colors,
      fillOpacity = _ref.fillOpacity,
      blendMode = _ref.blendMode,
      isInteractive = _ref.isInteractive,
      tooltipFormat = _ref.tooltipFormat,
      legends = _ref.legends;
  var getIndex = useMemo(function () {
    return getAccessorFor(indexBy);
  }, [indexBy]);
  var indices = useMemo(function () {
    return data.map(getIndex);
  }, [data, getIndex]);
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var theme = useTheme();
  var getColor = useOrdinalColorScale(colors, 'key');
  var colorByKey = useMemo(function () {
    return keys.reduce(function (mapping, key, index) {
      mapping[key] = getColor({
        key: key,
        index: index
      });
      return mapping;
    }, {});
  }, [keys, getColor]);
  var _useMemo = useMemo(function () {
    var computedMaxValue = maxValue !== 'auto' ? maxValue : Math.max.apply(Math, _toConsumableArray(data.reduce(function (acc, d) {
      return [].concat(_toConsumableArray(acc), _toConsumableArray(keys.map(function (key) {
        return d[key];
      })));
    }, [])));
    var radius = Math.min(innerWidth, innerHeight) / 2;
    var radiusScale = scaleLinear().range([0, radius]).domain([0, computedMaxValue]);
    return {
      radius: radius,
      radiusScale: radiusScale,
      centerX: innerWidth / 2,
      centerY: innerHeight / 2,
      angleStep: Math.PI * 2 / data.length
    };
  }, [keys, indexBy, data, maxValue, innerWidth, innerHeight]),
      radius = _useMemo.radius,
      radiusScale = _useMemo.radiusScale,
      centerX = _useMemo.centerX,
      centerY = _useMemo.centerY,
      angleStep = _useMemo.angleStep;
  var legendData = keys.map(function (key) {
    return {
      id: key,
      label: key,
      color: colorByKey[key]
    };
  });
  var curveInterpolator = useCurveInterpolation(curve);
  return React.createElement(SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    theme: theme
  }, React.createElement("g", {
    transform: "translate(".concat(centerX, ", ").concat(centerY, ")")
  }, React.createElement(RadarGrid, {
    levels: gridLevels,
    shape: gridShape,
    radius: radius,
    angleStep: angleStep,
    indices: indices,
    label: gridLabel,
    labelOffset: gridLabelOffset
  }), React.createElement(RadarShapes, {
    data: data,
    keys: keys,
    colorByKey: colorByKey,
    radiusScale: radiusScale,
    angleStep: angleStep,
    curveInterpolator: curveInterpolator,
    borderWidth: borderWidth,
    borderColor: borderColor,
    fillOpacity: fillOpacity,
    blendMode: blendMode
  }), isInteractive && React.createElement(RadarTooltip, {
    data: data,
    keys: keys,
    getIndex: getIndex,
    colorByKey: colorByKey,
    radius: radius,
    angleStep: angleStep,
    tooltipFormat: tooltipFormat
  }), enableDots && React.createElement(RadarDots, {
    data: data,
    keys: keys,
    getIndex: getIndex,
    radiusScale: radiusScale,
    angleStep: angleStep,
    symbol: dotSymbol,
    size: dotSize,
    colorByKey: colorByKey,
    color: dotColor,
    borderWidth: dotBorderWidth,
    borderColor: dotBorderColor,
    enableLabel: enableDotLabel,
    label: dotLabel,
    labelFormat: dotLabelFormat,
    labelYOffset: dotLabelYOffset
  })), legends.map(function (legend, i) {
    return React.createElement(BoxLegendSvg, _extends$4({
      key: i
    }, legend, {
      containerWidth: width,
      containerHeight: height,
      data: legendData,
      theme: theme
    }));
  }));
});
Radar.displayName = 'Radar';
Radar.propTypes = RadarPropTypes;
Radar.defaultProps = RadarDefaultProps;
var Radar$1 = withContainer(Radar);

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }
var ResponsiveRadar = function ResponsiveRadar(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(Radar$1, _extends$5({
      width: width,
      height: height
    }, props));
  });
};

export { Radar$1 as Radar, RadarDefaultProps, RadarDots, RadarPropTypes, ResponsiveRadar };
