'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gregorianCalendar = require('gregorian-calendar');

var _gregorianCalendar2 = _interopRequireDefault(_gregorianCalendar);

var _RangeCalendar = require('rc-calendar/lib/RangeCalendar');

var _RangeCalendar2 = _interopRequireDefault(_RangeCalendar);

var _Picker = require('rc-calendar/lib/Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var RangePicker = (_temp = _class = function (_React$Component) {
  _inherits(RangePicker, _React$Component);

  function RangePicker(props) {
    _classCallCheck(this, RangePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var _this$props = _this.props;
    var value = _this$props.value;
    var defaultValue = _this$props.defaultValue;
    var parseDateFromValue = _this$props.parseDateFromValue;

    var start = value && value[0] || defaultValue[0];
    var end = value && value[1] || defaultValue[1];
    _this.state = {
      value: [parseDateFromValue(start), parseDateFromValue(end)]
    };
    return _this;
  }

  RangePicker.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      var value = nextProps.value || [];
      var start = nextProps.parseDateFromValue(value[0]);
      var end = nextProps.parseDateFromValue(value[1]);
      this.setState({
        value: [start, end]
      });
    }
  };

  RangePicker.prototype.render = function render() {
    var props = this.props;
    var locale = props.locale;
    // 以下两行代码
    // 给没有初始值的日期选择框提供本地化信息
    // 否则会以周日开始排
    var defaultCalendarValue = new _gregorianCalendar2["default"](locale);
    defaultCalendarValue.setTime(Date.now());

    var _props = this.props;
    var disabledDate = _props.disabledDate;
    var showTime = _props.showTime;
    var getCalendarContainer = _props.getCalendarContainer;
    var transitionName = _props.transitionName;
    var disabled = _props.disabled;
    var popupStyle = _props.popupStyle;
    var align = _props.align;
    var style = _props.style;
    var onOk = _props.onOk;

    var state = this.state;

    var calendarClassName = (0, _classnames2["default"])({
      'ant-calendar-time': showTime
    });

    // 需要选择时间时，点击 ok 时才触发 onChange
    var pickerChangeHandler = {
      onChange: this.handleChange
    };
    var calendarHandler = {
      onOk: this.handleChange
    };
    if (props.timePicker) {
      pickerChangeHandler = {};
    } else {
      calendarHandler = {};
    }

    var startPlaceholder = 'startPlaceholder' in this.props ? props.startPlaceholder : locale.lang.rangePlaceholder[0];
    var endPlaceholder = 'endPlaceholder' in props ? props.endPlaceholder : locale.lang.rangePlaceholder[1];

    var calendar = _react2["default"].createElement(_RangeCalendar2["default"], _extends({
      prefixCls: 'ant-calendar',
      className: calendarClassName,
      timePicker: props.timePicker,
      disabledDate: disabledDate,
      dateInputPlaceholder: [startPlaceholder, endPlaceholder],
      locale: locale.lang,
      onOk: onOk,
      defaultValue: [defaultCalendarValue, defaultCalendarValue]
    }, calendarHandler));

    var clearIcon = !props.disabled && state.value && (state.value[0] || state.value[1]) ? _react2["default"].createElement(_icon2["default"], {
      type: 'cross-circle',
      className: 'ant-calendar-picker-clear',
      onClick: this.clearSelection
    }) : null;

    return _react2["default"].createElement(
      'span',
      { className: props.pickerClass, style: style },
      _react2["default"].createElement(
        _Picker2["default"],
        _extends({
          formatter: props.getFormatter(),
          transitionName: transitionName,
          disabled: disabled,
          calendar: calendar,
          value: state.value,
          prefixCls: 'ant-calendar-picker-container',
          style: popupStyle,
          align: align,
          getCalendarContainer: getCalendarContainer,
          onOpen: props.toggleOpen,
          onClose: props.toggleOpen
        }, pickerChangeHandler),
        function (_ref) {
          var value = _ref.value;

          var start = value[0];
          var end = value[1];
          return _react2["default"].createElement(
            'span',
            { className: props.pickerInputClass, disabled: disabled },
            _react2["default"].createElement('input', {
              disabled: disabled,
              readOnly: true,
              value: start ? props.getFormatter().format(start) : '',
              placeholder: startPlaceholder,
              className: 'ant-calendar-range-picker-input'
            }),
            _react2["default"].createElement(
              'span',
              { className: 'ant-calendar-range-picker-separator' },
              ' ~ '
            ),
            _react2["default"].createElement('input', {
              disabled: disabled,
              readOnly: true,
              value: end ? props.getFormatter().format(end) : '',
              placeholder: endPlaceholder,
              className: 'ant-calendar-range-picker-input'
            }),
            clearIcon,
            _react2["default"].createElement('span', { className: 'ant-calendar-picker-icon' })
          );
        }
      )
    );
  };

  return RangePicker;
}(_react2["default"].Component), _class.defaultProps = {
  defaultValue: []
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.clearSelection = function (e) {
    e.preventDefault();
    e.stopPropagation();
    _this2.setState({ value: [] });
    _this2.handleChange([]);
  };

  this.handleChange = function (value) {
    var props = _this2.props;
    if (!('value' in props)) {
      _this2.setState({ value: value });
    }
    var startDate = value[0] ? new Date(value[0].getTime()) : null;
    var endDate = value[1] ? new Date(value[1].getTime()) : null;
    var startDateString = value[0] ? props.getFormatter().format(value[0]) : '';
    var endDateString = value[1] ? props.getFormatter().format(value[1]) : '';
    props.onChange([startDate, endDate], [startDateString, endDateString]);
  };
}, _temp);
exports["default"] = RangePicker;
module.exports = exports['default'];