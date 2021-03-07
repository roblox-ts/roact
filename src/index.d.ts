/// <reference path="./jsx.d.ts" />

import Component from "./Component";
import createContext from "./createContext";
import createElement from "./createElement";
import createFragment from "./createFragment";
import createRef from "./createRef";
import None from "./None";
import oneChild from "./oneChild";
import Portal from "./Portal";
import Change from "./PropMarkers/Change";
import Children from "./PropMarkers/Children";
import Event from "./PropMarkers/Event";
import Ref from "./PropMarkers/Ref";
import PureComponent from "./PureComponent";

declare namespace Roact {
	export {
		Change,
		Children,
		Component,
		createContext,
		createElement,
		createFragment,
		createRef,
		Event,
		None,
		oneChild,
		Portal,
		PureComponent,
		Ref,
	};

	// Props

	export type PropsWithChildren<P = {}> = P & { [Roact.Children]?: Roact.Children };

	// Component

	export type HostComponent = keyof CreatableInstances;
	export type FunctionComponent<P = {}> = (props: PropsWithChildren<P>) => Roact.Element | undefined;
	export type AnyComponent = Roact.Component | Roact.FunctionComponent | Roact.HostComponent;

	// Element

	export interface Element {
		component: defined;
		props: defined;
		source?: string;
	}

	// Fragment

	export const Fragment: Roact.Component<{}, {}>;
	export type Fragment = typeof Roact.Fragment;

	// Binding

	export interface Binding<T> {
		/**
		 * Returns the internal value of the binding. This is helpful when updating a binding relative to its current value.
		 */
		getValue(): T;

		/**
		 * Returns a new binding that maps the existing binding's value to something else. For example, `map` can be used to
		 * transform an animation progress value like `0.4` into a property that can be consumed by a Roblox Instance like
		 * `UDim2.new(0.4, 0, 1, 0)`.
		 */
		map<U>(predicate: (value: T) => U): Binding<U>;
	}

	/**
	 * The first value returned is a `Binding` object, which will typically be passed as a prop to a Roact host
	 * component. The second is a function that can be called with a new value to update the binding.
	 */
	export function createBinding<T>(initialValue: T): LuaTuple<[Roact.Binding<T>, (newValue: T) => void]>;

	/**
	 * Combines multiple bindings into a single binding. The new binding's value will have the same keys as the input
	 * table of bindings.
	 */
	export function joinBindings<T extends { [index: string]: Binding<U> }, U>(
		bindings: T,
	): Binding<{ [K in keyof T]: T[K] extends Binding<infer V> ? V : never }>;
	export function joinBindings<T>(bindings: ReadonlyArray<Binding<T>>): Binding<Array<T>>;
	export function joinBindings<T>(
		bindings: ReadonlyMap<string | number, Binding<T>>,
	): Binding<Map<string | number, Binding<T>>>;

	// Mounting

	export interface Tree {
		/** @hidden */
		readonly _nominal_Tree: unique symbol;
	}

	/**
	 * Creates a Roblox Instance given a Roact element, and optionally a `parent` to put it in, and a `key` to use as
	 * the instance's `Name`.
	 *
	 * The result is a `RoactTree`, which is an opaque handle that represents a tree of components owned by Roact. You
	 * can pass this to APIs like `Roact.unmount`. It'll also be used for future debugging APIs.
	 */
	export function mount(element: Roact.Element, parent?: Instance, key?: string): Roact.Tree;

	/**
	 * Updates an existing instance handle with a new element, returning a new handle. This can be used to update a UI
	 * created with `Roact.mount` by passing in a new element with new props.
	 *
	 * `update` can be used to change the props of a component instance created with `mount` and is useful for putting
	 * Roact content into non-Roact applications.
	 *
	 * As of Roact 1.0, the returned `RoactTree` object will always be the same value as the one passed in.
	 */
	export function update(tree: Roact.Tree, element: Roact.Element): Roact.Tree;

	/**
	 * Destroys the given `RoactTree` and all of its descendants. Does not operate on a Roblox Instance -- this must be
	 * given a handle that was returned by `Roact.mount`.
	 */
	export function unmount(tree: Roact.Tree): void;

	export interface GlobalConfig {
		/**
		 * Enables type checks for Roact's public interface. This includes some of the following:
		 * - Check that the props and children arguments to Roact.createElement are both tables or nil
		 * - Check that setState is passing self as the first argument (it should be called like `self:setState(...)`)
		 * - Confirm the Roact.mount's first argument is a Roact element
		 * - And much more!
		 */
		typeChecks: boolean;

		/**
		 * Enables type checks for internal functionality of Roact. This is typically only useful when debugging Roact
		 * itself. It will run similar type checks to those mentioned above, but only the private portion of the API.
		 */
		internalTypeChecks: boolean;

		/**
		 * When enabled, Roact will capture a stack trace at the site of each element creation and hold onto it, using
		 * it to provide additional details on certain kinds of errors. If you get an error that says "", try enabling
		 * this config value to help with debugging.
		 *
		 * Enabling elementTracing also allows the use of the getElementTraceback method on Component, which can also be
		 * helpful for debugging.
		 */
		elementTracing: boolean;

		/**
		 * Enables validation of props via the validateProps method on components. With this flag enabled, any
		 * validation written by component authors in a component's validateProps method will be run on every prop
		 * change. This is helpful during development for making sure components are being used correctly.
		 */
		propValidation: boolean;
	}

	/**
	 * The entry point for configuring Roact. Roact currently applies this to everything using this instance of Roact,
	 * so be careful using this with a project that has multiple consumers of Roact.
	 *
	 * Once config values are set, they will apply from then on. This is primarily useful when developing as it can
	 * enable features that validate your code more strictly. Most of the settings here incur a performance cost and
	 * should typically be disabled in production environments.
	 *
	 * Call this method once at the root of your project (before mounting any Roact elements).
	 */
	export function setGlobalConfig(globalConfig: Partial<Roact.GlobalConfig>): void;

	// Utility Types
	export type BindingFunc<T> = (newVal: T) => void;
	export type RefPropertyOrFunction<T extends Instance> = Roact.Ref<T> | ((rbx: T) => void);

	// JSX

	export type JsxChild =
		| boolean
		| Roact.Element
		| ReadonlyArray<Roact.Element>
		| ReadonlyMap<string | number, Roact.Element>
		| undefined;

	export type JsxNode = Roact.JsxChild | Roact.JsxChild[];

	export type JsxProps<P = {}> = P & {
		Key?: string | number;
		[Roact.Children]?: Roact.Children;
		_jsx_children?: Roact.JsxNode;
	};
}

export = Roact;
