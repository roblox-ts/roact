/// <reference types="@rbxts/types" />

import Roact from "./index";

type Defaultize<P, D> = P extends any
	? string extends keyof P
		? P
		: Pick<P, Exclude<keyof P, keyof D>> &
				Partial<Pick<P, Extract<keyof P, keyof D>>> &
				Partial<Pick<D, Exclude<keyof D, keyof P>>>
	: never;

type JsxChild =
	| boolean
	| Roact.Element
	| ReadonlyArray<Roact.Element>
	| ReadonlyMap<string | number, Roact.Element>
	| undefined;

type JsxNode = JsxChild | JsxChild[];

declare global {
	namespace JSX {
		type Element = Roact.Element;

		interface ElementClass {
			render(): Roact.Element | undefined;
		}

		interface ElementChildrenAttribute {
			_jsx_children: {};
		}

		interface IntrinsicAttributes extends Roact.PropsWithChildren {
			Key?: string | number;
			_jsx_children?: JsxNode;
		}

		interface IntrinsicClassAttributes<T extends Instance> extends Roact.PropsWithChildren {}

		type LibraryManagedAttributes<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

		type IntrinsicElement<T extends Instance> = Roact.JsxInstance<T> & IntrinsicAttributes;

		interface IntrinsicElements {
			billboardgui: IntrinsicElement<BillboardGui>;
			camera: IntrinsicElement<Camera>;
			frame: IntrinsicElement<Frame>;
			imagebutton: IntrinsicElement<ImageButton>;
			imagelabel: IntrinsicElement<ImageLabel>;
			screengui: IntrinsicElement<ScreenGui>;
			scrollingframe: IntrinsicElement<ScrollingFrame>;
			surfacegui: IntrinsicElement<SurfaceGui>;
			textbox: IntrinsicElement<TextBox>;
			textbutton: IntrinsicElement<TextButton>;
			textlabel: IntrinsicElement<TextLabel>;
			uiaspectratioconstraint: IntrinsicElement<UIAspectRatioConstraint>;
			uicorner: IntrinsicElement<UICorner>;
			uigradient: IntrinsicElement<UIGradient>;
			uigridlayout: IntrinsicElement<UIGridLayout>;
			uilistlayout: IntrinsicElement<UIListLayout>;
			uipadding: IntrinsicElement<UIPadding>;
			uipagelayout: IntrinsicElement<UIPageLayout>;
			uiscale: IntrinsicElement<UIScale>;
			uisizeconstraint: IntrinsicElement<UISizeConstraint>;
			uistroke: IntrinsicElement<UIStroke>;
			uitablelayout: IntrinsicElement<UITableLayout>;
			uitextsizeconstraint: IntrinsicElement<UITextSizeConstraint>;
			viewportframe: IntrinsicElement<ViewportFrame>;
		}
	}
}
