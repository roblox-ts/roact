import Roact from "./index";

type AllowRefs<T> = T extends Instance ? Roact.Ref<T> : never;
type InferEnumNames<T> = T extends { EnumType: Enum.EnumType<infer U> } ? U["Name"] : never;
type JsxInstanceProperties<T extends Instance> = {
	[P in Exclude<WritablePropertyNames<T>, "Parent" | "Name">]?:
		| T[P]
		| AllowRefs<T[P]>
		| InferEnumNames<T[P]>
		| Roact.Binding<T[P]>;
};

type JsxEvents<T extends Instance> = {
	Event?: {
		[K in ExtractKeys<T, RBXScriptSignal>]?: T[K] extends RBXScriptSignal<infer F>
			? (rbx: T, ...args: Parameters<F>) => void
			: never;
	};
	Change?: { [key in InstancePropertyNames<T>]?: (rbx: T) => void };
	Ref?: Roact.RefPropertyOrFunction<T>;
};

type JsxObject<T extends Instance> = Roact.JsxProps & JsxInstanceProperties<T> & JsxEvents<T>;

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
			billboardgui: JsxObject<BillboardGui>;
			camera: JsxObject<Camera>;
			frame: JsxObject<Frame>;
			imagebutton: JsxObject<ImageButton>;
			imagelabel: JsxObject<ImageLabel>;
			screengui: JsxObject<ScreenGui>;
			scrollingframe: JsxObject<ScrollingFrame>;
			surfacegui: JsxObject<SurfaceGui>;
			textbox: JsxObject<TextBox>;
			textbutton: JsxObject<TextButton>;
			textlabel: JsxObject<TextLabel>;
			uiaspectratioconstraint: JsxObject<UIAspectRatioConstraint>;
			uicorner: JsxObject<UICorner>;
			uigradient: JsxObject<UIGradient>;
			uigridlayout: JsxObject<UIGridLayout>;
			uilistlayout: JsxObject<UIListLayout>;
			uipadding: JsxObject<UIPadding>;
			uipagelayout: JsxObject<UIPageLayout>;
			uiscale: JsxObject<UIScale>;
			uisizeconstraint: JsxObject<UISizeConstraint>;
			uitablelayout: JsxObject<UITableLayout>;
			uitextsizeconstraint: JsxObject<UITextSizeConstraint>;
			viewportframe: JsxObject<ViewportFrame>;
		}
	}
}
