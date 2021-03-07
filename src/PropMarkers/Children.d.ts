import Roact from "../index";

/**
 * This is the key that Roact uses internally to store the children that are attached to a Roact element.
 *
 * If you're writing a new function component or stateful component that renders children like a host component, you can
 * access `Roact.Children` in your props table.
 */
declare const Children: unique symbol;

type Children = Map<string | number, Roact.Element>;

export = Children;
