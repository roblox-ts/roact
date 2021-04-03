import Roact from "./index";

declare function oneChild(children?: { [childName: string]: Roact.Element }): Roact.Element | undefined;
declare function oneChild(children?: ReadonlyMap<string | number, Roact.Element>): Roact.Element | undefined;
declare function oneChild(children?: ReadonlyArray<Roact.Element>): Roact.Element | undefined;

export = oneChild;
