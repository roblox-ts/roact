/// <reference types="@rbxts/types" />

import Roact from "./index";

/**
 * Creates a new component given a render function that accepts both props and a ref,
   allowing a ref to be forwarded to an underlying host component
   via [Roact.Ref](https://roblox.github.io/roact/api-reference/#roactref).
 */
declare function forwardRef<P = {}>(render: (props: P, ref: Roact.Ref) => Roact.Element): Roact.FunctionComponent;

export = forwardRef;
