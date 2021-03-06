import Roact from "./index";

declare function createFragment(elements: { [elementName: string]: Roact.Element }): Roact.Fragment;
declare function createFragment(elements: ReadonlyMap<string | number, Roact.Element>): Roact.Fragment;
declare function createFragment(elements: ReadonlyArray<Roact.Element>): Roact.Fragment;

export = createFragment;
