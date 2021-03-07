/// <reference types="@rbxts/types" />

import Roact from "./index";

/**
 * Creates a new reference object that can be used with
 * [Roact.Ref](https://roblox.github.io/roact/api-reference/#roactref).
 */
declare function createRef<T extends Instance>(): Roact.Ref<T>;

export = createRef;
