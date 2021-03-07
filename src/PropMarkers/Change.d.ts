interface Change {
	readonly [index: string]: symbol;
}

/**
 * Index into Roact.Change to receive a key that can be used to connect to GetPropertyChangedSignal events.
 *
 * It's similar to Roact.Event:
 * ```lua
 * Roact.createElement("ScrollingFrame", {
 *     [Roact.Change.CanvasPosition] = function(rbx)
 *         print("ScrollingFrame scrolled to", rbx.CanvasPosition)
 *     end,
 * })
 * ```
 *
 * **Warning:** Property changed events are fired by Roact during the reconciliation phase. Be careful not to
 * accidentally trigger a re-render in the middle of a re-render, or an error will be thrown!
 */
declare const Change: Change;

export = Change;
