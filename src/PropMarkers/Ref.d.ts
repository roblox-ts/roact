/// <reference types="@rbxts/types" />

interface Ref<T extends Instance = Instance> {
	getValue(): T | undefined;
}

/**
 * Use `Roact.Ref` as a key into the props of a host element to receive a handle to the underlying Roblox Instance.
 *
 * Assign this key to a ref created with [createRef](https://roblox.github.io/roact/api-reference/#roactcreateref):
 * ```lua
 * local ExampleComponent = Roact.Component:extend("ExampleComponent")
 *
 * function ExampleComponent:init()
 *     -- Create a ref.
 *     self.ref = Roact.createRef()
 * end
 *
 * function ExampleComponent:render()
 *     return Roact.createElement("Frame", {
 *         -- Use the ref to point to this rendered instance.
 *         [Roact.Ref] = self.ref,
 *     })
 * end
 *
 * function ExampleComponent:didMount()
 *     -- Refs are a kind of binding, so we can access the Roblox Instance using getValue.
 *     print("Roblox Instance", self.ref:getValue())
 * end
 * ```
 *
 * Alternatively, you can assign it to a function instead:
 * ```lua
 * Roact.createElement("Frame", {
 *     -- The provided function will be called whenever the rendered instance changes.
 *     [Roact.Ref] = function(rbx)
 *         print("Roblox Instance", rbx)
 *     end,
 * })
 * ```
 *
 * **Warning:** When `Roact.Ref` is given a function, Roact does not guarantee when this function will be run relative to
 * the reconciliation of other props. If you try to read a Roblox property that's being set via a Roact prop, you won't
 * know if you're reading it before or after Roact updates that prop!
 *
 * **Warning:** When `Roact.Ref` is given a function, it will be called with `nil` when the component instance is
 * destroyed!
 *
 * See [the refs guide](https://roblox.github.io/roact/advanced/bindings-and-refs#refs) for more details.
 */
declare const Ref: unique symbol;

export = Ref;
