/// <reference types="@rbxts/types" />

import Component from "./Component";
import Roact from "./index";

/**
 * A component that represents a portal to a Roblox Instance. Portals are created using Roact.createElement.
 *
 * Any children of a portal are put inside the Roblox Instance specified by the required target prop. That Roblox Instance should not be one created by Roact.
 *
 * Portals are useful for creating dialogs managed by deeply-nested UI components, and enable Roact to represent and manage multiple disjoint trees at once.
 *
 * See the Portals guide for a small tutorial and more details about portals.
 */
declare class Portal<P = {}, S = {}> extends Component<P, S> {
	render(): Roact.Element | undefined;
}

export = Portal;
