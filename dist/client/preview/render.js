"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = render;
exports.VALUES = exports.COMPONENT = void 0;

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _vue = require("vue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Vue component from the story?\n        Use \"() => ({ template: '<my-comp></my-comp>' })\" or \"() => ({ components: MyComp, template: '<my-comp></my-comp>' })\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COMPONENT = 'STORYBOOK_COMPONENT';
exports.COMPONENT = COMPONENT;
var VALUES = 'STORYBOOK_VALUES';
exports.VALUES = VALUES;
var root = (0, _vue.createApp)({
  data: function data() {
    var _ref;

    return _ref = {}, _defineProperty(_ref, COMPONENT, undefined), _defineProperty(_ref, VALUES, {}), _ref;
  },
  render: function render() {
    var children = this[COMPONENT] ? [(0, _vue.h)(this[COMPONENT])] : undefined;
    return (0, _vue.h)('div', {
      id: 'root'
    }, children);
  }
}).mount('#root');

function render(_ref2) {
  var storyFn = _ref2.storyFn,
      selectedKind = _ref2.selectedKind,
      selectedStory = _ref2.selectedStory,
      showMain = _ref2.showMain,
      showError = _ref2.showError,
      showException = _ref2.showException,
      forceRender = _ref2.forceRender;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Vue component from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _tsDedent["default"])(_templateObject())
    });
    return;
  }

  showMain(); // at component creation || refresh by HMR
  // @ts-ignore

  if (!root[COMPONENT] || !forceRender) {
    // @ts-ignore
    root[COMPONENT] = element;
  } // @ts-ignore https://github.com/storybookjs/storybook/pull/7578#discussion_r307986139
  // root[VALUES] = element.options[VALUES];

}