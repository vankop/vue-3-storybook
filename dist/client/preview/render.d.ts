import { RenderMainArgs } from './types';
export declare const COMPONENT = "STORYBOOK_COMPONENT";
export declare const VALUES = "STORYBOOK_VALUES";
export default function render({ storyFn, selectedKind, selectedStory, showMain, showError, showException, forceRender, }: RenderMainArgs): void;
