type ValuesOf<T> =
	T extends Rbx_Instance ? Partial<T> : never;

type Writable<T> = Pick<T, { [P in keyof T]-?: (<U>() => U extends { [Q in P]: T[P] } ? 1 : 2) extends (<U>() => U extends { -readonly [Q in P]: T[P] } ? 1 : 2) ? P : never }[keyof T]>;
type Key = string | number;
type FunctionalComponent<T> = T extends ((props: unknown) => Roact.Element) ? T : never;
type StatefulComponent<T, P = {}> = T extends Roact.RenderablePropsClass<P> ? T : never;
type PrimitiveComponent<T> = T extends keyof Primitives ? T : never;

type WithRef<T extends Rbx_Instance> = { [Roact.Ref]?: Roact.Ref<T> | Roact.Ref | ((ref: T) => void) }

type PrimitiveProperties<T extends keyof Primitives> = Writable<Partial<Rbx_Primitive<Primitives[T]>>> & WithRef<Rbx_Primitive<Primitives[T]>>;
/// <reference path="index.d.ts" />

interface RoactSymbol {

}

interface Rbx_JsxProps {
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
	Key?: Key;
}

type Rbx_Primitive<T extends Instance> = BaseType<T>;
type Primitives = CreatableInstances;

/**
 * Arbitrary properties of JSX elements, unrelated to ROBLOX instances
 */
interface Rbx_JsxIntrinsicProps<T extends Rbx_Instance> extends Rbx_JsxProps {
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

type RoactEvents<T> = {
	[K in keyof Partial<SubType<T, RBXScriptSignal>>]: T[K] extends RBXScriptSignal<infer F>
	? EventHandlerFunction<T, FunctionArguments<F>>
	: never
};

type RoactPropertyChanges<T> = { [key in keyof Partial<SubType<T, PropertyTypes>>]: PropertyChangeHandlerFunction<T> };

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

type PropertyChangeHandlerFunction<T> = (rbx: T) => void;

type PropertyTypes =
	| string
	| number
	| Vector2
	| Vector3
	| Instance
	| CFrame
	| UDim2
	| UDim
	| Axes
	| BrickColor
	| ColorSequence
	| Vector2int16
	| Vector3int16
	| Region3
	| Region3int16
	| PhysicalProperties
	| Rect
	| Color3
	| Faces
	| ReflectionMetadataEnums
	| boolean;

type FilterFlags<Base, Condition> = { [Key in keyof Base]: Base[Key] extends Condition ? Key : never };

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;