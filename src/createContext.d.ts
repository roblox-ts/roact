import Roact from "./index";

/**
 * Creates a new context provider and consumer. For a usage guide, see
 * [Advanced Concepts: Context](https://roblox.github.io/roact/advanced/context).
 *
 * `defaultValue` is given to consumers if they have no `Provider` ancestors. It is up to users of Roact's context API
 * to turn this case into an error if it is an invalid state.
 *
 * `Provider` and `Consumer` are both Roact components.
 *
 * **Provider**
 *
 * `Provider` accepts the following props:
 * * `value`: The value to put into the tree for this context value.
 * 	* If the Provider is updated with a new value, any matching Consumer components will be re-rendered with the new
 * value.
 * * `[Children]`: Any number of children to render underneath this provider.
 * 	* Descendants of this component can receive the provided context value by using `Consumer`.
 *
 * **Consumer**
 *
 * `Consumer` accepts just one prop:
 * * `render(value) -> RoactElement | nil`: A function that will be invoked to render any children.
 * 	* `render` will be called every time `Consumer` is rendered.
 */
declare function createContext<T>(
	defaultValue: T,
): {
	Provider: Roact.ComponentConstructor<{
		value: T;
	}>;

	Consumer: Roact.ComponentConstructor<{
		render: (value: T) => Roact.Element | undefined;
	}>;
};

export = createContext;
