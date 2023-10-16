local Roact = require(script.Parent)

local createElement	= require(script.Parent.createElement)

local Change = require(script.Parent.PropMarkers.Change)
local Event = require(script.Parent.PropMarkers.Event)
local Ref = require(script.Parent.PropMarkers.Ref)

local Symbol = require(script.Parent.Symbol)
local Type = require(script.Parent.Type)

-- unlock
local metatable = getmetatable(Roact)
setmetatable(Roact, nil)

-- allow super(), but do nothing
Roact.Component.constructor = function() end

function Roact.ClassComponent(class)
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

local HOST_COMPONENT_NAME_MAPPING = {
	billboardgui = "BillboardGui",
	camera = "Camera",
	canvasgroup = "CanvasGroup",
	frame = "Frame",
	imagebutton = "ImageButton",
	imagelabel = "ImageLabel",
	screengui = "ScreenGui",
	scrollingframe = "ScrollingFrame",
	surfacegui = "SurfaceGui",
	textbox = "TextBox",
	textbutton = "TextButton",
	textlabel = "TextLabel",
	uiaspectratioconstraint = "UIAspectRatioConstraint",
	uicorner = "UICorner",
	uigradient = "UIGradient",
	uigridlayout = "UIGridLayout",
	uilistlayout = "UIListLayout",
	uipadding = "UIPadding",
	uipagelayout = "UIPageLayout",
	uiscale = "UIScale",
	uisizeconstraint = "UISizeConstraint",
	uistroke = "UIStroke",
	uitablelayout = "UITableLayout",
	uitextsizeconstraint = "UITextSizeConstraint",
	viewportframe = "ViewportFrame",
}

function Roact.jsx(component, props, children)
	local newChildren = {}
	if children then
		local i = 1
		for _, child in children do
			local key = child.props.Key
			if key then
				child.props.Key = nil
				newChildren[key] = child
			else
				newChildren[i] = child
				i += 1
			end
		end
	end

	if component == Roact.Fragment then
		return Roact.createFragment(newChildren)
	end

	component = HOST_COMPONENT_NAME_MAPPING[component] or component

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

	-- TODO: we don't know if this is a top-level component with Key?
	-- return Roact.createFragment({ [props.Key] = Roact.createElement(component, props, newChildren) })

	return Roact.createElement(component, props, newChildren)
end

-- relock
setmetatable(Roact, metatable)

return Roact
