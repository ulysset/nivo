import _setDisplayName from 'recompose/setDisplayName';
import React, { memo, Component } from 'react';
import { boxAlignments, noop, alignBox, withTheme, withDimensions, Container, SvgWrapper, ResponsiveWrapper, getRelativeCursor, isCursorInRect, degreesToRadians } from '@nivo/core';
import { LegendPropShape, BoxLegendSvg, renderLegendToCanvas } from '@nivo/legends';
import PropTypes from 'prop-types';
import { timeFormat } from 'd3-time-format';
import _pure from 'recompose/pure';
import _withPropsOnChange from 'recompose/withPropsOnChange';
import _defaultProps from 'recompose/defaultProps';
import _compose from 'recompose/compose';
import { scaleQuantize } from 'd3-scale';
import memoize from 'lodash.memoize';
import isDate from 'lodash.isdate';
import range from 'lodash.range';
import { timeWeek, timeYear, timeWeeks, timeDays, timeMonths } from 'd3-time';
import { BasicTooltip } from '@nivo/tooltip';

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var monthLabelFormat = timeFormat('%b');
var commonPropTypes = {
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  align: PropTypes.oneOf(boxAlignments).isRequired,
  originX: PropTypes.number.isRequired,
  originY: PropTypes.number.isRequired,
  calendarWidth: PropTypes.number.isRequired,
  calendarHeight: PropTypes.number.isRequired,
  minValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
  maxValue: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  colorScale: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  emptyColor: PropTypes.string.isRequired,
  yearLegend: PropTypes.func.isRequired,
  yearSpacing: PropTypes.number.isRequired,
  yearLegendPosition: PropTypes.oneOf(['before', 'after']).isRequired,
  yearLegendOffset: PropTypes.number.isRequired,
  monthBorderWidth: PropTypes.number.isRequired,
  monthBorderColor: PropTypes.string.isRequired,
  monthLegend: PropTypes.func.isRequired,
  monthLegendPosition: PropTypes.oneOf(['before', 'after']).isRequired,
  monthLegendOffset: PropTypes.number.isRequired,
  daySpacing: PropTypes.number.isRequired,
  dayBorderWidth: PropTypes.number.isRequired,
  dayBorderColor: PropTypes.string.isRequired,
  isInteractive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func,
  legends: PropTypes.arrayOf(PropTypes.shape(_objectSpread({}, LegendPropShape, {
    itemCount: PropTypes.number.isRequired
  }))).isRequired
};
var CalendarPropTypes = commonPropTypes;
var CalendarCanvasPropTypes = _objectSpread({}, commonPropTypes, {
  pixelRatio: PropTypes.number.isRequired
});
var commonDefaultProps = {
  colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
  align: 'center',
  direction: 'horizontal',
  emptyColor: '#fff',
  minValue: 0,
  maxValue: 'auto',
  yearSpacing: 30,
  yearLegend: function yearLegend(year) {
    return year;
  },
  yearLegendPosition: 'before',
  yearLegendOffset: 10,
  monthBorderWidth: 2,
  monthBorderColor: '#000',
  monthLegend: function monthLegend(year, month, date) {
    return monthLabelFormat(date);
  },
  monthLegendPosition: 'before',
  monthLegendOffset: 10,
  weekdayLegend: function weekdayLegend(d) {
    return d;
  },
  daySpacing: 0,
  dayBorderWidth: 1,
  dayBorderColor: '#000',
  isInteractive: true,
  onClick: noop,
  legends: []
};
var CalendarDefaultProps = commonDefaultProps;
var CalendarCanvasDefaultProps = _objectSpread({}, commonDefaultProps, {
  pixelRatio: global.window && global.window.devicePixelRatio ? global.window.devicePixelRatio : 1
});

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }
function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }
function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }
var computeDomain = function computeDomain(data, minSpec, maxSpec) {
  var allValues = data.map(function (d) {
    return d.value;
  });
  var minValue = minSpec === 'auto' ? Math.min.apply(Math, _toConsumableArray(allValues)) : minSpec;
  var maxValue = maxSpec === 'auto' ? Math.max.apply(Math, _toConsumableArray(allValues)) : maxSpec;
  return [minValue, maxValue];
};
var computeCellSize = function computeCellSize(_ref) {
  var width = _ref.width,
      height = _ref.height,
      direction = _ref.direction,
      yearRange = _ref.yearRange,
      yearSpacing = _ref.yearSpacing,
      daySpacing = _ref.daySpacing,
      maxWeeks = _ref.maxWeeks;
  var hCellSize;
  var vCellSize;
  if (direction === 'horizontal') {
    hCellSize = (width - daySpacing * maxWeeks) / maxWeeks;
    vCellSize = (height - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) / (yearRange.length * 7);
  } else {
    hCellSize = (width - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) / (yearRange.length * 7);
    vCellSize = (height - daySpacing * maxWeeks) / maxWeeks;
  }
  return Math.min(hCellSize, vCellSize);
};
var monthPathAndBBox = function monthPathAndBBox(_ref2) {
  var date = _ref2.date,
      cellSize = _ref2.cellSize,
      yearIndex = _ref2.yearIndex,
      yearSpacing = _ref2.yearSpacing,
      daySpacing = _ref2.daySpacing,
      direction = _ref2.direction,
      originX = _ref2.originX,
      originY = _ref2.originY;
  var t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  var firstWeek = timeWeek.count(timeYear(date), date);
  var lastWeek = timeWeek.count(timeYear(t1), t1);
  var firstDay = date.getDay();
  var lastDay = t1.getDay();
  var xO = originX;
  var yO = originY;
  var yearOffset = yearIndex * (7 * (cellSize + daySpacing) + yearSpacing);
  if (direction === 'horizontal') {
    yO += yearOffset;
  } else {
    xO += yearOffset;
  }
  var path;
  var bbox = {
    x: xO,
    y: yO,
    width: 0,
    height: 0
  };
  if (direction === 'horizontal') {
    path = ["M".concat(xO + (firstWeek + 1) * (cellSize + daySpacing), ",").concat(yO + firstDay * (cellSize + daySpacing)), "H".concat(xO + firstWeek * (cellSize + daySpacing), "V").concat(yO + 7 * (cellSize + daySpacing)), "H".concat(xO + lastWeek * (cellSize + daySpacing), "V").concat(yO + (lastDay + 1) * (cellSize + daySpacing)), "H".concat(xO + (lastWeek + 1) * (cellSize + daySpacing), "V").concat(yO), "H".concat(xO + (firstWeek + 1) * (cellSize + daySpacing), "Z")].join('');
    bbox.x = xO + firstWeek * (cellSize + daySpacing);
    bbox.width = xO + (lastWeek + 1) * (cellSize + daySpacing) - bbox.x;
    bbox.height = 7 * (cellSize + daySpacing);
  } else {
    path = ["M".concat(xO + firstDay * (cellSize + daySpacing), ",").concat(yO + (firstWeek + 1) * (cellSize + daySpacing)), "H".concat(xO, "V").concat(yO + (lastWeek + 1) * (cellSize + daySpacing)), "H".concat(xO + (lastDay + 1) * (cellSize + daySpacing), "V").concat(yO + lastWeek * (cellSize + daySpacing)), "H".concat(xO + 7 * (cellSize + daySpacing), "V").concat(yO + firstWeek * (cellSize + daySpacing)), "H".concat(xO + firstDay * (cellSize + daySpacing), "Z")].join('');
    bbox.y = yO + firstWeek * (cellSize + daySpacing);
    bbox.width = 7 * (cellSize + daySpacing);
    bbox.height = yO + (lastWeek + 1) * (cellSize + daySpacing) - bbox.y;
  }
  return {
    path: path,
    bbox: bbox
  };
};
var memoMonthPathAndBBox = memoize(monthPathAndBBox, function (_ref3) {
  var date = _ref3.date,
      cellSize = _ref3.cellSize,
      yearIndex = _ref3.yearIndex,
      yearSpacing = _ref3.yearSpacing,
      daySpacing = _ref3.daySpacing,
      direction = _ref3.direction,
      originX = _ref3.originX,
      originY = _ref3.originY;
  return "".concat(date.toString(), ".").concat(cellSize, ".").concat(yearIndex, ".").concat(yearSpacing, ".").concat(daySpacing, ".").concat(direction, ".").concat(originX, ".").concat(originY);
});
var cellPositionHorizontal = function cellPositionHorizontal(cellSize, yearSpacing, daySpacing) {
  return function (originX, originY, d, yearIndex) {
    var weekOfYear = timeWeek.count(timeYear(d), d);
    return {
      x: originX + weekOfYear * (cellSize + daySpacing) + daySpacing / 2,
      y: originY + d.getDay() * (cellSize + daySpacing) + daySpacing / 2 + yearIndex * (yearSpacing + 7 * (cellSize + daySpacing))
    };
  };
};
var cellPositionVertical = function cellPositionVertical(cellSize, yearSpacing, daySpacing) {
  return function (originX, originY, d, yearIndex) {
    var weekOfYear = timeWeek.count(timeYear(d), d);
    return {
      x: originX + d.getDay() * (cellSize + daySpacing) + daySpacing / 2 + yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
      y: originY + weekOfYear * (cellSize + daySpacing) + daySpacing / 2
    };
  };
};
var dayFormat = timeFormat('%Y-%m-%d');
var computeLayout = function computeLayout(_ref4) {
  var width = _ref4.width,
      height = _ref4.height,
      from = _ref4.from,
      to = _ref4.to,
      direction = _ref4.direction,
      yearSpacing = _ref4.yearSpacing,
      daySpacing = _ref4.daySpacing,
      align = _ref4.align;
  var fromDate = isDate(from) ? from : new Date(from);
  var toDate = isDate(to) ? to : new Date(to);
  var yearRange = range(fromDate.getFullYear(), toDate.getFullYear() + 1);
  var maxWeeks = Math.max.apply(Math, _toConsumableArray(yearRange.map(function (year) {
    return timeWeeks(new Date(year, 0, 1), new Date(year + 1, 0, 1)).length;
  }))) + 1;
  var cellSize = computeCellSize({
    width: width,
    height: height,
    direction: direction,
    yearRange: yearRange,
    yearSpacing: yearSpacing,
    daySpacing: daySpacing,
    maxWeeks: maxWeeks
  });
  var monthsSize = cellSize * maxWeeks + daySpacing * maxWeeks;
  var yearsSize = (cellSize + daySpacing) * 7 * yearRange.length + yearSpacing * (yearRange.length - 1);
  var calendarWidth = direction === 'horizontal' ? monthsSize : yearsSize;
  var calendarHeight = direction === 'horizontal' ? yearsSize : monthsSize;
  var _alignBox = alignBox({
    x: 0,
    y: 0,
    width: calendarWidth,
    height: calendarHeight
  }, {
    x: 0,
    y: 0,
    width: width,
    height: height
  }, align),
      _alignBox2 = _slicedToArray(_alignBox, 2),
      originX = _alignBox2[0],
      originY = _alignBox2[1];
  var cellPosition;
  if (direction === 'horizontal') {
    cellPosition = cellPositionHorizontal(cellSize, yearSpacing, daySpacing);
  } else {
    cellPosition = cellPositionVertical(cellSize, yearSpacing, daySpacing);
  }
  var years = [];
  var months = [];
  var days = [];
  yearRange.forEach(function (year, i) {
    var yearStart = new Date(year, 0, 1);
    var yearEnd = new Date(year + 1, 0, 1);
    days = days.concat(timeDays(yearStart, yearEnd).map(function (dayDate) {
      return _objectSpread$1({
        date: dayDate,
        day: dayFormat(dayDate),
        size: cellSize
      }, cellPosition(originX, originY, dayDate, i));
    }));
    var yearMonths = timeMonths(yearStart, yearEnd).map(function (monthDate) {
      return _objectSpread$1({
        date: monthDate,
        year: monthDate.getFullYear(),
        month: monthDate.getMonth()
      }, memoMonthPathAndBBox({
        originX: originX,
        originY: originY,
        date: monthDate,
        direction: direction,
        yearIndex: i,
        yearSpacing: yearSpacing,
        daySpacing: daySpacing,
        cellSize: cellSize
      }));
    });
    months = months.concat(yearMonths);
    years.push({
      year: year,
      bbox: {
        x: yearMonths[0].bbox.x,
        y: yearMonths[0].bbox.y,
        width: yearMonths[11].bbox.x - yearMonths[0].bbox.x + yearMonths[11].bbox.width,
        height: yearMonths[11].bbox.y - yearMonths[0].bbox.y + yearMonths[11].bbox.height
      }
    });
  });
  return {
    years: years,
    months: months,
    days: days,
    cellSize: cellSize,
    calendarWidth: calendarWidth,
    calendarHeight: calendarHeight,
    originX: originX,
    originY: originY
  };
};
var bindDaysData = function bindDaysData(_ref5) {
  var days = _ref5.days,
      data = _ref5.data,
      colorScale = _ref5.colorScale,
      emptyColor = _ref5.emptyColor;
  return days.map(function (day) {
    day.color = emptyColor;
    data.forEach(function (dayData) {
      if (dayData.day === day.day) {
        day.value = dayData.value;
        day.color = colorScale(dayData.value);
        day.data = dayData;
      }
    });
    return day;
  });
};
var computeYearLegendPositions = function computeYearLegendPositions(_ref6) {
  var years = _ref6.years,
      direction = _ref6.direction,
      position = _ref6.position,
      offset = _ref6.offset;
  return years.map(function (year) {
    var x = 0;
    var y = 0;
    var rotation = 0;
    if (direction === 'horizontal' && position === 'before') {
      x = year.bbox.x - offset;
      y = year.bbox.y + year.bbox.height / 2;
      rotation = -90;
    } else if (direction === 'horizontal' && position === 'after') {
      x = year.bbox.x + year.bbox.width + offset;
      y = year.bbox.y + year.bbox.height / 2;
      rotation = -90;
    } else if (direction === 'vertical' && position === 'before') {
      x = year.bbox.x + year.bbox.width / 2;
      y = year.bbox.y - offset;
    } else {
      x = year.bbox.x + year.bbox.width / 2;
      y = year.bbox.y + year.bbox.height + offset;
    }
    return _objectSpread$1({}, year, {
      x: x,
      y: y,
      rotation: rotation
    });
  });
};
var computeMonthLegendPositions = function computeMonthLegendPositions(_ref7) {
  var months = _ref7.months,
      direction = _ref7.direction,
      position = _ref7.position,
      offset = _ref7.offset;
  return months.map(function (month) {
    var x = 0;
    var y = 0;
    var rotation = 0;
    if (direction === 'horizontal' && position === 'before') {
      x = month.bbox.x + month.bbox.width / 2;
      y = month.bbox.y - offset;
    } else if (direction === 'horizontal' && position === 'after') {
      x = month.bbox.x + month.bbox.width / 2;
      y = month.bbox.y + month.bbox.height + offset;
    } else if (direction === 'vertical' && position === 'before') {
      x = month.bbox.x - offset;
      y = month.bbox.y + month.bbox.height / 2;
      rotation = -90;
    } else {
      x = month.bbox.x + month.bbox.width + offset;
      y = month.bbox.y + month.bbox.height / 2;
      rotation = -90;
    }
    return _objectSpread$1({}, month, {
      x: x,
      y: y,
      rotation: rotation
    });
  });
};

var commonEnhancers = [withTheme(), withDimensions(), _withPropsOnChange(['data', 'minValue', 'maxValue', 'colors'], function (_ref) {
  var data = _ref.data,
      minValue = _ref.minValue,
      maxValue = _ref.maxValue,
      colors = _ref.colors;
  var domain = computeDomain(data, minValue, maxValue);
  var colorScale = scaleQuantize().domain(domain).range(colors);
  return {
    colorScale: colorScale
  };
}), _withPropsOnChange(['width', 'height', 'from', 'to', 'direction', 'yearSpacing', 'daySpacing', 'align'], function (_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      from = _ref2.from,
      to = _ref2.to,
      direction = _ref2.direction,
      yearSpacing = _ref2.yearSpacing,
      daySpacing = _ref2.daySpacing,
      align = _ref2.align;
  return computeLayout({
    width: width,
    height: height,
    from: from,
    to: to,
    direction: direction,
    yearSpacing: yearSpacing,
    daySpacing: daySpacing,
    align: align
  });
}), _withPropsOnChange(['years', 'direction', 'yearLegendPosition', 'yearLegendOffset'], function (_ref3) {
  var years = _ref3.years,
      direction = _ref3.direction,
      yearLegendPosition = _ref3.yearLegendPosition,
      yearLegendOffset = _ref3.yearLegendOffset;
  return {
    yearLegends: computeYearLegendPositions({
      years: years,
      direction: direction,
      position: yearLegendPosition,
      offset: yearLegendOffset
    })
  };
}), _withPropsOnChange(['months', 'direction', 'monthLegendPosition', 'monthLegendOffset'], function (_ref4) {
  var months = _ref4.months,
      direction = _ref4.direction,
      monthLegendPosition = _ref4.monthLegendPosition,
      monthLegendOffset = _ref4.monthLegendOffset;
  return {
    monthLegends: computeMonthLegendPositions({
      months: months,
      direction: direction,
      position: monthLegendPosition,
      offset: monthLegendOffset
    })
  };
}), _withPropsOnChange(['days', 'data', 'colorScale', 'emptyColor'], function (_ref5) {
  var days = _ref5.days,
      data = _ref5.data,
      colorScale = _ref5.colorScale,
      emptyColor = _ref5.emptyColor;
  return {
    days: bindDaysData({
      days: days,
      data: data,
      colorScale: colorScale,
      emptyColor: emptyColor
    })
  };
})];
var enhance = (function (Component) {
  switch (Component.displayName) {
    case 'Calendar':
      return _compose.apply(void 0, [_defaultProps(CalendarDefaultProps)].concat(commonEnhancers, [_pure]))(Component);
    case 'CalendarCanvas':
      return _compose.apply(void 0, [_defaultProps(CalendarCanvasDefaultProps)].concat(commonEnhancers, [_pure]))(Component);
  }
  return Component;
});

var CalendarYearLegends = memo(function (_ref) {
  var years = _ref.years,
      legend = _ref.legend,
      theme = _ref.theme;
  return React.createElement(React.Fragment, null, years.map(function (year) {
    return React.createElement("text", {
      key: year.year,
      transform: "translate(".concat(year.x, ",").concat(year.y, ") rotate(").concat(year.rotation, ")"),
      textAnchor: "middle",
      style: theme.labels.text
    }, legend(year.year));
  }));
});
CalendarYearLegends.propTypes = {
  years: PropTypes.array.isRequired,
  legend: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};
CalendarYearLegends.displayName = 'CalendarYearLegends';

var CalendarMonthPath = function CalendarMonthPath(_ref) {
  var path = _ref.path,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor;
  return React.createElement("path", {
    d: path,
    style: {
      fill: 'none',
      strokeWidth: borderWidth,
      stroke: borderColor,
      pointerEvents: 'none'
    }
  });
};
CalendarMonthPath.propTypes = {
  path: PropTypes.string.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired
};
var CalendarMonthPath$1 = _pure(CalendarMonthPath);

var CalendarMonthLegends = memo(function (_ref) {
  var months = _ref.months,
      legend = _ref.legend,
      theme = _ref.theme;
  return React.createElement(React.Fragment, null, months.map(function (month) {
    return React.createElement("text", {
      key: "".concat(month.date.toString(), ".legend"),
      transform: "translate(".concat(month.x, ",").concat(month.y, ") rotate(").concat(month.rotation, ")"),
      textAnchor: "middle",
      style: theme.labels.text
    }, legend(month.year, month.month, month.date));
  }));
});
CalendarMonthLegends.propTypes = {
  months: PropTypes.array.isRequired,
  legend: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};
CalendarMonthLegends.displayName = 'CalendarMonthLegends';

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }
function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var CalendarDay = memo(function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      spacing = _ref.spacing,
      color = _ref.color,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      onClick = _ref.onClick,
      showTooltip = _ref.showTooltip,
      hideTooltip = _ref.hideTooltip;
  return React.createElement(React.Fragment, null, React.createElement("rect", {
    x: x,
    y: y,
    width: size,
    height: size,
    style: {
      fill: color,
      strokeWidth: borderWidth,
      stroke: borderColor
    }
  }), React.createElement("rect", {
    fill: "rgba(0, 0, 0, 0)",
    x: x - spacing / 2,
    y: y - spacing / 2,
    width: size + spacing,
    height: size + spacing,
    onClick: onClick,
    onMouseEnter: showTooltip,
    onMouseMove: showTooltip,
    onMouseLeave: hideTooltip
  }));
});
CalendarDay.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  tooltipFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  tooltip: PropTypes.func,
  showTooltip: PropTypes.func.isRequired,
  hideTooltip: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    tooltip: PropTypes.shape({}).isRequired
  }).isRequired
};
CalendarDay.displayName = 'CalendarDay';
var enhance$1 = _compose(_withPropsOnChange(['data', 'onClick'], function (_ref2) {
  var data = _ref2.data,
      _onClick = _ref2.onClick;
  return {
    onClick: function onClick(event) {
      return _onClick(data, event);
    }
  };
}), _withPropsOnChange(['data', 'color', 'showTooltip', 'tooltipFormat', 'tooltip', 'theme'], function (_ref3) {
  var data = _ref3.data,
      color = _ref3.color,
      _showTooltip = _ref3.showTooltip,
      tooltipFormat = _ref3.tooltipFormat,
      tooltip = _ref3.tooltip,
      theme = _ref3.theme;
  if (data.value === undefined) return {
    showTooltip: noop
  };
  return {
    showTooltip: function showTooltip(event) {
      return _showTooltip(React.createElement(BasicTooltip, {
        id: "".concat(data.day),
        value: data.value,
        enableChip: true,
        color: color,
        theme: theme,
        format: tooltipFormat,
        renderContent: typeof tooltip === 'function' ? tooltip.bind(null, _objectSpread$2({
          color: color
        }, data)) : null
      }), event);
    }
  };
}), _pure);
var CalendarDay$1 = enhance$1(CalendarDay);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var Calendar = function Calendar(_ref) {
  var colorScale = _ref.colorScale,
      margin = _ref.margin,
      width = _ref.width,
      height = _ref.height,
      outerWidth = _ref.outerWidth,
      outerHeight = _ref.outerHeight,
      yearLegends = _ref.yearLegends,
      yearLegend = _ref.yearLegend,
      monthLegends = _ref.monthLegends,
      monthLegend = _ref.monthLegend,
      monthBorderWidth = _ref.monthBorderWidth,
      monthBorderColor = _ref.monthBorderColor,
      daySpacing = _ref.daySpacing,
      dayBorderWidth = _ref.dayBorderWidth,
      dayBorderColor = _ref.dayBorderColor,
      theme = _ref.theme,
      isInteractive = _ref.isInteractive,
      tooltipFormat = _ref.tooltipFormat,
      tooltip = _ref.tooltip,
      onClick = _ref.onClick,
      legends = _ref.legends,
      months = _ref.months,
      days = _ref.days;
  return React.createElement(Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: false
  }, function (_ref2) {
    var showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip;
    return React.createElement(SvgWrapper, {
      width: outerWidth,
      height: outerHeight,
      margin: margin,
      theme: theme
    }, days.map(function (d) {
      return React.createElement(CalendarDay$1, {
        key: d.date.toString(),
        data: d,
        x: d.x,
        y: d.y,
        size: d.size,
        spacing: daySpacing,
        color: d.color,
        borderWidth: dayBorderWidth,
        borderColor: dayBorderColor,
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        tooltipFormat: tooltipFormat,
        tooltip: tooltip,
        theme: theme,
        onClick: onClick
      });
    }), months.map(function (m) {
      return React.createElement(CalendarMonthPath$1, {
        key: m.date.toString(),
        path: m.path,
        borderWidth: monthBorderWidth,
        borderColor: monthBorderColor
      });
    }), React.createElement(CalendarMonthLegends, {
      months: monthLegends,
      legend: monthLegend,
      theme: theme
    }), React.createElement(CalendarYearLegends, {
      years: yearLegends,
      legend: yearLegend,
      theme: theme
    }), legends.map(function (legend, i) {
      var legendData = colorScale.ticks(legend.itemCount).map(function (value) {
        return {
          id: value,
          label: value,
          color: colorScale(value)
        };
      });
      return React.createElement(BoxLegendSvg, _extends({
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
Calendar.displayName = 'Calendar';
Calendar.propTypes = CalendarPropTypes;
var Calendar$1 = _setDisplayName('Calendar')(enhance(Calendar));

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }
var ResponsiveCalendar = function ResponsiveCalendar(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(Calendar$1, _extends$1({
      width: width,
      height: height
    }, props));
  });
};

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }
function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1(); }
function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }
function _iterableToArrayLimit$1(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var findDayUnderCursor = function findDayUnderCursor(days, size, spacing, margin, x, y) {
  return days.find(function (day) {
    return day.value !== undefined && isCursorInRect(day.x + margin.left - spacing / 2, day.y + margin.top - spacing / 2, size + spacing, size + spacing, x, y);
  });
};
var CalendarCanvas =
function (_Component) {
  _inherits(CalendarCanvas, _Component);
  function CalendarCanvas() {
    var _getPrototypeOf2;
    var _this;
    _classCallCheck(this, CalendarCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CalendarCanvas)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _defineProperty$3(_assertThisInitialized(_this), "handleMouseHover", function (showTooltip, hideTooltip) {
      return function (event) {
        var _this$props = _this.props,
            isInteractive = _this$props.isInteractive,
            margin = _this$props.margin,
            theme = _this$props.theme,
            days = _this$props.days,
            daySpacing = _this$props.daySpacing,
            tooltipFormat = _this$props.tooltipFormat,
            tooltip = _this$props.tooltip;
        if (!isInteractive || !days || days.length === 0) return;
        var _getRelativeCursor = getRelativeCursor(_this.surface, event),
            _getRelativeCursor2 = _slicedToArray$1(_getRelativeCursor, 2),
            x = _getRelativeCursor2[0],
            y = _getRelativeCursor2[1];
        var currentDay = findDayUnderCursor(days, days[0].size, daySpacing, margin, x, y);
        if (currentDay !== undefined) {
          showTooltip(React.createElement(BasicTooltip, {
            id: "".concat(currentDay.day),
            value: currentDay.value,
            enableChip: true,
            color: currentDay.color,
            theme: theme,
            format: tooltipFormat,
            renderContent: typeof tooltip === 'function' ? tooltip.bind(null, currentDay) : null
          }), event);
        } else {
          hideTooltip();
        }
      };
    });
    _defineProperty$3(_assertThisInitialized(_this), "handleMouseLeave", function (hideTooltip) {
      return function () {
        if (_this.props.isInteractive !== true) return;
        hideTooltip();
      };
    });
    _defineProperty$3(_assertThisInitialized(_this), "handleClick", function (event) {
      var _this$props2 = _this.props,
          isInteractive = _this$props2.isInteractive,
          margin = _this$props2.margin,
          onClick = _this$props2.onClick,
          days = _this$props2.days,
          daySpacing = _this$props2.daySpacing;
      if (!isInteractive || !days || days.length === 0) return;
      var _getRelativeCursor3 = getRelativeCursor(_this.surface, event),
          _getRelativeCursor4 = _slicedToArray$1(_getRelativeCursor3, 2),
          x = _getRelativeCursor4[0],
          y = _getRelativeCursor4[1];
      var currentDay = findDayUnderCursor(days, days[0].size, daySpacing, margin, x, y);
      if (currentDay !== undefined) onClick(currentDay, event);
    });
    return _this;
  }
  _createClass(CalendarCanvas, [{
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
      var _this2 = this;
      var pixelRatio = props.pixelRatio,
          margin = props.margin,
          width = props.width,
          height = props.height,
          outerWidth = props.outerWidth,
          outerHeight = props.outerHeight,
          colorScale = props.colorScale,
          yearLegends = props.yearLegends,
          yearLegend = props.yearLegend,
          monthLegends = props.monthLegends,
          monthLegend = props.monthLegend,
          days = props.days,
          dayBorderWidth = props.dayBorderWidth,
          dayBorderColor = props.dayBorderColor,
          legends = props.legends,
          theme = props.theme;
      this.surface.width = outerWidth * pixelRatio;
      this.surface.height = outerHeight * pixelRatio;
      this.ctx.scale(pixelRatio, pixelRatio);
      this.ctx.fillStyle = theme.background;
      this.ctx.fillRect(0, 0, outerWidth, outerHeight);
      this.ctx.translate(margin.left, margin.top);
      days.forEach(function (day) {
        _this2.ctx.fillStyle = day.color;
        if (dayBorderWidth > 0) {
          _this2.ctx.strokeStyle = dayBorderColor;
          _this2.ctx.lineWidth = dayBorderWidth;
        }
        _this2.ctx.beginPath();
        _this2.ctx.rect(day.x, day.y, day.size, day.size);
        _this2.ctx.fill();
        if (dayBorderWidth > 0) {
          _this2.ctx.stroke();
        }
      });
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = theme.labels.text.fill;
      this.ctx.font = "".concat(theme.labels.text.fontSize, "px ").concat(theme.labels.text.fontFamily);
      monthLegends.forEach(function (month) {
        _this2.ctx.save();
        _this2.ctx.translate(month.x, month.y);
        _this2.ctx.rotate(degreesToRadians(month.rotation));
        _this2.ctx.fillText(monthLegend(month.year, month.month, month.date), 0, 0);
        _this2.ctx.restore();
      });
      yearLegends.forEach(function (year) {
        _this2.ctx.save();
        _this2.ctx.translate(year.x, year.y);
        _this2.ctx.rotate(degreesToRadians(year.rotation));
        _this2.ctx.fillText(yearLegend(year.year), 0, 0);
        _this2.ctx.restore();
      });
      legends.forEach(function (legend) {
        var legendData = colorScale.ticks(legend.itemCount).map(function (value) {
          return {
            id: value,
            label: value,
            color: colorScale(value)
          };
        });
        renderLegendToCanvas(_this2.ctx, _objectSpread$3({}, legend, {
          data: legendData,
          containerWidth: width,
          containerHeight: height,
          theme: theme
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
      return React.createElement(Container, {
        isInteractive: isInteractive,
        theme: theme,
        animate: false
      }, function (_ref) {
        var showTooltip = _ref.showTooltip,
            hideTooltip = _ref.hideTooltip;
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
  return CalendarCanvas;
}(Component);
_defineProperty$3(CalendarCanvas, "propTypes", CalendarCanvasPropTypes);
CalendarCanvas.displayName = 'CalendarCanvas';
var CalendarCanvas$1 = _setDisplayName(CalendarCanvas.displayName)(enhance(CalendarCanvas));

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var ResponsiveCalendarCanvas = function ResponsiveCalendarCanvas(props) {
  return React.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement(CalendarCanvas$1, _extends$2({
      width: width,
      height: height
    }, props));
  });
};

export { Calendar$1 as Calendar, CalendarCanvas$1 as CalendarCanvas, CalendarCanvasDefaultProps, CalendarCanvasPropTypes, CalendarDefaultProps, CalendarPropTypes, ResponsiveCalendar, ResponsiveCalendarCanvas };
