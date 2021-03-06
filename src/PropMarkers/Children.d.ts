import Roact from "../index";

declare const Children: unique symbol;

type Children = Map<string | number, Roact.Element>;

export = Children;
