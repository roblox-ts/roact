interface Binding<T> {
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

interface BindingConstructor {
	create: <T>(initialValue: T) => Binding<T>;
	join: never;
}

declare const Binding: BindingConstructor;

export = Binding;
