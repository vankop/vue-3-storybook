/// <reference types="webpack-env" />
/// <reference types="node" />
import { ClientStoryApi, Loadable } from '@storybook/addons';
import './globals';
import { IStorybookSection, StoryFnVueReturnType } from './types';
export declare const WRAPS = "STORYBOOK_WRAPS";
interface ClientApi extends ClientStoryApi<StoryFnVueReturnType> {
    setAddon(addon: any): void;
    configure(loader: Loadable, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
}
export declare const storiesOf: ClientApi['storiesOf'];
export declare const configure: ClientApi['configure'];
export declare const addDecorator: ClientApi['addDecorator'];
export declare const addParameters: ClientApi['addParameters'];
export declare const clearDecorators: ClientApi['clearDecorators'];
export declare const setAddon: ClientApi['setAddon'];
export declare const forceReRender: ClientApi['forceReRender'];
export declare const getStorybook: ClientApi['getStorybook'];
export declare const raw: ClientApi['raw'];
export {};
