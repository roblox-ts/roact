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

		interface IntrinsicElements {
			billboardgui: Roact.JsxInstanceProps<BillboardGui>;
			camera: Roact.JsxInstanceProps<Camera>;
			frame: Roact.JsxInstanceProps<Frame>;
			imagebutton: Roact.JsxInstanceProps<ImageButton>;
			imagelabel: Roact.JsxInstanceProps<ImageLabel>;
			screengui: Roact.JsxInstanceProps<ScreenGui>;
			scrollingframe: Roact.JsxInstanceProps<ScrollingFrame>;
			surfacegui: Roact.JsxInstanceProps<SurfaceGui>;
			textbox: Roact.JsxInstanceProps<TextBox>;
			textbutton: Roact.JsxInstanceProps<TextButton>;
			textlabel: Roact.JsxInstanceProps<TextLabel>;
			uiaspectratioconstraint: Roact.JsxInstanceProps<UIAspectRatioConstraint>;
			uicorner: Roact.JsxInstanceProps<UICorner>;
			uigradient: Roact.JsxInstanceProps<UIGradient>;
			uigridlayout: Roact.JsxInstanceProps<UIGridLayout>;
			uilistlayout: Roact.JsxInstanceProps<UIListLayout>;
			uipadding: Roact.JsxInstanceProps<UIPadding>;
			uipagelayout: Roact.JsxInstanceProps<UIPageLayout>;
			uiscale: Roact.JsxInstanceProps<UIScale>;
			uisizeconstraint: Roact.JsxInstanceProps<UISizeConstraint>;
			uitablelayout: Roact.JsxInstanceProps<UITableLayout>;
			uitextsizeconstraint: Roact.JsxInstanceProps<UITextSizeConstraint>;
			viewportframe: Roact.JsxInstanceProps<ViewportFrame>;
		}
	}
}
