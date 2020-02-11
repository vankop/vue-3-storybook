"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = exports.WRAPS = void 0;

require("@vue/runtime-dom");

var _client = require("@storybook/core/client");

require("./globals");

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prefer-destructuring */
// @ts-ignore
var WRAPS = 'STORYBOOK_WRAPS';
exports.WRAPS = WRAPS;

function prepare(rawStory, innerStory) {
  var story;

  if (typeof rawStory === 'string') {
    story = {
      template: rawStory
    };
  } else if (rawStory != null) {
    story = rawStory;
  } else {
    return null;
  } // TODO


  return story;
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