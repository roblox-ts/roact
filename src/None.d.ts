/**
 * `Roact.None` is a special value that can be used to clear elements from your component state when calling `setState`
 * or returning from `getDerivedStateFromProps`.
 *
 * In Lua tables, removing a field from state is not possible by setting its value to `nil` because `nil` values mean
 * the same thing as no value at all. If a field needs to be removed from state, it can be set to `Roact.None` when
 * calling `setState`, which will ensure that the resulting state no longer contains it:
 */
declare const None: undefined;

export = None;
