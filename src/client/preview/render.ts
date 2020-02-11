import dedent from 'ts-dedent';
// @ts-ignore
import { createApp, createBlock } from 'vue'
import { RenderMainArgs } from './types';

export const COMPONENT = 'STORYBOOK_COMPONENT';
export const VALUES = 'STORYBOOK_VALUES';

const root = createApp({
	data() {
		return {
			// @ts-ignore
			[COMPONENT]: undefined,
			[VALUES]: {},
		};
	},
	render() {
		const children = this[COMPONENT] ? [createBlock(this[COMPONENT])] : undefined;
		return createBlock('div', { attrs: { id: 'root' } }, children)
	}
}).mount('#root')

export default function render({
  storyFn,
  selectedKind,
  selectedStory,
  showMain,
  showError,
  showException,
  forceRender,
}: RenderMainArgs) {
  const element = storyFn();

  if (!element) {
    showError({
      title: `Expecting a Vue component from the story: "${selectedStory}" of "${selectedKind}".`,
      description: dedent`
        Did you forget to return the Vue component from the story?
        Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `,
    });
    return;
  }

  showMain();

  // at component creation || refresh by HMR
  if (!root[COMPONENT] || !forceRender) {
    root[COMPONENT] = element;
  }

  // @ts-ignore https://github.com/storybookjs/storybook/pull/7578#discussion_r307986139
  root[VALUES] = element.options[VALUES];

  if (!root.$el) {
    root.mount('#root');
  }
}
