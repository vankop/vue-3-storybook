"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = exports.WRAPS = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _client = require("@storybook/core/client");

require("./globals");

var _render = _interopRequireWildcard(require("./render"));

var _util = require("./util");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WRAPS = 'STORYBOOK_WRAPS';
exports.WRAPS = WRAPS;

function prepare(rawStory, innerStory) {
  var _Vue$extend;

  var story;

  if (typeof rawStory === 'string') {
    story = {
      template: rawStory
    };
  } else if (rawStory != null) {
    story = rawStory;
  } else {
    return null;
  } // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle


  if (!story._isVue) {
    if (innerStory) {
      story.components = Object.assign({}, story.components || {}, {
        story: innerStory
      });
    }

    story = _vue["default"].extend(story); // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307984824
  } else if (story.options[WRAPS]) {
    return story;
  }

  return _vue["default"].extend((_Vue$extend = {}, _defineProperty(_Vue$extend, WRAPS, story), _defineProperty(_Vue$extend, _render.VALUES, Object.assign({}, innerStory ? innerStory.options[_render.VALUES] : {}, {}, (0, _util.extractProps)(story))), _defineProperty(_Vue$extend, "functional", true), _defineProperty(_Vue$extend, "render", function render(h, _ref) {
    var data = _ref.data,
        parent = _ref.parent,
        children = _ref.children;
    return h(story, Object.assign({}, data, {
      // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307986196
      props: Object.assign({}, data.props || {}, {}, parent.$root[_render.VALUES])
    }), children);
  }), _Vue$extend));
}

var defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {}
};

function decorateStory(storyFn, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function () {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultContext;
      var story;
      var decoratedStory = decorator(function (p) {
        story = decorated(p ? Object.assign({}, context, {}, p, {
          parameters: Object.assign({}, context.parameters, {}, p.parameters)
        }) : context);
        return story;
      }, context);

      if (!story) {
        story = decorated(context);
      }

      if (decoratedStory === story) {
        return story;
      }

      return prepare(decoratedStory, story);
    };
  }, function (context) {
    return prepare(storyFn(context));
  });
}

var framework = 'vue';
var api = (0, _client.start)(_render["default"], {
  decorateStory: decorateStory
});

var storiesOf = function storiesOf(kind, m) {
  return api.clientApi.storiesOf(kind, m).addParameters({
    framework: framework
  });
};

exports.storiesOf = storiesOf;

var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return api.configure.apply(api, args.concat([framework]));
};

exports.configure = configure;
var addDecorator = api.clientApi.addDecorator;
exports.addDecorator = addDecorator;
var addParameters = api.clientApi.addParameters;
exports.addParameters = addParameters;
var clearDecorators = api.clientApi.clearDecorators;
exports.clearDecorators = clearDecorators;
var setAddon = api.clientApi.setAddon;
exports.setAddon = setAddon;
var forceReRender = api.forceReRender;
exports.forceReRender = forceReRender;
var getStorybook = api.clientApi.getStorybook;
exports.getStorybook = getStorybook;
var raw = api.clientApi.raw;
exports.raw = raw;