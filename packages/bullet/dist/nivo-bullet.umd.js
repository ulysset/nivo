(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('d3-scale'), require('recompose/setDisplayName'), require('@nivo/core'), require('prop-types'), require('lodash/isString'), require('react-motion'), require('lodash/partial'), require('recompose/compose'), require('recompose/defaultProps'), require('recompose/withPropsOnChange'), require('recompose/pure'), require('@nivo/axes'), require('@nivo/tooltip'), require('lodash/last'), require('@nivo/colors')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'd3-scale', 'recompose/setDisplayName', '@nivo/core', 'prop-types', 'lodash/isString', 'react-motion', 'lodash/partial', 'recompose/compose', 'recompose/defaultProps', 'recompose/withPropsOnChange', 'recompose/pure', '@nivo/axes', '@nivo/tooltip', 'lodash/last', '@nivo/colors'], factory) :
    (global = global || self, factory(global.nivo = global.nivo || {}, global.React, global.d3, global.RecomposeSetDisplayName, global.nivo, global.PropTypes, global['lodash/isString'], global.ReactMotion, global['lodash/partial'], global.RecomposeCompose, global.RecomposeDefaultProps, global.RecomposeWithPropsOnChange, global.RecomposePure, global.nivo, global.nivo, global['lodash/last'], global.nivo));
}(this, function (exports, React, d3Scale, setDisplayName, core, PropTypes, isString, reactMotion, partial, compose, defaultProps, withPropsOnChange, pure, axes, tooltip, last, colors) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    setDisplayName = setDisplayName && setDisplayName.hasOwnProperty('default') ? setDisplayName['default'] : setDisplayName;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
    isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;
    partial = partial && partial.hasOwnProperty('default') ? partial['default'] : partial;
    compose = compose && compose.hasOwnProperty('default') ? compose['default'] : compose;
    defaultProps = defaultProps && defaultProps.hasOwnProperty('default') ? defaultProps['default'] : defaultProps;
    withPropsOnChange = withPropsOnChange && withPropsOnChange.hasOwnProperty('default') ? withPropsOnChange['default'] : withPropsOnChange;
    pure = pure && pure.hasOwnProperty('default') ? pure['default'] : pure;
    last = last && last.hasOwnProperty('default') ? last['default'] : last;

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    var stackValues = function stackValues(values, colorScale) {
      var useAverage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var normalized = _toConsumableArray(values).filter(function (v) {
        return v !== 0;
      }).sort(function (a, b) {
        return a - b;
      });
      return normalized.reduce(function (acc, v1, index) {
        var v0 = last(acc) !== undefined ? last(acc).v1 : 0;
        var sequentialValue = useAverage === true ? v0 + (v1 - v0) / 2 : v1;
        return [].concat(_toConsumableArray(acc), [{
          index: index,
          v0: v0,
          v1: v1,
          color: colorScale(colorScale.type === 'sequential' ? sequentialValue : index)
        }]);
      }, []);
    };
    var getComputeRect = function getComputeRect(_ref) {
      var layout = _ref.layout,
          reverse = _ref.reverse,
          scale = _ref.scale,
          height = _ref.height;
      if (layout === 'horizontal') {
        if (reverse === true) {
          return function (d) {
            var x = scale(d.v1);
            var w = scale(d.v0) - x;
            return {
              x: x,
              y: 0,
              width: w,
              height: height
            };
          };
        }
        return function (d) {
          var x = scale(d.v0);
          var w = scale(d.v1) - x;
          return {
            x: x,
            y: 0,
            width: w,
            height: height
          };
        };
      }
      if (reverse === true) {
        return function (d) {
          var y = scale(d.v0);
          var h = scale(d.v1) - y;
          return {
            x: 0,
            y: y,
            width: height,
            height: h
          };
        };
      }
      return function (d) {
        var y = scale(d.v1);
        var h = scale(d.v0) - y;
        return {
          x: 0,
          y: y,
          width: height,
          height: h
        };
      };
    };
    var computeRects = function computeRects(_ref2) {
      var data = _ref2.data,
          layout = _ref2.layout,
          reverse = _ref2.reverse,
          scale = _ref2.scale,
          height = _ref2.height;
      var computeRect = getComputeRect({
        layout: layout,
        reverse: reverse,
        scale: scale,
        height: height
      });
      return data.map(function (d) {
        return _objectSpread({
          data: d
        }, computeRect(d));
      });
    };

    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
    function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var getPositionGenerator = function getPositionGenerator(_ref) {
      var layout = _ref.layout,
          reverse = _ref.reverse,
          scale = _ref.scale,
          height = _ref.height,
          markerSize = _ref.markerSize;
      if (layout === 'horizontal') {
        return function (marker) {
          var x = scale(marker.value);
          var y = height / 2;
          var rotation = reverse === true ? 180 : 0;
          return {
            x: x,
            y: y,
            size: markerSize,
            rotation: rotation
          };
        };
      }
      return function (marker) {
        var x = height / 2;
        var y = scale(marker.value);
        var rotation = reverse === true ? 270 : 90;
        return {
          x: x,
          y: y,
          size: markerSize,
          rotation: rotation
        };
      };
    };
    var BulletMarkers =
    function (_Component) {
      _inherits(BulletMarkers, _Component);
      function BulletMarkers() {
        var _getPrototypeOf2;
        var _this;
        _classCallCheck(this, BulletMarkers);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BulletMarkers)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _defineProperty$1(_assertThisInitialized(_this), "handleMouseEnter", function (data, event) {
          _this.props.onMouseEnter(data, event);
        });
        _defineProperty$1(_assertThisInitialized(_this), "handleMouseLeave", function (data, event) {
          _this.props.onMouseLeave(data, event);
        });
        _defineProperty$1(_assertThisInitialized(_this), "handleClick", function (data, event) {
          _this.props.onClick(data, event);
        });
        return _this;
      }
      _createClass(BulletMarkers, [{
        key: "render",
        value: function render() {
          var _this2 = this;
          var _this$props = this.props,
              scale = _this$props.scale,
              layout = _this$props.layout,
              reverse = _this$props.reverse,
              markers = _this$props.markers,
              height = _this$props.height,
              markerSize = _this$props.markerSize,
              component = _this$props.component,
              animate = _this$props.animate,
              motionStiffness = _this$props.motionStiffness,
              motionDamping = _this$props.motionDamping;
          var getPosition = getPositionGenerator({
            layout: layout,
            reverse: reverse,
            scale: scale,
            height: height,
            markerSize: markerSize
          });
          if (animate !== true) {
            return React__default.createElement(React.Fragment, null, markers.map(function (marker) {
              return React__default.createElement(component, _objectSpread$1({
                key: marker.index
              }, marker, getPosition(marker), {
                data: marker,
                onMouseEnter: partial(_this2.handleMouseEnter, marker),
                onMouseMove: partial(_this2.handleMouseEnter, marker),
                onMouseLeave: partial(_this2.handleMouseLeave, marker),
                onClick: partial(_this2.handleClick, marker)
              }));
            }));
          }
          var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness
          };
          return React__default.createElement(reactMotion.TransitionMotion, {
            styles: markers.map(function (marker, i) {
              var position = getPosition(marker);
              return {
                key: "".concat(i),
                data: marker,
                style: _objectSpread$1({
                  x: reactMotion.spring(position.x, springConfig),
                  y: reactMotion.spring(position.y, springConfig),
                  size: reactMotion.spring(position.size, springConfig),
                  rotation: reactMotion.spring(position.rotation, springConfig)
                }, colors.interpolateColor(marker.color, springConfig))
              };
            })
          }, function (interpolatedStyles) {
            return React__default.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref2) {
              var key = _ref2.key,
                  style = _ref2.style,
                  marker = _ref2.data;
              var color = colors.getInterpolatedColor(style);
              return React__default.createElement(component, _objectSpread$1({
                key: key
              }, marker, style, {
                color: color,
                data: marker,
                onMouseEnter: partial(_this2.handleMouseEnter, marker),
                onMouseMove: partial(_this2.handleMouseEnter, marker),
                onMouseLeave: partial(_this2.handleMouseLeave, marker),
                onClick: partial(_this2.handleClick, marker)
              }));
            }));
          });
        }
      }]);
      return BulletMarkers;
    }(React.Component);
    _defineProperty$1(BulletMarkers, "propTypes", _objectSpread$1({
      scale: PropTypes.func.isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      markers: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
      })).isRequired,
      height: PropTypes.number.isRequired,
      markerSize: PropTypes.number.isRequired,
      component: PropTypes.func.isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
    }, core.motionPropTypes));

    function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }
    function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
    function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }
    function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }
    function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }
    function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
    function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var BulletRects =
    function (_Component) {
      _inherits$1(BulletRects, _Component);
      function BulletRects() {
        var _getPrototypeOf2;
        var _this;
        _classCallCheck$1(this, BulletRects);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _possibleConstructorReturn$1(this, (_getPrototypeOf2 = _getPrototypeOf$1(BulletRects)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _defineProperty$2(_assertThisInitialized$1(_this), "handleMouseEnter", function (data, event) {
          _this.props.onMouseEnter(data, event);
        });
        _defineProperty$2(_assertThisInitialized$1(_this), "handleMouseLeave", function (data, event) {
          _this.props.onMouseLeave(data, event);
        });
        _defineProperty$2(_assertThisInitialized$1(_this), "handleClick", function (data, event) {
          _this.props.onClick(data, event);
        });
        return _this;
      }
      _createClass$1(BulletRects, [{
        key: "render",
        value: function render() {
          var _this2 = this;
          var _this$props = this.props,
              rects = _this$props.rects,
              layout = _this$props.layout,
              y = _this$props.y,
              component = _this$props.component,
              animate = _this$props.animate,
              motionStiffness = _this$props.motionStiffness,
              motionDamping = _this$props.motionDamping;
          var transform = "translate(".concat(layout === 'horizontal' ? 0 : y, ",").concat(layout === 'horizontal' ? y : 0, ")");
          if (animate !== true) {
            return React__default.createElement("g", {
              transform: transform
            }, rects.map(function (rect) {
              return React__default.createElement(component, _objectSpread$2({
                key: rect.data.index,
                index: rect.data.index,
                color: rect.data.color
              }, rect, {
                onMouseEnter: partial(_this2.handleMouseEnter, rect.data),
                onMouseMove: partial(_this2.handleMouseEnter, rect.data),
                onMouseLeave: partial(_this2.handleMouseLeave, rect.data),
                onClick: partial(_this2.handleClick, rect.data)
              }));
            }));
          }
          var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness
          };
          return React__default.createElement("g", {
            transform: transform
          }, React__default.createElement(reactMotion.TransitionMotion, {
            styles: rects.map(function (rect) {
              return {
                key: "".concat(rect.data.index),
                data: rect.data,
                style: _objectSpread$2({
                  x: reactMotion.spring(rect.x, springConfig),
                  y: reactMotion.spring(rect.y, springConfig),
                  width: reactMotion.spring(rect.width, springConfig),
                  height: reactMotion.spring(rect.height, springConfig)
                }, colors.interpolateColor(rect.data.color, springConfig))
              };
            })
          }, function (interpolatedStyles) {
            return React__default.createElement(React.Fragment, null, interpolatedStyles.map(function (_ref) {
              var key = _ref.key,
                  style = _ref.style,
                  data = _ref.data;
              var color = colors.getInterpolatedColor(style);
              return React__default.createElement(component, {
                key: key,
                index: Number(key),
                data: data,
                x: style.x,
                y: style.y,
                width: Math.max(style.width, 0),
                height: Math.max(style.height, 0),
                color: color,
                onMouseEnter: partial(_this2.handleMouseEnter, data),
                onMouseMove: partial(_this2.handleMouseEnter, data),
                onMouseLeave: partial(_this2.handleMouseLeave, data),
                onClick: partial(_this2.handleClick, data)
              });
            }));
          }));
        }
      }]);
      return BulletRects;
    }(React.Component);
    _defineProperty$2(BulletRects, "propTypes", _objectSpread$2({
      scale: PropTypes.func.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        v0: PropTypes.number.isRequired,
        v1: PropTypes.number.isRequired
      })).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      rects: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        data: PropTypes.shape({
          index: PropTypes.number.isRequired,
          v0: PropTypes.number.isRequired,
          v1: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired
        }).isRequired
      })).isRequired,
      component: PropTypes.func.isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
    }, core.motionPropTypes));
    var EnhancedBulletRects = compose(withPropsOnChange(['data', 'layout', 'reverse', 'scale', 'height'], function (_ref2) {
      var data = _ref2.data,
          layout = _ref2.layout,
          reverse = _ref2.reverse,
          scale = _ref2.scale,
          height = _ref2.height;
      return {
        rects: computeRects({
          data: data,
          layout: layout,
          reverse: reverse,
          scale: scale,
          height: height
        })
      };
    }), pure)(BulletRects);
    EnhancedBulletRects.displayName = 'BulletRects';

    function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }
    function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }
    function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }
    function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$2(subClass, superClass); }
    function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
    function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var BulletRectsItem =
    function (_PureComponent) {
      _inherits$2(BulletRectsItem, _PureComponent);
      function BulletRectsItem() {
        _classCallCheck$2(this, BulletRectsItem);
        return _possibleConstructorReturn$2(this, _getPrototypeOf$2(BulletRectsItem).apply(this, arguments));
      }
      _createClass$2(BulletRectsItem, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              x = _this$props.x,
              y = _this$props.y,
              width = _this$props.width,
              height = _this$props.height,
              color = _this$props.color,
              onMouseEnter = _this$props.onMouseEnter,
              onMouseMove = _this$props.onMouseMove,
              onMouseLeave = _this$props.onMouseLeave,
              onClick = _this$props.onClick;
          return React__default.createElement("rect", {
            x: x,
            y: y,
            width: width,
            height: height,
            fill: color,
            onMouseMove: onMouseMove,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            onClick: onClick
          });
        }
      }]);
      return BulletRectsItem;
    }(React.PureComponent);
    _defineProperty$3(BulletRectsItem, "propTypes", {
      index: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.shape({
        v0: PropTypes.number.isRequired,
        v1: PropTypes.number.isRequired
      }).isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseMove: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
    });

    function _typeof$3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
    function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$3(self); }
    function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }
    function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$3(subClass, superClass); }
    function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
    function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var BulletMarkersItem =
    function (_PureComponent) {
      _inherits$3(BulletMarkersItem, _PureComponent);
      function BulletMarkersItem() {
        _classCallCheck$3(this, BulletMarkersItem);
        return _possibleConstructorReturn$3(this, _getPrototypeOf$3(BulletMarkersItem).apply(this, arguments));
      }
      _createClass$3(BulletMarkersItem, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              x = _this$props.x,
              y = _this$props.y,
              size = _this$props.size,
              rotation = _this$props.rotation,
              color = _this$props.color,
              onMouseEnter = _this$props.onMouseEnter,
              onMouseMove = _this$props.onMouseMove,
              onMouseLeave = _this$props.onMouseLeave,
              onClick = _this$props.onClick;
          return React__default.createElement("line", {
            transform: "rotate(".concat(rotation, ", ").concat(x, ", ").concat(y, ")"),
            x1: x,
            x2: x,
            y1: y - size / 2,
            y2: y + size / 2,
            fill: "none",
            stroke: color,
            strokeWidth: "5",
            onMouseMove: onMouseMove,
            onMouseEnter: onMouseEnter,
            onMouseLeave: onMouseLeave,
            onClick: onClick
          });
        }
      }]);
      return BulletMarkersItem;
    }(React.PureComponent);
    _defineProperty$4(BulletMarkersItem, "propTypes", {
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      size: PropTypes.number.isRequired,
      rotation: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      data: PropTypes.shape({
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
      }).isRequired,
      onMouseEnter: PropTypes.func.isRequired,
      onMouseMove: PropTypes.func.isRequired,
      onMouseLeave: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired
    });

    function _typeof$4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }
    function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
    function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } return target; }
    function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$4(self); }
    function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }
    function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$4(subClass, superClass); }
    function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
    function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var BulletItem =
    function (_Component) {
      _inherits$4(BulletItem, _Component);
      function BulletItem() {
        var _getPrototypeOf2;
        var _this;
        _classCallCheck$4(this, BulletItem);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _possibleConstructorReturn$4(this, (_getPrototypeOf2 = _getPrototypeOf$4(BulletItem)).call.apply(_getPrototypeOf2, [this].concat(args)));
        _defineProperty$5(_assertThisInitialized$4(_this), "handleRangeTooltip", function (showTooltip, range, event) {
          var theme = _this.props.theme;
          showTooltip(React__default.createElement(tooltip.BasicTooltip, {
            id: React__default.createElement("span", null, React__default.createElement("strong", null, range.v0), " to ", React__default.createElement("strong", null, range.v1)),
            enableChip: true,
            color: range.color,
            theme: theme
          }), event);
        });
        _defineProperty$5(_assertThisInitialized$4(_this), "handleMeasureTooltip", function (showTooltip, measure, event) {
          var theme = _this.props.theme;
          showTooltip(React__default.createElement(tooltip.BasicTooltip, {
            id: React__default.createElement("strong", null, measure.v1),
            enableChip: true,
            color: measure.color,
            theme: theme
          }), event);
        });
        _defineProperty$5(_assertThisInitialized$4(_this), "handleMarkerTooltip", function (showTooltip, marker, event) {
          var theme = _this.props.theme;
          showTooltip(React__default.createElement(tooltip.BasicTooltip, {
            id: React__default.createElement("strong", null, marker.value),
            enableChip: true,
            color: marker.color,
            theme: theme
          }), event);
        });
        _defineProperty$5(_assertThisInitialized$4(_this), "handleRangeClick", function (range, event) {
          var _this$props = _this.props,
              id = _this$props.id,
              onRangeClick = _this$props.onRangeClick;
          onRangeClick(_objectSpread$3({
            id: id
          }, range), event);
        });
        _defineProperty$5(_assertThisInitialized$4(_this), "handleMeasureClick", function (measure, event) {
          var _this$props2 = _this.props,
              id = _this$props2.id,
              onMeasureClick = _this$props2.onMeasureClick;
          onMeasureClick(_objectSpread$3({
            id: id
          }, measure), event);
        });
        _defineProperty$5(_assertThisInitialized$4(_this), "handleMarkerClick", function (marker, event) {
          var _this$props3 = _this.props,
              id = _this$props3.id,
              onMarkerClick = _this$props3.onMarkerClick;
          onMarkerClick(_objectSpread$3({
            id: id
          }, marker), event);
        });
        return _this;
      }
      _createClass$4(BulletItem, [{
        key: "render",
        value: function render() {
          var _this2 = this;
          var _this$props4 = this.props,
              id = _this$props4.id,
              scale = _this$props4.scale,
              layout = _this$props4.layout,
              reverse = _this$props4.reverse,
              axisPosition = _this$props4.axisPosition,
              x = _this$props4.x,
              y = _this$props4.y,
              width = _this$props4.width,
              height = _this$props4.height,
              _title = _this$props4.title,
              titlePosition = _this$props4.titlePosition,
              titleAlign = _this$props4.titleAlign,
              titleOffsetX = _this$props4.titleOffsetX,
              titleOffsetY = _this$props4.titleOffsetY,
              titleRotation = _this$props4.titleRotation,
              computedRanges = _this$props4.computedRanges,
              rangeComponent = _this$props4.rangeComponent,
              computedMeasures = _this$props4.computedMeasures,
              measureComponent = _this$props4.measureComponent,
              measureHeight = _this$props4.measureHeight,
              computedMarkers = _this$props4.computedMarkers,
              markerComponent = _this$props4.markerComponent,
              markerHeight = _this$props4.markerHeight,
              theme = _this$props4.theme,
              showTooltip = _this$props4.showTooltip,
              hideTooltip = _this$props4.hideTooltip,
              animate = _this$props4.animate,
              motionStiffness = _this$props4.motionStiffness,
              motionDamping = _this$props4.motionDamping;
          var motionProps = {
            animate: animate,
            motionStiffness: motionStiffness,
            motionDamping: motionDamping
          };
          var rangeNodes = React__default.createElement(EnhancedBulletRects, _extends({
            data: computedRanges,
            scale: scale,
            layout: layout,
            reverse: reverse,
            x: 0,
            y: 0,
            width: width,
            height: height,
            component: rangeComponent,
            onMouseEnter: partial(this.handleRangeTooltip, showTooltip),
            onMouseLeave: hideTooltip,
            onClick: this.handleRangeClick
          }, motionProps));
          var markerNodes = React__default.createElement(BulletMarkers, _extends({
            markers: computedMarkers,
            scale: scale,
            layout: layout,
            reverse: reverse,
            height: height,
            markerSize: markerHeight,
            component: markerComponent,
            onMouseEnter: partial(this.handleMarkerTooltip, showTooltip),
            onMouseLeave: hideTooltip,
            onClick: this.handleMarkerClick
          }, motionProps));
          var axisX = 0;
          var axisY = 0;
          if (layout === 'horizontal' && axisPosition === 'after') {
            axisY = height;
          } else if (layout === 'vertical' && axisPosition === 'after') {
            axisX = height;
          }
          var axis = React__default.createElement("g", {
            transform: "translate(".concat(axisX, ",").concat(axisY, ")")
          }, React__default.createElement(axes.Axis, {
            axis: layout === 'horizontal' ? 'x' : 'y',
            length: layout === 'horizontal' ? width : height,
            scale: scale,
            ticksPosition: axisPosition
          }));
          var title = _title || id;
          var titleX;
          var titleY;
          if (layout === 'horizontal') {
            titleX = titlePosition === 'before' ? titleOffsetX : width + titleOffsetX;
            titleY = height / 2 + titleOffsetY;
          } else {
            titleX = height / 2 + titleOffsetX;
            titleY = titlePosition === 'before' ? titleOffsetY : width + titleOffsetY;
          }
          var titleNode = React__default.createElement("g", {
            transform: "translate(".concat(titleX, ",").concat(titleY, ") rotate(").concat(titleRotation, ")")
          }, isString(title) ? React__default.createElement("text", {
            style: _objectSpread$3({}, theme.labels.text, {
              dominantBaseline: 'central',
              textAnchor: titleAlign
            })
          }, title) : title);
          if (animate !== true) {
            return React__default.createElement("g", {
              transform: "translate(".concat(x, ",").concat(y, ")")
            }, rangeNodes, React__default.createElement(EnhancedBulletRects, _extends({
              data: computedMeasures,
              scale: scale,
              layout: layout,
              reverse: reverse,
              x: 0,
              y: (height - measureHeight) / 2,
              width: width,
              height: measureHeight,
              component: measureComponent,
              onMouseEnter: partial(this.handleMeasureTooltip, showTooltip),
              onMouseLeave: hideTooltip,
              onClick: this.handleMeasureClick
            }, motionProps)), axis, markerNodes, titleNode);
          }
          var springConfig = {
            damping: motionDamping,
            stiffness: motionStiffness
          };
          return React__default.createElement(reactMotion.Motion, {
            style: {
              x: reactMotion.spring(x, springConfig),
              y: reactMotion.spring(y, springConfig),
              measuresY: reactMotion.spring((height - measureHeight) / 2, springConfig)
            }
          }, function (values) {
            return React__default.createElement("g", {
              transform: "translate(".concat(values.x, ",").concat(values.y, ")")
            }, rangeNodes, React__default.createElement(EnhancedBulletRects, _extends({
              data: computedMeasures,
              scale: scale,
              layout: layout,
              reverse: reverse,
              x: 0,
              y: values.measuresY,
              width: width,
              height: measureHeight,
              component: measureComponent,
              onMouseEnter: partial(_this2.handleMeasureTooltip, showTooltip),
              onMouseLeave: hideTooltip,
              onClick: _this2.handleMeasureClick
            }, motionProps)), axis, markerNodes, titleNode);
          });
        }
      }]);
      return BulletItem;
    }(React.Component);
    _defineProperty$5(BulletItem, "propTypes", {
      id: PropTypes.string.isRequired,
      scale: PropTypes.func.isRequired,
      ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
      computedRanges: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        v0: PropTypes.number.isRequired,
        v1: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
      })).isRequired,
      measures: PropTypes.arrayOf(PropTypes.number).isRequired,
      computedMeasures: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        v0: PropTypes.number.isRequired,
        v1: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
      })).isRequired,
      markers: PropTypes.arrayOf(PropTypes.number).isRequired,
      computedMarkers: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired
      })).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      title: PropTypes.node,
      titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
      titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
      titleOffsetX: PropTypes.number.isRequired,
      titleOffsetY: PropTypes.number.isRequired,
      titleRotation: PropTypes.number.isRequired,
      rangeComponent: PropTypes.func.isRequired,
      rangeColors: PropTypes.any.isRequired,
      rangeColorScale: PropTypes.func.isRequired,
      onRangeClick: PropTypes.func.isRequired,
      measureHeight: PropTypes.number.isRequired,
      measureComponent: PropTypes.func.isRequired,
      measureColors: PropTypes.any.isRequired,
      measureColorScale: PropTypes.func.isRequired,
      onMeasureClick: PropTypes.func.isRequired,
      markerHeight: PropTypes.number.isRequired,
      markerComponent: PropTypes.func.isRequired,
      markerColors: PropTypes.any.isRequired,
      markerColorScale: PropTypes.func.isRequired,
      onMarkerClick: PropTypes.func.isRequired,
      theme: core.themePropType.isRequired,
      showTooltip: PropTypes.func.isRequired,
      hideTooltip: PropTypes.func.isRequired
    });
    var EnhancedBulletItem = compose(defaultProps({
      layout: 'horizontal',
      reverse: false,
      axisPosition: 'after',
      titlePosition: 'before',
      titleAlign: 'middle',
      titleRotation: 0,
      titleOffsetX: 0,
      titleOffsetY: 0,
      rangeComponent: BulletRectsItem,
      rangeColors: 'seq:cool',
      onRangeClick: core.noop,
      measureComponent: BulletRectsItem,
      measureColors: 'seq:red_purple',
      onMeasureClick: core.noop,
      markers: [],
      markerComponent: BulletMarkersItem,
      markerColors: 'seq:red_purple',
      onMarkerClick: core.noop,
      showTooltip: core.noop,
      hideTooltip: core.noop
    }), core.withMotion(), withPropsOnChange(['rangeColors', 'scale'], function (_ref) {
      var rangeColors = _ref.rangeColors,
          scale = _ref.scale;
      return {
        rangeColorScale: core.getColorScale(rangeColors, scale, true)
      };
    }), withPropsOnChange(['ranges', 'rangeColorScale'], function (_ref2) {
      var ranges = _ref2.ranges,
          rangeColorScale = _ref2.rangeColorScale;
      return {
        computedRanges: stackValues(ranges, rangeColorScale)
      };
    }), withPropsOnChange(['measureColors', 'scale'], function (_ref3) {
      var measureColors = _ref3.measureColors,
          scale = _ref3.scale;
      return {
        measureColorScale: core.getColorScale(measureColors, scale)
      };
    }), withPropsOnChange(['measures', 'measureColorScale'], function (_ref4) {
      var measures = _ref4.measures,
          measureColorScale = _ref4.measureColorScale;
      return {
        computedMeasures: stackValues(measures, measureColorScale)
      };
    }), withPropsOnChange(['markerColors', 'scale'], function (_ref5) {
      var markerColors = _ref5.markerColors,
          scale = _ref5.scale;
      return {
        markerColorScale: core.getColorScale(markerColors, scale)
      };
    }), withPropsOnChange(['markers', 'markerColorScale'], function (_ref6) {
      var markers = _ref6.markers,
          markerColorScale = _ref6.markerColorScale;
      return {
        computedMarkers: markers.map(function (marker, index) {
          return {
            value: marker,
            index: index,
            color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index)
          };
        })
      };
    }), pure)(BulletItem);
    EnhancedBulletItem.displayName = 'BulletItem';

    function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } return target; }
    function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var commonPropTypes = {
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.node,
        ranges: PropTypes.arrayOf(PropTypes.number).isRequired,
        measures: PropTypes.arrayOf(PropTypes.number).isRequired,
        markers: PropTypes.arrayOf(PropTypes.number)
      })).isRequired,
      layout: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
      reverse: PropTypes.bool.isRequired,
      spacing: PropTypes.number.isRequired,
      titlePosition: PropTypes.oneOf(['before', 'after']).isRequired,
      titleAlign: PropTypes.oneOf(['start', 'middle', 'end']).isRequired,
      titleOffsetX: PropTypes.number.isRequired,
      titleOffsetY: PropTypes.number.isRequired,
      titleRotation: PropTypes.number.isRequired,
      rangeColors: PropTypes.any.isRequired,
      rangeBorderWidth: PropTypes.number.isRequired,
      rangeBorderColor: PropTypes.any.isRequired,
      onRangeClick: PropTypes.func,
      measureColors: PropTypes.any.isRequired,
      measureSize: PropTypes.number.isRequired,
      measureBorderWidth: PropTypes.number.isRequired,
      measureBorderColor: PropTypes.any.isRequired,
      onMeasureClick: PropTypes.func,
      markerColors: PropTypes.any.isRequired,
      markerSize: PropTypes.number.isRequired,
      onMarkerClick: PropTypes.func,
      axisPosition: PropTypes.oneOf(['before', 'after']).isRequired,
      theme: core.themePropType.isRequired,
      overrides: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        reverse: PropTypes.bool,
        rangeColors: PropTypes.any,
        rangeBorderWidth: PropTypes.number,
        rangeBorderColor: PropTypes.any,
        measureColors: PropTypes.any,
        measureBorderWidth: PropTypes.number,
        measureBorderColor: PropTypes.any,
        axis: PropTypes.shape({
          position: PropTypes.oneOf(['before', 'after']),
          min: PropTypes.number,
          max: PropTypes.number
        })
      })).isRequired
    };
    var BulletPropTypes = _objectSpread$4({}, commonPropTypes);
    var commonDefaultProps = {
      layout: EnhancedBulletItem.defaultProps.layout,
      reverse: EnhancedBulletItem.defaultProps.reverse,
      spacing: 30,
      titlePosition: EnhancedBulletItem.defaultProps.titlePosition,
      titleAlign: EnhancedBulletItem.defaultProps.titleAlign,
      titleOffsetX: EnhancedBulletItem.defaultProps.titleOffsetX,
      titleOffsetY: EnhancedBulletItem.defaultProps.titleOffsetY,
      titleRotation: EnhancedBulletItem.defaultProps.titleRotation,
      rangeBorderWidth: 0,
      rangeBorderColor: {
        from: 'color'
      },
      measureSize: 0.4,
      measureBorderWidth: 0,
      measureBorderColor: {
        from: 'color'
      },
      markerSize: 0.6,
      markerColors: EnhancedBulletItem.defaultProps.markerColors,
      axisPosition: EnhancedBulletItem.defaultProps.axisPosition,
      rangeColors: EnhancedBulletItem.defaultProps.rangeColors,
      measureColors: EnhancedBulletItem.defaultProps.measureColors,
      isInteractive: true,
      onClick: core.noop,
      overrides: []
    };
    var BulletDefaultProps = _objectSpread$4({}, commonDefaultProps);

    var props = /*#__PURE__*/Object.freeze({
        BulletPropTypes: BulletPropTypes,
        BulletDefaultProps: BulletDefaultProps
    });

    var commonEnhancers = [core.withDimensions(), core.withTheme()];
    var enhance = (function (Component) {
      var implDefaultProps = props["".concat(Component.displayName, "DefaultProps")];
      switch (Component.displayName) {
        case 'Bullet':
          return compose.apply(void 0, [defaultProps(implDefaultProps)].concat(commonEnhancers, [core.withMotion(), pure]))(Component);
      }
      return Component;
    });

    function _typeof$5(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }
    function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
    function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$7(target, key, source[key]); }); } return target; }
    function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1(); }
    function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
    function _iterableToArray$1(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
    function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
    function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
    function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); return Constructor; }
    function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$5(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$5(self); }
    function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
    function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }
    function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$5(subClass, superClass); }
    function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }
    function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var Bullet =
    function (_Component) {
      _inherits$5(Bullet, _Component);
      function Bullet() {
        _classCallCheck$5(this, Bullet);
        return _possibleConstructorReturn$5(this, _getPrototypeOf$5(Bullet).apply(this, arguments));
      }
      _createClass$5(Bullet, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              data = _this$props.data,
              layout = _this$props.layout,
              spacing = _this$props.spacing,
              measureSize = _this$props.measureSize,
              markerSize = _this$props.markerSize,
              reverse = _this$props.reverse,
              axisPosition = _this$props.axisPosition,
              margin = _this$props.margin,
              width = _this$props.width,
              height = _this$props.height,
              outerWidth = _this$props.outerWidth,
              outerHeight = _this$props.outerHeight,
              titlePosition = _this$props.titlePosition,
              titleAlign = _this$props.titleAlign,
              titleOffsetX = _this$props.titleOffsetX,
              titleOffsetY = _this$props.titleOffsetY,
              titleRotation = _this$props.titleRotation,
              rangeComponent = _this$props.rangeComponent,
              rangeColors = _this$props.rangeColors,
              measureComponent = _this$props.measureComponent,
              measureColors = _this$props.measureColors,
              markerComponent = _this$props.markerComponent,
              markerColors = _this$props.markerColors,
              theme = _this$props.theme,
              animate = _this$props.animate,
              motionStiffness = _this$props.motionStiffness,
              motionDamping = _this$props.motionDamping,
              isInteractive = _this$props.isInteractive,
              onRangeClick = _this$props.onRangeClick,
              onMeasureClick = _this$props.onMeasureClick,
              onMarkerClick = _this$props.onMarkerClick;
          var itemHeight;
          if (layout === 'horizontal') {
            itemHeight = (height - spacing * (data.length - 1)) / data.length;
          } else {
            itemHeight = (width - spacing * (data.length - 1)) / data.length;
          }
          var measureHeight = itemHeight * measureSize;
          var markerHeight = itemHeight * markerSize;
          var enhancedData = data.map(function (d) {
            var all = [].concat(_toConsumableArray$1(d.ranges), _toConsumableArray$1(d.measures), _toConsumableArray$1(d.markers));
            var max = Math.max.apply(Math, _toConsumableArray$1(all));
            var scale = d3Scale.scaleLinear().domain([0, max]);
            if (layout === 'horizontal') {
              scale.range(reverse === true ? [width, 0] : [0, width]);
            } else {
              scale.range(reverse === true ? [0, height] : [height, 0]);
            }
            return _objectSpread$5({}, d, {
              scale: scale
            });
          });
          return React__default.createElement(core.Container, {
            isInteractive: isInteractive,
            theme: theme,
            animate: animate,
            motionStiffness: motionStiffness,
            motionDamping: motionDamping
          }, function (_ref) {
            var showTooltip = _ref.showTooltip,
                hideTooltip = _ref.hideTooltip;
            return React__default.createElement(core.SvgWrapper, {
              width: outerWidth,
              height: outerHeight,
              margin: margin,
              theme: theme
            }, enhancedData.map(function (d, i) {
              return React__default.createElement(EnhancedBulletItem, _extends$1({
                key: d.id
              }, d, {
                layout: layout,
                reverse: reverse,
                x: layout === 'vertical' ? itemHeight * i + spacing * i : 0,
                y: layout === 'horizontal' ? itemHeight * i + spacing * i : 0,
                width: width,
                height: itemHeight,
                titlePosition: titlePosition,
                titleAlign: titleAlign,
                titleOffsetX: titleOffsetX,
                titleOffsetY: titleOffsetY,
                titleRotation: titleRotation,
                measureHeight: measureHeight,
                markerHeight: markerHeight,
                rangeComponent: rangeComponent,
                rangeColors: rangeColors,
                measureComponent: measureComponent,
                measureColors: measureColors,
                markerComponent: markerComponent,
                markerColors: markerColors,
                theme: theme,
                axisPosition: axisPosition,
                animate: animate,
                motionStiffness: motionStiffness,
                motionDamping: motionDamping,
                showTooltip: showTooltip,
                hideTooltip: hideTooltip,
                onRangeClick: onRangeClick,
                onMeasureClick: onMeasureClick,
                onMarkerClick: onMarkerClick
              }));
            }));
          });
        }
      }]);
      return Bullet;
    }(React.Component);
    _defineProperty$7(Bullet, "propTypes", BulletPropTypes);
    Bullet.displayName = 'Bullet';
    var Bullet$1 = setDisplayName(Bullet.displayName)(enhance(Bullet));

    function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
    var ResponsiveBullet = function ResponsiveBullet(props) {
      return React__default.createElement(core.ResponsiveWrapper, null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;
        return React__default.createElement(Bullet$1, _extends$2({
          width: width,
          height: height
        }, props));
      });
    };

    exports.Bullet = Bullet$1;
    exports.BulletDefaultProps = BulletDefaultProps;
    exports.BulletItem = EnhancedBulletItem;
    exports.BulletPropTypes = BulletPropTypes;
    exports.ResponsiveBullet = ResponsiveBullet;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
