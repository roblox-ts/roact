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
			accoutrement: IntrinsicElement<Accoutrement>;
			accessory: IntrinsicElement<Accessory>;
			hat: IntrinsicElement<Hat>;
			advanceddragger: IntrinsicElement<AdvancedDragger>;
			analyticsservice: IntrinsicElement<AnalyticsService>;
			animation: IntrinsicElement<Animation>;
			curveanimation: IntrinsicElement<CurveAnimation>;
			keyframesequence: IntrinsicElement<KeyframeSequence>;
			animationcontroller: IntrinsicElement<AnimationController>;
			animationrigdata: IntrinsicElement<AnimationRigData>;
			animator: IntrinsicElement<Animator>;
			atmosphere: IntrinsicElement<Atmosphere>;
			attachment: IntrinsicElement<Attachment>;
			bone: IntrinsicElement<Bone>;
			backpack: IntrinsicElement<Backpack>;
			hopperbin: IntrinsicElement<HopperBin>;
			tool: IntrinsicElement<Tool>;
			flag: IntrinsicElement<Flag>;
			wraplayer: IntrinsicElement<WrapLayer>;
			wraptarget: IntrinsicElement<WrapTarget>;
			beam: IntrinsicElement<Beam>;
			bindableevent: IntrinsicElement<BindableEvent>;
			bindablefunction: IntrinsicElement<BindableFunction>;
			bodyangularvelocity: IntrinsicElement<BodyAngularVelocity>;
			bodyforce: IntrinsicElement<BodyForce>;
			bodygyro: IntrinsicElement<BodyGyro>;
			bodyposition: IntrinsicElement<BodyPosition>;
			bodythrust: IntrinsicElement<BodyThrust>;
			bodyvelocity: IntrinsicElement<BodyVelocity>;
			rocketpropulsion: IntrinsicElement<RocketPropulsion>;
			breakpoint: IntrinsicElement<Breakpoint>;
			camera: IntrinsicElement<Camera>;
			bodycolors: IntrinsicElement<BodyColors>;
			charactermesh: IntrinsicElement<CharacterMesh>;
			pants: IntrinsicElement<Pants>;
			shirt: IntrinsicElement<Shirt>;
			shirtgraphic: IntrinsicElement<ShirtGraphic>;
			skin: IntrinsicElement<Skin>;
			clickdetector: IntrinsicElement<ClickDetector>;
			clouds: IntrinsicElement<Clouds>;
			configuration: IntrinsicElement<Configuration>;
			alignorientation: IntrinsicElement<AlignOrientation>;
			alignposition: IntrinsicElement<AlignPosition>;
			angularvelocity: IntrinsicElement<AngularVelocity>;
			ballsocketconstraint: IntrinsicElement<BallSocketConstraint>;
			hingeconstraint: IntrinsicElement<HingeConstraint>;
			lineforce: IntrinsicElement<LineForce>;
			linearvelocity: IntrinsicElement<LinearVelocity>;
			planeconstraint: IntrinsicElement<PlaneConstraint>;
			plane: IntrinsicElement<Plane>;
			rigidconstraint: IntrinsicElement<RigidConstraint>;
			rodconstraint: IntrinsicElement<RodConstraint>;
			ropeconstraint: IntrinsicElement<RopeConstraint>;
			cylindricalconstraint: IntrinsicElement<CylindricalConstraint>;
			prismaticconstraint: IntrinsicElement<PrismaticConstraint>;
			springconstraint: IntrinsicElement<SpringConstraint>;
			torque: IntrinsicElement<Torque>;
			torsionspringconstraint: IntrinsicElement<TorsionSpringConstraint>;
			universalconstraint: IntrinsicElement<UniversalConstraint>;
			vectorforce: IntrinsicElement<VectorForce>;
			humanoidcontroller: IntrinsicElement<HumanoidController>;
			skateboardcontroller: IntrinsicElement<SkateboardController>;
			vehiclecontroller: IntrinsicElement<VehicleController>;
			aircontroller: IntrinsicElement<AirController>;
			climbcontroller: IntrinsicElement<ClimbController>;
			groundcontroller: IntrinsicElement<GroundController>;
			swimcontroller: IntrinsicElement<SwimController>;
			controllermanager: IntrinsicElement<ControllerManager>;
			customevent: IntrinsicElement<CustomEvent>;
			customeventreceiver: IntrinsicElement<CustomEventReceiver>;
			blockmesh: IntrinsicElement<BlockMesh>;
			cylindermesh: IntrinsicElement<CylinderMesh>;
			filemesh: IntrinsicElement<FileMesh>;
			specialmesh: IntrinsicElement<SpecialMesh>;
			datastoreincrementoptions: IntrinsicElement<DataStoreIncrementOptions>;
			datastoreoptions: IntrinsicElement<DataStoreOptions>;
			datastoresetoptions: IntrinsicElement<DataStoreSetOptions>;
			debuggerwatch: IntrinsicElement<DebuggerWatch>;
			dialog: IntrinsicElement<Dialog>;
			dialogchoice: IntrinsicElement<DialogChoice>;
			dragger: IntrinsicElement<Dragger>;
			eulerrotationcurve: IntrinsicElement<EulerRotationCurve>;
			explosion: IntrinsicElement<Explosion>;
			facecontrols: IntrinsicElement<FaceControls>;
			decal: IntrinsicElement<Decal>;
			texture: IntrinsicElement<Texture>;
			hole: IntrinsicElement<Hole>;
			motorfeature: IntrinsicElement<MotorFeature>;
			fire: IntrinsicElement<Fire>;
			floatcurve: IntrinsicElement<FloatCurve>;
			flyweightservice: IntrinsicElement<FlyweightService>;
			csgdictionaryservice: IntrinsicElement<CSGDictionaryService>;
			nonreplicatedcsgdictionaryservice: IntrinsicElement<NonReplicatedCSGDictionaryService>;
			folder: IntrinsicElement<Folder>;
			forcefield: IntrinsicElement<ForceField>;
			functionaltest: IntrinsicElement<FunctionalTest>;
			gettextboundsparams: IntrinsicElement<GetTextBoundsParams>;
			canvasgroup: IntrinsicElement<CanvasGroup>;
			frame: IntrinsicElement<Frame>;
			imagebutton: IntrinsicElement<ImageButton>;
			textbutton: IntrinsicElement<TextButton>;
			imagelabel: IntrinsicElement<ImageLabel>;
			textlabel: IntrinsicElement<TextLabel>;
			scrollingframe: IntrinsicElement<ScrollingFrame>;
			textbox: IntrinsicElement<TextBox>;
			videoframe: IntrinsicElement<VideoFrame>;
			viewportframe: IntrinsicElement<ViewportFrame>;
			billboardgui: IntrinsicElement<BillboardGui>;
			screengui: IntrinsicElement<ScreenGui>;
			guimain: IntrinsicElement<GuiMain>;
			surfacegui: IntrinsicElement<SurfaceGui>;
			floorwire: IntrinsicElement<FloorWire>;
			selectionbox: IntrinsicElement<SelectionBox>;
			boxhandleadornment: IntrinsicElement<BoxHandleAdornment>;
			conehandleadornment: IntrinsicElement<ConeHandleAdornment>;
			cylinderhandleadornment: IntrinsicElement<CylinderHandleAdornment>;
			imagehandleadornment: IntrinsicElement<ImageHandleAdornment>;
			linehandleadornment: IntrinsicElement<LineHandleAdornment>;
			spherehandleadornment: IntrinsicElement<SphereHandleAdornment>;
			wireframehandleadornment: IntrinsicElement<WireframeHandleAdornment>;
			parabolaadornment: IntrinsicElement<ParabolaAdornment>;
			selectionsphere: IntrinsicElement<SelectionSphere>;
			archandles: IntrinsicElement<ArcHandles>;
			handles: IntrinsicElement<Handles>;
			surfaceselection: IntrinsicElement<SurfaceSelection>;
			selectionpartlasso: IntrinsicElement<SelectionPartLasso>;
			selectionpointlasso: IntrinsicElement<SelectionPointLasso>;
			heightmapimporterservice: IntrinsicElement<HeightmapImporterService>;
			hiddensurfaceremovalasset: IntrinsicElement<HiddenSurfaceRemovalAsset>;
			highlight: IntrinsicElement<Highlight>;
			humanoid: IntrinsicElement<Humanoid>;
			humanoiddescription: IntrinsicElement<HumanoidDescription>;
			rotatep: IntrinsicElement<RotateP>;
			rotatev: IntrinsicElement<RotateV>;
			glue: IntrinsicElement<Glue>;
			manualglue: IntrinsicElement<ManualGlue>;
			manualweld: IntrinsicElement<ManualWeld>;
			motor: IntrinsicElement<Motor>;
			motor6d: IntrinsicElement<Motor6D>;
			rotate: IntrinsicElement<Rotate>;
			snap: IntrinsicElement<Snap>;
			velocitymotor: IntrinsicElement<VelocityMotor>;
			weld: IntrinsicElement<Weld>;
			keyframe: IntrinsicElement<Keyframe>;
			keyframemarker: IntrinsicElement<KeyframeMarker>;
			pointlight: IntrinsicElement<PointLight>;
			spotlight: IntrinsicElement<SpotLight>;
			surfacelight: IntrinsicElement<SurfaceLight>;
			localizationtable: IntrinsicElement<LocalizationTable>;
			script: IntrinsicElement<Script>;
			localscript: IntrinsicElement<LocalScript>;
			modulescript: IntrinsicElement<ModuleScript>;
			markercurve: IntrinsicElement<MarkerCurve>;
			materialvariant: IntrinsicElement<MaterialVariant>;
			memorystoreservice: IntrinsicElement<MemoryStoreService>;
			message: IntrinsicElement<Message>;
			hint: IntrinsicElement<Hint>;
			nocollisionconstraint: IntrinsicElement<NoCollisionConstraint>;
			cornerwedgepart: IntrinsicElement<CornerWedgePart>;
			part: IntrinsicElement<Part>;
			flagstand: IntrinsicElement<FlagStand>;
			seat: IntrinsicElement<Seat>;
			skateboardplatform: IntrinsicElement<SkateboardPlatform>;
			spawnlocation: IntrinsicElement<SpawnLocation>;
			wedgepart: IntrinsicElement<WedgePart>;
			meshpart: IntrinsicElement<MeshPart>;
			partoperation: IntrinsicElement<PartOperation>;
			negateoperation: IntrinsicElement<NegateOperation>;
			unionoperation: IntrinsicElement<UnionOperation>;
			trusspart: IntrinsicElement<TrussPart>;
			vehicleseat: IntrinsicElement<VehicleSeat>;
			model: IntrinsicElement<Model>;
			actor: IntrinsicElement<Actor>;
			worldmodel: IntrinsicElement<WorldModel>;
			partoperationasset: IntrinsicElement<PartOperationAsset>;
			particleemitter: IntrinsicElement<ParticleEmitter>;
			pathfindinglink: IntrinsicElement<PathfindingLink>;
			pathfindingmodifier: IntrinsicElement<PathfindingModifier>;
			player: IntrinsicElement<Player>;
			pluginaction: IntrinsicElement<PluginAction>;
			numberpose: IntrinsicElement<NumberPose>;
			pose: IntrinsicElement<Pose>;
			bloomeffect: IntrinsicElement<BloomEffect>;
			blureffect: IntrinsicElement<BlurEffect>;
			colorcorrectioneffect: IntrinsicElement<ColorCorrectionEffect>;
			depthoffieldeffect: IntrinsicElement<DepthOfFieldEffect>;
			sunrayseffect: IntrinsicElement<SunRaysEffect>;
			proximityprompt: IntrinsicElement<ProximityPrompt>;
			proximitypromptservice: IntrinsicElement<ProximityPromptService>;
			reflectionmetadata: IntrinsicElement<ReflectionMetadata>;
			reflectionmetadatacallbacks: IntrinsicElement<ReflectionMetadataCallbacks>;
			reflectionmetadataclasses: IntrinsicElement<ReflectionMetadataClasses>;
			reflectionmetadataenums: IntrinsicElement<ReflectionMetadataEnums>;
			reflectionmetadataevents: IntrinsicElement<ReflectionMetadataEvents>;
			reflectionmetadatafunctions: IntrinsicElement<ReflectionMetadataFunctions>;
			reflectionmetadataclass: IntrinsicElement<ReflectionMetadataClass>;
			reflectionmetadataenum: IntrinsicElement<ReflectionMetadataEnum>;
			reflectionmetadataenumitem: IntrinsicElement<ReflectionMetadataEnumItem>;
			reflectionmetadatamember: IntrinsicElement<ReflectionMetadataMember>;
			reflectionmetadataproperties: IntrinsicElement<ReflectionMetadataProperties>;
			reflectionmetadatayieldfunctions: IntrinsicElement<ReflectionMetadataYieldFunctions>;
			remoteevent: IntrinsicElement<RemoteEvent>;
			remotefunction: IntrinsicElement<RemoteFunction>;
			renderingtest: IntrinsicElement<RenderingTest>;
			rotationcurve: IntrinsicElement<RotationCurve>;
			sky: IntrinsicElement<Sky>;
			smoke: IntrinsicElement<Smoke>;
			sound: IntrinsicElement<Sound>;
			chorussoundeffect: IntrinsicElement<ChorusSoundEffect>;
			compressorsoundeffect: IntrinsicElement<CompressorSoundEffect>;
			channelselectorsoundeffect: IntrinsicElement<ChannelSelectorSoundEffect>;
			distortionsoundeffect: IntrinsicElement<DistortionSoundEffect>;
			echosoundeffect: IntrinsicElement<EchoSoundEffect>;
			equalizersoundeffect: IntrinsicElement<EqualizerSoundEffect>;
			flangesoundeffect: IntrinsicElement<FlangeSoundEffect>;
			pitchshiftsoundeffect: IntrinsicElement<PitchShiftSoundEffect>;
			reverbsoundeffect: IntrinsicElement<ReverbSoundEffect>;
			tremolosoundeffect: IntrinsicElement<TremoloSoundEffect>;
			soundgroup: IntrinsicElement<SoundGroup>;
			sparkles: IntrinsicElement<Sparkles>;
			speaker: IntrinsicElement<Speaker>;
			standalonepluginscripts: IntrinsicElement<StandalonePluginScripts>;
			startergear: IntrinsicElement<StarterGear>;
			surfaceappearance: IntrinsicElement<SurfaceAppearance>;
			team: IntrinsicElement<Team>;
			teleportoptions: IntrinsicElement<TeleportOptions>;
			terraindetail: IntrinsicElement<TerrainDetail>;
			terrainregion: IntrinsicElement<TerrainRegion>;
			testservice: IntrinsicElement<TestService>;
			textchannel: IntrinsicElement<TextChannel>;
			textchatcommand: IntrinsicElement<TextChatCommand>;
			textchatmessageproperties: IntrinsicElement<TextChatMessageProperties>;
			trackerstreamanimation: IntrinsicElement<TrackerStreamAnimation>;
			trail: IntrinsicElement<Trail>;
			tween: IntrinsicElement<Tween>;
			uiaspectratioconstraint: IntrinsicElement<UIAspectRatioConstraint>;
			uisizeconstraint: IntrinsicElement<UISizeConstraint>;
			uitextsizeconstraint: IntrinsicElement<UITextSizeConstraint>;
			uicorner: IntrinsicElement<UICorner>;
			uigradient: IntrinsicElement<UIGradient>;
			uigridlayout: IntrinsicElement<UIGridLayout>;
			uilistlayout: IntrinsicElement<UIListLayout>;
			uipagelayout: IntrinsicElement<UIPageLayout>;
			uitablelayout: IntrinsicElement<UITableLayout>;
			uipadding: IntrinsicElement<UIPadding>;
			uiscale: IntrinsicElement<UIScale>;
			uistroke: IntrinsicElement<UIStroke>;
			binarystringvalue: IntrinsicElement<BinaryStringValue>;
			boolvalue: IntrinsicElement<BoolValue>;
			brickcolorvalue: IntrinsicElement<BrickColorValue>;
			cframevalue: IntrinsicElement<CFrameValue>;
			color3value: IntrinsicElement<Color3Value>;
			doubleconstrainedvalue: IntrinsicElement<DoubleConstrainedValue>;
			intconstrainedvalue: IntrinsicElement<IntConstrainedValue>;
			intvalue: IntrinsicElement<IntValue>;
			numbervalue: IntrinsicElement<NumberValue>;
			objectvalue: IntrinsicElement<ObjectValue>;
			rayvalue: IntrinsicElement<RayValue>;
			stringvalue: IntrinsicElement<StringValue>;
			vector3value: IntrinsicElement<Vector3Value>;
			vector3curve: IntrinsicElement<Vector3Curve>;
			virtualinputmanager: IntrinsicElement<VirtualInputManager>;
			voicechannel: IntrinsicElement<VoiceChannel>;
			weldconstraint: IntrinsicElement<WeldConstraint>;
		}
	}
}
