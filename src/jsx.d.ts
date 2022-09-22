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
			accessory: IntrinsicElement<Accessory>;
			accoutrement: IntrinsicElement<Accoutrement>;
			actor: IntrinsicElement<Actor>;
			alignorientation: IntrinsicElement<AlignOrientation>;
			alignposition: IntrinsicElement<AlignPosition>;
			angularvelocity: IntrinsicElement<AngularVelocity>;
			animation: IntrinsicElement<Animation>;
			animationcontroller: IntrinsicElement<AnimationController>;
			animationrigdata: IntrinsicElement<AnimationRigData>;
			animator: IntrinsicElement<Animator>;
			archandles: IntrinsicElement<ArcHandles>;
			atmosphere: IntrinsicElement<Atmosphere>;
			attachment: IntrinsicElement<Attachment>;
			backpack: IntrinsicElement<Backpack>;
			ballsocketconstraint: IntrinsicElement<BallSocketConstraint>;
			beam: IntrinsicElement<Beam>;
			billboardgui: IntrinsicElement<BillboardGui>;
			bindableevent: IntrinsicElement<BindableEvent>;
			bindablefunction: IntrinsicElement<BindableFunction>;
			blockmesh: IntrinsicElement<BlockMesh>;
			bloomeffect: IntrinsicElement<BloomEffect>;
			blureffect: IntrinsicElement<BlurEffect>;
			bodyangularvelocity: IntrinsicElement<BodyAngularVelocity>;
			bodycolors: IntrinsicElement<BodyColors>;
			bodyforce: IntrinsicElement<BodyForce>;
			bodygyro: IntrinsicElement<BodyGyro>;
			bodyposition: IntrinsicElement<BodyPosition>;
			bodythrust: IntrinsicElement<BodyThrust>;
			bodyvelocity: IntrinsicElement<BodyVelocity>;
			bone: IntrinsicElement<Bone>;
			boolvalue: IntrinsicElement<BoolValue>;
			boxhandleadornment: IntrinsicElement<BoxHandleAdornment>;
			breakpoint: IntrinsicElement<Breakpoint>;
			brickcolorvalue: IntrinsicElement<BrickColorValue>;
			camera: IntrinsicElement<Camera>;
			canvasgroup: IntrinsicElement<CanvasGroup>;
			cframevalue: IntrinsicElement<CFrameValue>;
			channelselectorsoundeffect: IntrinsicElement<ChannelSelectorSoundEffect>;
			charactermesh: IntrinsicElement<CharacterMesh>;
			chorussoundeffect: IntrinsicElement<ChorusSoundEffect>;
			clickdetector: IntrinsicElement<ClickDetector>;
			clouds: IntrinsicElement<Clouds>;
			color3value: IntrinsicElement<Color3Value>;
			colorcorrectioneffect: IntrinsicElement<ColorCorrectionEffect>;
			compressorsoundeffect: IntrinsicElement<CompressorSoundEffect>;
			conehandleadornment: IntrinsicElement<ConeHandleAdornment>;
			configuration: IntrinsicElement<Configuration>;
			cornerwedgepart: IntrinsicElement<CornerWedgePart>;
			curveanimation: IntrinsicElement<CurveAnimation>;
			cylinderhandleadornment: IntrinsicElement<CylinderHandleAdornment>;
			cylindermesh: IntrinsicElement<CylinderMesh>;
			cylindricalconstraint: IntrinsicElement<CylindricalConstraint>;
			datastoreincrementoptions: IntrinsicElement<DataStoreIncrementOptions>;
			datastoreoptions: IntrinsicElement<DataStoreOptions>;
			datastoresetoptions: IntrinsicElement<DataStoreSetOptions>;
			decal: IntrinsicElement<Decal>;
			depthoffieldeffect: IntrinsicElement<DepthOfFieldEffect>;
			dialog: IntrinsicElement<Dialog>;
			dialogchoice: IntrinsicElement<DialogChoice>;
			distortionsoundeffect: IntrinsicElement<DistortionSoundEffect>;
			doubleconstrainedvalue: IntrinsicElement<DoubleConstrainedValue>;
			dragger: IntrinsicElement<Dragger>;
			echosoundeffect: IntrinsicElement<EchoSoundEffect>;
			equalizersoundeffect: IntrinsicElement<EqualizerSoundEffect>;
			eulerrotationcurve: IntrinsicElement<EulerRotationCurve>;
			explosion: IntrinsicElement<Explosion>;
			facecontrols: IntrinsicElement<FaceControls>;
			filemesh: IntrinsicElement<FileMesh>;
			fire: IntrinsicElement<Fire>;
			flangesoundeffect: IntrinsicElement<FlangeSoundEffect>;
			floatcurve: IntrinsicElement<FloatCurve>;
			floorwire: IntrinsicElement<FloorWire>;
			folder: IntrinsicElement<Folder>;
			forcefield: IntrinsicElement<ForceField>;
			frame: IntrinsicElement<Frame>;
			gettextboundsparams: IntrinsicElement<GetTextBoundsParams>;
			glue: IntrinsicElement<Glue>;
			handles: IntrinsicElement<Handles>;
			hat: IntrinsicElement<Hat>;
			hiddensurfaceremovalasset: IntrinsicElement<HiddenSurfaceRemovalAsset>;
			highlight: IntrinsicElement<Highlight>;
			hingeconstraint: IntrinsicElement<HingeConstraint>;
			hole: IntrinsicElement<Hole>;
			humanoid: IntrinsicElement<Humanoid>;
			humanoidcontroller: IntrinsicElement<HumanoidController>;
			humanoiddescription: IntrinsicElement<HumanoidDescription>;
			imagebutton: IntrinsicElement<ImageButton>;
			imagehandleadornment: IntrinsicElement<ImageHandleAdornment>;
			imagelabel: IntrinsicElement<ImageLabel>;
			intconstrainedvalue: IntrinsicElement<IntConstrainedValue>;
			intvalue: IntrinsicElement<IntValue>;
			keyframe: IntrinsicElement<Keyframe>;
			keyframemarker: IntrinsicElement<KeyframeMarker>;
			keyframesequence: IntrinsicElement<KeyframeSequence>;
			linearvelocity: IntrinsicElement<LinearVelocity>;
			lineforce: IntrinsicElement<LineForce>;
			linehandleadornment: IntrinsicElement<LineHandleAdornment>;
			localizationtable: IntrinsicElement<LocalizationTable>;
			localscript: IntrinsicElement<LocalScript>;
			manualglue: IntrinsicElement<ManualGlue>;
			manualweld: IntrinsicElement<ManualWeld>;
			markercurve: IntrinsicElement<MarkerCurve>;
			materialvariant: IntrinsicElement<MaterialVariant>;
			meshpart: IntrinsicElement<MeshPart>;
			model: IntrinsicElement<Model>;
			modulescript: IntrinsicElement<ModuleScript>;
			motor: IntrinsicElement<Motor>;
			motor6d: IntrinsicElement<Motor6D>;
			motorfeature: IntrinsicElement<MotorFeature>;
			negateoperation: IntrinsicElement<NegateOperation>;
			nocollisionconstraint: IntrinsicElement<NoCollisionConstraint>;
			numberpose: IntrinsicElement<NumberPose>;
			numbervalue: IntrinsicElement<NumberValue>;
			objectvalue: IntrinsicElement<ObjectValue>;
			pants: IntrinsicElement<Pants>;
			part: IntrinsicElement<Part>;
			particleemitter: IntrinsicElement<ParticleEmitter>;
			partoperation: IntrinsicElement<PartOperation>;
			pathfindinglink: IntrinsicElement<PathfindingLink>;
			pathfindingmodifier: IntrinsicElement<PathfindingModifier>;
			pitchshiftsoundeffect: IntrinsicElement<PitchShiftSoundEffect>;
			plane: IntrinsicElement<Plane>;
			planeconstraint: IntrinsicElement<PlaneConstraint>;
			pointlight: IntrinsicElement<PointLight>;
			pose: IntrinsicElement<Pose>;
			prismaticconstraint: IntrinsicElement<PrismaticConstraint>;
			proximityprompt: IntrinsicElement<ProximityPrompt>;
			rayvalue: IntrinsicElement<RayValue>;
			remoteevent: IntrinsicElement<RemoteEvent>;
			remotefunction: IntrinsicElement<RemoteFunction>;
			reverbsoundeffect: IntrinsicElement<ReverbSoundEffect>;
			rigidconstraint: IntrinsicElement<RigidConstraint>;
			rocketpropulsion: IntrinsicElement<RocketPropulsion>;
			rodconstraint: IntrinsicElement<RodConstraint>;
			ropeconstraint: IntrinsicElement<RopeConstraint>;
			rotate: IntrinsicElement<Rotate>;
			rotatep: IntrinsicElement<RotateP>;
			rotatev: IntrinsicElement<RotateV>;
			rotationcurve: IntrinsicElement<RotationCurve>;
			screengui: IntrinsicElement<ScreenGui>;
			script: IntrinsicElement<Script>;
			scrollingframe: IntrinsicElement<ScrollingFrame>;
			seat: IntrinsicElement<Seat>;
			selectionbox: IntrinsicElement<SelectionBox>;
			selectionpartlasso: IntrinsicElement<SelectionPartLasso>;
			selectionpointlasso: IntrinsicElement<SelectionPointLasso>;
			selectionsphere: IntrinsicElement<SelectionSphere>;
			shirt: IntrinsicElement<Shirt>;
			shirtgraphic: IntrinsicElement<ShirtGraphic>;
			skateboardcontroller: IntrinsicElement<SkateboardController>;
			skateboardplatform: IntrinsicElement<SkateboardPlatform>;
			sky: IntrinsicElement<Sky>;
			smoke: IntrinsicElement<Smoke>;
			snap: IntrinsicElement<Snap>;
			sound: IntrinsicElement<Sound>;
			soundgroup: IntrinsicElement<SoundGroup>;
			sparkles: IntrinsicElement<Sparkles>;
			spawnlocation: IntrinsicElement<SpawnLocation>;
			speaker: IntrinsicElement<Speaker>;
			specialmesh: IntrinsicElement<SpecialMesh>;
			spherehandleadornment: IntrinsicElement<SphereHandleAdornment>;
			spotlight: IntrinsicElement<SpotLight>;
			springconstraint: IntrinsicElement<SpringConstraint>;
			startergear: IntrinsicElement<StarterGear>;
			stringvalue: IntrinsicElement<StringValue>;
			sunrayseffect: IntrinsicElement<SunRaysEffect>;
			surfaceappearance: IntrinsicElement<SurfaceAppearance>;
			surfacegui: IntrinsicElement<SurfaceGui>;
			surfacelight: IntrinsicElement<SurfaceLight>;
			surfaceselection: IntrinsicElement<SurfaceSelection>;
			team: IntrinsicElement<Team>;
			teleportoptions: IntrinsicElement<TeleportOptions>;
			terraindetail: IntrinsicElement<TerrainDetail>;
			terrainregion: IntrinsicElement<TerrainRegion>;
			textbox: IntrinsicElement<TextBox>;
			textbutton: IntrinsicElement<TextButton>;
			textchannel: IntrinsicElement<TextChannel>;
			textchatcommand: IntrinsicElement<TextChatCommand>;
			textchatmessageproperties: IntrinsicElement<TextChatMessageProperties>;
			textlabel: IntrinsicElement<TextLabel>;
			texture: IntrinsicElement<Texture>;
			tool: IntrinsicElement<Tool>;
			torque: IntrinsicElement<Torque>;
			torsionspringconstraint: IntrinsicElement<TorsionSpringConstraint>;
			trackerstreamanimation: IntrinsicElement<TrackerStreamAnimation>;
			trail: IntrinsicElement<Trail>;
			tremolosoundeffect: IntrinsicElement<TremoloSoundEffect>;
			trusspart: IntrinsicElement<TrussPart>;
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
			unionoperation: IntrinsicElement<UnionOperation>;
			universalconstraint: IntrinsicElement<UniversalConstraint>;
			vector3curve: IntrinsicElement<Vector3Curve>;
			vector3value: IntrinsicElement<Vector3Value>;
			vectorforce: IntrinsicElement<VectorForce>;
			vehiclecontroller: IntrinsicElement<VehicleController>;
			vehicleseat: IntrinsicElement<VehicleSeat>;
			velocitymotor: IntrinsicElement<VelocityMotor>;
			videoframe: IntrinsicElement<VideoFrame>;
			viewportframe: IntrinsicElement<ViewportFrame>;
			voicechannel: IntrinsicElement<VoiceChannel>;
			wedgepart: IntrinsicElement<WedgePart>;
			weld: IntrinsicElement<Weld>;
			weldconstraint: IntrinsicElement<WeldConstraint>;
			worldmodel: IntrinsicElement<WorldModel>;
			wraplayer: IntrinsicElement<WrapLayer>;
			wraptarget: IntrinsicElement<WrapTarget>;
		}
	}
}
