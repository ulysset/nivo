import React, { Component } from 'react';
import { spring, TransitionMotion } from 'react-motion';
import { themePropType, treeMapTilePropType, defsPropTypes, noop, withHierarchy, withDimensions, withTheme, withMotion, getAccessorFor, getLabelGenerator, treeMapTileFromProp, bindDefs, Container, SvgWrapper, ResponsiveWrapper, getRelativeCursor, isCursorInRect, degreesToRadians } from '@nivo/core';
import { ordinalColorsPropType, colorPropertyAccessorPropType, inheritedColorPropType, getOrdinalColorScale, getInheritedColorGenerator, interpolateColor, getInterpolatedColor } from '@nivo/colors';
import PropTypes from 'prop-types';
import { treemap } from 'd3-hierarchy';
import cloneDeep from 'lodash/cloneDeep';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { BasicTooltip } from '@nivo/tooltip';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var TreeMapNode = function TreeMapNode(_ref) {
  var style = _ref.style,
      node = _ref.node,
      handlers = _ref.handlers,
      theme = _ref.theme;
  if (style.width <= 0 || style.height <= 0) return null;
  var rotate = node.label && style.orientLabel && style.height > style.width;
  return React.createElement("g", {
    transform: "translate(".concat(style.x, ",").concat(style.y, ")")
  }, React.createElement("rect", _extends({
    width: style.width,
    height: style.height,
    fill: style.fill ? style.fill : style.color,
    strokeWidth: style.borderWidth,
    stroke: style.borderColor
  }, handlers)), node.label && React.createElement("text", {
    textAnchor: "middle",
    dominantBaseline: "central",
    style: _objectSpread({}, theme.labels.text, {
      fill: style.labelTextColor,
      pointerEvents: 'none'
    }),
    transform: "translate(".concat(style.width / 2, ",").concat(style.height / 2, ") rotate(").concat(rotate ? -90 : 0, ")")
  }, node.label));
};
TreeMapNode.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    labelTextColor: PropTypes.string.isRequired,
    orientLabel: PropTypes.bool.isRequired
  }).isRequired,
  handlers: PropTypes.object.isRequired,
  theme: themePropType.isRequired
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var TreeMapHtmlNode = function TreeMapHtmlNode(_ref) {
  var node = _ref.node,
      style = _ref.style,
      handlers = _ref.handlers;
  if (style.width <= 0 || style.height <= 0) return null;
  var rotate = node.label && style.orientLabel && style.height > style.width;
  return React.createElement("div", _extends$1({
    id: (node.data && node.data.id ? node.data.id :
    node.id).replace(/[^\w]/gi, '-'),
    style: {
      boxSizing: 'border-box',
      position: 'absolute',
      top: style.y,
      left: style.x,
      width: style.width,
      height: style.height,
      background: style.color,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: style.borderWidth,
      borderStyle: 'solid',
      borderColor: style.borderColor
    }
  }, handlers), node.label !== false && React.createElement("span", {
    style: {
      color: style.labelTextColor,
      transform: "rotate(".concat(rotate ? '-90' : '0', "deg)"),
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      userSelect: 'none'
    }
  }, node.label));
};
TreeMapHtmlNode.propTypes = {
  node: PropTypes.object.isRequired,
  style: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    labelTextColor: PropTypes.string.isRequired,
    orientLabel: PropTypes.bool.isRequired
  }).isRequired,
  handlers: PropTypes.object.isRequired
};

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var commonPropTypes = {
  identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  colors: ordinalColorsPropType.isRequired,
  colorBy: colorPropertyAccessorPropType.isRequired,
  leavesOnly: PropTypes.bool.isRequired,
  tile: treeMapTilePropType.isRequired,
  innerPadding: PropTypes.number.isRequired,
  outerPadding: PropTypes.number.isRequired,
  enableLabel: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelFormat: PropTypes.string,
  labelSkipSize: PropTypes.number.isRequired,
  labelTextColor: inheritedColorPropType.isRequired,
  orientLabel: PropTypes.bool.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: inheritedColorPropType.isRequired,
  isInteractive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.func
};
var TreeMapPropTypes = _objectSpread$1({}, commonPropTypes, {
  nodeComponent: PropTypes.func.isRequired
}, defsPropTypes);
var TreeMapHtmlPropTypes = _objectSpread$1({}, commonPropTypes, {
  nodeComponent: PropTypes.func.isRequired
});
var TreeMapCanvasPropTypes = _objectSpread$1({}, commonPropTypes, {
  pixelRatio: PropTypes.number.isRequired
});
var commonDefaultProps = {
  identity: 'id',
  tile: 'squarify',
  leavesOnly: false,
  colors: {
    scheme: 'nivo'
  },
  colorBy: 'depth',
  enableLabel: true,
  label: 'id',
  labelSkipSize: 0,
  labelTextColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  orientLabel: true,
  innerPadding: 0,
  outerPadding: 0,
  borderWidth: 0,
  borderColor: {
    from: 'color'
  },
  isInteractive: true,
  onClick: noop
};
var TreeMapDefaultProps = _objectSpread$1({}, commonDefaultProps, {
  nodeComponent: TreeMapNode,
  defs: [],
  fill: []
});
var TreeMapHtmlDefaultProps = _objectSpread$1({}, commonDefaultProps, {
  nodeComponent: TreeMapHtmlNode
});
var TreeMapCanvasDefaultProps = _objectSpread$1({}, commonDefaultProps, {
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

var props = /*#__PURE__*/Object.freeze({
    TreeMapPropTypes: TreeMapPropTypes,
    TreeMapHtmlPropTypes: TreeMapHtmlPropTypes,
    TreeMapCanvasPropTypes: TreeMapCanvasPropTypes,
    TreeMapDefaultProps: TreeMapDefaultProps,
    TreeMapHtmlDefaultProps: TreeMapHtmlDefaultProps,
    TreeMapCanvasDefaultProps: TreeMapCanvasDefaultProps
});

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var computeNodePath = function computeNodePath(node, getIdentity) {
  return node.ancestors().map(function (ancestor) {
    return getIdentity(ancestor.data);
  }).join('.');
};
var commonEnhancers = [withHierarchy(), withDimensions(), withTheme(), withMotion(), withPropsOnChange(['colors', 'colorBy'], function (_ref) {
  var colors = _ref.colors,
      colorBy = _ref.colorBy;
  return {
    getColor: getOrdinalColorScale(colors, colorBy)
  };
}), withPropsOnChange(['identity'], function (_ref2) {
  var identity = _ref2.identity;
  return {
    getIdentity: getAccessorFor(identity)
  };
}), withPropsOnChange(['borderColor', 'theme'], function (_ref3) {
  var borderColor = _ref3.borderColor,
      theme = _ref3.theme;
  return {
    getBorderColor: getInheritedColorGenerator(borderColor, theme)
  };
}), withPropsOnChange(['label', 'labelFormat'], function (_ref4) {
  var label = _ref4.label,
      labelFormat = _ref4.labelFormat;
  return {
    getLabel: getLabelGenerator(label, labelFormat)
  };
}), withPropsOnChange(['labelTextColor', 'theme'], function (_ref5) {
  var labelTextColor = _ref5.labelTextColor,
      theme = _ref5.theme;
  return {
    getLabelTextColor: getInheritedColorGenerator(labelTextColor, theme)
  };
}), withPropsOnChange(['width', 'height', 'tile', 'innerPadding', 'outerPadding'], function (_ref6) {
  var width = _ref6.width,
      height = _ref6.height,
      tile = _ref6.tile,
      innerPadding = _ref6.innerPadding,
      outerPadding = _ref6.outerPadding;
  return {
    treemap: treemap().size([width, height]).tile(treeMapTileFromProp(tile)).round(true).paddingInner(innerPadding).paddingOuter(outerPadding)
  };
}), withPropsOnChange(['root', 'treemap', 'leavesOnly', 'getIdentity', 'getColor'], function (_ref7) {
  var _root = _ref7.root,
      treemap = _ref7.treemap,
      leavesOnly = _ref7.leavesOnly,
      getIdentity = _ref7.getIdentity,
      getColor = _ref7.getColor;
  var root = cloneDeep(_root);
  treemap(root);
  var nodes = leavesOnly ? root.leaves() : root.descendants();
  nodes = nodes.map(function (d) {
    d.path = computeNodePath(d, getIdentity);
    d.nodeHeight = d.height;
    d.x = d.x0;
    d.y = d.y0;
    d.width = d.x1 - d.x0;
    d.height = d.y1 - d.y0;
    d.data.color = d.color = getColor(_objectSpread$2({}, d.data, {
      depth: d.depth
    }));
    d.data.id = d.id = getIdentity(d.data);
    d.data.value = d.value;
    return d;
  });
  return {
    nodes: nodes
  };
}), withPropsOnChange(['enableLabel', 'nodes', 'getLabel', 'labelSkipSize'], function (_ref8) {
  var enableLabel = _ref8.enableLabel,
      nodes = _ref8.nodes,
      getLabel = _ref8.getLabel,
      labelSkipSize = _ref8.labelSkipSize;
  if (!enableLabel) return;
  var nodesWithLabel = nodes.map(function (node) {
    if (node.nodeHeight > 0 || labelSkipSize !== 0 && Math.min(node.width, node.height) <= labelSkipSize) return node;
    return _objectSpread$2({}, node, {
      label: getLabel(node.data)
    });
  });
  return {
    nodes: nodesWithLabel
  };
})];
var svgEnhancers = [withPropsOnChange(['nodes', 'defs', 'fill'], function (_ref9) {
  var nodes = _ref9.nodes,
      defs = _ref9.defs,
      fill = _ref9.fill;
  return {
    defs: bindDefs(defs, nodes, fill, {
      targetKey: 'fill'
    })
  };
})];
var enhance = (function (Component) {
  var implDefaultProps = props["".concat(Component.displayName, "DefaultProps")];
  switch (Component.displayName) {
    case 'TreeMap':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, svgEnhancers, [withMotion(), pure]))(Component);
    case 'TreeMapHtml':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [withMotion(), pure]))(Component);
    case 'TreeMapCanvas':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [pure]))(Component);
  }
  return Component;
});

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }
function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var nodeWillEnter = function nodeWillEnter(_ref) {
  var node = _ref.data;
  return _objectSpread$3({
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height
  }, interpolateColor(node.color));
};
var nodeWillLeave = function nodeWillLeave(springConfig) {
  return function (_ref2) {
    var node = _ref2.data;
    return _objectSpread$3({
      x: spring(node.x + node.width / 2, springConfig),
      y: spring(node.y + node.height / 2, springConfig),
      width: spring(0, springConfig),
      height: spring(0, springConfig)
    }, interpolateColor(node.color, springConfig));
  };
};

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } return target; }
function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var TreeMapNodeTooltip = function TreeMapNodeTooltip(_ref) {
  var node = _ref.node,
      theme = _ref.theme,
      tooltip = _ref.tooltip;
  return React.createElement(BasicTooltip, {
    id: node.id,
    value: node.value,
    enableChip: true,
    color: node.color,
    theme: theme,
    renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread$4({
      node: node
    }, node)) : null
  });
};
TreeMapNodeTooltip.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object.isRequired,
  tooltip: PropTypes.func
};
var TreeMapNodeTooltip$1 = pure(TreeMapNodeTooltip);

var getNodeHandlers = function getNodeHandlers(node, _ref) {
  var isInteractive = _ref.isInteractive,
      _onClick = _ref.onClick,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip,
      theme = _ref.theme,
      tooltip = _ref.tooltip;
  if (!isInteractive) return {};
  var handleTooltip = function handleTooltip(e) {
    showTooltip(React.createElement(TreeMapNodeTooltip$1, {
      node: node,
      theme: theme,
      tooltip: tooltip
    }), e);
  };
  return {
    onMouseEnter: handleTooltip,
    onMouseMove: handleTooltip,
    onMouseLeave: hideTooltip,
    onClick: function onClick(event) {
      return _onClick(node, event);
    }
  };
};

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } return target; }
function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var TreeMap = function TreeMap(_ref) {
  var nodes = _ref.nodes,
      nodeComponent = _ref.nodeComponent,
      margin = _ref.margin,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      theme = _ref.theme,
      borderWidth = _ref.borderWidth,
      getBorderColor = _ref.getBorderColor,
      defs = _ref.defs,
      getLabelTextColor = _ref.getLabelTextColor,
      orientLabel = _ref.orientLabel,
      animate = _ref.animate,
      motionStiffness = _ref.motionStiffness,
      motionDamping = _ref.motionDamping,
      isInteractive = _ref.isInteractive,
      onClick = _ref.onClick,
      tooltipFormat = _ref.tooltipFormat,
      tooltip = _ref.tooltip;
  var springConfig = {
    stiffness: motionStiffness,
    damping: motionDamping
  };
  var getHandlers = function getHandlers(node, showTooltip, hideTooltip) {
    return getNodeHandlers(node, {
      isInteractive: isInteractive,
      onClick: onClick,
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      theme: theme,
      tooltipFormat: tooltipFormat,
      tooltip: tooltip
    });
  };
  return React.createElement(Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: animate,
    motionDamping: motionDamping,
    motionStiffness: motionStiffness
  }, function (_ref2) {
    var showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip;
    return React.createElement(SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      defs: defs,
      theme: theme
    }, !animate && React.createElement("g", null, nodes.map(function (node) {
      return React.createElement(nodeComponent, {
        key: node.path,
        node: node,
        style: {
          fill: node.fill,
          x: node.x0,
          y: node.y0,
          width: node.width,
          height: node.height,
          color: node.color,
          borderWidth: borderWidth,
          borderColor: getBorderColor(node),
          labelTextColor: getLabelTextColor(node),
          orientLabel: orientLabel
        },
        handlers: getHandlers(node, showTooltip, hideTooltip),
        theme: theme
      });
    })), animate && React.createElement(TransitionMotion, {
      willEnter: nodeWillEnter,
      willLeave: nodeWillLeave(springConfig),
      styles: nodes.map(function (node) {
        return {
          key: node.path,
          data: node,
          style: _objectSpread$5({
            x: spring(node.x, springConfig),
            y: spring(node.y, springConfig),
            width: spring(node.width, springConfig),
            height: spring(node.height, springConfig)
          }, interpolateColor(node.color, springConfig))
        };
      })
    }, function (interpolatedStyles) {
      return React.createElement("g", null, interpolatedStyles.map(function (_ref3) {
        var style = _ref3.style,
            node = _ref3.data;
        style.color = getInterpolatedColor(style);
        return React.createElement(nodeComponent, {
          key: node.path,
          node: node,
          style: _objectSpread$5({}, style, {
            fill: node.fill,
            borderWidth: borderWidth,
            borderColor: getBorderColor(style),
            labelTextColor: getLabelTextColor(style),
            orientLabel: orientLabel
          }),
          handlers: getHandlers(node, showTooltip, hideTooltip),
          theme: theme
        });
      }));
    }));
  });
};
TreeMap.propTypes = TreeMapPropTypes;
TreeMap.displayName = 'TreeMap';
var enhancedTreeMap = enhance(TreeMap);
enhancedTreeMap.displayName = 'TreeMap';

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var ResponsiveTreeMap = function ResponsiveTreeMap(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(enhancedTreeMap, _extends$2({
      width: width,
      height: height
    }, props));
  });
};

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } return target; }
function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var TreeMapHtml = function TreeMapHtml(_ref) {
  var nodes = _ref.nodes,
      nodeComponent = _ref.nodeComponent,
      margin = _ref.margin,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      theme = _ref.theme,
      borderWidth = _ref.borderWidth,
      getBorderColor = _ref.getBorderColor,
      getLabelTextColor = _ref.getLabelTextColor,
      orientLabel = _ref.orientLabel,
      animate = _ref.animate,
      motionStiffness = _ref.motionStiffness,
      motionDamping = _ref.motionDamping,
      isInteractive = _ref.isInteractive,
      onClick = _ref.onClick,
      tooltipFormat = _ref.tooltipFormat,
      tooltip = _ref.tooltip;
  var springConfig = {
    stiffness: motionStiffness,
    damping: motionDamping
  };
  var getHandlers = function getHandlers(node, showTooltip, hideTooltip) {
    return getNodeHandlers(node, {
      isInteractive: isInteractive,
      onClick: onClick,
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      theme: theme,
      tooltipFormat: tooltipFormat,
      tooltip: tooltip
    });
  };
  return React.createElement(Container, {
    theme: theme,
    animate: animate,
    motionDamping: motionDamping,
    motionStiffness: motionStiffness
  }, function (_ref2) {
    var showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip;
    return React.createElement("div", {
      style: {
        position: 'relative',
        width: outerWidth,
        height: outerHeight
      }
    }, !animate && React.createElement("div", {
      style: {
        position: 'absolute',
        top: margin.top,
        left: margin.left
      }
    }, nodes.map(function (node) {
      return React.createElement(nodeComponent, {
        key: node.path,
        node: node,
        style: {
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          color: node.color,
          borderWidth: borderWidth,
          borderColor: getBorderColor(node),
          labelTextColor: getLabelTextColor(node),
          orientLabel: orientLabel
        },
        handlers: getHandlers(node, showTooltip, hideTooltip)
      });
    })), animate && React.createElement(TransitionMotion, {
      willEnter: nodeWillEnter,
      willLeave: nodeWillLeave(springConfig),
      styles: nodes.map(function (node) {
        return {
          key: node.path,
          data: node,
          style: _objectSpread$6({
            x: spring(node.x, springConfig),
            y: spring(node.y, springConfig),
            width: spring(node.width, springConfig),
            height: spring(node.height, springConfig)
          }, interpolateColor(node.color, springConfig))
        };
      })
    }, function (interpolatedStyles) {
      return React.createElement("div", {
        style: {
          position: 'absolute',
          top: margin.top,
          left: margin.left
        }
      }, interpolatedStyles.map(function (_ref3) {
        var style = _ref3.style,
            node = _ref3.data;
        style.color = getInterpolatedColor(style);
        return React.createElement(nodeComponent, {
          key: node.path,
          node: node,
          style: _objectSpread$6({}, style, {
            fill: node.fill,
            borderWidth: borderWidth,
            borderColor: getBorderColor(style),
            labelTextColor: getLabelTextColor(style),
            orientLabel: orientLabel
          }),
          handlers: getHandlers(node, showTooltip, hideTooltip)
        });
      }));
    }));
  });
};
TreeMapHtml.propTypes = TreeMapHtmlPropTypes;
TreeMapHtml.displayName = 'TreeMapHtml';
var enhancedTreeMapHtml = enhance(TreeMapHtml);
enhancedTreeMapHtml.displayName = 'TreeMapHtml';

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var ResponsiveTreeMapHtml = function ResponsiveTreeMapHtml(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(enhancedTreeMapHtml, _extends$3({
      width: width,
      height: height
    }, props));
  });
};

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var findNodeUnderCursor = function findNodeUnderCursor(nodes, margin, x, y) {
  return nodes.find(function (node) {
    return isCursorInRect(node.x + margin.left, node.y + margin.top, node.width, node.height, x, y);
  });
};
var TreeMapCanvas =
function (_Component) {
  _inherits(TreeMapCanvas, _Component);
  function TreeMapCanvas() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, TreeMapCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TreeMapCanvas)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$7(_assertThisInitialized(_this), "handleMouseHover", function (showTooltip, hideTooltip) {
      return function (event) {
        var _this$props = _this.props,
            isInteractive = _this$props.isInteractive,
            nodes = _this$props.nodes,
            margin = _this$props.margin,
            theme = _this$props.theme;
        if (!isInteractive) return;
        var _getRelativeCursor = getRelativeCursor(_this.surface, event),
            _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
            x = _getRelativeCursor2[0],
            y = _getRelativeCursor2[1];
        var node = findNodeUnderCursor(nodes, margin, x, y);
        if (node !== undefined) {
          showTooltip(React.createElement(TreeMapNodeTooltip$1, {
            node: node,
            theme: theme
          }), event);
        } else {
          hideTooltip();
        }
      };
    });
    _defineProperty$7(_assertThisInitialized(_this), "handleMouseLeave", function (hideTooltip) {
      return function () {
        hideTooltip();
      };
    });
    _defineProperty$7(_assertThisInitialized(_this), "handleClick", function (event) {
      var _this$props2 = _this.props,
          isInteractive = _this$props2.isInteractive,
          nodes = _this$props2.nodes,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick;
      if (!isInteractive) return;
      var _getRelativeCursor3 = getRelativeCursor(_this.surface, event),
          _getRelativeCursor4 = _slicedToArray(_getRelativeCursor3, 2),
          x = _getRelativeCursor4[0],
          y = _getRelativeCursor4[1];
      var node = findNodeUnderCursor(nodes, margin, x, y);
      if (node !== undefined) onClick(node, event);
    });
    return _this;
  }
  _createClass(TreeMapCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.ctx = this.surface.getContext('2d');
      this.draw(this.props);
    }
  }, {
    key: "draw",
    value: function draw(props) {
      var _this2 = this;
      var nodes = props.nodes,
          pixelRatio = props.pixelRatio,
          margin = props.margin,
          outerWidth = props.outerWidth,
          outerHeight = props.outerHeight,
          borderWidth = props.borderWidth,
          getBorderColor = props.getBorderColor,
          enableLabel = props.enableLabel,
          getLabelTextColor = props.getLabelTextColor,
          orientLabel = props.orientLabel,
          theme = props.theme;
      this.surface.width = outerWidth * pixelRatio;
      this.surface.height = outerHeight * pixelRatio;
      this.ctx.scale(pixelRatio, pixelRatio);
      this.ctx.fillStyle = theme.background;
      this.ctx.fillRect(0, 0, outerWidth, outerHeight);
      this.ctx.translate(margin.left, margin.top);
      nodes.forEach(function (node) {
        _this2.ctx.fillStyle = node.color;
        _this2.ctx.fillRect(node.x, node.y, node.width, node.height);
        if (borderWidth > 0) {
          _this2.ctx.strokeStyle = getBorderColor(node);
          _this2.ctx.lineWidth = borderWidth;
          _this2.ctx.strokeRect(node.x, node.y, node.width, node.height);
        }
      });
      if (enableLabel) {
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = "".concat(theme.labels.text.fontSize, "px ").concat(theme.labels.text.fontFamily);
        nodes.filter(function (_ref) {
          var label = _ref.label;
          return label !== undefined;
        }).forEach(function (node) {
          var labelTextColor = getLabelTextColor(node);
          var rotate = orientLabel && node.height > node.width;
          _this2.ctx.save();
          _this2.ctx.translate(node.x + node.width / 2, node.y + node.height / 2);
          _this2.ctx.rotate(degreesToRadians(rotate ? -90 : 0));
          _this2.ctx.fillStyle = labelTextColor;
          _this2.ctx.fillText(node.label, 0, 0);
          _this2.ctx.restore();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props,
          outerWidth = _this$props3.outerWidth,
          outerHeight = _this$props3.outerHeight,
          pixelRatio = _this$props3.pixelRatio,
          isInteractive = _this$props3.isInteractive,
          theme = _this$props3.theme;
      return React.createElement(Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: false
      }, function (_ref2) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip;
        return React.createElement("canvas", {
          ref: function ref(surface) {
            _this3.surface = surface;
          },
          width: outerWidth * pixelRatio,
          height: outerHeight * pixelRatio,
          style: {
            width: outerWidth,
            height: outerHeight
          },
          onMouseEnter: _this3.handleMouseHover(showTooltip, hideTooltip),
          onMouseMove: _this3.handleMouseHover(showTooltip, hideTooltip),
          onMouseLeave: _this3.handleMouseLeave(hideTooltip),
          onClick: _this3.handleClick
        });
      });
    }
  }]);
  return TreeMapCanvas;
}(Component);
TreeMapCanvas.propTypes = TreeMapCanvasPropTypes;
TreeMapCanvas.displayName = 'TreeMapCanvas';
var enhancedTreeMapCanvas = enhance(TreeMapCanvas);
enhancedTreeMapCanvas.displayName = 'TreeMapCanvas';

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
var ResponsiveTreeMapCanvas = function ResponsiveTreeMapCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(enhancedTreeMapCanvas, _extends$4({
      width: width,
      height: height
    }, props));
  });
};

export { ResponsiveTreeMap, ResponsiveTreeMapCanvas, ResponsiveTreeMapHtml, enhancedTreeMap as TreeMap, enhancedTreeMapCanvas as TreeMapCanvas, TreeMapCanvasDefaultProps, TreeMapCanvasPropTypes, TreeMapDefaultProps, enhancedTreeMapHtml as TreeMapHtml, TreeMapHtmlDefaultProps, TreeMapHtmlPropTypes, TreeMapPropTypes };
