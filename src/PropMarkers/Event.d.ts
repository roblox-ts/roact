interface Event {
	readonly [index: string]: symbol;
}

/**
 * Index into `Roact.Event` to receive a key that can be used to connect to events when creating host elements:
 * ```lua
 * Roact.createElement("ImageButton", {
 *     [Roact.Event.MouseButton1Click] = function(rbx, x, y)
 *         print(rbx, "clicked at position", x, y)
 *     end,
 * })
 * ```
 *
 * **Info:** Event callbacks receive the Roblox Instance as the first parameter, followed by any parameters yielded by
 * the event.
 *
 * **Warning:** When connecting to the `Changed` event, be careful not to call `setState` or other functions that will
 * trigger renders. This will cause Roact to re-render during a render, and errors will be thrown!
 *
 * See [the events guide](https://roblox.github.io/roact/guide/events) for more details.
 */
declare const Event: Event;

export = Event;
