/// <reference path="internal.d.ts" />
export = Roact;
export as namespace Roact;
declare namespace Roact {
	type Template<T extends GuiBase = GuiObject> = Partial<
		Pick<T, GetProperties<T>>
	>;

	//const Portal: Roact.Component<{}, PortalProps>;

	/**
	 * Portals are a special kind of component provided by Roact that enable components to
	 * render objects into a separate, non-Roact Instance.
	 */
	class Portal extends Roact.Component<PortalProps, {}> {
		constructor(props: PortalProps);
		public render(): Roact.Element;
	}

	interface RenderableClass {
		new (...args: Array<any>): {
			render(): Element | undefined;
		};
	}

	interface RenderablePropsClass<P> {
		new (props: P): {
			render(): Element | undefined;
		};
	}

	/** A Roact Element */
	interface Element {
		component: unknown;
		props: unknown;
		source?: string;
		readonly type: RoactSymbol;
	}

	/**
	 * An element created using JSX tags, e.g. `<frame/>` or `<MyComponent/>`
	 */
	interface JSXElement<P, T extends string> extends Element {
		component: T;
		props: P;
	}

	abstract class IComponent {
		abstract render(): Element | undefined;
	}

	interface ComponentInstanceHandle {
		/** @internal You should not mess with a component's instance handle! */
		_key?: string;
		/** @internal You should not mess with a component's instance handle! */
		_context?: unknown;
		/** @internal You should not mess with a component's instance handle! */
		_rbx?: Instance;
		/** @internal You should not mess with a component's instance handle! */
		_parent?: Instance;
		/** @internal You should not mess with a component's instance handle! */
		_element?: string | RenderableClass;
		/** @internal You should not mess with a component's instance handle! */
		_children?: _LuaMap<ComponentInstanceHandle | undefined>;
		/** @internal You should not mess with a component's instance handle! */
		_child?: ComponentInstanceHandle;
	}


	interface ProviderProps<T> {
		value?: T;
	}


	interface ConsumerProps<T> {
		render: (value: T) => Roact.Element;
	}

	interface Provider<T> {
		new (props: ProviderProps<T>): ContextProvider<T>;
	}
	
	interface Consumer<T> {
		new (props: NoChildren<ConsumerProps<T>>): ContextConsumer<T>;
	}

	interface Context<T> {
		Provider: Provider<T>;
		Consumer: Consumer<T>;
	}

	type Children = Element[] | { [name: string]: Element };

	type NoChildren<T> = T & {[Roact.Children]?: undefined};

	function createElement<T, P>(
		component: FunctionalComponent<T, P>,
		props?: P,
		children?: Children,
	): Element;
	function createElement<T extends Roact.RenderablePropsClass<P>, P>(
		component: StatefulComponent<T, P>,
		props?: P,
		children?: Children,
	): Element;
	function createElement<T extends keyof CreatableInstances>(
		className: PrimitiveComponent<T>,
		props?: PrimitiveProperties<T>,
		children?: Children,
	): Element;

	/**
	 * Context is useful for a global prop shared between components, like a theme. 
	 * 
	 * If you want something for your game's state, please look at [@rbxts/rodux](https://github.com/roblox-ts/rbx-rodux) and [@rbxts/roact-rodux](https://github.com/roblox-ts/rbx-roact-rodux).
	 * 
	 * ----
	 * 
	 * Creates a context prop which can be shared between components.
	 * 
	 * This returns a `Provider` - a top level component that will pass this prop & it's value to the child components (or the overriden value using `value`) -
	 * 
	 * and a`Consumer` - A component which takes a `render` prop - of which the value is passed to
	 * 
	 * Example:
	 * 
	 * ```jsx
	 * const MyContext = Roact.createContext("Hello");
	 * 
	 * const example = <MyContext.Provider value="Overriden Value">
	 * 	<frame>
	 * 		<MyContext.Consumer render={value => <textlabel Text={value}/>}/>
	 * 	</frame>
	 * </MyContext.Provider>;
	 * ```
	 * 
	 * The above example, the textlabel should say "Overriden value"
	 * 
	 * @param value 
	 */
	function createContext<T>(value: T): Context<T>;

	/**
	 * Creates a Roblox Instance given a Roact `element`, and optionally a `parent` to put it in, and a `key` to use as the instance's Name.
	 *
	 * The result is a `ComponentInstanceHandle`, which is an opaque handle that represents this specific instance of the root component. You can pass this to APIs like `Roact.unmount` and the future debug API.
	 */
	function mount(
		element: Element,
		parent?: Instance,
		key?: string,
	): ComponentInstanceHandle;

	/**
	 * Updates an existing instance handle with a new element, returning a new handle. This can be used to update a UI created with `Roact.mount` by passing in a new element with new props.
	 *
	 * `reconcile` can be used to change the props of a component instance created with `mount` and is useful for putting Roact content into non-Roact applications.
	 * @deprecated use `update`
	 */
	function reconcile<T>(
		handle: ComponentInstanceHandle,
		component: Element,
	): ComponentInstanceHandle;

	/**
	 * Updates an existing instance handle with a new element, returning a new handle. This can be used to update a UI created with `Roact.mount` by passing in a new element with new props.
	 *
	 * `update` can be used to change the props of a component instance created with `mount` and is useful for putting Roact content into non-Roact applications.
	 */
	function update(
		handle: ComponentInstanceHandle,
		component: Element,
	): ComponentInstanceHandle;

	/**
	 * Destroys the given `ComponentInstanceHandle` and all of its descendents. Does not operate on a Roblox Instance -- this must be given a handle that was returned by `Roact.mount`
	 */
	function unmount(handle: ComponentInstanceHandle): void;
	/**
	 * Given a dictionary of children, returns a single child element.
	 *
	 * If `children` contains more than one child, `oneChild` function will throw an error. This is intended to denote an error when using the component using oneChild.
	 *
	 * If `children` is nil or contains no children, `oneChild` will return nil
	 */
	function oneChild(children?: Element[]): Roact.Element;

	interface RoactBinding<T> {
		map<R>(valueTransform: (value: T) => R): R;
		getValue(): T;
	}

	type BindingValueType<T> = T extends RoactBinding<infer A> ? A : never;

	/**
	 * Combines multiple bindings into a single binding. The new binding's value will have the same keys as the input table of bindings.
	 * @param bindings The bindings to join
	 */
	function joinBindings<T extends { [P in keyof T]: RoactBinding<any> }>(
		bindings: T,
	): RoactBinding<{ [P in keyof T]: BindingValueType<T[P]> }>;

	type RoactBindingFunc<T> = (newVal: T) => void;

	/**
	 * Bindings are special objects that the Roact reconciler automatically unwraps into values.
	 * When a binding is updated, Roact will change only the specific properties that are subscribed to it.
	 * @param value The initial value of the binding
	 * @see https://github.com/Roblox/roact/blob/new-reconciler/docs/advanced/bindings-and-refs.md
	 */
	function createBinding<T>(
		value: T,
	): LuaTuple<[RoactBinding<T>, RoactBindingFunc<T>]>;

	type ElementFragment = Element;

	/**
	 * Fragments are a tool for avoiding unnecessary nesting when organizing components by
	 * allowing components to render collections of elements without wrapping them in a single containing element.
	 * @param fragments The fragmented elements
	 * @see https://github.com/Roblox/roact/blob/new-reconciler/docs/advanced/fragments.md
	 */
	function createFragment(fragments: {
		[name: string]: Roact.Element;
	}): Roact.ElementFragment;

	function createFragment(
		fragments: Map<string, Roact.Element> | Map<number, Roact.Element>,
	): Roact.ElementFragment;

	/**
	 * Creates a new reference object that can be used with `Roact.Ref`
	 * @see Roact.Ref
	 */
	function createRef<T extends Instance>(): Ref<T>;

	type ContainsKeys<S, K extends keyof S> = Pick<S, K> | S | null;

	abstract class PureComponent<P = {}, S = {}> extends Component<P, S> {}

	abstract class Component<P = {}, S = {}> extends IComponent {
		constructor(p: RbxJsxProps & P);

		/**
		 * The properties of this component
		 */
		protected props: StatefulComponentProps & P;

		/**
		 * The state of this component.
		 *
		 * **Warning**: Attempting to set this outside of your constructor will cause Roact to error - Use setState instead
		 */
		protected state: S;

		/**
			`didMount` is fired after the component finishes its initial render. At this point, all associated Roblox Instances have been created, and all components have finished mounting.

			`didMount` is a good place to start initial network communications, attach events to services, or modify the Roblox Instance hierarchy.
		*/
		protected didMount(): void;

		/**
			`willUnmount` is fired right before Roact begins unmounting a component instance's children.

			`willUnmount` acts like a component's destructor, and is a good place to disconnect any manually-connected events.
		 */
		protected willUnmount(): void;

		/**
			`shouldUpdate` provides a way to override Roact's rerendering heuristics.

			By default, components are re-rendered any time a parent component updates, or when state is updated via `setState`.

			`PureComponent` implements `shouldUpdate` to only trigger a re-render any time the props are different based on shallow equality. In a future Roact update, *all* components may implement this check by default.

		 * @param nextProps The next props
		 * @param nextState The next state
		 */
		protected shouldUpdate(nextProps: P, nextState: S): boolean;

		/**
		 * `willUpdate` is fired after an update is started but before a component's state and props are updated.
		 * @param nextProps The new props
		 * @param nextState The new state
		 */
		protected willUpdate(nextProps: P, nextState: S): void;

		/**
			`didUpdate` is fired after at the end of an update. At this point, the reconciler has updated the properties of any Roblox Instances and the component instance's props and state are up to date.

			`didUpdate` is a good place to send network requests or dispatch Rodux actions, but make sure to compare `this.props` and `this.state` with `previousProps` and `previousState` to avoid triggering too many updates.
		 * @param previousProps The previous props
		 * @param previousState The previous state
		 */
		protected didUpdate(previousProps: P, previousState: S): void;

		/**
         * `setState` requests an update to the component's state. Roact may schedule this update for a later time or resolve it immediately
         *
```ts
class MyComponent extends Roact.Component {
	public willUpdate() {
		this.setState({key: 'value'});
	}
}

class MyComponent extends Roact.Component {
	public willUpdate() {
		this.setState((state, props) => {
			return {name: state.name + 1};
		})
	}
}
```
         *
         * @param state The current state
         * @returns Any changed state properties
         */
		protected setState<K extends keyof S>(
			state: (prevState: Readonly<S>, props: P) => ContainsKeys<S, K>,
		): void;

		protected setState<K extends keyof S>(state: ContainsKeys<S, K>): void;

		/**
			`render` describes what a component should display at the current instant in time.

			Roact assumes that `render` act likes a pure function: the result of `render` must depend only on `props` and `state`, and it must not have side-effects.
		 */
		public abstract render(): Element | undefined;

		/**
		 * `validateProps` is an optional method that can be implemented for a component. It provides a mechanism for verifying inputs passed into the component.
		 *
		 * Every time props are updated, `validateProps` will be called with the new props before proceeding to `shouldUpdate` or `init`. It should return the same parameters that assert expects: a boolean, true if the props passed validation, false if they did not, plus a message explaining why they failed. If the first return value is true, the second value is ignored.
		 *
		 * **For performance reasons, property validation is disabled by default. **
		 *
		 * To use this feature, enable `propValidation` via `setGlobalConfig`:
			```ts
			Roact.setGlobalConfig({ propValidation: true });
			```
		 */
		protected static validateProps(props: {}):
			| LuaTuple<[false, string]>
			| LuaTuple<[true]>;
	}

	/**
	 * A reference to an instance
	 */
	interface Ref<T extends Instance = Instance> {
		getValue(): T | undefined;
	}

	type RefPropertyOrFunction<T extends Instance> =
		| Ref<T>
		| ((rbx: T) => void);

	/**
	 * A special value that can be used to set a state value to undefined.
	 * Due to how Lua tables work, you cannot simply set the value to `undefined`, you must use `Roact.None`.
	 *
```ts
interface MyProps{ fieldToRemove?: string }
class MyComponent extends Roact.Component<MyProps> {
	// ...
	public didMount() {
		this.setState({
			fieldToRemove: Roact.None
		})
	}
	// ...
}
```
	 */
	const None: undefined;

	const Ref: unique symbol;

	const Event: RoactEventSymbol;

	const Change: RoactChangeSymbol;

	const Children: unique symbol;

	type JsxObject<T extends Instance> = Partial<
		PickWithBindings<
			T,
			Exclude<GetWritableProperties<T>, "Parent" | "Name">
		>
	> &
		RbxJsxIntrinsicProps<T>;

	/**
	 * Requires a build of roblox-ts that supports Roact.Fragment (`vorlias/master`)
	 */
	const Fragment: Fragment;
}

interface Fragment extends Roact.IComponent {
	new (p: RbxJsxProps): Fragment;
}

declare global {
	/**
	 * Support for the experimental JSX in roblox-ts
	 */
	namespace JSX {
		// JSX.Element
		type Element = Roact.Element;

		// Force the element class type
		interface ElementClass {
			render(): Roact.Element | undefined;
		}

		interface ElementChildrenAttribute { [Roact.Children]: {} }

		// Puts props on JSX global components
		interface IntrinsicAttributes extends RbxJsxProps {}

		// Puts props on JSX Stateful Components
		interface IntrinsicClassAttributes<T extends Instance>
			extends RbxJsxProps {}

		interface IntrinsicElements {
			uiaspectratioconstraint: Roact.JsxObject<UIAspectRatioConstraint>;

			screengui: Roact.JsxObject<ScreenGui>;
			billboardgui: Roact.JsxObject<BillboardGui>;
			surfacegui: Roact.JsxObject<SurfaceGui>;

			imagelabel: Roact.JsxObject<ImageLabel>;
			imagebutton: Roact.JsxObject<ImageButton>;

			textlabel: Roact.JsxObject<TextLabel>;
			textbutton: Roact.JsxObject<TextButton>;
			textbox: Roact.JsxObject<TextBox>;

			frame: Roact.JsxObject<Frame>;
			viewportframe: Roact.JsxObject<ViewportFrame>;
			scrollingframe: Roact.JsxObject<ScrollingFrame>;

			uigridlayout: Roact.JsxObject<UIGridLayout>;
			uilistlayout: Roact.JsxObject<UIListLayout>;
			uipagelayout: Roact.JsxObject<UIPageLayout>;
			uitablelayout: Roact.JsxObject<UITableLayout>;
			uiinlinelayout: Roact.JsxObject<UIInlineLayout>;
			uigradient: Roact.JsxObject<UIGradient>;

			uipadding: Roact.JsxObject<UIPadding>;
			uiscale: Roact.JsxObject<UIScale>;

			uisizeconstraint: Roact.JsxObject<UISizeConstraint>;
			uitextsizeconstraint: Roact.JsxObject<UITextSizeConstraint>;

			camera: Roact.JsxObject<Camera>;
		}
	}
}
