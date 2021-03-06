interface Ref<T extends Instance = Instance> {
	getValue(): T | undefined;
}

declare const Ref: unique symbol;

export = Ref;
