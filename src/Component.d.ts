import Roact from "./index";

/**
 * The base component instance that can be extended to make stateful components.
 */
declare abstract class Component<P = {}, S = {}> {
	/**
	 * `init` is called exactly once when a new instance of a component is created. It can be used to set up the initial
	 * `state`, as well as any non-`render` related values directly on the component.
	 *
	 * Use `setState` inside of `init` to set up your initial component state:
	 * ```lua
	 * function MyComponent:init()
	 *     self:setState({
	 *         position = 0,
	 *         velocity = 10
	 *     })
	 * end
	 * ```
	 */
	constructor(props: P);

	protected readonly props: Roact.PropsWithChildren<P>;

	protected state: Readonly<S>;

	/**
	 * `render` describes what a component should display at the current instant in time.
	 *
	 * **Info:** Roact assumes that `render` act likes a pure function: the result of `render` must depend only on
	 * `props` and `state`, and it must not have side-effects.
	 *
	 * ```lua
	 * function MyComponent:render()
	 *     -- This is okay:
	 *     return Roact.createElement("TextLabel", {
	 *         Text = self.props.text,
	 *         Position = self.state.position
	 *     })
	 *     -- Ack! Depending on values outside props/state is not allowed!
	 *     return Roact.createElement("TextLabel", {
	 *         Text = self.someText,
	 *         Position = getMousePosition(),
	 *     })
	 * end
	 * ```
	 *
	 * `render` must be defined for all components. The default implementation of `render` throws an error; if your
	 * component does not render anything, define a render function that returns `nil` explicitly. This helps make sure
	 * that you don't forget to define `render`!
	 *
	 * ```lua
	 * function MyComponent:render()
	 * 	return nil
	 * end
	 * ```
	 */
	public abstract render(): Roact.Element | undefined;

	/**
	 * `setState` requests an update to the component's state. Roact may schedule this update for a later time or
	 * resolve it immediately.
	 *
	 * If a function is passed to `setState`, that function will be called with the current state and props as
	 * arguments:
	 *
	 * ```lua
	 * function MyComponent:didMount()
	 *     self:setState(function(prevState, props)
	 *         return {
	 *             counter = prevState.counter + 1
	 *         }
	 *     end)
	 * end
	 * ```
	 *
	 * If this function returns `nil`, Roact will not schedule a re-render and no state will be updated.
	 *
	 * If a table is passed to `setState`, the values in that table will be merged onto the existing state:
	 * ```lua
	 * function MyComponent:didMount()
	 *     self:setState({
	 *         foo = "bar"
	 *     })
	 * end
	 * ```
	 *
	 * Setting a field in the state to `Roact.None` will clear it from the state. This is the only way to remove a field
	 * from a component's state!
	 */
	protected setState<K extends keyof S>(stateUpdater: (prevState: Readonly<S>, props: P) => Pick<S, K>): void;
	protected setState<K extends keyof S>(stateChange: Pick<S, K>): void;

	/**
	 * `shouldUpdate` provides a way to override Roact's rerendering heuristics.
	 *
	 * By default, components are re-rendered any time a parent component updates, or when state is updated via
	 * `setState`.
	 *
	 * `PureComponent` implements `shouldUpdate` to only trigger a re-render any time the props are different based on
	 * shallow equality. In a future Roact update, all components may implement this check by default.
	 */
	protected shouldUpdate(nextProps: P, nextState: S): boolean;

	/**
	 * `validateProps` is an optional method that can be implemented for a component. It provides a mechanism for
	 * verifying inputs passed into the component.
	 *
	 * Every time props are updated, `validateProps` will be called with the new props before proceeding to
	 * `shouldUpdate` or `init`. It should return the same parameters that assert expects: a boolean, true if the props
	 * passed validation, false if they did not, plus a message explaining why they failed. If the first return value is
	 * true, the second value is ignored.
	 *
	 * **For performance reasons, property validation is disabled by default.** To use this feature, enable
	 * `propValidation` via `setGlobalConfig`:
	 * ```lua
	 * Roact.setGlobalConfig({
	 *     propValidation = true
	 * })
	 * ```
	 *
	 * See [setGlobalConfig](https://roblox.github.io/roact/api-reference/#roactsetglobalconfig) for more details.
	 */
	protected static validateProps(props: unknown): LuaTuple<[boolean, string?]>;

	/**
	 * `getElementTraceback` gets the stack trace that the component was created in. This allows you to report error
	 * messages accurately.
	 */
	protected getElementTraceback(): string | undefined;

	/**
	 * `didMount` is fired after the component finishes its initial render. At this point, all associated Roblox
	 * Instances have been created, and all components have finished mounting.
	 *
	 * `didMount` is a good place to start initial network communications, attach events to services, or modify the
	 * Roblox Instance hierarchy.
	 */
	protected didMount(): void;

	/**
	 * `willUnmount` is fired right before Roact begins unmounting a component instance's children.
	 *
	 * `willUnmount` acts like a component's destructor, and is a good place to disconnect any manually-connected
	 * events.
	 */
	protected willUnmount(): void;

	/**
	 * `willUpdate` is fired after an update is started but before a component's state and props are updated.
	 */
	protected willUpdate(nextProps: P, nextState: S): void;

	/**
	 * `didUpdate` is fired after at the end of an update. At this point, Roact has updated the properties of any Roblox
	 * Instances and the component instance's props and state are up to date.
	 *
	 * `didUpdate` is a good place to send network requests or dispatch Rodux actions, but make sure to compare
	 * `self.props` and `self.state` with `previousProps` and `previousState` to avoid triggering too many updates.
	 */
	protected didUpdate(previousProps: P, previousState: S): void;
}

export = Component;
