(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/pure'), require('recompose/setDisplayName'), require('@nivo/core'), require('@nivo/axes'), require('prop-types'), require('@nivo/colors'), require('d3-shape'), require('recompose/withPropsOnChange'), require('d3-scale'), require('@nivo/tooltip')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'recompose/compose', 'recompose/defaultProps', 'recompose/pure', 'recompose/setDisplayName', '@nivo/core', '@nivo/axes', 'prop-types', '@nivo/colors', 'd3-shape', 'recompose/withPropsOnChange', 'd3-scale', '@nivo/tooltip'], factory) :
    (global = global || self, factory(global.nivo = global.nivo || {}, global.React, global.RecomposeCompose, global.RecomposeDefaultProps, global.RecomposePure, global.RecomposeSetDisplayName, global.nivo, global.nivo, global.PropTypes, global.nivo, global.d3, global.RecomposeWithPropsOnChange, global.d3, global.nivo));
}(this, function (exports, React, compose, defaultProps, pure, setDisplayName, core, axes, PropTypes, colors, d3Shape, withPropsOnChange, d3Scale, tooltip) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var commonVariablePropTypes = {
      key: PropTypes.string.isRequired,
      ticksPosition: PropTypes.oneOf(['before', 'after']),
      tickSize: PropTypes.number,
      tickPadding: PropTypes.number,
      tickRotation: PropTypes.number,
      format: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
      legend: PropTypes.node,
      legendPosition: PropTypes.oneOf(['start', 'middle', 'end']),
      legendOffset: PropTypes.number
    };
    var commonPropTypes = {
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
      variables: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(_objectSpread({}, commonVariablePropTypes, {
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['point']).isRequired,
        padding: PropTypes.number,
        values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        tickValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      })), PropTypes.shape(_objectSpread({}, commonVariablePropTypes, {
        type: PropTypes.oneOf(['linear']).isRequired,
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
        tickValues: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
      }))])).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      curve: core.lineCurvePropType.isRequired,
      lineGenerator: PropTypes.func.isRequired,
      strokeWidth: PropTypes.number.isRequired,
      lineOpacity: PropTypes.number.isRequired,
      axesPlan: PropTypes.oneOf(['foreground', 'background']).isRequired,
      axesTicksPosition: PropTypes.oneOf(['before', 'after']).isRequired,
      colors: colors.ordinalColorsPropType.isRequired,
      theme: core.themePropType.isRequired
    };
    var commonDefaultProps = {
      layout: 'horizontal',
      curve: 'linear',
      colors: {
        scheme: 'yellow_orange_red'
      },
      strokeWidth: 2,
      lineOpacity: 0.35,
      axesPlan: 'foreground',
      axesTicksPosition: 'after'
    };

    var commonEnhancers = [core.withDimensions(), core.withTheme(), withPropsOnChange(['colors'], function (_ref) {
      var colors$1 = _ref.colors;
      return {
        getLineColor: colors.getOrdinalColorScale(colors$1, 'index')
      };
    }), withPropsOnChange(['curve'], function (_ref2) {
      var curve = _ref2.curve;
      return {
        lineGenerator: d3Shape.line().x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).curve(core.curveFromProp(curve))
      };
    })];

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    var computeParallelCoordinatesLayout = function computeParallelCoordinatesLayout(_ref) {
      var width = _ref.width,
          height = _ref.height,
          data = _ref.data,
          variables = _ref.variables,
          layout = _ref.layout;
      var variablesScale = d3Scale.scalePoint().range(layout === 'horizontal' ? [0, width] : [height, 0]).domain(variables.map(function (_ref2) {
        var key = _ref2.key;
        return key;
      }));
      var range = layout === 'horizontal' ? [height, 0] : [0, width];
      var variablesWithScale = variables.map(function (variable) {
        var allValues = new Set();
        data.forEach(function (d) {
          return allValues.add(d[variable.key]);
        });
        var scale;
        if (variable.type === 'linear') {
          var min = variable.min !== undefined && variable.min !== 'auto' ? variable.min : Math.min.apply(Math, _toConsumableArray(Array.from(allValues)));
          var max = variable.max !== undefined && variable.max !== 'auto' ? variable.max : Math.max.apply(Math, _toConsumableArray(Array.from(allValues)));
          scale = d3Scale.scaleLinear().rangeRound(range).domain([min, max]);
        }
        if (variable.type === 'point') {
          scale = d3Scale.scalePoint().range(range).domain(variable.values || allValues);
          if (variable.padding !== undefined) {
            scale.padding(variable.padding);
          }
        }
        return _objectSpread$1({}, variable, {
          scale: scale,
          values: Array.from(allValues)
        });
      });
      var dataWithPoints = data.map(function (datum, index) {
        var points = variablesWithScale.map(function (variable) {
          return {
            x: layout === 'horizontal' ? variablesScale(variable.key) : variable.scale(datum[variable.key]),
            y: layout === 'horizontal' ? variable.scale(datum[variable.key]) : variablesScale(variable.key)
          };
        });
        return _objectSpread$1({
          index: index
        }, datum, {
          points: points
        });
      });
      return {
        variablesScale: variablesScale,
        variablesWithScale: variablesWithScale,
        dataWithPoints: dataWithPoints
      };
    };

    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
    function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var ParallelCoordinatesLayout =
    function (_PureComponent) {
      _inherits(ParallelCoordinatesLayout, _PureComponent);
      function ParallelCoordinatesLayout() {
        _classCallCheck(this, ParallelCoordinatesLayout);
        return _possibleConstructorReturn(this, _getPrototypeOf(ParallelCoordinatesLayout).apply(this, arguments));
      }
      _createClass(ParallelCoordinatesLayout, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              width = _this$props.width,
              height = _this$props.height,
              data = _this$props.data,
              variables = _this$props.variables,
              layout = _this$props.layout,
              children = _this$props.children;
          return children(computeParallelCoordinatesLayout({
            width: width,
            height: height,
            data: data,
            variables: variables,
            layout: layout
          }));
        }
      }]);
      return ParallelCoordinatesLayout;
    }(React.PureComponent);
    _defineProperty$2(ParallelCoordinatesLayout, "propTypes", {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
      variables: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['point']).isRequired,
        padding: PropTypes.number,
        values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
      }), PropTypes.shape({
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['linear']).isRequired,
        min: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])])
      })])).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      children: PropTypes.func.isRequired
    });

    function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }
    function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
    function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }
    function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
    function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var ParallelCoordinatesLineTooltip =
    function (_PureComponent) {
      _inherits$1(ParallelCoordinatesLineTooltip, _PureComponent);
      function ParallelCoordinatesLineTooltip() {
        _classCallCheck$1(this, ParallelCoordinatesLineTooltip);
        return _possibleConstructorReturn$1(this, _getPrototypeOf$1(ParallelCoordinatesLineTooltip).apply(this, arguments));
      }
      _createClass$1(ParallelCoordinatesLineTooltip, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              data = _this$props.data,
              variables = _this$props.variables,
              theme = _this$props.theme;
          return React__default.createElement(tooltip.TableTooltip, {
            theme: theme,
            rows: variables.map(function (variable) {
              return [variable.key, React__default.createElement("strong", null, data[variable.key])];
            })
          });
        }
      }]);
      return ParallelCoordinatesLineTooltip;
    }(React.PureComponent);
    _defineProperty$3(ParallelCoordinatesLineTooltip, "propTypes", {
      data: PropTypes.object.isRequired,
      variables: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })).isRequired,
      theme: core.themePropType.isRequired
    });

    function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } return target; }
    function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
    function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }
    function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
    function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$2(subClass, superClass); }
    function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
    function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var ParallelCoordinatesLine =
    function (_PureComponent) {
      _inherits$2(ParallelCoordinatesLine, _PureComponent);
      function ParallelCoordinatesLine() {
        var _getPrototypeOf2;
        var _this;
        _classCallCheck$2(this, ParallelCoordinatesLine);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _possibleConstructorReturn$2(this, (_getPrototypeOf2 = _getPrototypeOf$2(ParallelCoordinatesLine)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _defineProperty$4(_assertThisInitialized$2(_this), "handleActiveMouse", function (event) {
          var _this$props = _this.props,
              showTooltip = _this$props.showTooltip,
              data = _this$props.data,
              variables = _this$props.variables,
              theme = _this$props.theme;
          showTooltip(React__default.createElement(ParallelCoordinatesLineTooltip, {
            data: data,
            variables: variables,
            theme: theme
          }), event);
        });
        _defineProperty$4(_assertThisInitialized$2(_this), "handleMouseLeave", function () {
          _this.props.hideTooltip();
        });
        return _this;
      }
      _createClass$2(ParallelCoordinatesLine, [{
        key: "render",
        value: function render() {
          var _this2 = this;
          var _this$props2 = this.props,
              lineGenerator = _this$props2.lineGenerator,
              points = _this$props2.points,
              strokeWidth = _this$props2.strokeWidth,
              color = _this$props2.color,
              opacity = _this$props2.opacity,
              animate = _this$props2.animate,
              motionStiffness = _this$props2.motionStiffness,
              motionDamping = _this$props2.motionDamping;
          var pathDefinition = lineGenerator(points);
          if (animate !== true) {
            return React__default.createElement("path", {
              d: pathDefinition,
              stroke: color,
              strokeWidth: strokeWidth,
              strokeLinecap: "round",
              opacity: opacity,
              fill: "none",
              onMouseEnter: this.handleActiveMouse,
              onMouseMove: this.handleActiveMouse,
              onMouseLeave: this.handleMouseLeave
            });
          }
          var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping
          };
          return React__default.createElement(core.SmartMotion, {
            style: function style(spring) {
              return {
                d: spring(pathDefinition, springConfig),
                opacity: spring(opacity, springConfig)
              };
            }
          }, function (style) {
            return React__default.createElement("path", {
              d: style.d,
              stroke: color,
              strokeWidth: strokeWidth,
              strokeLinecap: "round",
              opacity: style.opacity,
              fill: "none",
              onMouseEnter: _this2.handleActiveMouse,
              onMouseMove: _this2.handleActiveMouse,
              onMouseLeave: _this2.handleMouseLeave
            });
          });
        }
      }]);
      return ParallelCoordinatesLine;
    }(React.PureComponent);
    _defineProperty$4(ParallelCoordinatesLine, "propTypes", _objectSpread$2({
      data: PropTypes.object.isRequired,
      variables: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })).isRequired,
      lineGenerator: PropTypes.func.isRequired,
      points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })).isRequired,
      strokeWidth: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      opacity: PropTypes.number.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired,
      theme: core.themePropType.isRequired
    }, core.motionPropTypes));

    function _typeof$3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
    function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1(); }
    function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray$1(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$3(self); }
    function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }
    function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$3(subClass, superClass); }
    function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
    function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var ParallelCoordinates =
    function (_Component) {
      _inherits$3(ParallelCoordinates, _Component);
      function ParallelCoordinates() {
        _classCallCheck$3(this, ParallelCoordinates);
        return _possibleConstructorReturn$3(this, _getPrototypeOf$3(ParallelCoordinates).apply(this, arguments));
      }
      _createClass$3(ParallelCoordinates, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              data = _this$props.data,
              variables = _this$props.variables,
              layout = _this$props.layout,
              margin = _this$props.margin,
              width = _this$props.width,
              height = _this$props.height,
              outerWidth = _this$props.outerWidth,
              outerHeight = _this$props.outerHeight,
              axesPlan = _this$props.axesPlan,
              axesTicksPosition = _this$props.axesTicksPosition,
              lineGenerator = _this$props.lineGenerator,
              strokeWidth = _this$props.strokeWidth,
              lineOpacity = _this$props.lineOpacity,
              getLineColor = _this$props.getLineColor,
              theme = _this$props.theme,
              animate = _this$props.animate,
              motionStiffness = _this$props.motionStiffness,
              motionDamping = _this$props.motionDamping,
              isInteractive = _this$props.isInteractive;
          return React__default.createElement(ParallelCoordinatesLayout, {
            width: width,
            height: height,
            data: data,
            variables: variables,
            layout: layout
          }, function (_ref) {
            var variablesScale = _ref.variablesScale,
                variablesWithScale = _ref.variablesWithScale,
                dataWithPoints = _ref.dataWithPoints;
            var axes$1 = variablesWithScale.map(function (variable) {
              return React__default.createElement(axes.Axis, {
                key: variable.key,
                axis: layout === 'horizontal' ? 'y' : 'x',
                length: layout === 'horizontal' ? height : width,
                x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
                y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
                scale: variable.scale,
                ticksPosition: variable.ticksPosition || axesTicksPosition,
                tickValues: variable.tickValues,
                tickSize: variable.tickSize,
                tickPadding: variable.tickPadding,
                tickRotation: variable.tickRotation,
                format: variable.tickFormat,
                legend: variable.legend,
                legendPosition: variable.legendPosition,
                legendOffset: variable.legendOffset
              });
            });
            return React__default.createElement(core.Container, {
              isInteractive: isInteractive,
              theme: theme,
              animate: animate,
              motionDamping: motionDamping,
              motionStiffness: motionStiffness
            }, function (_ref2) {
              var showTooltip = _ref2.showTooltip,
                  hideTooltip = _ref2.hideTooltip;
              return React__default.createElement(core.SvgWrapper, {
                width: outerWidth,
                height: outerHeight,
                margin: margin,
                theme: theme
              }, axesPlan === 'background' && axes$1, dataWithPoints.map(function (datum) {
                return React__default.createElement(ParallelCoordinatesLine, {
                  key: datum.index,
                  data: datum,
                  variables: variables,
                  lineGenerator: lineGenerator,
                  points: datum.points,
                  strokeWidth: strokeWidth,
                  opacity: lineOpacity,
                  color: getLineColor(datum),
                  theme: theme,
                  showTooltip: showTooltip,
                  hideTooltip: hideTooltip,
                  animate: animate,
                  motionDamping: motionDamping,
                  motionStiffness: motionStiffness
                });
              }), axesPlan === 'foreground' && axes$1);
            });
          });
        }
      }]);
      return ParallelCoordinates;
    }(React.Component);
    _defineProperty$5(ParallelCoordinates, "propTypes", commonPropTypes);
    var enhance = compose.apply(void 0, [defaultProps(commonDefaultProps)].concat(_toConsumableArray$1(commonEnhancers), [core.withMotion(), pure]));
    var ParallelCoordinates$1 = setDisplayName('ParallelCoordinates')(enhance(ParallelCoordinates));

    function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
    var ResponsiveParallelCoordinates = function ResponsiveParallelCoordinates(props) {
      return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return React__default.createElement(ParallelCoordinates$1, _extends({
          width: width,
          height: height
        }, props));
      });
    };

    function _typeof$4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }
    function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } return target; }
    function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _nonIterableSpread$2(); }
    function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray$2(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$4(self); }
    function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }
    function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$4(subClass, superClass); }
    function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
    function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var ParallelCoordinatesCanvas =
    function (_Component) {
      _inherits$4(ParallelCoordinatesCanvas, _Component);
      function ParallelCoordinatesCanvas() {
        _classCallCheck$4(this, ParallelCoordinatesCanvas);
        return _possibleConstructorReturn$4(this, _getPrototypeOf$4(ParallelCoordinatesCanvas).apply(this, arguments));
      }
      _createClass$4(ParallelCoordinatesCanvas, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.ctx = this.surface.getContext('2d');
          this.draw(this.props);
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(props) {
          if (this.props.outerWidth !== props.outerWidth || this.props.outerHeight !== props.outerHeight || this.props.isInteractive !== props.isInteractive || this.props.theme !== props.theme) {
            return true;
          } else {
            this.draw(props);
            return false;
          }
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
          var _this = this;
          var layout = props.layout,
              dataWithPoints = props.dataWithPoints,
              variablesWithScale = props.variablesWithScale,
              variablesScale = props.variablesScale,
              width = props.width,
              height = props.height,
              outerWidth = props.outerWidth,
              outerHeight = props.outerHeight,
              pixelRatio = props.pixelRatio,
              getLineColor = props.getLineColor,
              margin = props.margin,
              lineOpacity = props.lineOpacity,
              strokeWidth = props.strokeWidth,
              lineGenerator = props.lineGenerator,
              axesTicksPosition = props.axesTicksPosition,
              theme = props.theme;
          this.surface.width = outerWidth * pixelRatio;
          this.surface.height = outerHeight * pixelRatio;
          this.ctx.scale(pixelRatio, pixelRatio);
          this.ctx.fillStyle = theme.background;
          this.ctx.fillRect(0, 0, outerWidth, outerHeight);
          this.ctx.translate(margin.left, margin.top);
          lineGenerator.context(this.ctx);
          dataWithPoints.forEach(function (datum) {
            _this.ctx.save();
            _this.ctx.globalAlpha = lineOpacity;
            _this.ctx.beginPath();
            lineGenerator(datum.points);
            _this.ctx.strokeStyle = getLineColor(datum);
            _this.ctx.lineWidth = strokeWidth;
            _this.ctx.stroke();
            _this.ctx.restore();
          });
          variablesWithScale.map(function (variable) {
            axes.renderAxisToCanvas(_this.ctx, {
              axis: layout === 'horizontal' ? 'y' : 'x',
              scale: variable.scale,
              x: layout === 'horizontal' ? variablesScale(variable.key) : 0,
              y: layout === 'horizontal' ? 0 : variablesScale(variable.key),
              length: layout === 'horizontal' ? height : width,
              ticksPosition: axesTicksPosition,
              theme: theme
            });
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;
          var _this$props = this.props,
              pixelRatio = _this$props.pixelRatio,
              outerWidth = _this$props.outerWidth,
              outerHeight = _this$props.outerHeight,
              theme = _this$props.theme,
              isInteractive = _this$props.isInteractive;
          return React__default.createElement(core.Container, {
            isInteractive: isInteractive,
            theme: theme,
            animate: false
          }, function () {
            return React__default.createElement("canvas", {
              ref: function ref(surface) {
                _this2.surface = surface;
              },
              width: outerWidth * pixelRatio,
              height: outerHeight * pixelRatio,
              style: {
                width: outerWidth,
                height: outerHeight
              }
            });
          });
        }
      }]);
      return ParallelCoordinatesCanvas;
    }(React.Component);
    _defineProperty$6(ParallelCoordinatesCanvas, "propTypes", _objectSpread$3({}, commonPropTypes, {
      pixelRatio: PropTypes.number.isRequired
    }));
    var enhance$1 = compose.apply(void 0, [defaultProps(_objectSpread$3({}, commonDefaultProps, {
      pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
    }))].concat(_toConsumableArray$2(commonEnhancers), [withPropsOnChange(['width', 'height', 'data', 'variables', 'layout'], function (_ref) {
      var width = _ref.width,
          height = _ref.height,
          data = _ref.data,
          variables = _ref.variables,
          layout = _ref.layout;
      return computeParallelCoordinatesLayout({
        width: width,
        height: height,
        data: data,
        variables: variables,
        layout: layout
      });
    }), pure]));
    var ParallelCoordinatesCanvas$1 = setDisplayName('ParallelCoordinatesCanvas')(enhance$1(ParallelCoordinatesCanvas));

    function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
    var ResponsiveParallelCoordinatesCanvas = function ResponsiveParallelCoordinatesCanvas(props) {
      return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return React__default.createElement(ParallelCoordinatesCanvas$1, _extends$1({
          width: width,
          height: height
        }, props));
      });
    };

    exports.ParallelCoordinates = ParallelCoordinates$1;
    exports.ParallelCoordinatesCanvas = ParallelCoordinatesCanvas$1;
    exports.ResponsiveParallelCoordinates = ResponsiveParallelCoordinates;
    exports.ResponsiveParallelCoordinatesCanvas = ResponsiveParallelCoordinatesCanvas;
    exports.commonDefaultProps = commonDefaultProps;
    exports.commonPropTypes = commonPropTypes;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
