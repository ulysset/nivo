'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var partial = _interopDefault(require('lodash.partial'));
var reactMotion = require('react-motion');
var setDisplayName = _interopDefault(require('recompose/setDisplayName'));
var core = require('@nivo/core');
var legends = require('@nivo/legends');
var PropTypes = _interopDefault(require('prop-types'));
var colors = require('@nivo/colors');
var pure = _interopDefault(require('recompose/pure'));
var compose = _interopDefault(require('recompose/compose'));
var defaultProps = _interopDefault(require('recompose/defaultProps'));
var withPropsOnChange = _interopDefault(require('recompose/withPropsOnChange'));
var withState = _interopDefault(require('recompose/withState'));
var range = _interopDefault(require('lodash.range'));
var tooltip = require('@nivo/tooltip');

var WaffleCell = function WaffleCell(_ref) {
  var position = _ref.position,
      size = _ref.size,
      x = _ref.x,
      y = _ref.y,
      color = _ref.color,
      fill = _ref.fill,
      opacity = _ref.opacity,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      data = _ref.data,
      onHover = _ref.onHover,
      onLeave = _ref.onLeave,
      _onClick = _ref.onClick;
  return React__default.createElement("rect", {
    width: size,
    height: size,
    x: x,
    y: y,
    fill: fill || color,
    strokeWidth: borderWidth,
    stroke: borderColor,
    opacity: opacity,
    onMouseEnter: onHover,
    onMouseMove: onHover,
    onMouseLeave: onLeave,
    onClick: function onClick(event) {
      _onClick({
        position: position,
        color: color,
        x: x,
        y: y,
        data: data
      }, event);
    }
  });
};
WaffleCell.propTypes = {
  position: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  fill: PropTypes.string,
  opacity: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
WaffleCell.defaultProps = {
  data: {}
};
WaffleCell.displayName = 'WaffleCell';
var WaffleCell$1 = pure(WaffleCell);

var WaffleCellHtml = function WaffleCellHtml(_ref) {
  var position = _ref.position,
      size = _ref.size,
      x = _ref.x,
      y = _ref.y,
      color = _ref.color,
      opacity = _ref.opacity,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      data = _ref.data,
      onHover = _ref.onHover,
      onLeave = _ref.onLeave,
      _onClick = _ref.onClick;
  return React__default.createElement("div", {
    style: {
      position: 'absolute',
      top: y,
      left: x,
      width: size,
      height: size,
      background: color,
      opacity: opacity,
      boxSizing: 'content-box',
      borderStyle: 'solid',
      borderWidth: "".concat(borderWidth, "px"),
      borderColor: borderColor
    },
    onMouseEnter: onHover,
    onMouseMove: onHover,
    onMouseLeave: onLeave,
    onClick: function onClick(event) {
      _onClick({
        position: position,
        color: color,
        x: x,
        y: y,
        data: data
      }, event);
    }
  });
};
WaffleCellHtml.propTypes = {
  position: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onHover: PropTypes.func.isRequired,
  onLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
WaffleCellHtml.defaultProps = {
  data: {}
};
WaffleCellHtml.displayName = 'WaffleCellHtml';
var WaffleCellHtml$1 = pure(WaffleCellHtml);

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var commonPropTypes = {
  total: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  hiddenIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  fillDirection: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  padding: PropTypes.number.isRequired,
  colors: colors.ordinalColorsPropType.isRequired,
  emptyColor: PropTypes.string.isRequired,
  emptyOpacity: PropTypes.number.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: colors.inheritedColorPropType.isRequired,
  getBorderColor: PropTypes.func.isRequired,
  isInteractive: PropTypes.bool,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func,
  cellSize: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired
};
var WafflePropTypes = _objectSpread({}, commonPropTypes, {
  cellComponent: PropTypes.func.isRequired
}, core.defsPropTypes, {
  legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
});
var WaffleHtmlPropTypes = _objectSpread({}, commonPropTypes, {
  cellComponent: PropTypes.func.isRequired
});
var WaffleCanvasPropTypes = _objectSpread({}, commonPropTypes, {
  pixelRatio: PropTypes.number.isRequired,
  legends: PropTypes.arrayOf(PropTypes.shape(legends.LegendPropShape)).isRequired
});
var commonDefaultProps = {
  hiddenIds: [],
  fillDirection: 'bottom',
  padding: 1,
  colors: {
    scheme: 'nivo'
  },
  emptyColor: '#cccccc',
  emptyOpacity: 1,
  borderWidth: 0,
  borderColor: {
    from: 'color',
    modifiers: [['darker', 1]]
  },
  defs: [],
  fill: [],
  isInteractive: true,
  onClick: core.noop
};
var WaffleDefaultProps = _objectSpread({}, commonDefaultProps, {
  cellComponent: WaffleCell$1,
  defs: [],
  fill: [],
  legends: []
});
var WaffleHtmlDefaultProps = _objectSpread({}, commonDefaultProps, {
  cellComponent: WaffleCellHtml$1
});
var WaffleCanvasDefaultProps = _objectSpread({}, commonDefaultProps, {
  legends: [],
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

var props = /*#__PURE__*/Object.freeze({
    WafflePropTypes: WafflePropTypes,
    WaffleHtmlPropTypes: WaffleHtmlPropTypes,
    WaffleCanvasPropTypes: WaffleCanvasPropTypes,
    WaffleDefaultProps: WaffleDefaultProps,
    WaffleHtmlDefaultProps: WaffleHtmlDefaultProps,
    WaffleCanvasDefaultProps: WaffleCanvasDefaultProps
});

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var computeCellSize = function computeCellSize(width, height, rows, columns, padding) {
  var sizeX = (width - (columns - 1) * padding) / columns;
  var sizeY = (height - (rows - 1) * padding) / rows;
  return Math.min(sizeX, sizeY);
};
var computeGrid = function computeGrid(width, height, rows, columns, fillDirection, padding) {
  var cellSize = computeCellSize(width, height, rows, columns, padding);
  var cells = [];
  switch (fillDirection) {
    case 'top':
      range(rows).forEach(function (row) {
        range(columns).forEach(function (column) {
          cells.push({
            position: row * columns + column,
            row: row,
            column: column,
            x: column * (cellSize + padding),
            y: row * (cellSize + padding)
          });
        });
      });
      break;
    case 'bottom':
      range(rows - 1, -1).forEach(function (row) {
        range(columns).forEach(function (column) {
          cells.push({
            position: row * columns + column,
            row: row,
            column: column,
            x: column * (cellSize + padding),
            y: row * (cellSize + padding)
          });
        });
      });
      break;
    case 'left':
      range(columns).forEach(function (column) {
        range(rows).forEach(function (row) {
          cells.push({
            position: row * columns + column,
            row: row,
            column: column,
            x: column * (cellSize + padding),
            y: row * (cellSize + padding)
          });
        });
      });
      break;
    case 'right':
      range(columns - 1, -1).forEach(function (column) {
        range(rows - 1, -1).forEach(function (row) {
          cells.push({
            position: row * columns + column,
            row: row,
            column: column,
            x: column * (cellSize + padding),
            y: row * (cellSize + padding)
          });
        });
      });
      break;
    default:
      throw new Error("Invalid fill direction provided: ".concat(fillDirection));
  }
  var origin = {
    x: (width - (cellSize * columns + padding * (columns - 1))) / 2,
    y: (height - (cellSize * rows + padding * (rows - 1))) / 2
  };
  return {
    cells: cells,
    cellSize: cellSize,
    origin: origin
  };
};
var applyDataToGrid = function applyDataToGrid(_cells, data) {
  var cells = _cells.map(function (cell) {
    return _objectSpread$1({}, cell);
  });
  data.forEach(function (datum) {
    range(datum.startAt, datum.endAt).forEach(function (position) {
      var cell = cells[position];
      if (cell !== undefined) {
        cell.data = datum;
        cell.groupIndex = datum.groupIndex;
        cell.color = datum.color;
      }
    });
  });
  return cells;
};

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var commonEnhancers = [core.withDimensions(), core.withTheme(), core.withMotion(), withPropsOnChange(['colors'], function (_ref) {
  var colors$1 = _ref.colors;
  return {
    getColor: colors.getOrdinalColorScale(colors$1, 'id')
  };
}), withPropsOnChange(['borderColor', 'theme'], function (_ref2) {
  var borderColor = _ref2.borderColor,
      theme = _ref2.theme;
  return {
    getBorderColor: colors.getInheritedColorGenerator(borderColor, theme)
  };
}), withState('currentCell', 'setCurrentCell', null), withPropsOnChange(['rows', 'columns', 'total'], function (_ref3) {
  var rows = _ref3.rows,
      columns = _ref3.columns,
      total = _ref3.total;
  return {
    unit: total / (rows * columns)
  };
}), withPropsOnChange(['width', 'height', 'rows', 'columns', 'fillDirection', 'padding'], function (_ref4) {
  var width = _ref4.width,
      height = _ref4.height,
      rows = _ref4.rows,
      columns = _ref4.columns,
      fillDirection = _ref4.fillDirection,
      padding = _ref4.padding;
  return computeGrid(width, height, rows, columns, fillDirection, padding);
}), withPropsOnChange(['data', 'unit', 'getColor', 'hiddenIds'], function (_ref5) {
  var data = _ref5.data,
      unit = _ref5.unit,
      getColor = _ref5.getColor,
      hiddenIds = _ref5.hiddenIds;
  var currentPosition = 0;
  return {
    computedData: data.map(function (datum, groupIndex) {
      if (!hiddenIds.includes(datum.id)) {
        var enhancedDatum = _objectSpread$2({}, datum, {
          groupIndex: groupIndex,
          startAt: currentPosition,
          endAt: currentPosition + Math.round(datum.value / unit),
          color: getColor(datum)
        });
        currentPosition = enhancedDatum.endAt;
        return enhancedDatum;
      }
      return _objectSpread$2({}, datum, {
        groupIndex: groupIndex,
        startAt: currentPosition,
        endAt: currentPosition,
        color: getColor(datum)
      });
    })
  };
}), withPropsOnChange(['computedData'], function (_ref6) {
  var computedData = _ref6.computedData;
  return {
    legendData: computedData.map(function (datum) {
      return {
        id: datum.id,
        label: datum.id,
        color: datum.color,
        fill: datum.fill
      };
    })
  };
})];
var enhance = (function (Component) {
  var implDefaultProps = props["".concat(Component.displayName, "DefaultProps")];
  switch (Component.displayName) {
    case 'Waffle':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), withPropsOnChange(['computedData', 'defs', 'fill'], function (_ref7) {
        var computedData = _ref7.computedData,
            defs = _ref7.defs,
            fill = _ref7.fill;
        return {
          defs: core.bindDefs(defs, computedData, fill, {
            targetKey: 'fill'
          })
        };
      }), pure]))(Component);
    case 'WaffleHtml':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]))(Component);
    case 'WaffleCanvas':
      return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [pure]))(Component);
  }
  return Component;
});

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }
function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var WaffleCellTooltip = function WaffleCellTooltip(_ref) {
  var position = _ref.position,
      row = _ref.row,
      column = _ref.column,
      color = _ref.color,
      data = _ref.data,
      theme = _ref.theme,
      tooltipFormat = _ref.tooltipFormat,
      tooltip$1 = _ref.tooltip;
  return React__default.createElement(tooltip.BasicTooltip, {
    id: data.label,
    value: data.value,
    enableChip: true,
    color: color,
    theme: theme,
    format: tooltipFormat,
    renderContent: typeof tooltip$1 === 'function' ? tooltip$1.bind(null, _objectSpread$3({
      position: position,
      row: row,
      column: column,
      color: color
    }, data)) : null
  });
};
WaffleCellTooltip.displayName = 'WaffleCellTooltip';
WaffleCellTooltip.propTypes = {
  position: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func
};

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var Waffle =
function (_Component) {
  _inherits(Waffle, _Component);
  function Waffle() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, Waffle);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Waffle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$4(_assertThisInitialized(_this), "handleCellHover", function (showTooltip, cell, event) {
      var _this$props = _this.props,
          setCurrentCell = _this$props.setCurrentCell,
          theme = _this$props.theme,
          tooltipFormat = _this$props.tooltipFormat,
          tooltip = _this$props.tooltip;
      setCurrentCell(cell);
      if (!cell.data) return;
      showTooltip(React__default.createElement(WaffleCellTooltip, {
        position: cell.position,
        row: cell.row,
        column: cell.column,
        color: cell.color,
        data: cell.data,
        theme: theme,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip
      }), event);
    });
    _defineProperty$4(_assertThisInitialized(_this), "handleCellLeave", function (hideTooltip) {
      _this.props.setCurrentCell(null);
      hideTooltip();
    });
    return _this;
  }
  _createClass(Waffle, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
          hiddenIds = _this$props2.hiddenIds,
          margin = _this$props2.margin,
          width = _this$props2.width,
          height = _this$props2.height,
          outerWidth = _this$props2.outerWidth,
          outerHeight = _this$props2.outerHeight,
          cellComponent = _this$props2.cellComponent,
          emptyColor = _this$props2.emptyColor,
          emptyOpacity = _this$props2.emptyOpacity,
          borderWidth = _this$props2.borderWidth,
          getBorderColor = _this$props2.getBorderColor,
          theme = _this$props2.theme,
          defs = _this$props2.defs,
          animate = _this$props2.animate,
          motionStiffness = _this$props2.motionStiffness,
          motionDamping = _this$props2.motionDamping,
          isInteractive = _this$props2.isInteractive,
          onClick = _this$props2.onClick,
          cells = _this$props2.cells,
          cellSize = _this$props2.cellSize,
          origin = _this$props2.origin,
          computedData = _this$props2.computedData,
          legendData = _this$props2.legendData,
          legends$1 = _this$props2.legends;
      cells.forEach(function (cell) {
        cell.color = emptyColor;
      });
      return React__default.createElement(core.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        var onHover = partial(_this2.handleCellHover, showTooltip);
        var onLeave = partial(_this2.handleCellLeave, hideTooltip);
        var cellsRender;
        if (animate === true) {
          var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
          };
          cellsRender = React__default.createElement(reactMotion.TransitionMotion, {
            styles: computedData.map(function (datum) {
              return {
                key: datum.id,
                data: datum,
                style: {
                  startAt: reactMotion.spring(datum.startAt, springConfig),
                  endAt: reactMotion.spring(datum.endAt, springConfig)
                }
              };
            })
          }, function (interpolatedStyles) {
            var computedCells = applyDataToGrid(cells, interpolatedStyles.map(function (s) {
              return _objectSpread$4({}, s.data, {
                startAt: Math.round(s.style.startAt),
                endAt: Math.round(s.style.endAt)
              });
            }), hiddenIds);
            return React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
              return React__default.createElement(cellComponent, {
                key: cell.position,
                position: cell.position,
                size: cellSize,
                x: cell.x,
                y: cell.y,
                color: cell.color,
                fill: cell.data && cell.data.fill,
                opacity: cell.data ? 1 : emptyOpacity,
                borderWidth: borderWidth,
                borderColor: getBorderColor(cell),
                data: cell.data,
                onHover: partial(onHover, cell),
                onLeave: onLeave,
                onClick: onClick
              });
            }));
          });
        } else {
          var computedCells = applyDataToGrid(cells, computedData, hiddenIds);
          cellsRender = React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
            return React__default.createElement(cellComponent, {
              key: cell.position,
              position: cell.position,
              size: cellSize,
              x: cell.x,
              y: cell.y,
              color: cell.color,
              fill: cell.data && cell.data.fill,
              opacity: cell.data ? 1 : emptyOpacity,
              borderWidth: borderWidth,
              borderColor: getBorderColor(cell),
              data: cell.data,
              onHover: partial(onHover, cell),
              onLeave: onLeave,
              onClick: onClick
            });
          }));
        }
        return React__default.createElement(core.SvgWrapper, {
          width: outerWidth,
          height: outerHeight,
          margin: margin,
          defs: defs,
          theme: theme
        }, React__default.createElement("g", {
          transform: "translate(".concat(origin.x, ", ").concat(origin.y, ")")
        }, cellsRender), legends$1.map(function (legend, i) {
          return React__default.createElement(legends.BoxLegendSvg, _extends({
            key: i
          }, legend, {
            containerWidth: width,
            containerHeight: height,
            data: legendData,
            theme: theme
          }));
        }));
      });
    }
  }]);
  return Waffle;
}(React.Component);
_defineProperty$4(Waffle, "propTypes", WafflePropTypes);
Waffle.displayName = 'Waffle';
var Waffle$1 = setDisplayName(Waffle.displayName)(enhance(Waffle));

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var ResponsiveWaffle = function ResponsiveWaffle(props) {
  return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(Waffle$1, _extends$1({
      width: width,
      height: height
    }, props));
  });
};

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } return target; }
function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }
function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }
function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var WaffleHtml =
function (_Component) {
  _inherits$1(WaffleHtml, _Component);
  function WaffleHtml() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck$1(this, WaffleHtml);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn$1(this, (_getPrototypeOf2 = _getPrototypeOf$1(WaffleHtml)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$5(_assertThisInitialized$1(_this), "handleCellHover", function (showTooltip, cell, event) {
      var _this$props = _this.props,
          setCurrentCell = _this$props.setCurrentCell,
          theme = _this$props.theme,
          tooltipFormat = _this$props.tooltipFormat,
          tooltip = _this$props.tooltip;
      setCurrentCell(cell);
      if (!cell.data) return;
      showTooltip(React__default.createElement(WaffleCellTooltip, {
        position: cell.position,
        row: cell.row,
        column: cell.column,
        color: cell.color,
        data: cell.data,
        theme: theme,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip
      }), event);
    });
    _defineProperty$5(_assertThisInitialized$1(_this), "handleCellLeave", function (hideTooltip) {
      _this.props.setCurrentCell(null);
      hideTooltip();
    });
    return _this;
  }
  _createClass$1(WaffleHtml, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
          margin = _this$props2.margin,
          outerWidth = _this$props2.outerWidth,
          outerHeight = _this$props2.outerHeight,
          cellComponent = _this$props2.cellComponent,
          emptyColor = _this$props2.emptyColor,
          emptyOpacity = _this$props2.emptyOpacity,
          borderWidth = _this$props2.borderWidth,
          getBorderColor = _this$props2.getBorderColor,
          theme = _this$props2.theme,
          animate = _this$props2.animate,
          motionStiffness = _this$props2.motionStiffness,
          motionDamping = _this$props2.motionDamping,
          isInteractive = _this$props2.isInteractive,
          onClick = _this$props2.onClick,
          cells = _this$props2.cells,
          cellSize = _this$props2.cellSize,
          origin = _this$props2.origin,
          computedData = _this$props2.computedData;
      cells.forEach(function (cell) {
        cell.color = emptyColor;
      });
      return React__default.createElement(core.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        var onHover = partial(_this2.handleCellHover, showTooltip);
        var onLeave = partial(_this2.handleCellLeave, hideTooltip);
        var cellsRender;
        if (animate === true) {
          var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
          };
          cellsRender = React__default.createElement(reactMotion.TransitionMotion, {
            styles: computedData.map(function (datum) {
              return {
                key: datum.id,
                data: datum,
                style: {
                  startAt: reactMotion.spring(datum.startAt, springConfig),
                  endAt: reactMotion.spring(datum.endAt, springConfig)
                }
              };
            })
          }, function (interpolatedStyles) {
            var computedCells = applyDataToGrid(cells, interpolatedStyles.map(function (s) {
              return _objectSpread$5({}, s.data, {
                startAt: Math.round(s.style.startAt),
                endAt: Math.round(s.style.endAt)
              });
            }));
            return React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
              return React__default.createElement(cellComponent, {
                key: cell.position,
                position: cell.position,
                size: cellSize,
                x: cell.x,
                y: cell.y,
                color: cell.color,
                fill: cell.data && cell.data.fill,
                opacity: cell.data ? 1 : emptyOpacity,
                borderWidth: borderWidth,
                borderColor: getBorderColor(cell),
                data: cell.data,
                onHover: partial(onHover, cell),
                onLeave: onLeave,
                onClick: onClick
              });
            }));
          });
        } else {
          var computedCells = applyDataToGrid(cells, computedData);
          cellsRender = React__default.createElement(React.Fragment, null, computedCells.map(function (cell) {
            return React__default.createElement(cellComponent, {
              key: cell.position,
              position: cell.position,
              size: cellSize,
              x: cell.x,
              y: cell.y,
              color: cell.color,
              fill: cell.data && cell.data.fill,
              opacity: cell.data ? 1 : emptyOpacity,
              borderWidth: borderWidth,
              borderColor: getBorderColor(cell),
              data: cell.data,
              onHover: partial(onHover, cell),
              onLeave: onLeave,
              onClick: onClick
            });
          }));
        }
        return React__default.createElement("div", {
          style: {
            position: 'relative',
            width: outerWidth,
            height: outerHeight
          }
        }, React__default.createElement("div", {
          style: {
            position: 'absolute',
            top: margin.top + origin.y,
            left: margin.left + origin.x
          }
        }, cellsRender));
      });
    }
  }]);
  return WaffleHtml;
}(React.Component);
_defineProperty$5(WaffleHtml, "propTypes", WaffleHtmlPropTypes);
WaffleHtml.displayName = 'WaffleHtml';
var WaffleHtml$1 = setDisplayName(WaffleHtml.displayName)(enhance(WaffleHtml));

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var ResponsiveWaffleHtml = function ResponsiveWaffleHtml(props) {
  return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WaffleHtml$1, _extends$2({
      width: width,
      height: height
    }, props));
  });
};

function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }
function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$2(subClass, superClass); }
function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var findCellUnderCursor = function findCellUnderCursor(cells, cellSize, origin, margin, x, y) {
  return cells.find(function (cell) {
    return core.isCursorInRect(cell.x + origin.x + margin.left, cell.y + origin.y + margin.top, cellSize, cellSize, x, y);
  });
};
var WaffleCanvas =
function (_Component) {
  _inherits$2(WaffleCanvas, _Component);
  function WaffleCanvas() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck$2(this, WaffleCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn$2(this, (_getPrototypeOf2 = _getPrototypeOf$2(WaffleCanvas)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$6(_assertThisInitialized$2(_this), "handleMouseHover", function (showTooltip, hideTooltip) {
      return function (event) {
        var _this$props = _this.props,
            isInteractive = _this$props.isInteractive,
            margin = _this$props.margin,
            theme = _this$props.theme,
            cells = _this$props.cells,
            cellSize = _this$props.cellSize,
            origin = _this$props.origin,
            tooltipFormat = _this$props.tooltipFormat,
            tooltip = _this$props.tooltip;
        if (!isInteractive || !cells) return;
        var _getRelativeCursor = core.getRelativeCursor(_this.surface, event),
            _getRelativeCursor2 = _slicedToArray(_getRelativeCursor, 2),
            x = _getRelativeCursor2[0],
            y = _getRelativeCursor2[1];
        var cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y);
        if (cell !== undefined && cell.data) {
          showTooltip(React__default.createElement(WaffleCellTooltip, {
            position: cell.position,
            row: cell.row,
            column: cell.column,
            color: cell.color,
            data: cell.data,
            theme: theme,
            tooltipFormat: tooltipFormat,
            tooltip: tooltip
          }), event);
        } else {
          hideTooltip();
        }
      };
    });
    _defineProperty$6(_assertThisInitialized$2(_this), "handleMouseLeave", function (hideTooltip) {
      return function () {
        if (_this.props.isInteractive !== true) return;
        hideTooltip();
      };
    });
    _defineProperty$6(_assertThisInitialized$2(_this), "handleClick", function (event) {
      var _this$props2 = _this.props,
          isInteractive = _this$props2.isInteractive,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick,
          cells = _this$props2.cells,
          cellSize = _this$props2.cellSize,
          origin = _this$props2.origin;
      if (!isInteractive || !cells) return;
      var _getRelativeCursor3 = core.getRelativeCursor(_this.surface, event),
          _getRelativeCursor4 = _slicedToArray(_getRelativeCursor3, 2),
          x = _getRelativeCursor4[0],
          y = _getRelativeCursor4[1];
      var cell = findCellUnderCursor(cells, cellSize, origin, margin, x, y);
      if (cell !== undefined) onClick(cell, event);
    });
    return _this;
  }
  _createClass$2(WaffleCanvas, [{
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
      var pixelRatio = props.pixelRatio,
          margin = props.margin,
          width = props.width,
          height = props.height,
          outerWidth = props.outerWidth,
          outerHeight = props.outerHeight,
          getColor = props.getColor,
          emptyColor = props.emptyColor,
          emptyOpacity = props.emptyOpacity,
          borderWidth = props.borderWidth,
          getBorderColor = props.getBorderColor,
          cells = props.cells,
          cellSize = props.cellSize,
          origin = props.origin,
          computedData = props.computedData,
          legendData = props.legendData,
          legends$1 = props.legends,
          theme = props.theme;
      this.surface.width = outerWidth * pixelRatio;
      this.surface.height = outerHeight * pixelRatio;
      this.ctx.scale(pixelRatio, pixelRatio);
      this.ctx.fillStyle = theme.background;
      this.ctx.fillRect(0, 0, outerWidth, outerHeight);
      this.ctx.translate(margin.left, margin.top);
      cells.forEach(function (cell) {
        cell.color = emptyColor;
      });
      computedData.forEach(function (datum) {
        range(datum.startAt, datum.endAt).forEach(function (position) {
          var cell = cells[position];
          if (cell !== undefined) {
            cell.data = datum;
            cell.groupIndex = datum.groupIndex;
            cell.color = getColor(datum);
          }
        });
      });
      cells.forEach(function (cell) {
        _this2.ctx.save();
        _this2.ctx.globalAlpha = cell.data ? 1 : emptyOpacity;
        _this2.ctx.fillStyle = cell.color;
        _this2.ctx.fillRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize);
        if (borderWidth > 0) {
          _this2.ctx.strokeStyle = getBorderColor(cell);
          _this2.ctx.lineWidth = borderWidth;
          _this2.ctx.strokeRect(cell.x + origin.x, cell.y + origin.y, cellSize, cellSize);
        }
        _this2.ctx.restore();
      });
      legends$1.forEach(function (legend) {
        legends.renderLegendToCanvas(_this2.ctx, _objectSpread$6({}, legend, {
          data: legendData,
          containerWidth: width,
          containerHeight: height
        }));
      });
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
      return React__default.createElement(core.Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: false
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
        return React__default.createElement("canvas", {
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
  return WaffleCanvas;
}(React.Component);
_defineProperty$6(WaffleCanvas, "propTypes", WaffleCanvasPropTypes);
WaffleCanvas.displayName = 'WaffleCanvas';
var WaffleCanvas$1 = setDisplayName(WaffleCanvas.displayName)(enhance(WaffleCanvas));

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var ResponsiveWaffleCanvas = function ResponsiveWaffleCanvas(props) {
  return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React__default.createElement(WaffleCanvas$1, _extends$3({
      width: width,
      height: height
    }, props));
  });
};

exports.ResponsiveWaffle = ResponsiveWaffle;
exports.ResponsiveWaffleCanvas = ResponsiveWaffleCanvas;
exports.ResponsiveWaffleHtml = ResponsiveWaffleHtml;
exports.Waffle = Waffle$1;
exports.WaffleCanvas = WaffleCanvas$1;
exports.WaffleCanvasDefaultProps = WaffleCanvasDefaultProps;
exports.WaffleCanvasPropTypes = WaffleCanvasPropTypes;
exports.WaffleDefaultProps = WaffleDefaultProps;
exports.WaffleHtml = WaffleHtml$1;
exports.WaffleHtmlDefaultProps = WaffleHtmlDefaultProps;
exports.WaffleHtmlPropTypes = WaffleHtmlPropTypes;
exports.WafflePropTypes = WafflePropTypes;
