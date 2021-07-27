import Roact from "./index";

/**
 * Creates a new Roact fragment with the provided table of elements. Fragments allow grouping of elements without the
 * need for intermediate containing objects like `Frame`s.
 *
 * **Caution:** Make sure not to modify `elements` after they're passed into `createFragment`!
 */
declare function createFragment(elements?: { [elementName: string]: Roact.Element }): Roact.Fragment;
declare function createFragment(elements?: ReadonlyMap<string | number, Roact.Element>): Roact.Fragment;
declare function createFragment(elements?: ReadonlyArray<Roact.Element>): Roact.Fragment;

export = createFragment;
