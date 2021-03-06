import Roact from "./index";

declare function createRef<T extends Instance>(): Roact.Ref<T>;

export = createRef;
