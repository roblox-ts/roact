interface Symbol<T extends string> {
	/** @hidden */
	_name: T;
}

interface SymbolConstructor {
	named: <T extends string>(name: T) => Symbol<T>;
}

declare const Symbol: SymbolConstructor;

export = Symbol;
