import Component from "./Component";

/**
 * An extension of `Roact.Component` that only re-renders if its props or state change.
 *
 * `PureComponent` implements the `shouldUpdate` lifecycle event with a shallow equality comparison. It's optimized for
 * use with immutable data structures, which makes it a perfect fit for use with frameworks like Rodux.
 *
 * `PureComponent` is not _always_ faster, but can often result in significant performance improvements when used
 * correctly.
 */
declare abstract class PureComponent<P = {}, S = {}> extends Component<P, S> {}

export = PureComponent;
