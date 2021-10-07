<div align="center"><img src="https://australis.dev/roact-tsx.png?v=3"/></div>
<h1 align="center">Roact-TS</h1>
<div align="center">
	<a href="https://roblox.github.io/roact">
		<img src="https://img.shields.io/badge/docs-lua-purple.svg" alt="Documentation"></img>
	</a>
	<a href="https://github.com/roblox-ts/roblox-ts">
		<img src="https://img.shields.io/badge/github-roblox_typescript-red.svg" alt="roblox-ts"></img>
	</a>
	<a href="https://roblox-ts.github.io/docs/roact/">
		<img src="https://img.shields.io/badge/docs-typescript-blue.svg" alt="Documentation"></img>
	</a>
	<a href="https://www.npmjs.com/package/@rbxts/roact">
		<img src="https://badge.fury.io/js/%40rbxts%2Froact.svg"></img>
	</a>
</div>

<div align="center">
	A typescript port of <a href='https://github.com/Roblox/roact'>Roact</a>, a declarative UI library inspired by <a href="https://reactjs.org">React</a>.
</div>

<div>&nbsp;</div>

## Installation
You can install it via `npm i @rbxts/roact`.

## Usage
For a detailed guide and examples, check out [the official Roact documentation](https://roblox.github.io/roact). The Wiki on this repository will have guides on how to adapt to using typescript instead of Lua.

## Required tsconfig.json settings
You will need the settings from [roblox-ts](https://github.com/roblox-ts/roblox-ts), as well as:
```json
{
	"compilerOptions": {
		"jsx": "react",
		"jsxFactory": "Roact.createElement"
	},
}
```

### Regular TypeScript
```typescript
import Roact from '@rbxts/roact';

const LocalPlayer = game.GetService("Players").LocalPlayer as Player;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

const tree = Roact.createElement("ScreenGui", {}, {
  Label: Roact.createElement("TextLabel", {
    Text: "Hello, World!",
    Size: new UDim2(1, 0, 1, 0)
  });
});

Roact.mount(tree, PlayerGui, "HelloWorld");
```


### JSX Typescript (.tsx files)
```tsx
import Roact from '@rbxts/roact';

const LocalPlayer = game.GetService("Players").LocalPlayer as Player;
const PlayerGui = LocalPlayer.FindFirstChildOfClass("PlayerGui");

const tree = <screengui>
  <textlabel Key="Label" Text="Hello, World!" Size={new UDim2(1, 0, 1, 0)}/>
</screengui>;

Roact.mount(tree, PlayerGui, "HelloWorld");
```

## License
The original Roact library's License can be found here: [Roact License](https://github.com/Roblox/roact/blob/master/LICENSE)
