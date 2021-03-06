import Roact from "index";

interface Component<P = {}, S = {}> {
	setState(mapState: Partial<S>): void;
	render(): Roact.Element | undefined;
}

interface ComponentConstructor {
	extend<P = {}, S = {}>(name: string): Roact.Component<P, S>;
}

declare const Component: ComponentConstructor;

export = Component;
