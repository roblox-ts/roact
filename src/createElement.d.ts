import Roact from "./index";

type MapBindings<T> = { [K in keyof T]: T[K] | Roact.Binding<T[K]> };

// Class Component
declare function createElement<P>(
	component: { new (props: Roact.JsxProps<P>): Roact.Component<P> },
	props?: MapBindings<P>,
	children?: { [childName: string]: Roact.Element },
): Roact.Element;
declare function createElement<P>(
	component: { new (props: Roact.JsxProps<P>): Roact.Component<P> },
	props?: MapBindings<P>,
	children?: ReadonlyMap<string | number, Roact.Element>,
): Roact.Element;
declare function createElement<P>(
	component: { new (props: Roact.JsxProps<P>): Roact.Component<P> },
	props?: MapBindings<P>,
	children?: ReadonlyArray<Roact.Element>,
): Roact.Element;

// Functional Component
declare function createElement<P>(
	component: Roact.FunctionalComponent<P>,
	props: MapBindings<P>,
	children?: { [childName: string]: Roact.Element },
): Roact.Element;
declare function createElement<P>(
	component: Roact.FunctionalComponent<P>,
	props: MapBindings<P>,
	children?: ReadonlyMap<string | number, Roact.Element>,
): Roact.Element;
declare function createElement<P>(
	component: Roact.FunctionalComponent<P>,
	props: MapBindings<P>,
	children?: ReadonlyArray<Roact.Element>,
): Roact.Element;

type HostComponentProps<T extends Roact.HostComponent> = Partial<WritableInstanceProperties<CreatableInstances[T]>> & {
	[Roact.Ref]?: Roact.Ref<CreatableInstances[T]> | ((ref: CreatableInstances[T]) => void);
};

// Host Component
declare function createElement<C extends Roact.HostComponent>(
	component: C,
	props?: MapBindings<HostComponentProps<C>>,
	children?: { [childName: string]: Roact.Element },
): Roact.Element;
declare function createElement<C extends Roact.HostComponent>(
	component: C,
	props?: MapBindings<HostComponentProps<C>>,
	children?: ReadonlyMap<string | number, Roact.Element>,
): Roact.Element;
declare function createElement<C extends Roact.HostComponent>(
	component: C,
	props?: MapBindings<HostComponentProps<C>>,
	children?: ReadonlyArray<Roact.Element>,
): Roact.Element;

export = createElement;
