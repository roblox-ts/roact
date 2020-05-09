type FunctionalComponent<T, P> = T extends ((props: P) => Roact.Element) ? T : never;
type StatefulComponent<T, P = {}> = T extends Roact.RenderablePropsClass<P> ? T : never;
type PrimitiveComponent<T> = T extends keyof CreatableInstances ? T : never;

type PrimitiveProperties<T extends keyof CreatableInstances> = Partial<Pick<CreatableInstances[T], GetWritableProperties<CreatableInstances[T]>>> & {
	[Roact.Ref]?: Roact.Ref<CreatableInstances[T]> | Roact.Ref | ((ref: CreatableInstances[T]) => void);
};

/// <reference path="index.d.ts" />

interface RoactSymbol {}

interface RbxJsxProps {
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
	Key?: string | number;
	[Roact.Children]?: RoactNode;
}

interface ProviderProps<T> {
	value: T;
}
declare class ContextProvider<T> extends Roact.Component<ProviderProps<T>> {
	render(): Roact.Element;
}

interface ConsumerProps<T> {
	render: (value: T) => Roact.Element;
	[Roact.Children]: null;
}
declare class ContextConsumer<T> extends Roact.Component<ConsumerProps<T>> {
	render(): Roact.Element;
}

type RoactChild = Roact.Element | Roact.Element[] | Map<string, Roact.Element> | boolean | undefined;
type RoactNode = RoactChild | RoactChild[];

/**
 * Arbitrary properties of JSX elements, unrelated to ROBLOX instances
 */
interface RbxJsxIntrinsicProps<T extends Instance> extends RbxJsxProps {
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
	Event?: RoactEvents<T>;

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
	Change?: RoactPropertyChanges<T>;

	/**
	 * ### Ref has two functionalities:
	 *
	 * Create a reference to this instance, which can be used elsewhere
```tsx
class TestComponent extends Roact.Component {
	ref: Ref<Frame>;
	constructor(props: {})
	{
		super(props);
		ref = Roact.createRef<Frame>();
	}

	public render(): Roact.Element {
		return <screengui>
			<frame Ref={this.ref}/>
		</screengui>;
	}

	public didMount() {
		print("The frame: ", this.ref.current);
	}
}
```
	 * A function that is called every time the instance changes
```tsx
class TestComponent extends Roact.Component {
	public onFrameRendered(frame: Frame) {
		print("Frame rendered!", frame);
	}
	public render(): Roact.Element {
		return <screengui>
			<frame Ref={this.onFrameRendered}/>
		</screengui>;
	}
}
```
	 */
	Ref?: Roact.RefPropertyOrFunction<T>;
}

interface _LuaMap<T> {
	[name: string]: T;
	[id: number]: T;
}

interface PortalProps {
	target: Instance;
}

type test = Enum.ActionType;


type InferEnumNames<T> = T extends {EnumType: Enum.EnumType<infer A> } ? A["Name"] : never;

type PickWithBindings<T, K extends keyof T> = {
	[P in K]: T[P] | InferEnumNames<T[P]> | Roact.RoactBinding<T[P]>;
};

type RoactEvents<T> = {
	[K in keyof SubType<T, RBXScriptSignal>]?: T[K] extends RBXScriptSignal<infer F>
		? EventHandlerFunction<T, FunctionArguments<F>>
		: never
};

type RoactPropertyChanges<T extends Instance> = { [key in GetProperties<T>]?: (rbx: T) => void };

interface RoactEventSymbol {
	readonly [name: string]: symbol;
}

interface RoactChangeSymbol {
	readonly [name: string]: symbol;
}

interface StatefulComponentProps {
	/**
	 * The children of your component.
	 *
	 * Make sure to check if they exist first!
	 */
	readonly [Roact.Children]?: Roact.Element[];
}

type EventHandlerFunction<T, U extends any[]> = U extends []
	? (rbx: T) => void
	: U extends [infer A]
	? (rbx: T, a: A) => void
	: U extends [infer A, infer B]
	? (rbx: T, a: A, b: B) => void
	: U extends [infer A, infer B, infer C]
	? (rbx: T, a: A, b: B, c: C) => void
	: U extends [infer A, infer B, infer C, infer D]
	? (rbx: T, a: A, b: B, c: C, d: D) => void
	: U extends [infer A, infer B, infer C, infer D, infer E]
	? (rbx: T, a: A, b: B, c: C, d: D, e: E) => void
	: U extends [infer A, infer B, infer C, infer D, infer E, infer F]
	? (rbx: T, a: A, b: B, c: C, d: D, e: E, f: F) => void
	: (rbx: T, ...args: unknown[]) => void;

type SubType<Base, Condition> = Pick<
	Base,
	{ [Key in keyof Base]: Base[Key] extends Condition ? Key : never }[keyof Base]
>;
