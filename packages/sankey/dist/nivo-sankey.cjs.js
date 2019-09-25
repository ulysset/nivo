'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _uniq = _interopDefault(require('lodash/uniq'));
var React = require('react');
var React__default = _interopDefault(React);
var core = require('@nivo/core');
var legends = require('@nivo/legends');
var PropTypes = _interopDefault(require('prop-types'));
var d3Sankey = require('d3-sankey');
var colors = require('@nivo/colors');
var pure = _interopDefault(require('recompose/pure'));
var _withPropsOnChange = _interopDefault(require('recompose/withPropsOnChange'));
var _withState = _interopDefault(require('recompose/withState'));
var _defaultProps = _interopDefault(require('recompose/defaultProps'));
var _compose = _interopDefault(require('recompose/compose'));
var _cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var reactMotion = require('react-motion');
var withHandlers = _interopDefault(require('recompose/withHandlers'));
var tooltip = require('@nivo/tooltip');
var d3Shape = require('d3-shape');

var sankeyAlignmentPropMapping = {
  center: d3Sankey.sankeyCenter,
  justify: d3Sankey.sankeyJustify,
  start: d3Sankey.sankeyLeft,
  end: d3Sankey.sankeyRight
};
var sankeyAlignmentPropKeys = Object.keys(sankeyAlignmentPropMapping);
var sankeyAlignmentPropType = PropTypes.oneOf(sankeyAlignmentPropKeys);
var sankeyAlignmentFromProp = function sankeyAlignmentFromProp(prop) {
  return sankeyAlignmentPropMapping[prop];
};
var SankeyPropTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })).isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })).isRequired
  }).isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  align: sankeyAlignmentPropType.isRequired,
  sort: PropTypes.oneOfType([PropTypes.oneOf(['auto', 'input', 'ascending', 'descending']), PropTypes.func]).isRequired,
  colors: colors.ordinalColorsPropType.isRequired,
  nodeOpacity: PropTypes.number.isRequired,
  nodeHoverOpacity: PropTypes.number.isRequired,
  nodeHoverOthersOpacity: PropTypes.number.isRequired,
  nodeThickness: PropTypes.number.isRequired,
  nodeSpacing: PropTypes.number.isRequired,
  nodeInnerPadding: PropTypes.number.isRequired,
  nodeBorderWidth: PropTypes.number.isRequired,
  nodeBorderColor: colors.inheritedColorPropType,
  linkOpacity: PropTypes.number.isRequired,
  linkHoverOpacity: PropTypes.number.isRequired,
  linkHoverOthersOpacity: PropTypes.number.isRequired,
  linkContract: PropTypes.number.isRequired,
  linkBlendMode: core.blendModePropType.isRequired,
  enableLinkGradient: PropTypes.bool.isRequired,
  enableLabels: PropTypes.bool.isRequired,
  labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
  labelPadding: PropTypes.number.isRequired,
  labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  labelTextColor: colors.inheritedColorPropType,
  getLabelTextColor: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  labelFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  getLabel: PropTypes.func.isRequired,
  nodeTooltip: PropTypes.func,
  linkTooltip: PropTypes.func,
  isInteractive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
};
var SankeyDefaultProps = {
  layout: 'horizontal',
  align: 'center',
  sort: 'auto',
  colors: {
    scheme: 'nivo'
  },
  nodeOpacity: 0.75,
  nodeHoverOpacity: 1,
  nodeHoverOthersOpacity: 0.15,
  nodeThickness: 12,
  nodeSpacing: 12,
  nodeInnerPadding: 0,
  nodeBorderWidth: 1,
  nodeBorderColor: {
    from: 'color',
    modifiers: [['darker', 0.5]]
  },
  linkOpacity: 0.25,
  linkHoverOpacity: 0.6,
  linkHoverOthersOpacity: 0.15,
  linkContract: 0,
  linkBlendMode: 'multiply',
  enableLinkGradient: false,
  enableLabels: true,
  label: 'id',
  labelPosition: 'inside',
  labelPadding: 9,
  labelOrientation: 'horizontal',
  labelTextColor: {
    from: 'color',
    modifiers: [['darker', 0.8]]
  },
  isInteractive: true,
  onClick: core.noop,
  legends: []
};

var getId = function getId(d) {
  return d.id;
};
var enhance = (function (Component) {
  return _compose(_defaultProps(SankeyDefaultProps), _withState('currentNode', 'setCurrentNode', null), _withState('currentLink', 'setCurrentLink', null), core.withTheme(), core.withDimensions(), core.withMotion(), _withPropsOnChange(['colors'], function (_ref) {
    var colors$1 = _ref.colors;
    return {
      getColor: colors.getOrdinalColorScale(colors$1, 'id'),
      getLinkColor: colors.getOrdinalColorScale(colors$1, 'source.id')
    };
  }), _withPropsOnChange(['nodeBorderColor', 'theme'], function (_ref2) {
    var nodeBorderColor = _ref2.nodeBorderColor,
        theme = _ref2.theme;
    return {
      getNodeBorderColor: colors.getInheritedColorGenerator(nodeBorderColor, theme)
    };
  }), _withPropsOnChange(['labelTextColor', 'theme'], function (_ref3) {
    var labelTextColor = _ref3.labelTextColor,
        theme = _ref3.theme;
    return {
      getLabelTextColor: colors.getInheritedColorGenerator(labelTextColor, theme)
    };
  }), _withPropsOnChange(['label', 'labelFormat'], function (_ref4) {
    var label = _ref4.label,
        labelFormat = _ref4.labelFormat;
    return {
      getLabel: core.getLabelGenerator(label, labelFormat)
    };
  }), _withPropsOnChange(['sort'], function (_ref5) {
    var sort = _ref5.sort;
    var sortFunction = sort;
    if (sort === 'auto') {
      sortFunction = undefined;
    } else if (sort === 'input') {
      sortFunction = null;
    } else if (sort === 'ascending') {
      sortFunction = function sortFunction(a, b) {
        return a.value - b.value;
      };
    } else if (sort === 'descending') {
      sortFunction = function sortFunction(a, b) {
        return b.value - a.value;
      };
    }
    return {
      sortFunction: sortFunction
    };
  }), _withPropsOnChange(['align'], function (_ref6) {
    var align = _ref6.align;
    return {
      alignFunction: sankeyAlignmentFromProp(align)
    };
  }), _withPropsOnChange(['data', 'layout', 'alignFunction', 'sortFunction', 'nodeThickness', 'nodeSpacing', 'nodeInnerPadding', 'width', 'height', 'getColor', 'getLinkColor', 'getLabel'], function (_ref7) {
    var _data = _ref7.data,
        layout = _ref7.layout,
        alignFunction = _ref7.alignFunction,
        sortFunction = _ref7.sortFunction,
        nodeThickness = _ref7.nodeThickness,
        nodeSpacing = _ref7.nodeSpacing,
        nodeInnerPadding = _ref7.nodeInnerPadding,
        width = _ref7.width,
        height = _ref7.height,
        getColor = _ref7.getColor,
        getLinkColor = _ref7.getLinkColor,
        getLabel = _ref7.getLabel;
    var sankey = d3Sankey.sankey().nodeAlign(alignFunction).nodeSort(sortFunction).nodeWidth(nodeThickness).nodePadding(nodeSpacing).size(layout === 'horizontal' ? [width, height] : [height, width]).nodeId(getId);
    var data = _cloneDeep(_data);
    sankey(data);
    data.nodes.forEach(function (node) {
      node.color = getColor(node);
      node.label = getLabel(node);
      if (layout === 'horizontal') {
        node.x = node.x0 + nodeInnerPadding;
        node.y = node.y0;
        node.width = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0);
        node.height = Math.max(node.y1 - node.y0, 0);
      } else {
        node.x = node.y0;
        node.y = node.x0 + nodeInnerPadding;
        node.width = Math.max(node.y1 - node.y0, 0);
        node.height = Math.max(node.x1 - node.x0 - nodeInnerPadding * 2, 0);
        var oldX0 = node.x0;
        var oldX1 = node.x1;
        node.x0 = node.y0;
        node.x1 = node.y1;
        node.y0 = oldX0;
        node.y1 = oldX1;
      }
    });
    data.links.forEach(function (link) {
      link.color = getLinkColor(link);
      link.pos0 = link.y0;
      link.pos1 = link.y1;
      link.thickness = link.width;
      delete link.y0;
      delete link.y1;
      delete link.width;
    });
    return data;
  }), _withPropsOnChange(['nodes'], function (_ref8) {
    var nodes = _ref8.nodes;
    return {
      legendData: nodes.map(function (node) {
        return {
          id: node.id,
          label: node.label,
          color: node.color
        };
      })
    };
  }), pure)(Component);
});

var SankeyNodesItem = function SankeyNodesItem(_ref) {
  var x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      color = _ref.color,
      opacity = _ref.opacity,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      handleMouseEnter = _ref.handleMouseEnter,
      handleMouseMove = _ref.handleMouseMove,
      handleMouseLeave = _ref.handleMouseLeave,
      onClick = _ref.onClick;
  return React__default.createElement("rect", {
    x: x,
    y: y,
    width: width,
    height: height,
    fill: color,
    fillOpacity: opacity,
    strokeWidth: borderWidth,
    stroke: borderColor,
    strokeOpacity: opacity,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: onClick
  });
};
SankeyNodesItem.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired
  }),
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  tooltip: PropTypes.element.isRequired,
  theme: PropTypes.object.isRequired
};
var enhance$1 = _compose(_withPropsOnChange(['node', 'theme', 'tooltip'], function (_ref2) {
  var node = _ref2.node,
      theme = _ref2.theme,
      tooltip$1 = _ref2.tooltip;
  if (tooltip$1) {
    return {
      tooltip: React__default.createElement(tooltip.BasicTooltip, {
        id: tooltip$1(node),
        enableChip: false,
        theme: theme
      })
    };
  }
  return {
    tooltip: React__default.createElement(tooltip.BasicTooltip, {
      id: node.label,
      enableChip: true,
      color: node.color,
      theme: theme
    })
  };
}), _withPropsOnChange(['onClick', 'node'], function (_ref3) {
  var _onClick = _ref3.onClick,
      node = _ref3.node;
  return {
    onClick: function onClick(event) {
      return _onClick(node, event);
    }
  };
}), withHandlers({
  handleMouseEnter: function handleMouseEnter(_ref4) {
    var showTooltip = _ref4.showTooltip,
        setCurrent = _ref4.setCurrent,
        node = _ref4.node,
        tooltip = _ref4.tooltip;
    return function (e) {
      setCurrent(node);
      showTooltip(tooltip, e);
    };
  },
  handleMouseMove: function handleMouseMove(_ref5) {
    var showTooltip = _ref5.showTooltip,
        tooltip = _ref5.tooltip;
    return function (e) {
      showTooltip(tooltip, e);
    };
  },
  handleMouseLeave: function handleMouseLeave(_ref6) {
    var hideTooltip = _ref6.hideTooltip,
        setCurrent = _ref6.setCurrent;
    return function () {
      setCurrent(null);
      hideTooltip();
    };
  }
}), pure);
var SankeyNodesItem$1 = enhance$1(SankeyNodesItem);

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SankeyNodes = function SankeyNodes(_ref) {
  var nodes = _ref.nodes,
      nodeOpacity = _ref.nodeOpacity,
      nodeHoverOpacity = _ref.nodeHoverOpacity,
      nodeHoverOthersOpacity = _ref.nodeHoverOthersOpacity,
      nodeBorderWidth = _ref.nodeBorderWidth,
      getNodeBorderColor = _ref.getNodeBorderColor,
      animate = _ref.animate,
      motionDamping = _ref.motionDamping,
      motionStiffness = _ref.motionStiffness,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip,
      setCurrentNode = _ref.setCurrentNode,
      currentNode = _ref.currentNode,
      currentLink = _ref.currentLink,
      isCurrentNode = _ref.isCurrentNode,
      onClick = _ref.onClick,
      tooltip = _ref.tooltip,
      theme = _ref.theme;
  var getOpacity = function getOpacity(node) {
    if (!currentNode && !currentLink) return nodeOpacity;
    if (isCurrentNode(node)) return nodeHoverOpacity;
    return nodeHoverOthersOpacity;
  };
  if (!animate) {
    return React__default.createElement(React.Fragment, null, nodes.map(function (node) {
      return React__default.createElement(SankeyNodesItem$1, {
        key: node.id,
        node: node,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        color: node.color,
        opacity: getOpacity(node),
        borderWidth: nodeBorderWidth,
        borderColor: getNodeBorderColor(node),
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        setCurrent: setCurrentNode,
        onClick: onClick,
        tooltip: tooltip,
        theme: theme
      });
    }));
  }
  var springProps = {
    damping: motionDamping,
    stiffness: motionStiffness
  };
  return React__default.createElement(reactMotion.TransitionMotion, {
    styles: nodes.map(function (node) {
      return {
        key: node.id,
        data: node,
        style: _objectSpread({
          x: reactMotion.spring(node.x, springProps),
          y: reactMotion.spring(node.y, springProps),
          width: reactMotion.spring(node.width, springProps),
          height: reactMotion.spring(node.height, springProps),
          opacity: reactMotion.spring(getOpacity(node), springProps)
        }, colors.interpolateColor(node.color, springProps))
      };
    })
  }, function (interpolatedStyles) {
    return React__default.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref2) {
      var key = _ref2.key,
          style = _ref2.style,
          node = _ref2.data;
      var color = colors.getInterpolatedColor(style);
      return React__default.createElement(SankeyNodesItem$1, {
        key: key,
        node: node,
        x: style.x,
        y: style.y,
        width: Math.max(style.width, 0),
        height: Math.max(style.height, 0),
        color: color,
        opacity: style.opacity,
        borderWidth: nodeBorderWidth,
        borderColor: getNodeBorderColor(_objectSpread({}, node, {
          color: color
        })),
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        setCurrent: setCurrentNode,
        onClick: onClick,
        tooltip: tooltip,
        theme: theme
      });
    }));
  });
};
SankeyNodes.propTypes = _objectSpread({
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired,
  nodeOpacity: PropTypes.number.isRequired,
  nodeHoverOpacity: PropTypes.number.isRequired,
  nodeHoverOthersOpacity: PropTypes.number.isRequired,
  nodeBorderWidth: PropTypes.number.isRequired,
  getNodeBorderColor: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  tooltip: PropTypes.func
}, core.motionPropTypes, {
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  setCurrentNode: PropTypes.func.isRequired,
  currentNode: PropTypes.object,
  currentLink: PropTypes.object,
  isCurrentNode: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
});
var SankeyNodes$1 = pure(SankeyNodes);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var SankeyLinkGradient = React.memo(function (_ref) {
  var id = _ref.id,
      layout = _ref.layout,
      startColor = _ref.startColor,
      endColor = _ref.endColor;
  var gradientProps = {};
  if (layout === 'horizontal') {
    gradientProps.x1 = '0%';
    gradientProps.x2 = '100%';
    gradientProps.y1 = '0%';
    gradientProps.y2 = '0%';
  } else {
    gradientProps.x1 = '0%';
    gradientProps.x2 = '0%';
    gradientProps.y1 = '0%';
    gradientProps.y2 = '100%';
  }
  return React__default.createElement("linearGradient", _extends({
    id: id,
    spreadMethod: "pad"
  }, gradientProps), React__default.createElement("stop", {
    offset: "0%",
    stopColor: startColor
  }), React__default.createElement("stop", {
    offset: "100%",
    stopColor: endColor
  }));
});
SankeyLinkGradient.propTypes = {
  id: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  startColor: PropTypes.string.isRequired,
  endColor: PropTypes.string.isRequired
};
SankeyLinkGradient.displayName = 'SankeyLinkGradient';

var tooltipStyles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  sourceChip: {
    marginRight: 7
  },
  targetChip: {
    marginLeft: 7,
    marginRight: 7
  }
};
var TooltipContent = function TooltipContent(_ref) {
  var link = _ref.link,
      format = _ref.format;
  return React__default.createElement("span", {
    style: tooltipStyles.container
  }, React__default.createElement(tooltip.Chip, {
    color: link.source.color,
    style: tooltipStyles.sourceChip
  }), React__default.createElement("strong", null, link.source.label), ' > ', React__default.createElement("strong", null, link.target.label), React__default.createElement(tooltip.Chip, {
    color: link.target.color,
    style: tooltipStyles.targetChip
  }), React__default.createElement("strong", null, format ? format(link.value) : link.value));
};
TooltipContent.propTypes = {
  link: PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired,
    target: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired,
    color: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired,
  format: PropTypes.func
};
var SankeyLinksItem = function SankeyLinksItem(_ref2) {
  var link = _ref2.link,
      layout = _ref2.layout,
      path = _ref2.path,
      color = _ref2.color,
      opacity = _ref2.opacity,
      blendMode = _ref2.blendMode,
      enableGradient = _ref2.enableGradient,
      handleMouseEnter = _ref2.handleMouseEnter,
      handleMouseMove = _ref2.handleMouseMove,
      handleMouseLeave = _ref2.handleMouseLeave,
      onClick = _ref2.onClick;
  var linkId = "".concat(link.source.id, ".").concat(link.target.id);
  return React__default.createElement(React.Fragment, null, enableGradient && React__default.createElement(SankeyLinkGradient, {
    id: linkId,
    layout: layout,
    startColor: link.startColor || link.source.color,
    endColor: link.endColor || link.target.color
  }), React__default.createElement("path", {
    fill: enableGradient ? "url(#".concat(linkId, ")") : color,
    d: path,
    fillOpacity: opacity,
    onMouseEnter: handleMouseEnter,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
    style: {
      mixBlendMode: blendMode
    }
  }));
};
SankeyLinksItem.propTypes = {
  link: PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string.isRequired
    }).isRequired,
    target: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      color: PropTypes.string.isRequired
    }).isRequired,
    color: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  path: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  blendMode: core.blendModePropType.isRequired,
  enableGradient: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired
};
var enhance$2 = _compose(_withPropsOnChange(['link', 'theme', 'tooltip', 'tooltipFormat'], function (_ref3) {
  var link = _ref3.link,
      theme = _ref3.theme,
      tooltip$1 = _ref3.tooltip,
      tooltipFormat = _ref3.tooltipFormat;
  if (tooltip$1) {
    return {
      tooltip: React__default.createElement(tooltip.BasicTooltip, {
        id: tooltip$1(link),
        enableChip: false,
        theme: theme
      })
    };
  }
  return {
    tooltip: React__default.createElement(tooltip.BasicTooltip, {
      id: React__default.createElement(TooltipContent, {
        format: tooltipFormat,
        link: link
      }),
      theme: theme
    })
  };
}), _withPropsOnChange(['onClick', 'link'], function (_ref4) {
  var _onClick = _ref4.onClick,
      link = _ref4.link;
  return {
    onClick: function onClick(event) {
      return _onClick(link, event);
    }
  };
}), withHandlers({
  handleMouseEnter: function handleMouseEnter(_ref5) {
    var showTooltip = _ref5.showTooltip,
        setCurrent = _ref5.setCurrent,
        link = _ref5.link,
        tooltip = _ref5.tooltip;
    return function (e) {
      setCurrent(link);
      showTooltip(tooltip, e);
    };
  },
  handleMouseMove: function handleMouseMove(_ref6) {
    var showTooltip = _ref6.showTooltip,
        tooltip = _ref6.tooltip;
    return function (e) {
      showTooltip(tooltip, e);
    };
  },
  handleMouseLeave: function handleMouseLeave(_ref7) {
    var hideTooltip = _ref7.hideTooltip,
        setCurrent = _ref7.setCurrent;
    return function () {
      setCurrent(null);
      hideTooltip();
    };
  }
}), pure);
var SankeyLinksItem$1 = enhance$2(SankeyLinksItem);

var sankeyLinkHorizontal = function sankeyLinkHorizontal() {
  var lineGenerator = d3Shape.line().curve(d3Shape.curveMonotoneX);
  return function (n, contract) {
    var thickness = Math.max(1, n.thickness - contract * 2);
    var halfThickness = thickness / 2;
    var linkLength = n.target.x0 - n.source.x1;
    var padLength = linkLength * 0.12;
    var dots = [[n.source.x1, n.pos0 - halfThickness], [n.source.x1 + padLength, n.pos0 - halfThickness], [n.target.x0 - padLength, n.pos1 - halfThickness], [n.target.x0, n.pos1 - halfThickness], [n.target.x0, n.pos1 + halfThickness], [n.target.x0 - padLength, n.pos1 + halfThickness], [n.source.x1 + padLength, n.pos0 + halfThickness], [n.source.x1, n.pos0 + halfThickness], [n.source.x1, n.pos0 - halfThickness]];
    return lineGenerator(dots) + 'Z';
  };
};
var sankeyLinkVertical = function sankeyLinkVertical() {
  var lineGenerator = d3Shape.line().curve(d3Shape.curveMonotoneY);
  return function (n, contract) {
    var thickness = Math.max(1, n.thickness - contract * 2);
    var halfThickness = thickness / 2;
    var linkLength = n.target.y0 - n.source.y1;
    var padLength = linkLength * 0.12;
    var dots = [[n.pos0 + halfThickness, n.source.y1], [n.pos0 + halfThickness, n.source.y1 + padLength], [n.pos1 + halfThickness, n.target.y0 - padLength], [n.pos1 + halfThickness, n.target.y0], [n.pos1 - halfThickness, n.target.y0], [n.pos1 - halfThickness, n.target.y0 - padLength], [n.pos0 - halfThickness, n.source.y1 + padLength], [n.pos0 - halfThickness, n.source.y1], [n.pos0 + halfThickness, n.source.y1]];
    return lineGenerator(dots) + 'Z';
  };
};

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var SankeyLinks = function SankeyLinks(_ref) {
  var links = _ref.links,
      layout = _ref.layout,
      linkOpacity = _ref.linkOpacity,
      linkHoverOpacity = _ref.linkHoverOpacity,
      linkHoverOthersOpacity = _ref.linkHoverOthersOpacity,
      linkContract = _ref.linkContract,
      linkBlendMode = _ref.linkBlendMode,
      enableLinkGradient = _ref.enableLinkGradient,
      animate = _ref.animate,
      motionDamping = _ref.motionDamping,
      motionStiffness = _ref.motionStiffness,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip,
      setCurrentLink = _ref.setCurrentLink,
      currentNode = _ref.currentNode,
      currentLink = _ref.currentLink,
      isCurrentLink = _ref.isCurrentLink,
      onClick = _ref.onClick,
      tooltipFormat = _ref.tooltipFormat,
      tooltip = _ref.tooltip,
      theme = _ref.theme;
  var getOpacity = function getOpacity(link) {
    if (!currentNode && !currentLink) return linkOpacity;
    if (isCurrentLink(link)) return linkHoverOpacity;
    return linkHoverOthersOpacity;
  };
  var getLinkPath = layout === 'horizontal' ? sankeyLinkHorizontal() : sankeyLinkVertical();
  if (animate !== true) {
    return React__default.createElement("g", null, links.map(function (link) {
      return React__default.createElement(SankeyLinksItem$1, {
        key: "".concat(link.source.id, ".").concat(link.target.id),
        link: link,
        layout: layout,
        path: getLinkPath(link, linkContract),
        color: link.color,
        opacity: getOpacity(link),
        blendMode: linkBlendMode,
        enableGradient: enableLinkGradient,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        setCurrent: setCurrentLink,
        onClick: onClick,
        tooltip: tooltip,
        theme: theme,
        tooltipFormat: tooltipFormat
      });
    }));
  }
  var springConfig = {
    stiffness: motionStiffness,
    damping: motionDamping
  };
  return React__default.createElement(React.Fragment, null, links.map(function (link) {
    return React__default.createElement(core.SmartMotion, {
      key: "".concat(link.source.id, ".").concat(link.target.id),
      style: function style(spring) {
        return {
          path: spring(getLinkPath(link, linkContract), springConfig),
          color: spring(link.color, springConfig),
          opacity: spring(getOpacity(link), springConfig)
        };
      }
    }, function (style) {
      return React__default.createElement(SankeyLinksItem$1, _extends$1({
        link: link,
        layout: layout
      }, style, {
        blendMode: linkBlendMode,
        enableGradient: enableLinkGradient,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        setCurrent: setCurrentLink,
        onClick: onClick,
        tooltip: tooltip,
        theme: theme,
        tooltipFormat: tooltipFormat
      }));
    });
  }));
};
SankeyLinks.propTypes = _objectSpread$1({
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    source: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired,
    target: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired,
    thickness: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired,
  linkOpacity: PropTypes.number.isRequired,
  linkHoverOpacity: PropTypes.number.isRequired,
  linkHoverOthersOpacity: PropTypes.number.isRequired,
  linkContract: PropTypes.number.isRequired,
  linkBlendMode: core.blendModePropType.isRequired,
  enableLinkGradient: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  tooltip: PropTypes.func
}, core.motionPropTypes, {
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  setCurrentLink: PropTypes.func.isRequired,
  currentLink: PropTypes.object,
  isCurrentLink: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
});
var SankeyLinks$1 = pure(SankeyLinks);

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SankeyLabels = function SankeyLabels(_ref) {
  var nodes = _ref.nodes,
      layout = _ref.layout,
      width = _ref.width,
      height = _ref.height,
      labelPosition = _ref.labelPosition,
      labelPadding = _ref.labelPadding,
      labelOrientation = _ref.labelOrientation,
      getLabelTextColor = _ref.getLabelTextColor,
      theme = _ref.theme,
      animate = _ref.animate,
      motionDamping = _ref.motionDamping,
      motionStiffness = _ref.motionStiffness;
  var labelRotation = labelOrientation === 'vertical' ? -90 : 0;
  var labels = nodes.map(function (node) {
    var x;
    var y;
    var textAnchor;
    if (layout === 'horizontal') {
      y = node.y + node.height / 2;
      if (node.x < width / 2) {
        if (labelPosition === 'inside') {
          x = node.x1 + labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start';
        } else {
          x = node.x - labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end';
        }
      } else {
        if (labelPosition === 'inside') {
          x = node.x - labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end';
        } else {
          x = node.x1 + labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start';
        }
      }
    } else if (layout === 'vertical') {
      x = node.x + node.width / 2;
      if (node.y < height / 2) {
        if (labelPosition === 'inside') {
          y = node.y1 + labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle';
        } else {
          y = node.y - labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle';
        }
      } else {
        if (labelPosition === 'inside') {
          y = node.y - labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'start' : 'middle';
        } else {
          y = node.y1 + labelPadding;
          textAnchor = labelOrientation === 'vertical' ? 'end' : 'middle';
        }
      }
    }
    return {
      id: node.id,
      label: node.label,
      x: x,
      y: y,
      textAnchor: textAnchor,
      color: getLabelTextColor(node)
    };
  });
  if (!animate) {
    return React__default.createElement("g", null, labels.map(function (label) {
      return React__default.createElement("text", {
        key: label.id,
        dominantBaseline: "central",
        textAnchor: label.textAnchor,
        transform: "translate(".concat(label.x, ", ").concat(label.y, ") rotate(").concat(labelRotation, ")"),
        style: _objectSpread$2({}, theme.labels.text, {
          fill: label.color
        })
      }, label.label);
    }));
  }
  var springProps = {
    damping: motionDamping,
    stiffness: motionStiffness
  };
  return React__default.createElement(reactMotion.TransitionMotion, {
    styles: labels.map(function (label) {
      return {
        key: label.id,
        data: label,
        style: _objectSpread$2({
          x: reactMotion.spring(label.x, springProps),
          y: reactMotion.spring(label.y, springProps),
          rotation: reactMotion.spring(labelRotation, springProps)
        }, colors.interpolateColor(label.color, springProps))
      };
    })
  }, function (interpolatedStyles) {
    return React__default.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref2) {
      var key = _ref2.key,
          style = _ref2.style,
          data = _ref2.data;
      var color = colors.getInterpolatedColor(style);
      return React__default.createElement("text", {
        key: key,
        transform: "translate(".concat(style.x, ", ").concat(style.y, ") rotate(").concat(style.rotation, ")"),
        dominantBaseline: "central",
        textAnchor: data.textAnchor,
        style: _objectSpread$2({}, theme.labels.text, {
          fill: color,
          pointerEvents: 'none'
        })
      }, data.label);
    }));
  });
};
SankeyLabels.propTypes = _objectSpread$2({
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    x1: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  })).isRequired,
  layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
  labelPadding: PropTypes.number.isRequired,
  labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  getLabelTextColor: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}, core.motionPropTypes);
var SankeyLabels$1 = pure(SankeyLabels);

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var Sankey = function Sankey(_ref) {
  var nodes = _ref.nodes,
      links = _ref.links,
      layout = _ref.layout,
      margin = _ref.margin,
      width = _ref.width,
      height = _ref.height,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      nodeOpacity = _ref.nodeOpacity,
      nodeHoverOpacity = _ref.nodeHoverOpacity,
      nodeHoverOthersOpacity = _ref.nodeHoverOthersOpacity,
      nodeBorderWidth = _ref.nodeBorderWidth,
      getNodeBorderColor = _ref.getNodeBorderColor,
      setCurrentNode = _ref.setCurrentNode,
      currentNode = _ref.currentNode,
      linkOpacity = _ref.linkOpacity,
      linkHoverOpacity = _ref.linkHoverOpacity,
      linkHoverOthersOpacity = _ref.linkHoverOthersOpacity,
      linkContract = _ref.linkContract,
      linkBlendMode = _ref.linkBlendMode,
      enableLinkGradient = _ref.enableLinkGradient,
      setCurrentLink = _ref.setCurrentLink,
      currentLink = _ref.currentLink,
      enableLabels = _ref.enableLabels,
      labelPosition = _ref.labelPosition,
      labelPadding = _ref.labelPadding,
      labelOrientation = _ref.labelOrientation,
      getLabelTextColor = _ref.getLabelTextColor,
      theme = _ref.theme,
      nodeTooltip = _ref.nodeTooltip,
      linkTooltip = _ref.linkTooltip,
      animate = _ref.animate,
      motionDamping = _ref.motionDamping,
      motionStiffness = _ref.motionStiffness,
      isInteractive = _ref.isInteractive,
      onClick = _ref.onClick,
      tooltipFormat = _ref.tooltipFormat,
      legends$1 = _ref.legends,
      legendData = _ref.legendData;
  var isCurrentNode = function isCurrentNode() {
    return false;
  };
  var isCurrentLink = function isCurrentLink() {
    return false;
  };
  if (currentLink) {
    isCurrentNode = function isCurrentNode(_ref2) {
      var id = _ref2.id;
      return id === currentLink.source.id || id === currentLink.target.id;
    };
    isCurrentLink = function isCurrentLink(_ref3) {
      var source = _ref3.source,
          target = _ref3.target;
      return source.id === currentLink.source.id && target.id === currentLink.target.id;
    };
  }
  if (currentNode) {
    var currentNodeIds = [currentNode.id];
    links.filter(function (_ref4) {
      var source = _ref4.source,
          target = _ref4.target;
      return source.id === currentNode.id || target.id === currentNode.id;
    }).forEach(function (_ref5) {
      var source = _ref5.source,
          target = _ref5.target;
      currentNodeIds.push(source.id);
      currentNodeIds.push(target.id);
    });
    currentNodeIds = _uniq(currentNodeIds);
    isCurrentNode = function isCurrentNode(_ref6) {
      var id = _ref6.id;
      return currentNodeIds.includes(id);
    };
    isCurrentLink = function isCurrentLink(_ref7) {
      var source = _ref7.source,
          target = _ref7.target;
      return source.id === currentNode.id || target.id === currentNode.id;
    };
  }
  return React__default.createElement(core.Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: animate,
    motionDamping: motionDamping,
    motionStiffness: motionStiffness
  }, function (_ref8) {
    var showTooltip = _ref8.showTooltip,
        hideTooltip = _ref8.hideTooltip;
    return React__default.createElement(core.SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      theme: theme
    }, React__default.createElement(SankeyLinks$1, {
      links: links,
      layout: layout,
      linkContract: linkContract,
      linkOpacity: linkOpacity,
      linkHoverOpacity: linkHoverOpacity,
      linkHoverOthersOpacity: linkHoverOthersOpacity,
      linkBlendMode: linkBlendMode,
      enableLinkGradient: enableLinkGradient,
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      setCurrentLink: setCurrentLink,
      currentNode: currentNode,
      currentLink: currentLink,
      isCurrentLink: isCurrentLink,
      onClick: onClick,
      tooltip: linkTooltip,
      theme: theme,
      tooltipFormat: tooltipFormat,
      animate: animate,
      motionDamping: motionDamping,
      motionStiffness: motionStiffness
    }), React__default.createElement(SankeyNodes$1, {
      nodes: nodes,
      nodeOpacity: nodeOpacity,
      nodeHoverOpacity: nodeHoverOpacity,
      nodeHoverOthersOpacity: nodeHoverOthersOpacity,
      nodeBorderWidth: nodeBorderWidth,
      getNodeBorderColor: getNodeBorderColor,
      showTooltip: showTooltip,
      hideTooltip: hideTooltip,
      setCurrentNode: setCurrentNode,
      currentNode: currentNode,
      currentLink: currentLink,
      isCurrentNode: isCurrentNode,
      onClick: onClick,
      tooltip: nodeTooltip,
      theme: theme,
      tooltipFormat: tooltipFormat,
      animate: animate,
      motionDamping: motionDamping,
      motionStiffness: motionStiffness
    }), enableLabels && React__default.createElement(SankeyLabels$1, {
      nodes: nodes,
      layout: layout,
      width: width,
      height: height,
      labelPosition: labelPosition,
      labelPadding: labelPadding,
      labelOrientation: labelOrientation,
      getLabelTextColor: getLabelTextColor,
      theme: theme,
      animate: animate,
      motionDamping: motionDamping,
      motionStiffness: motionStiffness
    }), legends$1.map(function (legend, i) {
      return React__default.createElement(legends.BoxLegendSvg, _extends$2({
        key: i
      }, legend, {
        containerWidth: width,
        containerHeight: height,
        data: legendData,
        theme: theme
      }));
    }));
  });
};
Sankey.propTypes = SankeyPropTypes;
var enhancedSankey = enhance(Sankey);
enhancedSankey.displayName = 'Sankey';

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var ResponsiveSankey = function ResponsiveSankey(props) {
  return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(enhancedSankey, _extends$3({
      width: width,
      height: height
    }, props));
  });
};

exports.ResponsiveSankey = ResponsiveSankey;
exports.Sankey = enhancedSankey;
exports.SankeyDefaultProps = SankeyDefaultProps;
exports.SankeyPropTypes = SankeyPropTypes;
exports.sankeyAlignmentFromProp = sankeyAlignmentFromProp;
exports.sankeyAlignmentPropKeys = sankeyAlignmentPropKeys;
exports.sankeyAlignmentPropMapping = sankeyAlignmentPropMapping;
exports.sankeyAlignmentPropType = sankeyAlignmentPropType;
