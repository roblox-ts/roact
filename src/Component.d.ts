import Roact from "./index";

declare abstract class Component<P = {}, S = {}> {
	constructor(props: Roact.JsxProps<P>);

	protected readonly props: Roact.PropsWithChildren<P>;
	protected state: Readonly<S>;

	protected setState<K extends keyof S>(stateUpdater: (prevState: Readonly<S>, props: P) => Pick<S, K>): void;
	protected setState<K extends keyof S>(stateChange: Pick<S, K>): void;

	protected didMount(): void;

	protected willUnmount(): void;

	protected shouldUpdate(nextProps: P, nextState: S): boolean;

	protected willUpdate(nextProps: P, nextState: S): void;

	protected didUpdate(previousProps: P, previousState: S): void;

	public abstract render(): Roact.Element | undefined;

	protected static validateProps(props: unknown): LuaTuple<[boolean, string?]>;
}

export = Component;
