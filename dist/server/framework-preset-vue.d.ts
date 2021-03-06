import { Configuration } from 'webpack';
export declare function webpack(config: Configuration): {
    plugins: any[];
    module: {
        rules: import("webpack").RuleSetRule[];
        noParse?: RegExp | RegExp[] | ((content: string) => boolean);
        unknownContextRequest?: string;
        unknownContextRecursive?: boolean;
        unknownContextRegExp?: RegExp;
        unknownContextCritical?: boolean;
        exprContextRequest?: string;
        exprContextRegExp?: RegExp;
        exprContextRecursive?: boolean;
        exprContextCritical?: boolean;
        wrappedContextRegExp?: RegExp;
        wrappedContextRecursive?: boolean;
        wrappedContextCritical?: boolean;
        strictExportPresence?: boolean;
    };
    resolve: {
        extensions: string[];
        alias: {
            vue$: string;
        };
        modules?: string[];
        descriptionFiles?: string[];
        mainFields?: string[] | string[][];
        aliasFields?: string[] | string[][];
        mainFiles?: string[];
        enforceExtension?: boolean;
        unsafeCache?: boolean | {};
        cachePredicate?(data: {
            path: string;
            request: string;
        }): boolean;
        plugins?: import("webpack").ResolvePlugin[];
        symlinks?: boolean;
        cacheWithContext?: boolean;
    };
    mode?: "development" | "production" | "none";
    name?: string;
    context?: string;
    entry?: string | string[] | import("webpack").Entry | import("webpack").EntryFunc;
    devtool?: import("webpack").Options.Devtool;
    output?: import("webpack").Output;
    resolveLoader?: import("webpack").ResolveLoader;
    externals?: string | RegExp | import("webpack").ExternalsObjectElement | import("webpack").ExternalsFunctionElement | import("webpack").ExternalsElement[];
    target?: "web" | "webworker" | "node" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-main" | ((compiler?: any) => void);
    bail?: boolean;
    profile?: boolean;
    cache?: boolean | object;
    watch?: boolean;
    watchOptions?: import("webpack").ICompiler.WatchOptions;
    node?: false | import("webpack").Node;
    amd?: {
        [moduleName: string]: boolean;
    };
    recordsPath?: string;
    recordsInputPath?: string;
    recordsOutputPath?: string;
    stats?: import("webpack").Stats.ToStringOptions;
    performance?: false | import("webpack").Options.Performance;
    parallelism?: number;
    optimization?: import("webpack").Options.Optimization;
};
export declare function babelDefault(config: any): any;
