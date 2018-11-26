import { Element } from "rbx-roact";

export =Roact;
export as namespace Roact;


declare namespace Roact {
    /** A Roact Element */
    interface Element {
        type: Symbol,
        component: string | IExtendedComponent,
        props: any;
        source?: string;
    }

    interface IExtendedComponent {
        render: (self: any) => Element;
    }

    abstract class IComponent {
        abstract render(): Element;
    }

    interface ComponentInstanceHandle { }

    /**

     * Creates a new Roact element representing the given component. Elements are lightweight descriptions about what a Roblox Instance should look like, like a blueprint!

     * The `children` argument is shorthand for adding a `Roact.Children` key to props. It should be specified as a dictionary of names to elements.

     * `component` can be a string, a function, or a table created by `Component.extend`

     * Setting `T` of createElement will show the properties of that type

     * @param component The Component
     * @param props The properties of this element
     * @param children The children of this element
     */
    function createElement<T>(
        component: string | IExtendedComponent,
        props?: T | { [name: string]: any },
        children?: Element[] | { [name: string]: Element }
    ): Element

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
    function reconcile(handle: ComponentInstanceHandle, component: Element): ComponentInstanceHandle;

    /**
     * Destroys the given `ComponentInstanceHandle` and all of its descendents. Does not operate on a Roblox Instance -- this must be given a handle that was returned by `Roact.mount`
     */
    function unmount(handle: ComponentInstanceHandle): void;
    /**
     * This is the key that Roact uses internally to store the children that are attached to a Roact element.
     * 
     * If you're writing a new functional or stateful element that needs to be used like a primitive component, you can access `Roact.Children` in your props table
     * 
     *      // example usage
     *      let children = self.props[Roact.Children];
     * 
     *      // return first child
     *      return Roact.oneChild(self.props[Roact.Children]);
     * 
     *      // iterate children
     *      let children = self.props[Roact.Children];
     *      if (children && children.length > 0)
     *      {
     *          for (let child of children)
     *          {
     *              // do something with child...
     *          }
     *      }
     * 
     *      // put each child in a frame
     *      let children = self.props[Roact.Children]
     *      children.map(child => Roact.createElement("Frame", {}, [child]))
     */
    const Children: 0xBAD_F00D_DEAD_0_0;

    /**
     * Use `Roact.Ref` as a key into the props of a primitive element to receive a handle to the underlying Roblox Instance.
     * 
     *      interface IExampleComponent { ref: Roact.Ref }
     *      let exampleComponent = Roact.Component.extend<{}, {}, IExampleComponent>("ExampleComponent");
     *      
     *      exampleComponent.init = (self) => {
     *          self.ref = Roact.createRef();
     *      }
     * 
     *      exampleComponent.render = (self) => {
     *          return Roact.createElement("Frame", {
     *              [Roact.Ref]: self.ref
     *          })
     *      }
     * 
     *      exampleComponent.didMount = (self) => print("Roblox Instance", self.ref.current)
     */
    const Ref: "Roact.Ref";

    const Portal: "Roact.Portal";

    /**
     * `Roact.None` is a special value that can be used to clear elements from your component 
     * state when calling setState or returning from `getDerivedStateFromProps`.

     * In Lua tables, removing a field from state is not possible by setting its value to `nil` 
     *  because `nil` values mean the same thing as no value at all. If a field needs to be removed from state, 
     *   it can be set to `Roact.None` when calling setState, which will ensure that the resulting state no longer 
     *   contains it:
     */
    const None: undefined;

    /** 
     * Index into `Roact.Event` to receive a key that can be used to connect to events when creating primitive elements
     */
    const Event: {
        [name: string]: "Event"
    };

    /** 
     * Index into `Roact.Change` to receive a key that can be used to connect to `GetPropertyChangedSignal` events.
     */
    const Change: {
        [name: string]: "GetPropertyChangedSignal"
    };

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


    class PureExtendedComponent<S ={}, P={}, V={}> extends ExtendedComponent<Readonly<S>, Readonly<P>, V>{

    }

    type ContainsKeys<S, K extends keyof S> = (Pick<S, K> | S | null);
    type ComponentRef<S, P, V> = ExtendedComponent<S, P, V> & V;

    namespace self {
        /**
         * @internal
         */
        interface __base {
            /**
             * `getElementTraceback` gets the stack trace that the component was created in. 
             * This allows you to report error messages accurately.
             */
            getElementTraceback(): string | undefined;
        }



        interface __pure<S, P> extends __base {
            state: Readonly<S>;
            props: P;
        }

        interface __update<S, P> extends __pure<S, P> {
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
            setState<K extends keyof S>(
                state: (
                    (
                        prevState: Readonly<S>,
                        props: P
                    )
                        => ContainsKeys<S, K> | ContainsKeys<S, K>)
            ): void;
        }

        interface init<S = dynamic, P = dynamic> extends __update<S, P>, __base {
            state: S;
        }

        interface render<S = dynamic, P = dynamic> extends __pure<S, P> { }
        interface willUnmount<S = dynamic, P = dynamic> extends __pure<S, P> { }
        interface willUpdate<S = dynamic, P = dynamic> extends __update<S, P> { }
        interface didMount<S = dynamic, P = dynamic> extends __update<S, P> { }
        interface didUpdate<S = dynamic, P = dynamic> extends __pure<S, P> { }
        interface shouldUpdate<S = dynamic, P = dynamic> extends __pure<S, P> { }
    }

    /**
     * Created through Roact.Component.extend(name)
     */
    class ExtendedComponent<S = {}, P = {}, V = {}> implements IExtendedComponent {
        /**
         * If `defaultProps` is defined on a stateful component, any props that aren't specified when a component 
         * is created will be taken from there.
         */
        defaultProps?: P;

        /**
         * `init` is called exactly once when a new instance of a component is created. It can be used to set up the initial state, as well as any non-render related values directly on the component.
         *
         * Use `state` inside of init to set up your initial component state:
         * 
                myComponent.init = (self) => {
                    self.state = {
                        position = 0,
                        velocity = 10
                    };
                }
         */
        init: (self: self.init<S, P> & V, props: P) => void;

        /**
         * `render` describes what a component should display at the current instant in time.
         * 
         * render must be defined for all components. The default implementation of render throws an error; 
         * if your component does not render anything, define a render function that returns nil explicitly. 
         * This helps make sure that you don't forget to define render!
         */
        render: (self: self.render<S, P> & V) => Roact.Element;

        /**
        * `willUnmount` is fired right before Roact begins unmounting a component instance's children.
        * 
        * `willUnmount` acts like a component's destructor, and is a good place to disconnect any manually-connected events.
        */
        willUnmount: (self: self.willUnmount<S, P> & V) => void;

        /**
         * `didMount` is fired after the component finishes its initial render. At this point, all associated Roblox Instances have been created, and all components have finished mounting.
         * 
         * `didMount` is a good place to start initial network communications, attach events to services, or modify the Roblox Instance hierarchy.
         */
        didMount: (self: self.didMount<S, P> & V) => void;

        /**
         * `didUpdate` is fired after at the end of an update. At this point, the reconciler has updated the properties of any Roblox Instances and the component instance's props and state are up to date.

         * `didUpdate` is a good place to send network requests or dispatch Rodux actions, but make sure to compare `self.props` and `self.state` with `previousProps` and `previousState` to avoid triggering too many updates.
         */
        didUpdate: (self: self.didUpdate<S, P> & V, previousProps: Readonly<P>, previousState: Readonly<S>) => void;


        /**
         * `willUpdate` is fired after an update is started but before a component's state and props are updated.
         *
         * `willUpdate` can be used to make tweaks to your component's state using setState. Often, this should be done in `getDerivedStateFromProps` instead.
         */
        willUpdate: (self: self.willUpdate<S, P> & V, nextProps: P, nextState: S) => void;

        /**
         * `shouldUpdate` provides a way to override Roact's rerendering heuristics.
            By default, components are re-rendered any time a parent component updates, or when state is updated via `setState`.
            `PureComponent` implements `shouldUpdate` to only trigger a re-render any time the props are different based on shallow equality.
         */
        shouldUpdate: (self: self.shouldUpdate<S, P> & V, nextProps: P, nextState: S) => boolean;

        /**
         * Used to recalculate any state that depends on being synchronized with props.
         * 
         * Generally, you should use `didUpdate` to respond to props changing. If you find yourself copying props values to state as-is, consider using props or memoization instead.
         * 
         * `getDerivedStateFromProps` should return a table that contains the part of the state that should be updated.
         */
        getDerivedStateFromProps: <K extends keyof S>(nextProps: P, nextState: S) => ContainsKeys<S, K>;
    }

    abstract class PureComponent<S = {}, P = {}> extends Component<S, P> {
        /**
         * Create a new stateful component with the specified name
         * 
         * Basic Construction:
         * 
         *      const Component = Roact.PureComponent.extend("Component");
         * 
         * Type-safe Construction:
         * 
         *      interface IComponentState { ... } // self.state.*
         *      interface IComponentProps { ... } // self.props.*
         *      interface IComponent { ... } // self.*
         *      const Component = Roact.PureComponent.extend<IComponentState, IComponentProps, IComponent>("Component");
         * 
         * @param name The class name of this component
         */
        extend<state = dynamic, props = dynamic, fields = dynamic>(
            name: string
        ): PureExtendedComponent<state, props & IBaseProps, fields> & fields;
    }

    /**
     * A Roact Component, created using 
     * @code Roact.Component.extend<...>(name)
     */
    abstract class Component<S = {}, P = {}> extends IComponent {
        constructor(p: P);

        /**
         * Create a new stateful component with the specified name
         * 
         * Basic Construction:
         * 
         *      const Component = Roact.Component.extend("Component");
         * 
         * Type-safe Construction:
         * 
         *      interface IComponentState { ... } // self.state.*
         *      interface IComponentProps { ... } // self.props.*
         *      interface IComponent { ... } // self.*
         *      const Component = Roact.Component.extend<IComponentState, IComponentProps, IComponent>("Component");
         * 
         * @param name The class name of this component
         */
        static extend<state = dynamic, props = dynamic, fields = dynamic>(
            name: string
        ): ExtendedComponent<state, props & IBaseProps, fields> & fields;

        protected props: P & { children: Element[] };
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

    interface IBaseProps {
        [0xBAD_F00D_DEAD_0_0]: Roact.Element[]
    }

    type dynamic = { [name: string]: any }


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
     * 
     *      <rbxTextButton event={{
     *          MouseButton1Click: rbx => print("Clicked!")
     *      }}/>
     * 
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
     * 
     *      <rbxTextBox change={{
     *          Text: rbx => print("Text changed to:", rbx)
     *      }}/>
     * 
     * In Vanilla Roact, this would be equivalent to
     * 
```lua
Roact.createElement("TextBox", {
    [Roact.Change.Text] = (function(rbx)
        print("Text changed to:", rbx)
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

type Rbx_JsxIntrinsic<T extends Rbx_Instance> = Partial<SubType<T, PropertyTypes>> & Rbx_JsxProps<T>;



declare global {
    interface Function {
        bind(thisArg: any, ...argArray: any[]): any;
    }

    /**
     * Support for the experimental JSX in roblox-ts
     */
    namespace JSX {
        interface IntrinsicElements {
            screengui: Rbx_JsxIntrinsic<Rbx_ScreenGui>;
            billboardgui: Rbx_JsxIntrinsic<Rbx_BillboardGui>;
            surfacegui: Rbx_JsxIntrinsic<Rbx_SurfaceGui>;

            imagelabel: Rbx_JsxIntrinsic<Rbx_ImageLabel>;
            imagebutton: Rbx_JsxIntrinsic<Rbx_ImageButton>;

            textlabel: Rbx_JsxIntrinsic<Rbx_TextLabel>;
            textbutton: Rbx_JsxIntrinsic<Rbx_TextButton>;
            textbox: Rbx_JsxIntrinsic<Rbx_TextBox>;

            frame: Rbx_JsxIntrinsic<Rbx_Frame>;
            viewportframe: Rbx_JsxIntrinsic<Rbx_ViewportFrame>;
            scrollingframe: Rbx_JsxIntrinsic<Rbx_ScrollingFrame>;

            uigridlayout: Rbx_JsxIntrinsic<Rbx_UIGridLayout>;
            uilistlayout: Rbx_JsxIntrinsic<Rbx_UIListLayout>;
            uipagelayout: Rbx_JsxIntrinsic<Rbx_UIPageLayout>;
            uitablelayout: Rbx_JsxIntrinsic<Rbx_UITableLayout>;

            uipadding: Rbx_JsxIntrinsic<Rbx_UIPadding>;
            uiscale: Rbx_JsxIntrinsic<Rbx_UIScale>;

            uiaspectratioconstraint: Rbx_JsxIntrinsic<Rbx_UIAspectRatioConstraint>;
            uisizeconstraint: Rbx_JsxIntrinsic<Rbx_UISizeConstraint>;
            uitextsizeconstraint: Rbx_JsxIntrinsic<Rbx_UITextSizeConstraint>;
        }
    }
}