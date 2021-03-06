/// <reference path="./jsx.d.ts" />

import Component from "./Component";
import createElement from "./createElement";
import createRef from "./createRef";
import oneChild from "./oneChild";
import Change from "./PropMarkers/Change";
import Children from "./PropMarkers/Children";
import Event from "./PropMarkers/Event";
import Ref from "./PropMarkers/Ref";
import PureComponent from "./PureComponent";

declare namespace Roact {
	export { Component, createElement, createRef, oneChild, Change, Children, Event, Ref, PureComponent };

	// Props

	export type PropsWithChildren<P = {}> = P & { [Roact.Children]: Roact.Children };

	// Components

	export type HostComponent = keyof CreatableInstances;
	export type FunctionalComponent<P = {}> = (props: PropsWithChildren<P>) => Roact.Element | undefined;
	export type AnyComponent = Roact.Component | Roact.FunctionalComponent | Roact.HostComponent;

	// Elements

	export interface Element {
		component: defined;
		props: defined;
		source?: string;
	}

	// Fragments

	export interface Fragment {}

	// Portals

	export class Portal extends Roact.Component<{ target: Instance }, {}> {
		public render(): Roact.Element;
	}

	// Bindings

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

	export function createBinding<T>(initialValue: T): LuaTuple<[Roact.Binding<T>, (newValue: T) => void]>;

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

	export function mount(element: Roact.Element, parent?: Instance, key?: string): Roact.Tree;

	export function update(tree: Roact.Tree, element: Roact.Element): Roact.Tree;

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

	// JSX
	export type JsxRoactChild =
		| boolean
		| Roact.Element
		| ReadonlyArray<Roact.Element>
		| ReadonlyMap<string | number, Roact.Element>
		| undefined;

	export type RoactNode = Roact.JsxRoactChild | Roact.JsxRoactChild[];

	export type JsxProps<P = {}> = P & {
		Key?: string | number;
		[Roact.Children]?: Roact.Children;
		_jsx_children?: Roact.RoactNode;
	};

	type AllowRefs<T> = T extends Instance ? Roact.Ref<T> : never;

	type InferEnumNames<T> = T extends { EnumType: Enum.EnumType<infer U> } ? U["Name"] : never;

	type PickWithBindingsAndRefs<T extends Instance, K extends keyof T> = {
		[P in K]: T[P] | InferEnumNames<T[P]> | Roact.Binding<T[P]> | AllowRefs<T[P]>;
	};

	export type JsxObject<T extends Instance> = Partial<
		PickWithBindingsAndRefs<T, Exclude<WritablePropertyNames<T>, "Parent" | "Name">>
	> &
		Roact.JsxProps & {
			Event?: {
				[K in ExtractKeys<T, RBXScriptSignal>]?: T[K] extends RBXScriptSignal<infer F>
					? (rbx: T, ...args: Parameters<F>) => void
					: never;
			};
			Change?: { [key in InstancePropertyNames<T>]?: (rbx: T) => void };
			Ref?: Roact.Ref<T> | ((rbx: T) => void);
		};
}

export = Roact;
