import { Component, VueConstructor } from 'vue';
import { StoryFn } from '@storybook/addons';
export interface ShowErrorArgs {
    title: string;
    description: string;
}
export interface RenderMainArgs {
    storyFn: StoryFn<VueConstructor>;
    selectedKind: string;
    selectedStory: string;
    showMain: () => void;
    showError: (args: ShowErrorArgs) => void;
    showException: (...args: any[]) => void;
    forceRender: boolean;
}
export declare type StoryFnVueReturnType = string | Component;
export interface IStorybookStory {
    name: string;
    render: () => any;
}
export interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
