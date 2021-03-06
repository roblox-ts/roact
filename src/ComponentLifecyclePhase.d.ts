interface ComponentLifecyclePhase {
	readonly Init: unique symbol;
	readonly Render: unique symbol;
	readonly ShouldUpdate: unique symbol;
	readonly WillUpdate: unique symbol;
	readonly DidMount: unique symbol;
	readonly DidUpdate: unique symbol;
	readonly WillUnmount: unique symbol;

	readonly ReconcileChildren: unique symbol;
	readonly Idle: unique symbol;
}

declare const ComponentLifecyclePhase: ComponentLifecyclePhase;

export = ComponentLifecyclePhase;
