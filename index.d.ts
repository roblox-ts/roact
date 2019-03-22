/// <reference path="internal.d.ts" />
export = Roact;
export as namespace Roact;
declare namespace Roact {
	type Template<T extends Rbx_GuiBase = Rbx_GuiObject> = Partial<SubType<T, PropertyTypes>>;

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
		new(...args: Array<any>): {
			render(): Element | undefined;
		};
	}

	interface RenderablePropsClass<P> {
		new(props: P): {
			render(): Element | undefined;
			shouldUpdate(nextProps: P, nextState: any): boolean;
			willUpdate(nextProps: P, nextState: any): void;
			didUpdate(previousProps: P, previousState: any): void;
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

	type Children = Element[] | { [name: string]: Element };


	function createElement<T, P>(
		component: FunctionalComponent<T, P>,
		props?: P,
		children?: Children
	): Element;
	function createElement<T extends Roact.RenderablePropsClass<P>, P>(
		component: StatefulComponent<T, P>,
		props?: P,
		children?: Children
	): Element;
	function createElement<T extends keyof CreatableInstances>(
		className: PrimitiveComponent<T>,
		props?: PrimitiveProperties<T>,
		children?: Children
	): Element;

	/**
	 * Creates a Roblox Instance given a Roact `element`, and optionally a `parent` to put it in, and a `key` to use as the instance's Name.
	 *
	 * The result is a `ComponentInstanceHandle`, which is an opaque handle that represents this specific instance of the root component. You can pass this to APIs like `Roact.unmount` and the future debug API.
	 */
	function mount(element: Element, parent?: Instance, key?: string): ComponentInstanceHandle;

	/**
	 * Updates an existing instance handle with a new element, returning a new handle. This can be used to update a UI created with `Roact.mount` by passing in a new element with new props.
	 *
	 * `reconcile` can be used to change the props of a component instance created with `mount` and is useful for putting Roact content into non-Roact applications.
	 * @deprecated use `update`
	 */
	function reconcile<T>(handle: ComponentInstanceHandle, component: Element): ComponentInstanceHandle;

	/**
	 * Updates an existing instance handle with a new element, returning a new handle. This can be used to update a UI created with `Roact.mount` by passing in a new element with new props.
	 *
	 * `update` can be used to change the props of a component instance created with `mount` and is useful for putting Roact content into non-Roact applications.
	 */
	function update(handle: ComponentInstanceHandle, component: Element): ComponentInstanceHandle;

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

	type RoactBindingFunc<T> = (newVal: T) => void;

	/**
	 * Bindings are special objects that the Roact reconciler automatically unwraps into values. 
	 * When a binding is updated, Roact will change only the specific properties that are subscribed to it.
	 * @param value The initial value of the binding
	 * @see https://github.com/Roblox/roact/blob/new-reconciler/docs/advanced/bindings-and-refs.md
	 */
	function createBinding<T>(value: T): [RoactBinding<T>, RoactBindingFunc<T>];


	type ElementFragment = Element;

	/**
	 * Fragments are a tool for avoiding unnecessary nesting when organizing components by 
	 * allowing components to render collections of elements without wrapping them in a single containing element.
	 * @param fragments The fragmented elements
	 * @see https://github.com/Roblox/roact/blob/new-reconciler/docs/advanced/fragments.md
	 */
	function createFragment(fragments: { [name: string]: Roact.Element }): Roact.ElementFragment;

	/**
	 * Creates a new reference object that can be used with `Roact.Ref`
	 * @see Roact.Ref
	 */
	function createRef<T extends Instance>(): Ref<T>;

	type ContainsKeys<S, K extends keyof S> = Pick<S, K> | S | null;

	abstract class PureComponent<P = {}, S = {}> extends Component<P, S> { }

	abstract class Component<P = {}, S = {}> extends IComponent {
		constructor(p: P & Rbx_JsxProps);

		/**
		 * The properties of this component
		 */
		protected props: P & StatefulComponentProps;

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
		protected setState<K extends keyof S>(state: (prevState: Readonly<S>, props: P) => ContainsKeys<S, K>): void;

		protected setState<K extends keyof S>(state: ContainsKeys<S, K>): void;

		/**
			`render` describes what a component should display at the current instant in time.

			Roact assumes that `render` act likes a pure function: the result of `render` must depend only on `props` and `state`, and it must not have side-effects.
		 */
		public abstract render(): Element | undefined;
	}

	/**
	 * A reference to an instance
	 */
	interface Ref<T extends Rbx_Instance = Instance> {
		readonly current: T | undefined;
	}

	type RefPropertyOrFunction<T extends Rbx_Instance> = Ref<T> | ((rbx: T) => void);

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


	type P = Exclude<Instance, "Parent">
	/**
	 * Properties of the specified instance
	 */
	type Properties<T extends Rbx_Instance> = ExcludeReadonlyProps<Partial<SubType<T, PropertyTypes>>>;

	type JsxIntrinsic<T extends Rbx_Instance> = Properties<T> & Rbx_JsxIntrinsicProps<T>;
	type JsxLayerCollector<T extends Rbx_LayerCollector> = JsxIntrinsic<T>;
	type JsxUIComponent<T extends Rbx_UIComponent> = JsxIntrinsic<T>;
	type JsxGuiObject<T extends Rbx_GuiObject> = Properties<T> & RefProps<T, GuiObject> & Rbx_JsxIntrinsicProps<T>;
}

declare global {
	/**
	 * Support for the experimental JSX in roblox-ts
	 */
	namespace JSX {
		// JSX.Element
		type Element = Roact.JSXElement<any, any>;

		// Force the element class type
		interface ElementClass extends Roact.Component<any> {
			render(): Roact.Element | undefined;
		}

		interface ElementAttributesProperty { props: { [Roact.Children]: Roact.Children }; }
		interface ElementChildrenAttribute { [Roact.Children]: {} }

		// Puts props on JSX global components
		interface IntrinsicAttributes extends Rbx_JsxProps { }

		// Puts props on JSX Stateful Components
		interface IntrinsicClassAttributes<T extends Rbx_Instance> extends Rbx_JsxProps {

		}

		interface IntrinsicElements {
			uiaspectratioconstraint: Roact.JsxUIComponent<Rbx_UIAspectRatioConstraint>;

			screengui: Roact.JsxLayerCollector<Rbx_ScreenGui>;
			billboardgui: Roact.JsxLayerCollector<Rbx_BillboardGui>;
			surfacegui: Roact.JsxLayerCollector<Rbx_SurfaceGui>;

			imagelabel: Roact.JsxGuiObject<Rbx_ImageLabel>;
			imagebutton: Roact.JsxGuiObject<Rbx_ImageButton>;

			textlabel: Roact.JsxGuiObject<Rbx_TextLabel>;
			textbutton: Roact.JsxGuiObject<Rbx_TextButton>;
			textbox: Roact.JsxGuiObject<Rbx_TextBox>;

			frame: Roact.JsxGuiObject<Rbx_Frame>;
			viewportframe: Roact.JsxGuiObject<Rbx_ViewportFrame>;
			scrollingframe: Roact.JsxGuiObject<Rbx_ScrollingFrame>;

			uigridlayout: Roact.JsxUIComponent<Rbx_UIGridLayout>;
			uilistlayout: Roact.JsxUIComponent<Rbx_UIListLayout>;
			uipagelayout: Roact.JsxUIComponent<Rbx_UIPageLayout>;
			uitablelayout: Roact.JsxUIComponent<Rbx_UITableLayout>;

			uipadding: Roact.JsxUIComponent<Rbx_UIPadding>;
			uiscale: Roact.JsxUIComponent<Rbx_UIScale>;

			uisizeconstraint: Roact.JsxUIComponent<Rbx_UISizeConstraint>;
			uitextsizeconstraint: Roact.JsxUIComponent<Rbx_UITextSizeConstraint>;
		}
	}
}
