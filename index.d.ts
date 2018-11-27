import 'rbx-types';

export =Roact;
export as namespace Roact;


declare namespace Roact {
	interface RenderableClass {
		new (...args: Array<any>):
		{
			render(): Element;
		}
	}

	interface RenderablePropsClass<P> {
		new (props: P): {
			render(): Element;
			props: P;
		}
	}

    /** A Roact Element */
    interface Element {
        type: Symbol,
        component: string | RenderableClass,
        props: any;
        source?: string;
    }

    abstract class IComponent {
        abstract render(): Element;
    }

    interface ComponentInstanceHandle { 
		_key?: string;
		_parent?: Instance;
		_element?: string | RenderableClass;
	}

	type Children = Element[] | {[name: string]: Element};

	/**
	 * Create a new roact element representing a custom roact component
	 * @param component The component type to create
	 * @param props The properties of the component
	 * @param children The children of this element
	 */
    function createElement<T extends Roact.Component<any, P>, P>(
        component: RenderablePropsClass<P>,
        props?: Partial<P>,
        children?: Children
	): Element;

	/**
	 * Create a new roact element representing a ROBLOX instance
	 * @param instanceName The name of the instance
	 * @param props The properties of the instance
	 * @param children The children of the element
	 */
	function createElement<T extends Instance>(
		instanceName: string,
		props?: {[name: string]: any},
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
     */
    function reconcile<T>(handle: ComponentInstanceHandle, component: Element): ComponentInstanceHandle;

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
    function oneChild(children: (Component | Element)[]): Roact.Element;

    /**
     * Creates a new reference object that can be used with `Roact.Ref`
     * @see Roact.Ref
     */
    function createRef<T extends Instance>(): Ref<T>;

    type ContainsKeys<S, K extends keyof S> = (Pick<S, K> | S | null);

    abstract class PureComponent<S = {}, P = {}> extends Component<S, P> {

    }

    abstract class Component<S = {}, P = {}> extends IComponent {
        constructor(p: P);

        public props: P & { children: Element[] };
        protected state: S;

        /**
         * `setState` requests an update to the component's state. Roact may schedule this update for a later time or resolve it immediately
         * 
         *      component.willUpdate = self => {
         *          self.setState({name: 'value'})
         *      }
         * 
         * 
         *      component.willUpdate = self => {
         *          self.setState((state, props) => {
         *              return {name: state.name + 1};
         *          })
         *      }
         * 
         * @param state The current state
         * @returns Any changed state properties
         */
        protected setState<K extends keyof S>(
            state: (
                (
                    prevState: Readonly<S>,
                    props: P
                )
                => ContainsKeys<S, K>)
        ): void;

        protected setState<K extends keyof S>(state: ContainsKeys<S, K>):void;

        public abstract render(): Element;
    }

    /**
     * A reference to an instance
     */
    interface Ref<T extends Instance = Instance> {
        readonly current: T | undefined
    }

	type JsxIntrinsic<T extends Rbx_Instance> = Partial<SubType<T, PropertyTypes>> & Rbx_JsxProps<T>;
	type JsxIntrinsicContainer<T extends Rbx_Instance> = Rbx_JsxProps<T>;
}

type RoactEvents<T> = {
    [key in keyof Partial<SubType<T, RBXScriptSignal>>]: EventHandlerFunction<T>
};

type RoactPropertyChanges<T> = {
    [key in keyof Partial<SubType<T, PropertyTypes>>]: PropertyChangeHandlerFunction<T>
}

type EventHandlerFunction<T> = (rbx: T, ...args: any[])=>void;
type PropertyChangeHandlerFunction<T> = (rbx: T)=>void;

type PropertyTypes = string | number | 
    Vector2 | Vector3 | 
    Instance | CFrame | 
    UDim2 | UDim |
    Axes | BrickColor |
    ColorSequence | Vector2int16 |
    Vector3int16 | Region3 |
    Region3int16 | PhysicalProperties |
    Rect | Color3 | 
    Faces | ReflectionMetadataEnums;



/**
 * Arbitrary properties of JSX elements, unrelated to ROBLOX instances
 */
interface Rbx_JsxProps<T extends Rbx_Instance> {
    /**
     * The key of this element
     * In Roact, this would be the index of the Roact Element as a child of another element.
     * 
     * E.g. a key of "Bob" would be equivalent of  doing
     * ```lua
Roact.createElement(Parent, {...}, {
    Bob = Roact.createElement(ThisElement, {...})
})```
     */
    Key?: string;

    /**
     * The event handlers of this element
     * 
     * Example usage:
```tsx
	<textbutton event={{
		MouseButton1Click: rbx => print("Clicked!")
	}}/>
```
     * In Vanilla Roact, this would be equivalent to
     * 
```lua
Roact.createElement("TextButton", {
    [Roact.Event.MouseButton1Click] = (function(rbx)
        print("Clicked!")
    end) 
});```
     *   
     */
    Event?: RoactEvents<T>,

    /**
     * The property changed handlers of this element
     * Equivalent of "GetPropertyChangedSignal(Name)"
     * 
     * Example usage:
```tsx
	<textbox change={{
		Text: rbx => print("Text changed to:", rbx)
	}}/>
```
     * In Vanilla Roact, this would be equivalent to
     * 
```lua
Roact.createElement("TextBox", {
    [Roact.Change.Text] = (function(rbx)
        print("Text changed to:", rbx.Text)
    end) 
});```
     *     
     */
    Change?: RoactPropertyChanges<T>
}



type FilterFlags<Base, Condition> = {
    [Key in keyof Base]: 
        Base[Key] extends Condition ? Key : never
};

type AllowedNames<Base, Condition> = 
        FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = 
        Pick<Base, AllowedNames<Base, Condition>>;

declare global {

    /**
     * Support for the experimental JSX in roblox-ts
     */
    namespace JSX {
        interface IntrinsicElements {
			uiaspectratioconstraint: Roact.JsxIntrinsic<Rbx_UIAspectRatioConstraint>;

            screengui: Roact.JsxIntrinsic<Rbx_ScreenGui>;
            billboardgui: Roact.JsxIntrinsic<Rbx_BillboardGui>;
            surfacegui: Roact.JsxIntrinsic<Rbx_SurfaceGui>;

            imagelabel: Roact.JsxIntrinsic<Rbx_ImageLabel>;
            imagebutton: Roact.JsxIntrinsic<Rbx_ImageButton>;

            textlabel: Roact.JsxIntrinsic<Rbx_TextLabel>;
            textbutton: Roact.JsxIntrinsic<Rbx_TextButton>;
            textbox: Roact.JsxIntrinsic<Rbx_TextBox>;

            frame: Roact.JsxIntrinsic<Rbx_Frame>;
            viewportframe: Roact.JsxIntrinsic<Rbx_ViewportFrame>;
            scrollingframe: Roact.JsxIntrinsic<Rbx_ScrollingFrame>;

            uigridlayout: Roact.JsxIntrinsic<Rbx_UIGridLayout>;
            uilistlayout: Roact.JsxIntrinsic<Rbx_UIListLayout>;
            uipagelayout: Roact.JsxIntrinsic<Rbx_UIPageLayout>;
            uitablelayout: Roact.JsxIntrinsic<Rbx_UITableLayout>;

            uipadding: Roact.JsxIntrinsic<Rbx_UIPadding>;
            uiscale: Roact.JsxIntrinsic<Rbx_UIScale>;

            uisizeconstraint: Roact.JsxIntrinsic<Rbx_UISizeConstraint>;
			uitextsizeconstraint: Roact.JsxIntrinsic<Rbx_UITextSizeConstraint>;
        }
    }
}