/* eslint-disable prefer-destructuring */
// @ts-ignore
import Vue, { VueConstructor, ComponentOptions } from 'vue';
import { start } from '@storybook/core/client';
import {
  ClientStoryApi,
  StoryFn,
  DecoratorFunction,
  StoryContext,
  Loadable,
} from '@storybook/addons';

import './globals';
import { IStorybookSection, StoryFnVueReturnType } from './types';

import render, { VALUES } from './render';
import { extractProps } from './util';

export const WRAPS = 'STORYBOOK_WRAPS';

function prepare(
  rawStory: StoryFnVueReturnType,
  innerStory?: VueConstructor
): VueConstructor | null {
  let story: ComponentOptions | VueConstructor;

  if (typeof rawStory === 'string') {
    story = { template: rawStory };
  } else if (rawStory != null) {
    story = rawStory as ComponentOptions;
  } else {
    return null;
  }

  // TODO
  return story;
}

const defaultContext: StoryContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
};

function decorateStory(
  storyFn: StoryFn<StoryFnVueReturnType>,
  decorators: DecoratorFunction<VueConstructor>[]
): StoryFn<VueConstructor> {
  return decorators.reduce(
    (decorated: StoryFn<VueConstructor>, decorator) => (context: StoryContext = defaultContext) => {
      let story;

      const decoratedStory = decorator(p => {
        story = decorated(
          p
            ? {
                ...context,
                ...p,
                parameters: {
                  ...context.parameters,
                  ...p.parameters,
                },
              }
            : context
        );

        return story;
      }, context);

      if (!story) {
        story = decorated(context);
      }

      if (decoratedStory === story) {
        return story;
      }

      return prepare(decoratedStory, story);
    },
    context => prepare(storyFn(context))
  );
}
const framework = 'vue';

interface ClientApi extends ClientStoryApi<StoryFnVueReturnType> {
  setAddon(addon: any): void;
  configure(loader: Loadable, module: NodeModule): void;
  getStorybook(): IStorybookSection[];
  clearDecorators(): void;
  forceReRender(): void;
  raw: () => any; // todo add type
  load: (...args: any[]) => void;
}

const api = start(render, { decorateStory });

export const storiesOf: ClientApi['storiesOf'] = (kind, m) => {
  return (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    framework,
  });
};

export const configure: ClientApi['configure'] = (...args) => api.configure(...args, framework);
export const addDecorator: ClientApi['addDecorator'] = api.clientApi.addDecorator;
export const addParameters: ClientApi['addParameters'] = api.clientApi.addParameters;
export const clearDecorators: ClientApi['clearDecorators'] = api.clientApi.clearDecorators;
export const setAddon: ClientApi['setAddon'] = api.clientApi.setAddon;
export const forceReRender: ClientApi['forceReRender'] = api.forceReRender;
export const getStorybook: ClientApi['getStorybook'] = api.clientApi.getStorybook;
export const raw: ClientApi['raw'] = api.clientApi.raw;
