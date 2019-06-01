Roact is a library that is natively supported by `roblox-ts`.

# Requirements
Roact requires you have the `@rbxts/roact` package installed.

This can be acheived by doing `npm i @rbxts/roact` on your project.

Roact can then be imported as such:
```ts
import * as Roact from "roact"; // this is the recommended way of doing it
```


# Basic Usage
Roact in `roblox-ts` has two ways of being written. There is the traditional typescript version and then also JSX (similar to React)

## Vanilla TypeScript
```ts
import * as Roact from "roact";
const Players = game.GetService("Players");
const LocalPlayer = Players.LocalPlayer!;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

const helloWorld = Roact.createElement("ScreenGui", {}, {
	HelloWorld: Roact.createElement("TextLabel", {
		Size: new UDim2(0, 400, 0, 300),
		Text: "Hello, Roact!",
	}),
});

Roact.mount(helloWorld, PlayerGui, "helloWorldGui");
```

## JSX TypeScript
Using the JSX version of Roact requires that the file end with `.tsx` instead of `.ts`.
```tsx
import * as Roact from "roact";
const Players = game.GetService("Players");
const LocalPlayer = Players.LocalPlayer!;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

const helloWorld = <screengui>
	<textlabel Key="HelloWorld" Size={new UDim2(0, 400, 0, 300)} Text="Hello, Roact!"/>
</screengui>;

Roact.mount(helloWorld, PlayerGui, "helloWorldGui");
```

# Creating a Component
Creating a component in `roblox-ts` for Roact is like creating another class in `roblox-ts`. The difference is, you inherit `Roact.Component` instead.

## Vanilla TypeScript
```tsx
import * as Roact from "roact";
const Players = game.GetService("Players");
const LocalPlayer = Players.LocalPlayer!;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

interface HelloWorldState { }
interface HelloWorldProps {
	name: string;
}
class HelloWorld extends Roact.Component<HelloWorldState, HelloWorldProps> {
	public render(): Roact.Element {
		return Roact.createElement("ScreenGui", {}, {
			HelloWorld: Roact.createElement("TextLabel", {
				Size: new UDim2(0, 400, 0, 300),
				Text: `Hello, ${this.props.name}!`,
			}),
		})
	}
}

Roact.mount(Roact.createElement(HelloWorld, {name: "Roact"}), PlayerGui, "helloWorldGui");
```

## JSX TypeScript
```tsx
import * as Roact from "roact";
const Players = game.GetService("Players");
const LocalPlayer = Players.LocalPlayer!;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

interface HelloWorldState { }
interface HelloWorldProps {
	name: string;
}
class HelloWorld extends Roact.Component<HelloWorldState, HelloWorldProps> {
	public render(): Roact.Element {
		return <screengui>
			<textlabel Key="HelloWorld" Size={new UDim2(0, 400, 0, 300)} Text={`Hello, ${this.props.name}!`}/>
		</screengui>;
	}
}

Roact.mount(<HelloWorld name="React"/>, PlayerGui, "helloWorldGui");
```


# State handling
Everything in https://roblox.github.io/roact/guide/state-and-lifecycle/ can be applied to our roact class as well.

```tsx
// ... import, PlayerGui, etc.

interface ClockState {
	currentTime: number;
}

interface ClockProps { }

class Clock extends Roact.Component<ClockState, ClockProps> {
	running: boolean = false;

	constructor(props: ClockProps) {
		super(props);

		// initialize the state of this component
		this.state = {
			currentTime: 0
		}
	}

	public render(): Roact.Element {
		const {currentTime} = this.state;
// JSX --------------
		return <screengui>
			<textlabel Key="TimeLabel"
				Size={new UDim2(1, 0, 1, 0)}
				Text={`Time Elapsed: ${currentTime}`} />
		</screengui>;
// Vanilla ----------
		return Roact.createElement("ScreenGui", {}, {
			TimeLabel: Roact.createElement("TextLabel", {
				Size: new UDim2(1, 0, 1, 0),
				Text: `Time Elapsed: ${currentTime}`,
			}),
		});
// ------------------
	}

	public didMount() {
		this.running = true;

		spawn(() => {
			while (this.running) {
				this.setState(state => {
					return {currentTime: state.currentTime + 1};
				});
			}
			wait(1);
		});
	}

	public willUnmount() {
		this.running = false;
	}
}

// Vanilla TypeScript
const handle = Roact.mount(Roact.createElement(Clock), PlayerGui, "Clock UI");
// JSX ---------------
const handle = Roact.mount(<Clock/>, PlayerGui, "Clock UI");
// -------------------

wait(10);
Roact.unmount(handle);
```