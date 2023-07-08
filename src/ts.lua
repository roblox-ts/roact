local Roact = require(script.Parent)

local createElement	= require(script.Parent.createElement)

local Change = require(script.Parent.PropMarkers.Change)
local Event = require(script.Parent.PropMarkers.Event)
local Ref = require(script.Parent.PropMarkers.Ref)

local Symbol = require(script.Parent.Symbol)

-- unlock
local metatable = getmetatable(Roact)
setmetatable(Roact, nil)

-- allow super(), but do nothing
Roact.Component.constructor = function() end

function Roact.Componentify(class)
	local componentClass = Roact.Component:extend(tostring(class))
	setmetatable(class, nil)

	for key, value in class do
		-- need to use componentClass as __index
		if key == "__index" then
			continue
		end
		-- map constructor onto :init()
		if key == "constructor" then
			key = "init"
		end
		componentClass[key] = value
	end

	return componentClass
end

Roact.Fragment = Symbol.named("Roact.Fragment")

function Roact.jsx(component, props, children)
	if props ~= nil then
		if props.Change ~= nil then
			for key, value in props.Change do
				props[Change[key]] = value
			end
			props.Change = nil
		end

		if props.Event ~= nil then
			for key, value in props.Event do
				props[Event[key]] = value
			end
			props.Event = nil
		end

		if props.Ref ~= nil then
			props[Ref] = props.Ref
			props.Ref = nil
		end
	end

	if component == Roact.Fragment then
		return Roact.createFragment(children)
	else
		return Roact.createElement(component, props, children)
	end
end

-- relock
setmetatable(Roact, metatable)

return Roact
