import Roact from "./index";

declare function createContext<T>(
	defaultValue: T,
): {
	Provider: Roact.Component<{
		value: T;
	}>;

	Consumer: Roact.Component<{
		render: (value: T) => Roact.Element | undefined;
	}>;
};

export = createContext;
