import Roact from "./index";

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
