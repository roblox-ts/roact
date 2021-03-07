/// <reference types="@rbxts/types" />

import Roact from "./index";

type Defaultize<P, D> = P extends any
	? string extends keyof P
		? P
		: Pick<P, Exclude<keyof P, keyof D>> &
				Partial<Pick<P, Extract<keyof P, keyof D>>> &
				Partial<Pick<D, Exclude<keyof D, keyof P>>>
	: never;

type RoactManagedAttributes<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

declare global {
	namespace JSX {
		type Element = Roact.Element;

		interface ElementClass {
			render(): Roact.Element | undefined;
		}

		interface ElementChildrenAttribute {
			_jsx_children: {};
		}

		interface IntrinsicAttributes extends Roact.JsxProps {}

		interface IntrinsicClassAttributes<T extends Instance> extends Roact.JsxProps {}

		type LibraryManagedAttributes<C, P> = C extends Roact.Component<infer T>
			? RoactManagedAttributes<T, P>
			: RoactManagedAttributes<C, P>;

		interface IntrinsicElements {
			billboardgui: Roact.JsxObject<BillboardGui>;
			camera: Roact.JsxObject<Camera>;
			frame: Roact.JsxObject<Frame>;
			imagebutton: Roact.JsxObject<ImageButton>;
			imagelabel: Roact.JsxObject<ImageLabel>;
			screengui: Roact.JsxObject<ScreenGui>;
			scrollingframe: Roact.JsxObject<ScrollingFrame>;
			surfacegui: Roact.JsxObject<SurfaceGui>;
			textbox: Roact.JsxObject<TextBox>;
			textbutton: Roact.JsxObject<TextButton>;
			textlabel: Roact.JsxObject<TextLabel>;
			uiaspectratioconstraint: Roact.JsxObject<UIAspectRatioConstraint>;
			uicorner: Roact.JsxObject<UICorner>;
			uigradient: Roact.JsxObject<UIGradient>;
			uigridlayout: Roact.JsxObject<UIGridLayout>;
			uilistlayout: Roact.JsxObject<UIListLayout>;
			uipadding: Roact.JsxObject<UIPadding>;
			uipagelayout: Roact.JsxObject<UIPageLayout>;
			uiscale: Roact.JsxObject<UIScale>;
			uisizeconstraint: Roact.JsxObject<UISizeConstraint>;
			uitablelayout: Roact.JsxObject<UITableLayout>;
			uitextsizeconstraint: Roact.JsxObject<UITextSizeConstraint>;
			viewportframe: Roact.JsxObject<ViewportFrame>;
		}
	}
}
