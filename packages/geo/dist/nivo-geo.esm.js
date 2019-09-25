import React, { useMemo, memo, useCallback, Fragment, useRef, useEffect } from 'react';
import { useTheme, guessQuantizeColorScale, quantizeColorScalePropType, withContainer, useDimensions, SvgWrapper, ResponsiveWrapper, getRelativeCursor } from '@nivo/core';
import { BasicTooltip, useTooltip } from '@nivo/tooltip';
import PropTypes from 'prop-types';
import { useInheritedColor, inheritedColorPropType } from '@nivo/colors';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { format } from 'd3-format';
import { geoAzimuthalEqualArea, geoAzimuthalEquidistant, geoGnomonic, geoOrthographic, geoStereographic, geoEqualEarth, geoEquirectangular, geoMercator, geoTransverseMercator, geoNaturalEarth1, geoPath, geoGraticule, geoContains } from 'd3-geo';
import { useQuantizeColorScaleLegendData, BoxLegendSvg, renderLegendToCanvas } from '@nivo/legends';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var projectionById = {
  azimuthalEqualArea: geoAzimuthalEqualArea,
  azimuthalEquidistant: geoAzimuthalEquidistant,
  gnomonic: geoGnomonic,
  orthographic: geoOrthographic,
  stereographic: geoStereographic,
  equalEarth: geoEqualEarth,
  equirectangular: geoEquirectangular,
  mercator: geoMercator,
  transverseMercator: geoTransverseMercator,
  naturalEarth1: geoNaturalEarth1
};
var useGeoMap = function useGeoMap(_ref) {
  var width = _ref.width,
      height = _ref.height,
      projectionType = _ref.projectionType,
      projectionScale = _ref.projectionScale,
      projectionTranslation = _ref.projectionTranslation,
      projectionRotation = _ref.projectionRotation,
      fillColor = _ref.fillColor,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor;
  var projection = useMemo(function () {
    return projectionById[projectionType]().scale(projectionScale).translate([width * projectionTranslation[0], height * projectionTranslation[1]]).rotate(projectionRotation);
  }, [width, height, projectionType, projectionScale, projectionTranslation[0], projectionTranslation[1], projectionRotation[0], projectionRotation[1], projectionRotation[2]]);
  var path = useMemo(function () {
    return geoPath(projection);
  }, [projection]);
  var graticule = useMemo(function () {
    return geoGraticule();
  });
  var theme = useTheme();
  var getBorderWidth = useMemo(function () {
    return typeof borderWidth === 'function' ? borderWidth : function () {
      return borderWidth;
    };
  }, [borderWidth]);
  var getBorderColor = useInheritedColor(borderColor, theme);
  var getFillColor = useMemo(function () {
    return typeof fillColor === 'function' ? fillColor : function () {
      return fillColor;
    };
  }, [fillColor]);
  return {
    projection: projection,
    path: path,
    graticule: graticule,
    getBorderWidth: getBorderWidth,
    getBorderColor: getBorderColor,
    getFillColor: getFillColor
  };
};
var useChoropleth = function useChoropleth(_ref2) {
  var features = _ref2.features,
      data = _ref2.data,
      match = _ref2.match,
      label = _ref2.label,
      value = _ref2.value,
      valueFormat = _ref2.valueFormat,
      colors = _ref2.colors,
      unknownColor = _ref2.unknownColor,
      domain = _ref2.domain;
  var findMatchingDatum = useMemo(function () {
    if (_isFunction(match)) return match;
    return function (feature, datum) {
      var featureKey = _get(feature, match);
      var datumKey = _get(datum, match);
      return featureKey && featureKey === datumKey;
    };
  }, [match]);
  var getLabel = useMemo(function () {
    return _isFunction(label) ? label : function (datum) {
      return _get(datum, label);
    };
  }, [label]);
  var getValue = useMemo(function () {
    return _isFunction(value) ? value : function (datum) {
      return _get(datum, value);
    };
  }, [value]);
  var valueFormatter = useMemo(function () {
    if (valueFormat === undefined) return function (d) {
      return d;
    };
    if (_isFunction(valueFormat)) return valueFormat;
    return format(valueFormat);
  }, [valueFormat]);
  var colorScale = useMemo(function () {
    return guessQuantizeColorScale(colors).domain(domain);
  }, [colors]);
  var getFillColor = useMemo(function () {
    return function (feature) {
      if (feature.value === undefined) return unknownColor;
      return colorScale(feature.value);
    };
  }, [colorScale, unknownColor]);
  var boundFeatures = useMemo(function () {
    return features.map(function (feature) {
      var datum = data.find(function (datum) {
        return findMatchingDatum(feature, datum);
      });
      var datumValue = getValue(datum);
      if (datum) {
        var featureWithData = _objectSpread({}, feature, {
          data: datum,
          value: datumValue,
          formattedValue: valueFormatter(datumValue)
        });
        featureWithData.color = getFillColor(featureWithData);
        featureWithData.label = getLabel(featureWithData);
        return featureWithData;
      }
      return feature;
    });
  }, [features, data, findMatchingDatum, getValue, valueFormatter, getFillColor]);
  var legendData = useQuantizeColorScaleLegendData({
    scale: colorScale,
    valueFormat: valueFormatter
  });
  return {
    colorScale: colorScale,
    getFillColor: getFillColor,
    boundFeatures: boundFeatures,
    valueFormatter: valueFormatter,
    legendData: legendData
  };
};

var ChoroplethTooltip = memo(function (_ref) {
  var feature = _ref.feature;
  if (feature.data === undefined) return null;
  return React.createElement(BasicTooltip, {
    id: feature.label,
    color: feature.color,
    enableChip: true,
    value: feature.formattedValue
  });
});
ChoroplethTooltip.propTypes = {
  feature: PropTypes.object.isRequired
};
ChoroplethTooltip.displayName = 'ChoroplethTooltip';

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var commonPropTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Feature']).isRequired,
    properties: PropTypes.object,
    geometry: PropTypes.object.isRequired
  })).isRequired,
  projectionType: PropTypes.oneOf(Object.keys(projectionById)).isRequired,
  projectionScale: PropTypes.number.isRequired,
  projectionTranslation: PropTypes.arrayOf(PropTypes.number).isRequired,
  projectionRotation: PropTypes.arrayOf(PropTypes.number).isRequired,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  borderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  borderColor: inheritedColorPropType.isRequired,
  enableGraticule: PropTypes.bool.isRequired,
  graticuleLineWidth: PropTypes.number.isRequired,
  graticuleLineColor: PropTypes.string.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.any,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['graticule', 'features']), PropTypes.func])).isRequired
};
var GeoMapPropTypes = _objectSpread$1({}, commonPropTypes);
var GeoMapCanvasPropTypes = _objectSpread$1({
  pixelRatio: PropTypes.number.isRequired
}, commonPropTypes);
var commonChoroplethPropTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  valueFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  colors: quantizeColorScalePropType.isRequired,
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  unknownColor: PropTypes.string.isRequired,
  layers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(['graticule', 'features', 'legends']), PropTypes.func])).isRequired
};
var ChoroplethPropTypes = _objectSpread$1({}, GeoMapPropTypes, commonChoroplethPropTypes);
var ChoroplethCanvasPropTypes = _objectSpread$1({}, GeoMapCanvasPropTypes, commonChoroplethPropTypes);
var commonDefaultProps = {
  projectionType: 'mercator',
  projectionScale: 100,
  projectionTranslation: [0.5, 0.5],
  projectionRotation: [0, 0, 0],
  enableGraticule: false,
  graticuleLineWidth: 0.5,
  graticuleLineColor: '#999999',
  fillColor: '#dddddd',
  borderWidth: 0,
  borderColor: '#000000',
  isInteractive: true,
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onMouseMove: function onMouseMove() {},
  onClick: function onClick() {},
  layers: ['graticule', 'features'],
  legends: []
};
var GeoMapDefaultProps = _objectSpread$1({}, commonDefaultProps);
var GeoMapCanvasDefaultProps = _objectSpread$1({}, commonDefaultProps, {
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});
var commonChoroplethDefaultProps = {
  match: 'id',
  label: 'id',
  value: 'value',
  colors: 'PuBuGn',
  unknownColor: '#999',
  tooltip: ChoroplethTooltip,
  layers: ['graticule', 'features', 'legends']
};
var ChoroplethDefaultProps = _objectSpread$1({}, GeoMapDefaultProps, commonChoroplethDefaultProps);
var ChoroplethCanvasDefaultProps = _objectSpread$1({}, GeoMapCanvasDefaultProps, commonChoroplethDefaultProps);

var GeoGraticule = memo(function (_ref) {
  var path = _ref.path,
      graticule = _ref.graticule,
      lineWidth = _ref.lineWidth,
      lineColor = _ref.lineColor;
  return React.createElement("path", {
    fill: "none",
    strokeWidth: lineWidth,
    stroke: lineColor,
    d: path(graticule())
  });
});
GeoGraticule.propTypes = {
  path: PropTypes.func.isRequired,
  graticule: PropTypes.func.isRequired,
  lineWidth: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired
};
GeoGraticule.displayName = 'GeoGraticule';

var GeoMapFeature = memo(function (_ref) {
  var feature = _ref.feature,
      path = _ref.path,
      fillColor = _ref.fillColor,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      _onClick = _ref.onClick,
      _onMouseEnter = _ref.onMouseEnter,
      _onMouseMove = _ref.onMouseMove,
      _onMouseLeave = _ref.onMouseLeave;
  return React.createElement("path", {
    key: feature.id,
    fill: fillColor,
    strokeWidth: borderWidth,
    stroke: borderColor,
    strokeLinejoin: "bevel",
    d: path(feature),
    onMouseEnter: function onMouseEnter(event) {
      return _onMouseEnter(feature, event);
    },
    onMouseMove: function onMouseMove(event) {
      return _onMouseMove(feature, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return _onMouseLeave(feature, event);
    },
    onClick: function onClick(event) {
      return _onClick(feature, event);
    }
  });
});
GeoMapFeature.propTypes = {
  feature: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Feature']).isRequired,
    properties: PropTypes.object,
    geometry: PropTypes.object.isRequired
  }).isRequired,
  path: PropTypes.func.isRequired,
  fillColor: PropTypes.string.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
GeoMapFeature.displayName = 'GeoMapFeature';

var GeoMap = memo(function (props) {
  var width = props.width,
      height = props.height,
      partialMargin = props.margin,
      features = props.features,
      layers = props.layers,
      projectionType = props.projectionType,
      projectionScale = props.projectionScale,
      projectionTranslation = props.projectionTranslation,
      projectionRotation = props.projectionRotation,
      fillColor = props.fillColor,
      borderWidth = props.borderWidth,
      borderColor = props.borderColor,
      enableGraticule = props.enableGraticule,
      graticuleLineWidth = props.graticuleLineWidth,
      graticuleLineColor = props.graticuleLineColor,
      isInteractive = props.isInteractive,
      onClick = props.onClick,
      Tooltip = props.tooltip;
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useGeoMap = useGeoMap({
    width: width,
    height: height,
    projectionType: projectionType,
    projectionScale: projectionScale,
    projectionTranslation: projectionTranslation,
    projectionRotation: projectionRotation,
    fillColor: fillColor,
    borderWidth: borderWidth,
    borderColor: borderColor
  }),
      graticule = _useGeoMap.graticule,
      path = _useGeoMap.path,
      getFillColor = _useGeoMap.getFillColor,
      getBorderWidth = _useGeoMap.getBorderWidth,
      getBorderColor = _useGeoMap.getBorderColor;
  var theme = useTheme();
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleClick = useCallback(function (feature, event) {
    return isInteractive && onClick && onClick(feature, event);
  }, [isInteractive, onClick]);
  var handleMouseEnter = useCallback(function (feature, event) {
    return isInteractive && Tooltip && showTooltipFromEvent(React.createElement(Tooltip, {
      feature: feature
    }), event);
  }, [isInteractive, showTooltipFromEvent, Tooltip]);
  var handleMouseMove = useCallback(function (feature, event) {
    return isInteractive && Tooltip && showTooltipFromEvent(React.createElement(Tooltip, {
      feature: feature
    }), event);
  }, [isInteractive, showTooltipFromEvent, Tooltip]);
  var handleMouseLeave = useCallback(function () {
    return isInteractive && hideTooltip();
  }, [isInteractive, hideTooltip]);
  return React.createElement(SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    theme: theme
  }, layers.map(function (layer, i) {
    if (layer === 'graticule') {
      if (enableGraticule !== true) return null;
      return React.createElement(GeoGraticule, {
        key: "graticule",
        path: path,
        graticule: graticule,
        lineWidth: graticuleLineWidth,
        lineColor: graticuleLineColor
      });
    }
    if (layer === 'features') {
      return React.createElement(Fragment, {
        key: "features"
      }, features.map(function (feature) {
        return React.createElement(GeoMapFeature, {
          key: feature.id,
          feature: feature,
          path: path,
          fillColor: getFillColor(feature),
          borderWidth: getBorderWidth(feature),
          borderColor: getBorderColor(feature),
          onMouseEnter: handleMouseEnter,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
          onClick: handleClick
        });
      }));
    }
    return React.createElement(Fragment, {
      key: i
    }, layer(props));
  }));
});
GeoMap.displayName = 'GeoMap';
GeoMap.propTypes = GeoMapPropTypes;
GeoMap.defaultProps = GeoMapDefaultProps;
var GeoMap$1 = withContainer(GeoMap);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ResponsiveGeoMap = function ResponsiveGeoMap(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(GeoMap$1, _extends({
      width: width,
      height: height
    }, props));
  });
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var getFeatureFromMouseEvent = function getFeatureFromMouseEvent(event, el, features, projection) {
  var _getRelativeCursor = getRelativeCursor(el, event),
      _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
      x = _getRelativeCursor2[0],
      y = _getRelativeCursor2[1];
  return features.find(function (f) {
    return geoContains(f, projection.invert([x, y]));
  });
};
var GeoMapCanvas = memo(function (props) {
  var width = props.width,
      height = props.height,
      partialMargin = props.margin,
      pixelRatio = props.pixelRatio,
      features = props.features,
      layers = props.layers,
      projectionType = props.projectionType,
      projectionScale = props.projectionScale,
      projectionTranslation = props.projectionTranslation,
      projectionRotation = props.projectionRotation,
      fillColor = props.fillColor,
      borderWidth = props.borderWidth,
      borderColor = props.borderColor,
      enableGraticule = props.enableGraticule,
      graticuleLineWidth = props.graticuleLineWidth,
      graticuleLineColor = props.graticuleLineColor,
      isInteractive = props.isInteractive,
      onClick = props.onClick,
      onMouseMove = props.onMouseMove,
      Tooltip = props.tooltip;
  var canvasEl = useRef(null);
  var theme = useTheme();
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useGeoMap = useGeoMap({
    width: width,
    height: height,
    projectionType: projectionType,
    projectionScale: projectionScale,
    projectionTranslation: projectionTranslation,
    projectionRotation: projectionRotation,
    fillColor: fillColor,
    borderWidth: borderWidth,
    borderColor: borderColor
  }),
      projection = _useGeoMap.projection,
      graticule = _useGeoMap.graticule,
      path = _useGeoMap.path,
      getFillColor = _useGeoMap.getFillColor,
      getBorderWidth = _useGeoMap.getBorderWidth,
      getBorderColor = _useGeoMap.getBorderColor;
  useEffect(function () {
    if (!canvasEl) return;
    canvasEl.current.width = outerWidth * pixelRatio;
    canvasEl.current.height = outerHeight * pixelRatio;
    var ctx = canvasEl.current.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, outerWidth, outerHeight);
    ctx.translate(margin.left, margin.top);
    path.context(ctx);
    layers.forEach(function (layer) {
      if (layer === 'graticule') {
        if (enableGraticule === true) {
          ctx.lineWidth = graticuleLineWidth;
          ctx.strokeStyle = graticuleLineColor;
          ctx.beginPath();
          path(graticule());
          ctx.stroke();
        }
      } else if (layer === 'features') {
        features.forEach(function (feature) {
          ctx.beginPath();
          path(feature);
          ctx.fillStyle = getFillColor(feature);
          ctx.fill();
          var borderWidth = getBorderWidth(feature);
          if (borderWidth > 0) {
            ctx.strokeStyle = getBorderColor(feature);
            ctx.lineWidth = borderWidth;
            ctx.stroke();
          }
        });
      } else {
        layer(ctx, props);
      }
    });
  }, [canvasEl, outerWidth, outerHeight, margin, pixelRatio, theme, path, graticule, getFillColor, getBorderWidth, getBorderColor, features, layers]);
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseMove = useCallback(function () {
    if (!isInteractive || !Tooltip) return;
    var feature = getFeatureFromMouseEvent(event, canvasEl.current, features, projection);
    if (feature) {
      showTooltipFromEvent(React.createElement(Tooltip, {
        feature: feature
      }), event);
    } else {
      hideTooltip();
    }
    onMouseMove && onMouseMove(feature || null, event);
  }, [showTooltipFromEvent, hideTooltip, isInteractive, Tooltip, canvasEl, features, projection]);
  var handleMouseLeave = useCallback(function () {
    return isInteractive && hideTooltip();
  }, [isInteractive, hideTooltip]);
  var handleClick = useCallback(function () {
    if (!isInteractive || !onClick) return;
    var feature = getFeatureFromMouseEvent(event, canvasEl.current, features, projection);
    if (feature) {
      onClick(feature, event);
    }
  }, [isInteractive, canvasEl, features, projection, onClick]);
  return React.createElement("canvas", {
    ref: canvasEl,
    width: outerWidth * pixelRatio,
    height: outerHeight * pixelRatio,
    style: {
      width: outerWidth,
      height: outerHeight,
      cursor: isInteractive ? 'auto' : 'normal'
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  });
});
GeoMapCanvas.displatName = 'GeoMapCanvas';
GeoMapCanvas.propTypes = GeoMapCanvasPropTypes;
GeoMapCanvas.defaultProps = GeoMapCanvasDefaultProps;
var GeoMapCanvas$1 = withContainer(GeoMapCanvas);

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var ResponsiveGeoMapCanvas = function ResponsiveGeoMapCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(GeoMapCanvas$1, _extends$1({
      width: width,
      height: height
    }, props));
  });
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var Choropleth = memo(function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      features = _ref.features,
      data = _ref.data,
      match = _ref.match,
      label = _ref.label,
      value = _ref.value,
      valueFormat = _ref.valueFormat,
      projectionType = _ref.projectionType,
      projectionScale = _ref.projectionScale,
      projectionTranslation = _ref.projectionTranslation,
      projectionRotation = _ref.projectionRotation,
      colors = _ref.colors,
      domain = _ref.domain,
      unknownColor = _ref.unknownColor,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      enableGraticule = _ref.enableGraticule,
      graticuleLineWidth = _ref.graticuleLineWidth,
      graticuleLineColor = _ref.graticuleLineColor,
      layers = _ref.layers,
      legends = _ref.legends,
      isInteractive = _ref.isInteractive,
      onClick = _ref.onClick,
      Tooltip = _ref.tooltip;
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useGeoMap = useGeoMap({
    width: width,
    height: height,
    projectionType: projectionType,
    projectionScale: projectionScale,
    projectionTranslation: projectionTranslation,
    projectionRotation: projectionRotation,
    fillColor: function fillColor() {},
    borderWidth: borderWidth,
    borderColor: borderColor
  }),
      graticule = _useGeoMap.graticule,
      path = _useGeoMap.path,
      getBorderWidth = _useGeoMap.getBorderWidth,
      getBorderColor = _useGeoMap.getBorderColor;
  var _useChoropleth = useChoropleth({
    features: features,
    data: data,
    match: match,
    label: label,
    value: value,
    valueFormat: valueFormat,
    colors: colors,
    unknownColor: unknownColor,
    domain: domain
  }),
      getFillColor = _useChoropleth.getFillColor,
      boundFeatures = _useChoropleth.boundFeatures,
      legendData = _useChoropleth.legendData;
  var theme = useTheme();
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleClick = useCallback(function (feature, event) {
    return isInteractive && onClick && onClick(feature, event);
  }, [isInteractive, onClick]);
  var handleMouseEnter = useCallback(function (feature, event) {
    return isInteractive && Tooltip && showTooltipFromEvent(React.createElement(Tooltip, {
      feature: feature
    }), event);
  }, [isInteractive, showTooltipFromEvent, Tooltip]);
  var handleMouseMove = useCallback(function (feature, event) {
    return isInteractive && Tooltip && showTooltipFromEvent(React.createElement(Tooltip, {
      feature: feature
    }), event);
  }, [isInteractive, showTooltipFromEvent, Tooltip]);
  var handleMouseLeave = useCallback(function () {
    return isInteractive && hideTooltip();
  }, [isInteractive, hideTooltip]);
  return React.createElement(SvgWrapper, {
    width: outerWidth,
    height: outerHeight,
    margin: margin,
    theme: theme
  }, layers.map(function (layer, i) {
    if (layer === 'graticule') {
      if (enableGraticule !== true) return null;
      return React.createElement(GeoGraticule, {
        key: "graticule",
        path: path,
        graticule: graticule,
        lineWidth: graticuleLineWidth,
        lineColor: graticuleLineColor
      });
    }
    if (layer === 'features') {
      return React.createElement(Fragment, {
        key: "features"
      }, boundFeatures.map(function (feature) {
        return React.createElement(GeoMapFeature, {
          key: feature.id,
          feature: feature,
          path: path,
          fillColor: getFillColor(feature),
          borderWidth: getBorderWidth(feature),
          borderColor: getBorderColor(feature),
          onMouseEnter: handleMouseEnter,
          onMouseMove: handleMouseMove,
          onMouseLeave: handleMouseLeave,
          onClick: handleClick
        });
      }));
    }
    if (layer === 'legends') {
      return legends.map(function (legend, i) {
        return React.createElement(BoxLegendSvg, _extends$2({
          key: i,
          containerWidth: width,
          containerHeight: height,
          data: legendData
        }, legend));
      });
    }
    return React.createElement(Fragment, {
      key: i
    }, layer({}));
  }));
});
Choropleth.displayName = 'Choropleth';
Choropleth.propTypes = ChoroplethPropTypes;
Choropleth.defaultProps = ChoroplethDefaultProps;
var Choropleth$1 = withContainer(Choropleth);

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var ResponsiveChoropleth = function ResponsiveChoropleth(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(Choropleth$1, _extends$3({
      width: width,
      height: height
    }, props));
  });
};

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit$1(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
var getFeatureFromMouseEvent$1 = function getFeatureFromMouseEvent(event, el, features, projection) {
  var _getRelativeCursor = getRelativeCursor(el, event),
      _getRelativeCursor2 = _slicedToArray$1(_getRelativeCursor, 2),
      x = _getRelativeCursor2[0],
      y = _getRelativeCursor2[1];
  return features.find(function (f) {
    return geoContains(f, projection.invert([x, y]));
  });
};
var ChoroplethCanvas = memo(function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      partialMargin = _ref.margin,
      pixelRatio = _ref.pixelRatio,
      features = _ref.features,
      data = _ref.data,
      match = _ref.match,
      label = _ref.label,
      value = _ref.value,
      valueFormat = _ref.valueFormat,
      projectionType = _ref.projectionType,
      projectionScale = _ref.projectionScale,
      projectionTranslation = _ref.projectionTranslation,
      projectionRotation = _ref.projectionRotation,
      colors = _ref.colors,
      domain = _ref.domain,
      unknownColor = _ref.unknownColor,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      enableGraticule = _ref.enableGraticule,
      graticuleLineWidth = _ref.graticuleLineWidth,
      graticuleLineColor = _ref.graticuleLineColor,
      layers = _ref.layers,
      legends = _ref.legends,
      isInteractive = _ref.isInteractive,
      onClick = _ref.onClick,
      onMouseMove = _ref.onMouseMove,
      Tooltip = _ref.tooltip;
  var canvasEl = useRef(null);
  var theme = useTheme();
  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      outerWidth = _useDimensions.outerWidth,
      outerHeight = _useDimensions.outerHeight;
  var _useGeoMap = useGeoMap({
    width: width,
    height: height,
    projectionType: projectionType,
    projectionScale: projectionScale,
    projectionTranslation: projectionTranslation,
    projectionRotation: projectionRotation,
    fillColor: function fillColor() {},
    borderWidth: borderWidth,
    borderColor: borderColor
  }),
      projection = _useGeoMap.projection,
      graticule = _useGeoMap.graticule,
      path = _useGeoMap.path,
      getBorderWidth = _useGeoMap.getBorderWidth,
      getBorderColor = _useGeoMap.getBorderColor;
  var _useChoropleth = useChoropleth({
    features: features,
    data: data,
    match: match,
    label: label,
    value: value,
    valueFormat: valueFormat,
    colors: colors,
    unknownColor: unknownColor,
    domain: domain
  }),
      getFillColor = _useChoropleth.getFillColor,
      boundFeatures = _useChoropleth.boundFeatures,
      legendData = _useChoropleth.legendData;
  useEffect(function () {
    if (!canvasEl) return;
    canvasEl.current.width = outerWidth * pixelRatio;
    canvasEl.current.height = outerHeight * pixelRatio;
    var ctx = canvasEl.current.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, outerWidth, outerHeight);
    ctx.translate(margin.left, margin.top);
    path.context(ctx);
    layers.forEach(function (layer) {
      if (layer === 'graticule') {
        if (enableGraticule === true) {
          ctx.lineWidth = graticuleLineWidth;
          ctx.strokeStyle = graticuleLineColor;
          ctx.beginPath();
          path(graticule());
          ctx.stroke();
        }
      } else if (layer === 'features') {
        boundFeatures.forEach(function (feature) {
          ctx.beginPath();
          path(feature);
          ctx.fillStyle = getFillColor(feature);
          ctx.fill();
          var borderWidth = getBorderWidth(feature);
          if (borderWidth > 0) {
            ctx.strokeStyle = getBorderColor(feature);
            ctx.lineWidth = borderWidth;
            ctx.stroke();
          }
        });
      } else if (layer === 'legends') {
        legends.forEach(function (legend) {
          renderLegendToCanvas(ctx, _objectSpread$2({}, legend, {
            data: legendData,
            containerWidth: width,
            containerHeight: height,
            theme: theme
          }));
        });
      }
    });
  }, [canvasEl, outerWidth, outerHeight, margin, pixelRatio, theme, path, graticule, getFillColor, getBorderWidth, getBorderColor, boundFeatures, legends, layers]);
  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;
  var handleMouseMove = useCallback(function () {
    if (!isInteractive || !Tooltip) return;
    var feature = getFeatureFromMouseEvent$1(event, canvasEl.current, boundFeatures, projection);
    if (feature) {
      showTooltipFromEvent(React.createElement(Tooltip, {
        feature: feature
      }), event);
    } else {
      hideTooltip();
    }
    onMouseMove && onMouseMove(feature || null, event);
  }, [showTooltipFromEvent, hideTooltip, isInteractive, Tooltip, canvasEl, boundFeatures, projection]);
  var handleMouseLeave = useCallback(function () {
    return isInteractive && hideTooltip();
  }, [isInteractive, hideTooltip]);
  var handleClick = useCallback(function () {
    if (!isInteractive || !onClick) return;
    var feature = getFeatureFromMouseEvent$1(event, canvasEl.current, boundFeatures, projection);
    if (feature) {
      onClick(feature, event);
    }
  }, [isInteractive, canvasEl, boundFeatures, projection, onClick]);
  return React.createElement("canvas", {
    ref: canvasEl,
    width: outerWidth * pixelRatio,
    height: outerHeight * pixelRatio,
    style: {
      width: outerWidth,
      height: outerHeight,
      cursor: isInteractive ? 'auto' : 'normal'
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick
  });
});
ChoroplethCanvas.displayName = 'ChoroplethCanvas';
ChoroplethCanvas.propTypes = ChoroplethCanvasPropTypes;
ChoroplethCanvas.defaultProps = ChoroplethCanvasDefaultProps;
var ChoroplethCanvas$1 = withContainer(ChoroplethCanvas);

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
var ResponsiveChoroplethCanvas = function ResponsiveChoroplethCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(ChoroplethCanvas$1, _extends$4({
      width: width,
      height: height
    }, props));
  });
};

export { Choropleth$1 as Choropleth, ChoroplethCanvas$1 as ChoroplethCanvas, ChoroplethCanvasDefaultProps, ChoroplethCanvasPropTypes, ChoroplethDefaultProps, ChoroplethPropTypes, GeoMap$1 as GeoMap, GeoMapCanvas$1 as GeoMapCanvas, GeoMapCanvasDefaultProps, GeoMapCanvasPropTypes, GeoMapDefaultProps, GeoMapPropTypes, ResponsiveChoropleth, ResponsiveChoroplethCanvas, ResponsiveGeoMap, ResponsiveGeoMapCanvas, projectionById, useChoropleth, useGeoMap };
