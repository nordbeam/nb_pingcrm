import * as React$1 from "react";
import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Link, createInertiaApp, router, router as router$1 } from "@inertiajs/react";
import { useForm } from "@nordbeam/nb-inertia/react/useForm";
import { Head } from "@nordbeam/nb-inertia/react/Head";
import { ClientModalLink, ModalStackProvider, usePage } from "@nordbeam/nb-inertia/react/modals";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle, ArrowUpRight, BarChart3, Building2, Calendar, Check, CheckCircle, CheckIcon, ChevronDownIcon, ChevronLeft, ChevronRight, ChevronRightIcon, ChevronUpIcon, ChevronsUpDown, CircleDot, Clock, Eye, Filter, Home, Info, Loader2, Lock, LogOut, Mail, MapPin, MoreHorizontal, PanelLeftIcon, Pencil, Plus, RefreshCw, RotateCcw, Search, SearchIcon, Settings, Sparkles, Trash2, TrendingUp, User, UserPlus, Users, X, XCircle, XIcon } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { createSocket, useChannel, useChannelProps, usePresence } from "@nordbeam/nb-inertia/react/realtime";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { formatDistanceToNow } from "date-fns";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
var __defProp = Object.defineProperty;
var __export = (all, symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Root, {
		"data-slot": "sheet",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Portal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Overlay, {
		"data-slot": "sheet-overlay",
		className: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(SheetPrimitive.Content, {
		"data-slot": "sheet-content",
		className: cn("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col shadow-2xl transition ease-out data-[state=closed]:duration-200 data-[state=open]:duration-300", side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-full sm:w-[480px] sm:max-w-[480px]", side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-full sm:w-[480px] sm:max-w-[480px]", side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto", side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ jsxs(SheetPrimitive.Close, {
			className: "absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground/60 transition-colors hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
			children: [/* @__PURE__ */ jsx(XIcon, { className: "size-4" }), /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-1.5 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Title, {
		"data-slot": "sheet-title",
		className: cn("text-foreground font-semibold", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ jsx(SheetPrimitive.Description, {
		"data-slot": "sheet-description",
		className: cn("text-muted-foreground text-sm", className),
		...props
	});
}
function Logo({ className, iconOnly = false, variant = "auto" }) {
	const containerClasses = cn("inline-flex items-center gap-2.5", className);
	const textClasses = cn("text-[15px] font-semibold tracking-tight", {
		"text-white": variant === "dark",
		"text-foreground": variant === "light"
	});
	return /* @__PURE__ */ jsxs("span", {
		className: containerClasses,
		children: [/* @__PURE__ */ jsx(LogoIcon, { className: cn("h-6 w-6", {
			"text-white": variant === "dark",
			"text-primary": variant === "light" || variant === "auto"
		}) }), !iconOnly && /* @__PURE__ */ jsx("span", {
			className: textClasses,
			children: "PingCRM"
		})]
	});
}
function LogoIcon({ className }) {
	return /* @__PURE__ */ jsxs("svg", {
		className: cn("h-6 w-6", className),
		viewBox: "0 0 24 24",
		fill: "none",
		children: [
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeOpacity: "0.2"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "6",
				stroke: "currentColor",
				strokeWidth: "1.5",
				strokeOpacity: "0.4"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "2.5",
				fill: "currentColor"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "18",
				cy: "6",
				r: "2",
				fill: "currentColor",
				fillOpacity: "0.8"
			})
		]
	});
}
function route(pattern, defaultMethod) {
	const buildUrl = (params, options) => {
		let url = pattern;
		if (params != null) {
			const normalized = normalizeParams(pattern, params);
			for (const [key, value] of Object.entries(normalized)) if (value != null) url = url.replace(`:${key}`, encodeURIComponent(String(value)));
		}
		url = url.replace(/\(\/:[^)]+\)/g, "").replace(/\/+$/, "") || "/";
		if (options?.query) {
			const search = new URLSearchParams();
			for (const [k, v] of Object.entries(options.query)) if (v != null) search.set(k, String(v));
			const qs = search.toString();
			if (qs) url += "?" + qs;
		}
		if (options?.anchor) url += "#" + options.anchor;
		return url;
	};
	const buildForm = (method, params, options) => {
		const needsSpoof = method !== "get" && method !== "post";
		return {
			action: buildUrl(params, needsSpoof ? {
				...options,
				query: {
					...options?.query,
					_method: method.toUpperCase()
				}
			} : options),
			method: needsSpoof ? "post" : method
		};
	};
	const fn = (params, options) => ({
		url: buildUrl(params, options),
		method: defaultMethod
	});
	fn.url = buildUrl;
	fn.get = (p, o) => ({
		url: buildUrl(p, o),
		method: "get"
	});
	fn.post = (p, o) => ({
		url: buildUrl(p, o),
		method: "post"
	});
	fn.patch = (p, o) => ({
		url: buildUrl(p, o),
		method: "patch"
	});
	fn.put = (p, o) => ({
		url: buildUrl(p, o),
		method: "put"
	});
	fn.delete = (p, o) => ({
		url: buildUrl(p, o),
		method: "delete"
	});
	fn.form = Object.assign((p, o) => buildForm(defaultMethod, p, o), {
		patch: (p, o) => buildForm("patch", p, o),
		put: (p, o) => buildForm("put", p, o),
		delete: (p, o) => buildForm("delete", p, o)
	});
	fn.pattern = pattern;
	fn.defaultMethod = defaultMethod;
	return fn;
}
function normalizeParams(pattern, params) {
	if (typeof params === "string" || typeof params === "number") return { [pattern.match(/:(\w+)/)?.[1] ?? "id"]: params };
	if (typeof params === "object" && params !== null) {
		const obj = params;
		const result = {};
		const paramNames = pattern.match(/:\w+/g)?.map((p) => p.slice(1)) ?? [];
		for (const name of paramNames) if (name in obj) {
			const val = obj[name];
			result[name] = typeof val === "object" && val && "id" in val ? val.id : val;
		} else if ("id" in obj && paramNames.length === 1) result[name] = obj.id;
		return result;
	}
	return {};
}
const contacts = {
	index: route("/contacts", "get"),
	new: route("/contacts/create", "get"),
	create: route("/contacts", "post"),
	edit: route("/contacts/:id/edit", "get"),
	update: route("/contacts/:id", "put"),
	delete: route("/contacts/:id", "delete"),
	restore: route("/contacts/:id/restore", "put")
};
route("/dev/dashboard/css-:md5", "get");
route("/dev/dashboard/js-:md5", "get");
const organizations = {
	index: route("/organizations", "get"),
	new: route("/organizations/create", "get"),
	create: route("/organizations", "post"),
	edit: route("/organizations/:id/edit", "get"),
	update: route("/organizations/:id", "put"),
	delete: route("/organizations/:id", "delete"),
	restore: route("/organizations/:id/restore", "put")
};
route("/", "get");
const user_registrations = {
	new: route("/users/register", "get"),
	create: route("/users/register", "post")
};
const user_sessions = {
	new: route("/users/log-in", "get"),
	create: route("/users/log-in", "post"),
	delete: route("/users/log-out", "delete"),
	confirm: route("/users/log-in/:token", "get")
};
route("/users/settings", "get");
route("/users/settings/confirm-email/:token", "get");
route("/users/settings", "put");
const users = {
	index: route("/users", "get"),
	new: route("/users/create", "get"),
	create: route("/users", "post"),
	edit: route("/users/:id/edit", "get"),
	update: route("/users/:id", "put"),
	delete: route("/users/:id", "delete"),
	restore: route("/users/:id/restore", "put")
};
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = React$1.useState(void 0);
	React$1.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
			destructive: "bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/95",
			outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
			ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-6",
			icon: "h-9 w-9",
			"icon-sm": "h-8 w-8",
			"icon-lg": "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ jsx("input", {
		type,
		"data-slot": "input",
		className: cn("h-9 w-full min-w-0 rounded-md border border-border bg-card px-3 py-1 text-sm text-foreground", "placeholder:text-muted-foreground", "outline-none transition-colors", "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/10", "selection:bg-primary/20", "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground", "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted", "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/10", className),
		...props
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton",
		className: cn("bg-accent animate-pulse rounded-md", className),
		...props
	});
}
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, {
		"data-slot": "tooltip",
		...props
	}) });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(TooltipPrimitive.Content, {
		"data-slot": "tooltip-content",
		sideOffset,
		className: cn("bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })]
	}) });
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React$1.createContext(null);
function useSidebar() {
	const context = React$1.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React$1.useState(false);
	const [_open, _setOpen] = React$1.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React$1.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = React$1.useCallback(() => {
		return isMobile ? setOpenMobile((open$1) => !open$1) : setOpen((open$1) => !open$1);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	React$1.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = React$1.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ jsx(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ jsx("div", {
				"data-slot": "sidebar-wrapper",
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", className),
				...props,
				children
			})
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar",
		className: cn("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ jsx(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ jsxs(SheetContent, {
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ jsxs(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "group peer text-sidebar-foreground hidden md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ jsx("div", {
			"data-slot": "sidebar-gap",
			className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ jsx("div", {
			"data-slot": "sidebar-container",
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ jsx("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
				children
			})
		})]
	});
}
function SidebarTrigger({ className, onClick, ...props }) {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ jsxs(Button, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon",
		className: cn("size-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ jsx(PanelLeftIcon, {}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function SidebarRail({ className, ...props }) {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ jsx("button", {
		"data-sidebar": "rail",
		"data-slot": "sidebar-rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex", "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	});
}
function SidebarInset({ className, ...props }) {
	return /* @__PURE__ */ jsx("main", {
		"data-slot": "sidebar-inset",
		className: cn("bg-background relative flex w-full flex-1 flex-col", "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2", className),
		...props
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
}
function SidebarGroupContent({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: cn("w-full text-sm", className),
		...props
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ jsx("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("flex w-full min-w-0 flex-col gap-1", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ jsx("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();
	const button = /* @__PURE__ */ jsx(Comp, {
		"data-slot": "sidebar-menu-button",
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive,
		className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className),
		...props
	});
	if (!tooltip) return button;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ jsxs(Tooltip, { children: [/* @__PURE__ */ jsx(TooltipTrigger, {
		asChild: true,
		children: button
	}), /* @__PURE__ */ jsx(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
		"data-slot": "dropdown-menu-content",
		sideOffset,
		className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("bg-border -mx-1 my-1 h-px", className),
		...props
	});
}
function DropdownMenuSub({ ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Sub, {
		"data-slot": "dropdown-menu-sub",
		...props
	});
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
	return /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": inset,
		className: cn("focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto size-4" })]
	});
}
function DropdownMenuSubContent({ className, ...props }) {
	return /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
		"data-slot": "dropdown-menu-sub-content",
		className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg", className),
		...props
	});
}
var mainNav = [
	{
		name: "Dashboard",
		href: "/",
		icon: Home
	},
	{
		name: "Organizations",
		href: "/organizations",
		icon: Building2
	},
	{
		name: "Contacts",
		href: "/contacts",
		icon: Users
	},
	{
		name: "Users",
		href: "/users",
		icon: User
	},
	{
		name: "Reports",
		href: "/reports",
		icon: BarChart3
	}
];
function AppSidebar() {
	const { props, url } = usePage();
	const { user, account } = props;
	const { state } = useSidebar();
	return /* @__PURE__ */ jsxs(Sidebar, {
		collapsible: "icon",
		children: [
			/* @__PURE__ */ jsxs(SidebarHeader, {
				className: "border-b border-sidebar-border",
				children: [/* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, {
					size: "lg",
					asChild: true,
					className: "group-data-[collapsible=icon]:!p-0",
					children: /* @__PURE__ */ jsx(Link, {
						href: "/",
						children: state === "collapsed" ? /* @__PURE__ */ jsx(LogoIcon, { className: "h-5 w-5 text-primary" }) : /* @__PURE__ */ jsx(Logo, { variant: "light" })
					})
				}) }) }), account && /* @__PURE__ */ jsx(SidebarMenu, {
					className: "group-data-[collapsible=icon]:hidden",
					children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(SidebarMenuButton, {
						className: "w-full",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-semibold text-primary",
								children: account.name?.[0]?.toUpperCase()
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex-1 truncate text-left font-medium",
								children: account.name
							}),
							/* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-4 w-4 text-sidebar-foreground/50" })
						]
					}) })
				})]
			}),
			/* @__PURE__ */ jsx(SidebarContent, { children: /* @__PURE__ */ jsx(SidebarGroup, { children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: mainNav.map((item) => {
				const isActive = item.href === "/" ? url === "/" : url.startsWith(item.href);
				return /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, {
					asChild: true,
					isActive,
					tooltip: item.name,
					children: /* @__PURE__ */ jsxs(Link, {
						href: item.href,
						children: [/* @__PURE__ */ jsx(item.icon, { className: isActive ? "text-primary" : "" }), /* @__PURE__ */ jsx("span", { children: item.name })]
					})
				}) }, item.name);
			}) }) }) }) }),
			/* @__PURE__ */ jsx(SidebarFooter, {
				className: "border-t border-sidebar-border",
				children: user && /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ jsxs(SidebarMenuButton, {
						size: "lg",
						tooltip: user.name,
						children: [
							user.photo ? /* @__PURE__ */ jsx("img", {
								src: user.photo,
								alt: "",
								className: "h-6 w-6 rounded-full object-cover"
							}) : /* @__PURE__ */ jsxs("span", {
								className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary",
								children: [user.firstName?.[0], user.lastName?.[0]]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex-1 truncate text-left font-medium",
								children: user.name
							}),
							/* @__PURE__ */ jsx(ChevronsUpDown, { className: "h-4 w-4 text-sidebar-foreground/50" })
						]
					})
				}), /* @__PURE__ */ jsxs(DropdownMenuContent, {
					side: "top",
					align: "start",
					className: "w-[--radix-popper-anchor-width]",
					children: [
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								href: "/users/settings",
								className: "cursor-pointer",
								children: [/* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }), "My Profile"]
							})
						}),
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								href: "/users",
								className: "cursor-pointer",
								children: [/* @__PURE__ */ jsx(Users, { className: "mr-2 h-4 w-4" }), "Manage Users"]
							})
						}),
						/* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
						/* @__PURE__ */ jsx(DropdownMenuItem, {
							asChild: true,
							children: /* @__PURE__ */ jsxs(Link, {
								href: user_sessions.delete(),
								className: "cursor-pointer",
								children: [/* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }), "Sign out"]
							})
						})
					]
				})] }) }) })
			}),
			/* @__PURE__ */ jsx(SidebarRail, {})
		]
	});
}
function AppLayout({ children }) {
	const { props } = usePage();
	const { flash } = props;
	return /* @__PURE__ */ jsxs(SidebarProvider, { children: [/* @__PURE__ */ jsx(AppSidebar, {}), /* @__PURE__ */ jsxs(SidebarInset, { children: [
		/* @__PURE__ */ jsxs("header", {
			className: "flex h-12 items-center gap-2 border-b border-border bg-background px-4 md:hidden",
			children: [
				/* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1" }),
				/* @__PURE__ */ jsx("div", { className: "h-4 w-px bg-border" }),
				/* @__PURE__ */ jsx(Link, {
					href: "/",
					className: "flex items-center",
					children: /* @__PURE__ */ jsx(LogoIcon, { className: "h-5 w-5 text-primary" })
				})
			]
		}),
		/* @__PURE__ */ jsx(FlashMessages, { flash }),
		/* @__PURE__ */ jsx("main", {
			className: "flex-1 overflow-y-auto",
			children
		})
	] })] });
}
function FlashMessages({ flash }) {
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		if (flash && Object.keys(flash).length > 0) {
			setVisible(true);
			const timer = setTimeout(() => setVisible(false), 5e3);
			return () => clearTimeout(timer);
		}
	}, [flash]);
	if (!flash || Object.keys(flash).length === 0 || !visible) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "px-6 pt-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl space-y-2",
			children: [
				flash.success && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800",
					children: [
						/* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 shrink-0 text-emerald-500" }),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1",
							children: flash.success
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setVisible(false),
							className: "text-emerald-600 hover:text-emerald-800",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})
					]
				}),
				flash.error && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800",
					children: [
						/* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4 shrink-0 text-red-500" }),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1",
							children: flash.error
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setVisible(false),
							className: "text-red-600 hover:text-red-800",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})
					]
				}),
				flash.info && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
					children: [
						/* @__PURE__ */ jsx(Info, { className: "h-4 w-4 shrink-0 text-blue-500" }),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1",
							children: flash.info
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setVisible(false),
							className: "text-blue-600 hover:text-blue-800",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})
					]
				}),
				flash.warning && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800",
					children: [
						/* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 shrink-0 text-amber-500" }),
						/* @__PURE__ */ jsx("span", {
							className: "flex-1",
							children: flash.warning
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setVisible(false),
							className: "text-amber-600 hover:text-amber-800",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})
					]
				})
			]
		})
	});
}
function GuestLayout({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-gray-100",
		children
	});
}
var Login_exports = /* @__PURE__ */ __export({ default: () => Login }, 1);
function Login() {
	const { props } = usePage();
	const { flash } = props;
	const [loginMethod, setLoginMethod] = useState("password");
	const passwordForm = useForm({
		email: "",
		password: "",
		remember: false
	}, user_sessions.create());
	const magicForm = useForm({ email: "" }, {
		url: "/users/magic-link",
		method: "post"
	});
	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		passwordForm.transform((data) => ({ user: data }));
		passwordForm.submit({ onFinish: () => passwordForm.reset("password") });
	};
	const handleMagicSubmit = (e) => {
		e.preventDefault();
		magicForm.transform((data) => ({ user: data }));
		magicForm.submit();
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Sign In" }), /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" }),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute inset-0 opacity-10",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full" }),
						/* @__PURE__ */ jsx("div", { className: "absolute top-40 left-40 w-48 h-48 border border-white/20 rounded-full" }),
						/* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 w-80 h-80 border border-white/20 rounded-full" }),
						/* @__PURE__ */ jsx("div", { className: "absolute bottom-48 right-40 w-56 h-56 border border-white/20 rounded-full" })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col justify-between p-12 text-white",
					children: [
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, {
							href: "/",
							children: /* @__PURE__ */ jsx(Logo, { variant: "dark" })
						}) }),
						/* @__PURE__ */ jsxs("div", {
							className: "max-w-sm",
							children: [/* @__PURE__ */ jsx("h1", {
								className: "text-3xl font-semibold leading-tight tracking-tight mb-4",
								children: "Manage relationships with clarity"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-white/70 leading-relaxed",
								children: "A modern CRM built for teams who value simplicity without sacrificing power."
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-sm text-white/50",
							children: "Trusted by growing teams worldwide"
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex flex-col justify-center px-6 py-12 lg:px-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-full max-w-sm",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "lg:hidden mb-8",
						children: /* @__PURE__ */ jsx(Link, {
							href: "/",
							children: /* @__PURE__ */ jsx(Logo, { variant: "light" })
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold text-foreground",
							children: "Welcome back"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Don't have an account?",
								" ",
								/* @__PURE__ */ jsx(Link, {
									href: "/users/register",
									className: "font-medium text-primary hover:text-primary/80 transition-colors",
									children: "Create one"
								})
							]
						})]
					}),
					flash?.info && /* @__PURE__ */ jsx("div", {
						className: "mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800",
						children: flash.info
					}),
					flash?.error && /* @__PURE__ */ jsx("div", {
						className: "mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800",
						children: flash.error
					}),
					flash?.success && /* @__PURE__ */ jsx("div", {
						className: "mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800",
						children: flash.success
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex bg-secondary p-1 rounded-lg mb-6",
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setLoginMethod("password"),
							className: `flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${loginMethod === "password" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }), "Password"]
						}), /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => setLoginMethod("magic"),
							className: `flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${loginMethod === "magic" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), "Magic Link"]
						})]
					}),
					loginMethod === "password" && /* @__PURE__ */ jsxs("form", {
						onSubmit: handlePasswordSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "email",
									className: "block text-sm font-medium text-foreground mb-1.5",
									children: "Email"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										id: "email",
										type: "email",
										autoComplete: "email",
										required: true,
										value: passwordForm.data.email,
										onChange: (e) => passwordForm.setData("email", e.target.value),
										className: "pl-9",
										placeholder: "you@example.com"
									})]
								}),
								passwordForm.errors.email && /* @__PURE__ */ jsx("p", {
									className: "mt-1.5 text-sm text-destructive",
									children: passwordForm.errors.email
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "password",
									className: "block text-sm font-medium text-foreground mb-1.5",
									children: "Password"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										id: "password",
										type: "password",
										autoComplete: "current-password",
										required: true,
										value: passwordForm.data.password,
										onChange: (e) => passwordForm.setData("password", e.target.value),
										className: "pl-9",
										placeholder: "Enter your password"
									})]
								}),
								passwordForm.errors.password && /* @__PURE__ */ jsx("p", {
									className: "mt-1.5 text-sm text-destructive",
									children: passwordForm.errors.password
								})
							] }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx("input", {
									id: "remember",
									type: "checkbox",
									checked: passwordForm.data.remember,
									onChange: (e) => passwordForm.setData("remember", e.target.checked),
									className: "h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "remember",
									className: "ml-2 text-sm text-muted-foreground",
									children: "Remember me"
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: passwordForm.processing,
								className: "w-full",
								children: passwordForm.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Signing in..."] }) : "Sign in"
							})
						]
					}),
					loginMethod === "magic" && /* @__PURE__ */ jsxs("form", {
						onSubmit: handleMagicSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "magic-email",
									className: "block text-sm font-medium text-foreground mb-1.5",
									children: "Email"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										id: "magic-email",
										type: "email",
										autoComplete: "email",
										required: true,
										value: magicForm.data.email,
										onChange: (e) => magicForm.setData("email", e.target.value),
										className: "pl-9",
										placeholder: "you@example.com"
									})]
								}),
								magicForm.errors.email && /* @__PURE__ */ jsx("p", {
									className: "mt-1.5 text-sm text-destructive",
									children: magicForm.errors.email
								})
							] }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "We'll send you a secure link to sign in without a password."
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: magicForm.processing,
								className: "w-full",
								children: magicForm.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Sending link..."] }) : "Send magic link"
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 text-center text-xs text-muted-foreground",
						children: "Secure login powered by PingCRM"
					})
				]
			})
		})]
	})] });
}
var Register_exports = /* @__PURE__ */ __export({ default: () => Register }, 1);
function Register() {
	const { props } = usePage();
	const { flash, errors } = props;
	const form = useForm({ email: "" }, user_registrations.create());
	const handleSubmit = (e) => {
		e.preventDefault();
		form.submit();
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Create Account" }), /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "hidden lg:flex lg:w-[45%] relative overflow-hidden bg-primary",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" }),
				/* @__PURE__ */ jsxs("div", {
					className: "absolute inset-0 opacity-10",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full" }),
						/* @__PURE__ */ jsx("div", { className: "absolute top-40 left-40 w-48 h-48 border border-white/20 rounded-full" }),
						/* @__PURE__ */ jsx("div", { className: "absolute bottom-32 right-20 w-80 h-80 border border-white/20 rounded-full" }),
						/* @__PURE__ */ jsx("div", { className: "absolute bottom-48 right-40 w-56 h-56 border border-white/20 rounded-full" })
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col justify-between p-12 text-white",
					children: [
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, {
							href: "/",
							children: /* @__PURE__ */ jsx(Logo, { variant: "dark" })
						}) }),
						/* @__PURE__ */ jsxs("div", {
							className: "max-w-sm",
							children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-3xl font-semibold leading-tight tracking-tight mb-4",
									children: "Start building better relationships"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-white/70 leading-relaxed mb-8",
									children: "Join teams using PingCRM to manage contacts, organizations, and grow their business."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "space-y-3",
									children: [
										"Unlimited contacts & organizations",
										"Team collaboration built-in",
										"Reports & analytics"
									].map((feature, i) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("div", {
											className: "w-5 h-5 rounded-full bg-white/10 flex items-center justify-center",
											children: /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 text-white" })
										}), /* @__PURE__ */ jsx("span", {
											className: "text-white/80 text-sm",
											children: feature
										})]
									}, i))
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-sm text-white/50",
							children: "Free to get started"
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 flex flex-col justify-center px-6 py-12 lg:px-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-full max-w-sm",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "lg:hidden mb-8",
						children: /* @__PURE__ */ jsx(Link, {
							href: "/",
							children: /* @__PURE__ */ jsx(Logo, { variant: "light" })
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold text-foreground",
							children: "Create your account"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Already have an account?",
								" ",
								/* @__PURE__ */ jsx(Link, {
									href: "/users/log-in",
									className: "font-medium text-primary hover:text-primary/80 transition-colors",
									children: "Sign in"
								})
							]
						})]
					}),
					flash?.info && /* @__PURE__ */ jsx("div", {
						className: "mb-6 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800",
						children: flash.info
					}),
					flash?.error && /* @__PURE__ */ jsx("div", {
						className: "mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800",
						children: flash.error
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "email",
									className: "block text-sm font-medium text-foreground mb-1.5",
									children: "Email address"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
										id: "email",
										type: "email",
										autoComplete: "email",
										required: true,
										value: form.data.email,
										onChange: (e) => form.setData("email", e.target.value),
										className: "pl-9",
										placeholder: "you@example.com"
									})]
								}),
								(form.errors.email || errors?.email) && /* @__PURE__ */ jsx("p", {
									className: "mt-1.5 text-sm text-destructive",
									children: form.errors.email || errors?.email
								})
							] }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "We'll send you a confirmation link to verify your email address."
							}),
							/* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: form.processing,
								className: "w-full",
								children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Creating account..."] }) : "Create account"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground text-center",
								children: [
									"By creating an account, you agree to our",
									" ",
									/* @__PURE__ */ jsx("a", {
										href: "#",
										className: "text-primary hover:underline",
										children: "Terms of Service"
									}),
									" ",
									"and",
									" ",
									/* @__PURE__ */ jsx("a", {
										href: "#",
										className: "text-primary hover:underline",
										children: "Privacy Policy"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 text-center text-xs text-muted-foreground",
						children: "Secure registration powered by PingCRM"
					})
				]
			})
		})]
	})] });
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ jsx(LabelPrimitive.Root, {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function Select({ ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Root, {
		"data-slot": "select",
		...props
	});
}
function SelectValue({ ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Value, {
		"data-slot": "select-value",
		...props
	});
}
function SelectTrigger({ className, size = "default", children, ...props }) {
	return /* @__PURE__ */ jsxs(SelectPrimitive.Trigger, {
		"data-slot": "select-trigger",
		"data-size": size,
		className: cn("flex w-full items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none", "data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground", "focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/10", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted", "data-[size=default]:h-9 data-[size=sm]:h-8", "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(SelectPrimitive.Icon, {
			asChild: true,
			children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" })
		})]
	});
}
function SelectContent({ className, children, position = "popper", align = "center", ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(SelectPrimitive.Content, {
		"data-slot": "select-content",
		className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
		position,
		align,
		...props,
		children: [
			/* @__PURE__ */ jsx(SelectScrollUpButton, {}),
			/* @__PURE__ */ jsx(SelectPrimitive.Viewport, {
				className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children
			}),
			/* @__PURE__ */ jsx(SelectScrollDownButton, {})
		]
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ jsxs(SelectPrimitive.Item, {
		"data-slot": "select-item",
		className: cn("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) })
		}), /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })]
	});
}
function SelectScrollUpButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.ScrollUpButton, {
		"data-slot": "select-scroll-up-button",
		className: cn("flex cursor-default items-center justify-center py-1", className),
		...props,
		children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
	});
}
function SelectScrollDownButton({ className, ...props }) {
	return /* @__PURE__ */ jsx(SelectPrimitive.ScrollDownButton, {
		"data-slot": "select-scroll-down-button",
		className: cn("flex cursor-default items-center justify-center py-1", className),
		...props,
		children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
	});
}
var Create_exports = /* @__PURE__ */ __export({ default: () => ContactsCreate }, 1);
var COUNTRIES$3 = [
	{
		code: "US",
		name: "United States"
	},
	{
		code: "CA",
		name: "Canada"
	},
	{
		code: "MX",
		name: "Mexico"
	},
	{
		code: "GB",
		name: "United Kingdom"
	},
	{
		code: "DE",
		name: "Germany"
	},
	{
		code: "FR",
		name: "France"
	},
	{
		code: "AU",
		name: "Australia"
	}
];
function ContactsCreate({ organizations: propOrganizations, onClose }) {
	const { props } = usePage();
	const organizations$1 = propOrganizations ?? props.organizations ?? [];
	const form = useForm({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		region: "",
		country: "US",
		postal_code: "",
		organization_id: ""
	}, contacts.create());
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			...form.data,
			organization_id: form.data.organization_id === "_none" ? "" : form.data.organization_id
		};
		router$1.post(contacts.create.url(), data, {
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router$1.visit(contacts.index());
			}
		});
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router$1.visit(contacts.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Create Contact" }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-lg font-semibold mb-6",
			children: "Create Contact"
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: handleSubmit,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "first_name",
							children: "First Name"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "first_name",
							value: form.data.first_name,
							onChange: (e) => form.setData("first_name", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.first_name && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.first_name
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "last_name",
							children: "Last Name"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "last_name",
							value: form.data.last_name,
							onChange: (e) => form.setData("last_name", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.last_name && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.last_name
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "organization_id",
						children: "Organization"
					}),
					/* @__PURE__ */ jsxs(Select, {
						value: form.data.organization_id,
						onValueChange: (value) => form.setData("organization_id", value),
						children: [/* @__PURE__ */ jsx(SelectTrigger, {
							className: "mt-1.5",
							children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an organization" })
						}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
							value: "_none",
							children: "None"
						}), organizations$1.map((org) => /* @__PURE__ */ jsx(SelectItem, {
							value: String(org.id),
							children: org.name
						}, org.id))] })]
					}),
					form.errors.organization_id && /* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-destructive",
						children: form.errors.organization_id
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "email",
							children: "Email"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "email",
							type: "email",
							value: form.data.email,
							onChange: (e) => form.setData("email", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.email && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.email
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "phone",
							children: "Phone"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "phone",
							type: "tel",
							value: form.data.phone,
							onChange: (e) => form.setData("phone", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.phone && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.phone
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "address",
						children: "Address"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "address",
						value: form.data.address,
						onChange: (e) => form.setData("address", e.target.value),
						className: "mt-1.5"
					}),
					form.errors.address && /* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-destructive",
						children: form.errors.address
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "city",
							children: "City"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "city",
							value: form.data.city,
							onChange: (e) => form.setData("city", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.city && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.city
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "region",
							children: "State/Province"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "region",
							value: form.data.region,
							onChange: (e) => form.setData("region", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.region && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.region
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "country",
							children: "Country"
						}),
						/* @__PURE__ */ jsxs(Select, {
							value: form.data.country,
							onValueChange: (value) => form.setData("country", value),
							children: [/* @__PURE__ */ jsx(SelectTrigger, {
								className: "mt-1.5",
								children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a country" })
							}), /* @__PURE__ */ jsx(SelectContent, { children: COUNTRIES$3.map((country) => /* @__PURE__ */ jsx(SelectItem, {
								value: country.code,
								children: country.name
							}, country.code)) })]
						}),
						form.errors.country && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.country
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "postal_code",
							children: "Postal Code"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "postal_code",
							value: form.data.postal_code,
							onChange: (e) => form.setData("postal_code", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.postal_code && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.postal_code
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t border-border pt-5",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: handleCancel,
						children: "Cancel"
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.processing,
						children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Creating..."] }) : "Create Contact"
					})]
				})
			]
		})]
	})] });
}
function DeletedNotice({ entityName, onRestore }) {
	return /* @__PURE__ */ jsx("div", {
		className: "mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-destructive shrink-0 mt-0.5" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-foreground font-medium",
				children: [
					"This ",
					entityName,
					" has been deleted"
				]
			}), /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: onRestore,
				className: "mt-1 inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors",
				children: [
					/* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
					"Restore ",
					entityName
				]
			})] })]
		})
	});
}
const socket = createSocket("/socket", { params: () => {
	return { _csrf_token: document.querySelector("meta[name=\"csrf-token\"]")?.content };
} });
socket.connect();
function useRecordPresence({ type, id }) {
	const { props } = usePage();
	const currentUserId = props.user?.id;
	const topic = `crm:${type}:${id}`;
	useChannel(socket, topic, {});
	const presenceList = usePresence(socket, topic).list();
	const viewers = useMemo(() => {
		const allViewers = [];
		for (const entry of presenceList) for (const meta of entry.metas) if (meta.user_id !== currentUserId) allViewers.push({
			userId: meta.user_id,
			name: meta.name,
			email: meta.email,
			initials: meta.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
		});
		const seen = /* @__PURE__ */ new Set();
		return allViewers.filter((v) => {
			if (seen.has(v.userId)) return false;
			seen.add(v.userId);
			return true;
		});
	}, [presenceList, currentUserId]);
	return {
		viewers,
		isBeingViewedByOthers: viewers.length > 0,
		viewerCount: viewers.length
	};
}
function ViewerIndicator({ type, id }) {
	const { viewers, isBeingViewedByOthers } = useRecordPresence({
		type,
		id
	});
	if (!isBeingViewedByOthers) return null;
	const maxDisplay = 3;
	const displayViewers = viewers.slice(0, maxDisplay);
	const remainingCount = viewers.length - maxDisplay;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 dark:border-amber-800/50 dark:bg-amber-900/20",
		children: [/* @__PURE__ */ jsx(Eye, { className: "h-4 w-4 text-amber-600 dark:text-amber-400" }), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-1",
			children: [/* @__PURE__ */ jsx("span", {
				className: "text-sm text-amber-800 dark:text-amber-200",
				children: "Also viewing:"
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex -space-x-2 ml-1",
				children: [displayViewers.map((viewer) => /* @__PURE__ */ jsxs("div", {
					className: "relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-50 bg-amber-100 text-xs font-medium text-amber-700 dark:border-amber-900/20 dark:bg-amber-800/50 dark:text-amber-200",
					title: `${viewer.name} (${viewer.email})`,
					children: [viewer.initials, /* @__PURE__ */ jsx("span", { className: "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-amber-50 bg-green-500 dark:border-amber-900/20" })]
				}, viewer.userId)), remainingCount > 0 && /* @__PURE__ */ jsxs("div", {
					className: "flex h-7 w-7 items-center justify-center rounded-full border-2 border-amber-50 bg-amber-200 text-xs font-medium text-amber-700 dark:border-amber-900/20 dark:bg-amber-700 dark:text-amber-200",
					children: ["+", remainingCount]
				})]
			})]
		})]
	});
}
function EditingIndicator({ editingUser }) {
	const firstName = editingUser.name.split(" ")[0];
	return /* @__PURE__ */ jsxs("span", {
		className: "ml-2 inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
		children: [
			/* @__PURE__ */ jsx(Pencil, { className: "h-3 w-3 animate-pulse" }),
			firstName,
			" is editing"
		]
	});
}
function EditingBanner({ editingUsers }) {
	if (editingUsers.length === 0) return null;
	const userFields = editingUsers.reduce((acc, user) => {
		if (!acc[user.userId]) acc[user.userId] = {
			name: user.name,
			fields: []
		};
		acc[user.userId].fields.push(user.field);
		return acc;
	}, {});
	const userList = Object.values(userFields);
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800/50 dark:bg-blue-900/20",
		children: [/* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4 animate-pulse text-blue-600 dark:text-blue-400" }), /* @__PURE__ */ jsx("span", {
			className: "text-sm text-blue-800 dark:text-blue-200",
			children: userList.map((u, i) => /* @__PURE__ */ jsxs("span", { children: [
				i > 0 && (i === userList.length - 1 ? " and " : ", "),
				/* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: u.name.split(" ")[0]
				}),
				" is editing ",
				/* @__PURE__ */ jsx("span", {
					className: "font-medium",
					children: formatFields(u.fields)
				})
			] }, i))
		})]
	});
}
function formatFields(fields) {
	const formatted = fields.map((f) => f.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()));
	if (formatted.length === 1) return formatted[0];
	if (formatted.length === 2) return `${formatted[0]} and ${formatted[1]}`;
	return `${formatted.slice(0, -1).join(", ")}, and ${formatted[formatted.length - 1]}`;
}
function useEditingIndicator({ type, id }) {
	const { props } = usePage();
	const currentUserId = props.user?.id;
	const topic = `crm:${type}:${id}`;
	const [editingUsers, setEditingUsers] = useState([]);
	const channelRef = useRef(null);
	const currentFieldRef = useRef(null);
	const debounceRef = useRef(null);
	channelRef.current = useChannel(socket, topic, { user_editing: ({ user_id, name, editing, field }) => {
		if (user_id === currentUserId) return;
		if (editing && field) setEditingUsers((prev) => {
			return [...prev.filter((u) => u.userId !== user_id), {
				userId: user_id,
				name,
				field,
				timestamp: Date.now()
			}];
		});
		else setEditingUsers((prev) => prev.filter((u) => u.userId !== user_id));
	} });
	useEffect(() => {
		const interval = setInterval(() => {
			const cutoff = Date.now() - 3e4;
			setEditingUsers((prev) => prev.filter((u) => u.timestamp > cutoff));
		}, 1e4);
		return () => clearInterval(interval);
	}, []);
	useEffect(() => {
		return () => {
			if (currentFieldRef.current && channelRef.current?.channel) channelRef.current.channel.push("editing", { editing: false });
		};
	}, []);
	return {
		startEditing: useCallback((field) => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
			currentFieldRef.current = field;
			debounceRef.current = setTimeout(() => {
				if (channelRef.current?.channel) channelRef.current.channel.push("editing", {
					editing: true,
					field
				});
			}, 300);
		}, []),
		stopEditing: useCallback(() => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
			currentFieldRef.current = null;
			if (channelRef.current?.channel) channelRef.current.channel.push("editing", { editing: false });
		}, []),
		editingUsers,
		isFieldBeingEdited: useCallback((field) => editingUsers.find((u) => u.field === field), [editingUsers]),
		fieldsBeingEdited: editingUsers.map((u) => u.field)
	};
}
var Edit_exports = /* @__PURE__ */ __export({ default: () => ContactsEdit }, 1);
var COUNTRIES$2 = [
	{
		code: "US",
		name: "United States"
	},
	{
		code: "CA",
		name: "Canada"
	},
	{
		code: "MX",
		name: "Mexico"
	},
	{
		code: "GB",
		name: "United Kingdom"
	},
	{
		code: "DE",
		name: "Germany"
	},
	{
		code: "FR",
		name: "France"
	},
	{
		code: "AU",
		name: "Australia"
	}
];
function ContactsEdit({ onClose }) {
	const { props } = usePage();
	const { contact } = props;
	const organizations$1 = props.organizations;
	const { startEditing, stopEditing, editingUsers, isFieldBeingEdited } = useEditingIndicator({
		type: "contact",
		id: contact.id
	});
	const form = useForm({
		first_name: contact.firstName,
		last_name: contact.lastName,
		email: contact.email || "",
		phone: contact.phone || "",
		address: contact.address || "",
		city: contact.city || "",
		region: contact.region || "",
		country: contact.country || "US",
		postal_code: contact.postalCode || "",
		organization_id: contact.organizationId ? String(contact.organizationId) : "_none"
	}, contacts.update(contact.id));
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			...form.data,
			organization_id: form.data.organization_id === "_none" ? "" : form.data.organization_id
		};
		router$1.put(contacts.update.url(contact.id), data, {
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router$1.visit(contacts.index());
			}
		});
	};
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${contact.name}?`)) router$1.visit(contacts.delete(contact.id));
	};
	const handleRestore = () => {
		router$1.visit(contacts.restore(contact.id));
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router$1.visit(contacts.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Edit ${contact.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-lg font-semibold",
					children: ["Edit ", contact.name]
				}), /* @__PURE__ */ jsx(ViewerIndicator, {
					type: "contact",
					id: contact.id
				})]
			}),
			contact.deletedAt && /* @__PURE__ */ jsx(DeletedNotice, {
				entityName: "contact",
				onRestore: handleRestore
			}),
			/* @__PURE__ */ jsx(EditingBanner, { editingUsers }),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "first_name",
									children: "First Name"
								}), isFieldBeingEdited("first_name") && /* @__PURE__ */ jsx(EditingIndicator, { editingUser: isFieldBeingEdited("first_name") })]
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "first_name",
								value: form.data.first_name,
								onChange: (e) => form.setData("first_name", e.target.value),
								onFocus: () => startEditing("first_name"),
								onBlur: stopEditing,
								className: "mt-1.5"
							}),
							form.errors.first_name && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.first_name
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "last_name",
									children: "Last Name"
								}), isFieldBeingEdited("last_name") && /* @__PURE__ */ jsx(EditingIndicator, { editingUser: isFieldBeingEdited("last_name") })]
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "last_name",
								value: form.data.last_name,
								onChange: (e) => form.setData("last_name", e.target.value),
								onFocus: () => startEditing("last_name"),
								onBlur: stopEditing,
								className: "mt-1.5"
							}),
							form.errors.last_name && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.last_name
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "organization_id",
							children: "Organization"
						}),
						/* @__PURE__ */ jsxs(Select, {
							value: form.data.organization_id,
							onValueChange: (value) => form.setData("organization_id", value),
							children: [/* @__PURE__ */ jsx(SelectTrigger, {
								className: "mt-1.5",
								children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an organization" })
							}), /* @__PURE__ */ jsxs(SelectContent, { children: [/* @__PURE__ */ jsx(SelectItem, {
								value: "_none",
								children: "None"
							}), organizations$1.map((org) => /* @__PURE__ */ jsx(SelectItem, {
								value: String(org.id),
								children: org.name
							}, org.id))] })]
						}),
						form.errors.organization_id && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.organization_id
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "email",
									children: "Email"
								}), isFieldBeingEdited("email") && /* @__PURE__ */ jsx(EditingIndicator, { editingUser: isFieldBeingEdited("email") })]
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "email",
								type: "email",
								value: form.data.email,
								onChange: (e) => form.setData("email", e.target.value),
								onFocus: () => startEditing("email"),
								onBlur: stopEditing,
								className: "mt-1.5"
							}),
							form.errors.email && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.email
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center",
								children: [/* @__PURE__ */ jsx(Label, {
									htmlFor: "phone",
									children: "Phone"
								}), isFieldBeingEdited("phone") && /* @__PURE__ */ jsx(EditingIndicator, { editingUser: isFieldBeingEdited("phone") })]
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "phone",
								type: "tel",
								value: form.data.phone,
								onChange: (e) => form.setData("phone", e.target.value),
								onFocus: () => startEditing("phone"),
								onBlur: stopEditing,
								className: "mt-1.5"
							}),
							form.errors.phone && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.phone
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "address",
							children: "Address"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "address",
							value: form.data.address,
							onChange: (e) => form.setData("address", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.address && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.address
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "city",
								children: "City"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "city",
								value: form.data.city,
								onChange: (e) => form.setData("city", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.city && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.city
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "region",
								children: "State/Province"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "region",
								value: form.data.region,
								onChange: (e) => form.setData("region", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.region && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.region
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "country",
								children: "Country"
							}),
							/* @__PURE__ */ jsxs(Select, {
								value: form.data.country,
								onValueChange: (value) => form.setData("country", value),
								children: [/* @__PURE__ */ jsx(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a country" })
								}), /* @__PURE__ */ jsx(SelectContent, { children: COUNTRIES$2.map((country) => /* @__PURE__ */ jsx(SelectItem, {
									value: country.code,
									children: country.name
								}, country.code)) })]
							}),
							form.errors.country && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.country
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "postal_code",
								children: "Postal Code"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "postal_code",
								value: form.data.postal_code,
								onChange: (e) => form.setData("postal_code", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.postal_code && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.postal_code
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-t border-border pt-5",
						children: [!contact.deletedAt && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:text-destructive hover:bg-destructive/10",
							children: [/* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }), "Delete"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "ml-auto flex gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: handleCancel,
								children: "Cancel"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: form.processing,
								children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Saving..."] }) : "Save Changes"
							})]
						})]
					})
				]
			})
		]
	})] });
}
function getPageNumbers(currentPage, totalPages, maxVisible) {
	if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);
	const pages$1 = [];
	const half = Math.floor(maxVisible / 2);
	pages$1.push(1);
	let start = Math.max(2, currentPage - half);
	let end = Math.min(totalPages - 1, currentPage + half);
	if (currentPage <= half + 1) end = Math.min(totalPages - 1, maxVisible - 1);
	else if (currentPage >= totalPages - half) start = Math.max(2, totalPages - maxVisible + 2);
	if (start > 2) pages$1.push("ellipsis-start");
	for (let i = start; i <= end; i++) pages$1.push(i);
	if (end < totalPages - 1) pages$1.push("ellipsis-end");
	if (totalPages > 1) pages$1.push(totalPages);
	return pages$1;
}
function Pagination({ meta, onPageChange, className = "", showPageNumbers = true, maxVisiblePages = 7, labels = {} }) {
	const { previous = "Previous", next = "Next", page = (current, total) => `Page ${current} of ${total}` } = labels;
	const currentPage = meta.currentPage ?? 1;
	const totalPages = meta.totalPages ?? 1;
	const pageNumbers = showPageNumbers ? getPageNumbers(currentPage, totalPages, maxVisiblePages) : [];
	const buttonBase = cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors", "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20", "disabled:pointer-events-none disabled:opacity-40");
	const pageButton = cn(buttonBase, "h-8 min-w-8 px-2", "text-muted-foreground hover:text-foreground hover:bg-accent");
	const activePageButton = cn(buttonBase, "h-8 min-w-8 px-2", "bg-primary text-primary-foreground");
	const navButton = cn(buttonBase, "h-8 px-2 gap-1", "text-muted-foreground hover:text-foreground hover:bg-accent");
	return /* @__PURE__ */ jsxs("nav", {
		className: cn("flex items-center justify-center gap-0.5", className),
		"aria-label": "Pagination",
		role: "navigation",
		children: [
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => meta.previousPage && onPageChange(meta.previousPage),
				disabled: !meta.hasPreviousPage,
				"aria-label": previous,
				className: navButton,
				children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
					className: "hidden sm:inline text-xs",
					children: previous
				})]
			}),
			showPageNumbers && /* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-0.5 mx-1",
				role: "list",
				children: pageNumbers.map((pageNum) => pageNum === "ellipsis-start" || pageNum === "ellipsis-end" ? /* @__PURE__ */ jsx("span", {
					className: "flex h-8 w-8 items-center justify-center text-muted-foreground",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" })
				}, pageNum) : /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => onPageChange(pageNum),
					"aria-current": pageNum === currentPage ? "page" : void 0,
					"aria-label": `Page ${pageNum}`,
					className: pageNum === currentPage ? activePageButton : pageButton,
					disabled: pageNum === currentPage,
					children: pageNum
				}, pageNum))
			}),
			!showPageNumbers && /* @__PURE__ */ jsx("span", {
				className: "px-3 text-xs text-muted-foreground tabular-nums",
				children: page(currentPage, totalPages)
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => meta.nextPage && onPageChange(meta.nextPage),
				disabled: !meta.hasNextPage,
				"aria-label": next,
				className: navButton,
				children: [/* @__PURE__ */ jsx("span", {
					className: "hidden sm:inline text-xs",
					children: next
				}), /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })]
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
		outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, asChild = false, ...props }) {
	return /* @__PURE__ */ jsx(asChild ? Slot : "span", {
		"data-slot": "badge",
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Popover({ ...props }) {
	return /* @__PURE__ */ jsx(PopoverPrimitive.Root, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(PopoverPrimitive.Content, {
		"data-slot": "popover-content",
		align,
		sideOffset,
		className: cn("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className),
		...props
	}) });
}
const CLAUSE_LABELS = {
	equals: "is",
	not_equals: "is not",
	contains: "contains",
	starts_with: "starts with",
	ends_with: "ends with",
	gt: "greater than",
	gte: "at least",
	lt: "less than",
	lte: "at most",
	between: "between",
	in: "is any of",
	not_in: "is none of",
	empty: "is empty",
	not_empty: "is not empty"
};
function getClauseLabel(clause) {
	return CLAUSE_LABELS[clause] || clause;
}
function clauseToFlopOp(clause) {
	switch (clause) {
		case "equals": return "==";
		case "not_equals": return "!=";
		case "contains": return "ilike";
		case "starts_with": return "ilike";
		case "ends_with": return "ilike";
		case "gt": return ">";
		case "gte": return ">=";
		case "lt": return "<";
		case "lte": return "<=";
		case "in": return "in";
		case "not_in": return "not_in";
		case "empty": return "empty";
		case "not_empty": return "not_empty";
		case "between": return ">=";
		default: return "==";
	}
}
function flopOpToClause(op) {
	switch (op) {
		case "==": return "equals";
		case "!=": return "not_equals";
		case "ilike":
		case "like":
		case "=~": return "contains";
		case ">": return "gt";
		case ">=": return "gte";
		case "<": return "lt";
		case "<=": return "lte";
		case "in": return "in";
		case "not_in": return "not_in";
		case "empty": return "empty";
		case "not_empty": return "not_empty";
		default: return "equals";
	}
}
function transformFilterValue(_clause, value) {
	return value;
}
function formatFilterValue(value, options) {
	if (value === null || value === void 0 || value === "") return "(empty)";
	if (options && options.length > 0) {
		const option = options.find((o) => o.value === String(value));
		if (option) return option.label;
	}
	if (typeof value === "boolean") return value ? "Yes" : "No";
	let displayValue = String(value);
	if (displayValue.startsWith("%")) displayValue = displayValue.slice(1);
	if (displayValue.endsWith("%")) displayValue = displayValue.slice(0, -1);
	return displayValue;
}
function getInputTypeForFilterType(type) {
	switch (type) {
		case "numeric": return "number";
		case "date": return "date";
		case "datetime": return "datetime-local";
		default: return "text";
	}
}
function clauseRequiresValue(clause) {
	return clause !== "empty" && clause !== "not_empty";
}
function Command$1({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command, {
		"data-slot": "command",
		className: cn("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", className),
		...props
	});
}
function CommandInput({ className, ...props }) {
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "command-input-wrapper",
		className: "flex h-9 items-center gap-2 border-b px-3",
		children: [/* @__PURE__ */ jsx(SearchIcon, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ jsx(Command.Input, {
			"data-slot": "command-input",
			className: cn("placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className),
			...props
		})]
	});
}
function CommandList({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.List, {
		"data-slot": "command-list",
		className: cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className),
		...props
	});
}
function CommandEmpty({ ...props }) {
	return /* @__PURE__ */ jsx(Command.Empty, {
		"data-slot": "command-empty",
		className: "py-6 text-center text-sm",
		...props
	});
}
function CommandGroup({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Group, {
		"data-slot": "command-group",
		className: cn("text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium", className),
		...props
	});
}
function CommandItem({ className, ...props }) {
	return /* @__PURE__ */ jsx(Command.Item, {
		"data-slot": "command-item",
		className: cn("data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
		...props
	});
}
function getColorClasses(variant) {
	switch (variant) {
		case "primary": return "bg-primary/20 text-primary";
		case "success": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
		case "warning": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
		case "danger": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
		case "muted": return "bg-muted text-muted-foreground";
		default: return "bg-secondary text-secondary-foreground";
	}
}
function FilterValueSelect({ options, value, onSelect, placeholder = "Search...", colors }) {
	return /* @__PURE__ */ jsxs(Command$1, {
		className: "rounded-lg border shadow-md",
		children: [/* @__PURE__ */ jsx(CommandInput, { placeholder }), /* @__PURE__ */ jsxs(CommandList, { children: [/* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }), /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => {
			const isSelected = String(option.value) === String(value);
			const colorVariant = colors?.[option.value] || colors?.[option.value.toLowerCase()];
			return /* @__PURE__ */ jsxs(CommandItem, {
				value: option.label,
				onSelect: () => onSelect(option.value),
				className: cn("flex items-center gap-2", isSelected && "bg-accent"),
				children: [
					colorVariant && /* @__PURE__ */ jsx("span", {
						className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", getColorClasses(colorVariant)),
						children: option.label
					}),
					!colorVariant && /* @__PURE__ */ jsx("span", { children: option.label }),
					isSelected && /* @__PURE__ */ jsx(Check, { className: "ml-auto h-4 w-4 text-primary" })
				]
			}, String(option.value));
		}) })] })]
	});
}
function FilterValueInput({ value = "", onChange, placeholder = "Enter value...", type = "text", min, max, debounceMs = 300 }) {
	const [localValue, setLocalValue] = useState(value);
	const timeoutRef = useRef(null);
	useEffect(() => {
		setLocalValue(value);
	}, [value]);
	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	const handleChange = (e) => {
		const newValue = e.target.value;
		setLocalValue(newValue);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			onChange(newValue);
		}, debounceMs);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			onChange(localValue);
		}
	};
	const handleBlur = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		if (localValue !== value) onChange(localValue);
	};
	const inputProps = {
		type,
		value: localValue,
		onChange: handleChange,
		onKeyDown: handleKeyDown,
		onBlur: handleBlur,
		placeholder,
		className: "h-8"
	};
	if (type === "number") {
		if (min !== void 0) inputProps.min = min;
		if (max !== void 0) inputProps.max = max;
		inputProps.step = "any";
	} else if (type === "date" || type === "datetime-local") {
		if (min !== void 0) inputProps.min = String(min);
		if (max !== void 0) inputProps.max = String(max);
	}
	return /* @__PURE__ */ jsx(Input, { ...inputProps });
}
function FilterChip({ filter, clause, value, onClauseChange, onValueChange, onRemove }) {
	const clauseLabel = getClauseLabel(clause);
	const valueLabel = formatFilterValue(value, filter.options);
	const hasMultipleClauses = filter.clauses.length > 1;
	const isSetType = filter.type === "set";
	const showValueInput = clauseRequiresValue(clause);
	const inputType = getInputTypeForFilterType(filter.type);
	return /* @__PURE__ */ jsxs(Badge, {
		variant: "secondary",
		className: "flex items-center gap-1 px-2 py-1 h-7 text-sm font-normal",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: filter.label || filter.field
			}),
			hasMultipleClauses ? /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "px-1 hover:bg-muted rounded text-xs text-muted-foreground hover:text-foreground transition-colors",
					children: clauseLabel
				})
			}), /* @__PURE__ */ jsx(PopoverContent, {
				className: "w-44 p-1",
				align: "start",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-0.5",
					children: filter.clauses.map((c) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onClauseChange(c),
						className: `text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors ${c === clause ? "bg-muted font-medium" : ""}`,
						children: getClauseLabel(c)
					}, c))
				})
			})] }) : /* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground",
				children: clauseLabel
			}),
			showValueInput && /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "px-1.5 py-0.5 bg-background border rounded text-xs font-medium hover:bg-muted transition-colors max-w-[120px] truncate",
					children: valueLabel
				})
			}), /* @__PURE__ */ jsx(PopoverContent, {
				className: "w-56 p-2",
				align: "start",
				children: isSetType && filter.options.length > 0 ? /* @__PURE__ */ jsx(FilterValueSelect, {
					options: filter.options,
					value,
					onSelect: onValueChange,
					placeholder: filter.placeholder || `Select ${filter.label || filter.field}...`,
					colors: filter.colors
				}) : /* @__PURE__ */ jsx(FilterValueInput, {
					value: String(value ?? ""),
					onChange: onValueChange,
					placeholder: filter.placeholder ?? void 0,
					type: inputType,
					min: filter.min,
					max: filter.max
				})
			})] }),
			/* @__PURE__ */ jsxs(Button, {
				variant: "ghost",
				size: "sm",
				className: "h-4 w-4 p-0 ml-1 hover:bg-destructive/20 hover:text-destructive",
				onClick: onRemove,
				children: [/* @__PURE__ */ jsx(X, { className: "h-3 w-3" }), /* @__PURE__ */ jsx("span", {
					className: "sr-only",
					children: "Remove filter"
				})]
			})
		]
	});
}
function AddFilterButton({ filters, onAddFilter }) {
	const [inputValues, setInputValues] = useState({});
	const [open, setOpen] = useState(false);
	const handleAddFilter = (filter, clause, value) => {
		onAddFilter(filter.field, clause, value);
		setOpen(false);
		setInputValues({});
	};
	const handleInputKeyDown = (e, filter, clause) => {
		if (e.key === "Enter") {
			const value = inputValues[filter.field]?.trim();
			if (value) handleAddFilter(filter, clause, value);
		}
	};
	if (filters.length === 0) return null;
	return /* @__PURE__ */ jsxs(DropdownMenu, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ jsx(DropdownMenuTrigger, {
			asChild: true,
			children: /* @__PURE__ */ jsxs(Button, {
				variant: "outline",
				size: "sm",
				className: "h-7 gap-1",
				children: [/* @__PURE__ */ jsx(Filter, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ jsx("span", { children: "Filter" })]
			})
		}), /* @__PURE__ */ jsx(DropdownMenuContent, {
			align: "start",
			className: "w-48",
			children: filters.map((filter) => {
				const inputType = getInputTypeForFilterType(filter.type);
				const hasMultipleClauses = filter.clauses.length > 1;
				if (filter.type === "set" && filter.options.length > 0) return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsx(DropdownMenuSubTrigger, {
					className: "gap-2",
					children: /* @__PURE__ */ jsx("span", { children: filter.label || filter.field })
				}), /* @__PURE__ */ jsx(DropdownMenuSubContent, {
					className: "p-0",
					children: /* @__PURE__ */ jsxs(Command$1, { children: [/* @__PURE__ */ jsx(CommandInput, { placeholder: filter.placeholder || `Search ${(filter.label || filter.field).toLowerCase()}...` }), /* @__PURE__ */ jsxs(CommandList, { children: [/* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }), /* @__PURE__ */ jsx(CommandGroup, { children: filter.options.map((option) => /* @__PURE__ */ jsx(CommandItem, {
						value: option.label,
						onSelect: () => handleAddFilter(filter, "equals", option.value),
						children: /* @__PURE__ */ jsx("span", { children: option.label })
					}, String(option.value))) })] })] })
				})] }, filter.field);
				if (filter.type === "boolean") return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsx(DropdownMenuSubTrigger, {
					className: "gap-2",
					children: /* @__PURE__ */ jsx("span", { children: filter.label || filter.field })
				}), /* @__PURE__ */ jsx(DropdownMenuSubContent, {
					className: "p-1 w-32",
					children: /* @__PURE__ */ jsx(Command$1, { children: /* @__PURE__ */ jsx(CommandList, { children: /* @__PURE__ */ jsxs(CommandGroup, { children: [
						/* @__PURE__ */ jsx(CommandItem, {
							onSelect: () => handleAddFilter(filter, filter.defaultClause, true),
							children: "Yes"
						}),
						/* @__PURE__ */ jsx(CommandItem, {
							onSelect: () => handleAddFilter(filter, filter.defaultClause, false),
							children: "No"
						}),
						filter.nullable && /* @__PURE__ */ jsx(CommandItem, {
							onSelect: () => handleAddFilter(filter, filter.defaultClause, null),
							children: "Not set"
						})
					] }) }) })
				})] }, filter.field);
				if (hasMultipleClauses) return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsx(DropdownMenuSubTrigger, {
					className: "gap-2",
					children: /* @__PURE__ */ jsx("span", { children: filter.label || filter.field })
				}), /* @__PURE__ */ jsx(DropdownMenuSubContent, {
					className: "p-1 w-44",
					children: filter.clauses.map((clause) => /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsx(DropdownMenuSubTrigger, {
						className: "text-sm",
						children: /* @__PURE__ */ jsx("span", { children: getClauseLabel(clause) })
					}), /* @__PURE__ */ jsxs(DropdownMenuSubContent, {
						className: "p-2 w-48",
						children: [/* @__PURE__ */ jsx(Input, {
							type: inputType,
							placeholder: filter.placeholder || `Enter value...`,
							value: inputValues[`${filter.field}-${clause}`] || "",
							onChange: (e) => setInputValues((prev) => ({
								...prev,
								[`${filter.field}-${clause}`]: e.target.value
							})),
							onKeyDown: (e) => {
								if (e.key === "Enter") {
									const value = inputValues[`${filter.field}-${clause}`]?.trim();
									if (value) handleAddFilter(filter, clause, value);
								}
							},
							min: filter.min,
							max: filter.max,
							autoFocus: true,
							className: "h-8"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Press Enter to add"
						})]
					})] }, clause))
				})] }, filter.field);
				return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsx(DropdownMenuSubTrigger, {
					className: "gap-2",
					children: /* @__PURE__ */ jsx("span", { children: filter.label || filter.field })
				}), /* @__PURE__ */ jsxs(DropdownMenuSubContent, {
					className: "p-2 w-48",
					children: [/* @__PURE__ */ jsx(Input, {
						type: inputType,
						placeholder: filter.placeholder || `Enter ${(filter.label || filter.field).toLowerCase()}...`,
						value: inputValues[filter.field] || "",
						onChange: (e) => setInputValues((prev) => ({
							...prev,
							[filter.field]: e.target.value
						})),
						onKeyDown: (e) => handleInputKeyDown(e, filter, filter.defaultClause),
						min: filter.min,
						max: filter.max,
						autoFocus: true,
						className: "h-8"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Press Enter to add filter"
					})]
				})] }, filter.field);
			})
		})]
	});
}
function FilterBar({ filters, activeFilters, onFilterChange, onFilterRemove, onClearFilters, className = "" }) {
	const activeFiltersWithDefs = [];
	activeFilters.forEach((af) => {
		const definition = filters.find((f) => f.field === af.field);
		if (definition) activeFiltersWithDefs.push({
			definition,
			clause: flopOpToClause(af.op),
			value: af.value,
			flopOp: af.op
		});
	});
	const hasActiveFilters = activeFiltersWithDefs.length > 0;
	const availableFilters = filters.filter((f) => {
		if (f.type === "set") return !activeFiltersWithDefs.some((af) => af.definition.field === f.field);
		return true;
	});
	const handleClauseChange = (filter, newClause) => {
		const newOp = clauseToFlopOp(newClause);
		const newValue = transformFilterValue(newClause, filter.value);
		onFilterRemove(filter.definition.field, filter.flopOp);
		onFilterChange(filter.definition.field, newOp, newValue);
	};
	const handleValueChange = (filter, newValue) => {
		const transformedValue = transformFilterValue(filter.clause, newValue);
		onFilterChange(filter.definition.field, filter.flopOp, transformedValue);
	};
	const handleRemove = (filter) => {
		onFilterRemove(filter.definition.field, filter.flopOp);
	};
	const handleAddFilter = (field, clause, value) => {
		onFilterChange(field, clauseToFlopOp(clause), transformFilterValue(clause, value));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-wrap items-center gap-2 ${className}`,
		role: "group",
		"aria-label": "Active filters",
		children: [
			activeFiltersWithDefs.map((af, index$7) => /* @__PURE__ */ jsx(FilterChip, {
				filter: af.definition,
				clause: af.clause,
				value: af.value,
				onClauseChange: (clause) => handleClauseChange(af, clause),
				onValueChange: (value) => handleValueChange(af, value),
				onRemove: () => handleRemove(af)
			}, `${af.definition.field}-${af.flopOp}-${index$7}`)),
			availableFilters.length > 0 && /* @__PURE__ */ jsx(AddFilterButton, {
				filters: availableFilters,
				onAddFilter: handleAddFilter
			}),
			hasActiveFilters && /* @__PURE__ */ jsxs(Button, {
				variant: "ghost",
				size: "sm",
				className: "h-7 text-xs text-muted-foreground hover:text-destructive",
				onClick: onClearFilters,
				children: [/* @__PURE__ */ jsx(X, { className: "h-3 w-3 mr-1" }), "Clear"]
			})
		]
	});
}
React$1.createContext({});
function SearchInput({ value, onChange, onSubmit, placeholder = "Search...", className = "max-w-sm" }) {
	const input = /* @__PURE__ */ jsxs("div", {
		className: `relative ${className}`,
		children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
			type: "search",
			placeholder,
			value,
			onChange,
			className: "pl-9"
		})]
	});
	if (onSubmit) return /* @__PURE__ */ jsx("form", {
		onSubmit,
		children: input
	});
	return input;
}
function Table({ resource, baseUrl, renderRow, renderCell, renderAction, rowClassName, onRowClick, preserveQuery = {}, header, footer, className }) {
	const [search, setSearch] = useState(resource.state.search || "");
	const [selectedIds, setSelectedIds] = useState(/* @__PURE__ */ new Set());
	const [selectionMode, setSelectionMode] = useState("explicit");
	const buildQuery = useCallback((overrides = {}) => {
		const query = { ...preserveQuery };
		if (resource.state.page > 1 || overrides.page) query.page = overrides.page ?? resource.state.page;
		if (overrides.per_page) query.per_page = overrides.per_page;
		const searchValue = overrides.search !== void 0 ? overrides.search : search;
		if (searchValue) query.search = searchValue;
		if (resource.state.sort || overrides.sort) {
			const sort = overrides.sort ?? resource.state.sort;
			if (sort) {
				query.order_by = sort.field;
				query.order_direction = sort.direction;
			}
		}
		const filters = overrides.filters ?? resource.state.filters;
		if (filters?.length > 0) filters.forEach((f, i) => {
			query[`filters[${i}][field]`] = f.field;
			query[`filters[${i}][op]`] = f.op;
			query[`filters[${i}][value]`] = f.value;
		});
		Object.keys(query).forEach((key) => {
			if (query[key] === void 0 || query[key] === null || query[key] === "") delete query[key];
		});
		return query;
	}, [
		resource.state,
		search,
		preserveQuery
	]);
	const navigate = useCallback((query) => {
		router$1.visit(baseUrl, {
			data: query,
			preserveState: true,
			preserveScroll: true
		});
	}, [baseUrl]);
	const handleSearch = useCallback((e) => {
		e.preventDefault();
		navigate(buildQuery({
			search,
			page: 1
		}));
	}, [
		navigate,
		buildQuery,
		search
	]);
	const handleSearchChange = useCallback((e) => {
		setSearch(e.target.value);
	}, []);
	const handleSort = useCallback((field) => {
		const currentSort = resource.state.sort;
		let newDirection = "asc";
		if (currentSort?.field === field) newDirection = currentSort.direction === "asc" ? "desc" : "asc";
		navigate(buildQuery({
			sort: {
				field,
				direction: newDirection
			},
			page: 1
		}));
	}, [
		resource.state.sort,
		navigate,
		buildQuery
	]);
	const handlePageChange = useCallback((page) => {
		navigate(buildQuery({ page }));
	}, [navigate, buildQuery]);
	const handlePerPageChange = useCallback((perPage) => {
		navigate(buildQuery({
			per_page: perPage,
			page: 1
		}));
	}, [navigate, buildQuery]);
	const handleFilterChange = useCallback((field, op, value) => {
		const currentFilters = [...resource.state.filters || []];
		const existingIndex = currentFilters.findIndex((f) => f.field === field && f.op === op);
		if (existingIndex >= 0) currentFilters[existingIndex] = {
			field,
			op,
			value
		};
		else currentFilters.push({
			field,
			op,
			value
		});
		navigate(buildQuery({
			filters: currentFilters,
			page: 1
		}));
	}, [
		resource.state.filters,
		navigate,
		buildQuery
	]);
	const handleFilterRemove = useCallback((field, op) => {
		navigate(buildQuery({
			filters: [...resource.state.filters || []].filter((f) => {
				if (op) return !(f.field === field && f.op === op);
				return f.field !== field;
			}),
			page: 1
		}));
	}, [
		resource.state.filters,
		navigate,
		buildQuery
	]);
	const handleClearFilters = useCallback(() => {
		navigate(buildQuery({
			filters: [],
			page: 1
		}));
	}, [navigate, buildQuery]);
	const handleSelectRow = useCallback((id) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
		setSelectionMode("explicit");
	}, []);
	const handleSelectAll = useCallback(() => {
		if (selectionMode === "all") {
			setSelectedIds(/* @__PURE__ */ new Set());
			setSelectionMode("explicit");
		} else {
			setSelectionMode("all");
			setSelectedIds(/* @__PURE__ */ new Set());
		}
	}, [selectionMode]);
	const getSelection = useCallback(() => {
		return {
			mode: selectionMode,
			ids: Array.from(selectedIds)
		};
	}, [selectionMode, selectedIds]);
	const selectedCount = useMemo(() => {
		if (selectionMode === "all") return (resource.meta.totalCount ?? resource.data.length) - selectedIds.size;
		return selectedIds.size;
	}, [
		selectionMode,
		selectedIds,
		resource.meta.totalCount,
		resource.data.length
	]);
	const handleAction = useCallback(async (action, row) => {
		if (!resource.token) return;
		if (action.confirmation) {
			if (!window.confirm(`${action.confirmation.title}\n\n${action.confirmation.message}`)) return;
		}
		const result = await (await fetch("/nb-flop/action", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": getCSRFToken()
			},
			body: JSON.stringify({
				token: resource.token,
				action: action.name,
				id: row.id
			})
		})).json();
		if (result.success) if (result.redirect) router$1.visit(result.redirect);
		else router$1.reload();
		else alert(result.message || "Action failed");
	}, [resource.token]);
	const handleBulkAction = useCallback(async (action) => {
		if (!resource.token || selectedCount === 0) return;
		if (action.confirmation) {
			const message = action.confirmation.message.replace("{count}", String(selectedCount));
			if (!window.confirm(`${action.confirmation.title}\n\n${message}`)) return;
		}
		const result = await (await fetch("/nb-flop/bulk-action", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": getCSRFToken()
			},
			body: JSON.stringify({
				token: resource.token,
				action: action.name,
				selection: getSelection(),
				filters: resource.state.filters
			})
		})).json();
		if (result.success) {
			setSelectedIds(/* @__PURE__ */ new Set());
			setSelectionMode("explicit");
			router$1.reload();
		} else alert(result.message || "Bulk action failed");
	}, [
		resource.token,
		selectedCount,
		getSelection,
		resource.state.filters
	]);
	const visibleColumns = useMemo(() => resource.columns.filter((col) => col.visible), [resource.columns]);
	const getRowClassName = (row) => {
		if (typeof rowClassName === "function") return rowClassName(row);
		return rowClassName ?? "";
	};
	const isRowSelected = (row) => {
		const id = row.id;
		if (selectionMode === "all") return !selectedIds.has(id);
		if (selectionMode === "all_except") return !selectedIds.has(id);
		return selectedIds.has(id);
	};
	const defaultRenderCell = (column, value, row) => {
		if (renderCell) {
			const custom = renderCell(column, value, row);
			if (custom !== void 0) return custom;
		}
		switch (column.type) {
			case "image": return /* @__PURE__ */ jsx("img", {
				src: value || column.fallback || "",
				alt: "",
				className: cn(column.rounded && "rounded-full", "object-cover"),
				style: {
					width: column.width || 40,
					height: column.height || 40
				}
			});
			case "badge": return /* @__PURE__ */ jsx("span", {
				className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", getVariantClasses(column.colors?.[String(value).toLowerCase()] || "default")),
				children: String(value ?? "")
			});
			case "boolean": return value ? /* @__PURE__ */ jsx("span", {
				className: "text-green-600",
				children: "Yes"
			}) : /* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: "No"
			});
			case "numeric":
				const num = Number(value) || 0;
				let formatted = column.decimals !== null ? num.toFixed(column.decimals) : String(num);
				if (column.thousandsSeparator) formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, column.thousandsSeparator);
				return /* @__PURE__ */ jsxs("span", { children: [
					column.prefix,
					formatted,
					column.suffix
				] });
			case "date":
			case "datetime":
				if (!value) return null;
				return /* @__PURE__ */ jsx("span", { children: new Date(value).toLocaleDateString(void 0, {
					year: "numeric",
					month: "short",
					day: "numeric",
					...column.type === "datetime" && {
						hour: "2-digit",
						minute: "2-digit"
					}
				}) });
			case "action": return /* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-end gap-2",
				children: resource.actions.map((action) => {
					const rowActionState = row.actions?.[action.name];
					if (rowActionState?.hidden) return null;
					if (renderAction) return renderAction(action, row);
					return /* @__PURE__ */ jsx("button", {
						onClick: (e) => {
							e.stopPropagation();
							handleAction(action, row);
						},
						disabled: rowActionState?.disabled,
						className: cn("inline-flex items-center gap-1 rounded px-2 py-1 text-xs", getActionClasses(action.variant), rowActionState?.disabled && "opacity-50 cursor-not-allowed"),
						title: action.label ?? action.name,
						children: action.label ?? action.name
					}, action.name);
				})
			});
			default: return /* @__PURE__ */ jsx("span", {
				className: cn(column.truncate && "truncate block max-w-xs"),
				children: String(value ?? "")
			});
		}
	};
	const hasFilters = resource.filters && resource.filters.length > 0;
	const showDefaultHeader = resource.searchable.length > 0 || resource.bulkActions.length > 0 || hasFilters;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("space-y-4", className),
		children: [
			header,
			!header && showDefaultHeader && /* @__PURE__ */ jsxs("div", {
				className: "space-y-3",
				children: [(resource.searchable.length > 0 || selectedCount > 0 && resource.bulkActions.length > 0) && /* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-4",
					children: [resource.searchable.length > 0 && /* @__PURE__ */ jsx("form", {
						onSubmit: handleSearch,
						className: "flex-1 max-w-sm",
						children: /* @__PURE__ */ jsx(SearchInput, {
							value: search,
							onChange: handleSearchChange,
							placeholder: resource.searchPlaceholder || "Search..."
						})
					}), selectedCount > 0 && resource.bulkActions.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-sm text-muted-foreground",
							children: [selectedCount, " selected"]
						}), resource.bulkActions.map((action) => /* @__PURE__ */ jsx("button", {
							onClick: () => handleBulkAction(action),
							className: cn("inline-flex items-center gap-1 rounded px-3 py-1.5 text-sm", getActionClasses(action.variant)),
							children: action.label ?? action.name
						}, action.name))]
					})]
				}), hasFilters && /* @__PURE__ */ jsx(FilterBar, {
					filters: resource.filters,
					activeFilters: resource.state.filters || [],
					onFilterChange: handleFilterChange,
					onFilterRemove: handleFilterRemove,
					onClearFilters: handleClearFilters
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-border bg-card overflow-hidden",
				children: [/* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-border",
						children: [resource.bulkActions.length > 0 && /* @__PURE__ */ jsx("th", {
							className: "w-10 px-4 py-3",
							children: /* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: selectionMode === "all",
								onChange: handleSelectAll,
								className: "rounded border-border"
							})
						}), visibleColumns.map((column) => /* @__PURE__ */ jsx("th", {
							className: cn("px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground", column.alignment === "center" && "text-center", column.alignment === "right" && "text-right", column.headerClass),
							children: column.sortable ? /* @__PURE__ */ jsxs("button", {
								onClick: () => handleSort(column.key),
								className: "inline-flex items-center gap-1 hover:text-foreground",
								children: [column.label ?? column.key, /* @__PURE__ */ jsx(SortIcon, { direction: resource.state.sort?.field === column.key ? resource.state.sort.direction : null })]
							}) : column.label ?? column.key
						}, column.key))]
					}) }), /* @__PURE__ */ jsx("tbody", { children: resource.data.length > 0 ? resource.data.map((row, index$7) => /* @__PURE__ */ jsxs("tr", {
						className: cn("transition-colors hover:bg-accent/50", index$7 !== resource.data.length - 1 && "border-b border-border", onRowClick && "cursor-pointer", isRowSelected(row) && "bg-accent/30", getRowClassName(row)),
						onClick: onRowClick ? () => onRowClick(row) : void 0,
						children: [resource.bulkActions.length > 0 && /* @__PURE__ */ jsx("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: isRowSelected(row),
								onChange: () => handleSelectRow(row.id),
								onClick: (e) => e.stopPropagation(),
								className: "rounded border-border"
							})
						}), renderRow ? renderRow(row, visibleColumns) : visibleColumns.map((column) => /* @__PURE__ */ jsx("td", {
							className: cn("px-4 py-3", column.alignment === "center" && "text-center", column.alignment === "right" && "text-right", column.cellClass),
							children: defaultRenderCell(column, row[column.key], row)
						}, column.key))]
					}, row.id ?? index$7)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: visibleColumns.length + (resource.bulkActions.length > 0 ? 1 : 0),
						className: "px-4 py-12 text-center",
						children: resource.emptyState ? /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center gap-2",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-lg font-medium",
									children: resource.emptyState.title
								}),
								resource.emptyState.message && /* @__PURE__ */ jsx("p", {
									className: "text-sm text-muted-foreground",
									children: resource.emptyState.message
								}),
								resource.emptyState.action && /* @__PURE__ */ jsx("a", {
									href: resource.emptyState.action.href,
									className: "mt-2 inline-flex items-center rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground",
									children: resource.emptyState.action.label
								})
							]
						}) : /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "No results found."
						})
					}) }) })]
				}), resource.meta.totalPages != null && resource.meta.totalPages > 1 && /* @__PURE__ */ jsxs("div", {
					className: "border-t border-border px-4 py-3 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "text-sm text-muted-foreground",
							children: [resource.meta.totalCount, " total"]
						}), /* @__PURE__ */ jsx("select", {
							value: resource.state.perPage,
							onChange: (e) => handlePerPageChange(Number(e.target.value)),
							className: "h-8 rounded border border-border bg-background px-2 text-sm",
							children: resource.perPageOptions.map((opt) => /* @__PURE__ */ jsxs("option", {
								value: opt,
								children: [opt, " per page"]
							}, opt))
						})]
					}), /* @__PURE__ */ jsx(Pagination, {
						meta: {
							currentPage: resource.meta.currentPage,
							totalPages: resource.meta.totalPages,
							previousPage: resource.meta.previousPage,
							nextPage: resource.meta.nextPage,
							hasPreviousPage: resource.meta.hasPreviousPage,
							hasNextPage: resource.meta.hasNextPage,
							pageSize: resource.meta.pageSize,
							totalCount: resource.meta.totalCount,
							currentOffset: null,
							previousOffset: null,
							nextOffset: null,
							startCursor: null,
							endCursor: null,
							flop: resource.meta.flop ?? {
								filters: [],
								orderBy: null,
								orderDirections: null,
								page: null,
								pageSize: null
							}
						},
						onPageChange: handlePageChange,
						className: "flex items-center gap-1"
					})]
				})]
			}),
			footer
		]
	});
}
function getCSRFToken() {
	return document.querySelector("meta[name=\"csrf-token\"]")?.getAttribute("content") || "";
}
function getVariantClasses(variant) {
	const variants = {
		default: "bg-muted text-muted-foreground",
		primary: "bg-primary/10 text-primary",
		success: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
		warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
		danger: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
	};
	return variants[variant] || variants.default;
}
function getActionClasses(variant) {
	const variants = {
		default: "bg-muted text-muted-foreground hover:bg-muted/80",
		primary: "bg-primary text-primary-foreground hover:bg-primary/90",
		success: "bg-green-600 text-white hover:bg-green-700",
		warning: "bg-yellow-600 text-white hover:bg-yellow-700",
		danger: "bg-red-600 text-white hover:bg-red-700"
	};
	return variants[variant] || variants.default;
}
function SortIcon({ direction }) {
	if (direction === "asc") return /* @__PURE__ */ jsx("svg", {
		className: "h-4 w-4",
		fill: "none",
		viewBox: "0 0 24 24",
		stroke: "currentColor",
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M5 15l7-7 7 7"
		})
	});
	if (direction === "desc") return /* @__PURE__ */ jsx("svg", {
		className: "h-4 w-4",
		fill: "none",
		viewBox: "0 0 24 24",
		stroke: "currentColor",
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M19 9l-7 7-7-7"
		})
	});
	return /* @__PURE__ */ jsx("svg", {
		className: "h-4 w-4 opacity-30",
		fill: "none",
		viewBox: "0 0 24 24",
		stroke: "currentColor",
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			strokeWidth: 2,
			d: "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
		})
	});
}
function ContactFormSkeleton() {
	return /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-40 mb-6" }), /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-10 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-28 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t border-border pt-5",
					children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-20" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-32" })]
				})
			]
		})]
	});
}
function useTableRealtime({ topic, createEvent, updateEvent, deleteEvent }) {
	const [pendingUpdates, setPendingUpdates] = useState([]);
	const [highlightedIds, setHighlightedIds] = useState(/* @__PURE__ */ new Set());
	useChannel(socket, topic, {
		[createEvent]: ({ contact, organization, user }) => {
			const record = contact || organization || user;
			if (record) setPendingUpdates((prev) => [...prev, {
				type: "created",
				id: record.id,
				timestamp: Date.now()
			}]);
		},
		[updateEvent]: ({ contact, organization, user }) => {
			const record = contact || organization || user;
			if (record) {
				setHighlightedIds((prev) => new Set([...prev, record.id]));
				setTimeout(() => {
					setHighlightedIds((prev) => {
						const next = new Set(prev);
						next.delete(record.id);
						return next;
					});
				}, 3e3);
			}
		},
		[deleteEvent]: ({ id }) => {
			setPendingUpdates((prev) => [...prev, {
				type: "deleted",
				id,
				timestamp: Date.now()
			}]);
		}
	});
	useEffect(() => {
		const interval = setInterval(() => {
			const cutoff = Date.now() - 6e4;
			setPendingUpdates((prev) => prev.filter((u) => u.timestamp > cutoff));
		}, 3e4);
		return () => clearInterval(interval);
	}, []);
	const refresh = useCallback(() => {
		router.reload({ only: [
			"contacts",
			"organizations",
			"users"
		] });
		setPendingUpdates([]);
	}, []);
	const dismissUpdates = useCallback(() => {
		setPendingUpdates([]);
	}, []);
	const hasNewRecords = pendingUpdates.some((u) => u.type === "created");
	const hasDeletedRecords = pendingUpdates.some((u) => u.type === "deleted");
	return {
		hasPendingChanges: pendingUpdates.length > 0,
		hasNewRecords,
		hasDeletedRecords,
		pendingCount: pendingUpdates.length,
		highlightedIds,
		refresh,
		dismissUpdates,
		isHighlighted: (id) => highlightedIds.has(id)
	};
}
var Index_exports = /* @__PURE__ */ __export({ default: () => ContactsIndex }, 1);
function ContactsIndex() {
	const { props } = usePage();
	const contacts$1 = props.contacts;
	const { hasPendingChanges, hasNewRecords, pendingCount, isHighlighted, refresh, dismissUpdates } = useTableRealtime({
		topic: "crm:contacts",
		createEvent: "contact_created",
		updateEvent: "contact_updated",
		deleteEvent: "contact_deleted"
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Contacts" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: "Contacts"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Manage your contacts and their information."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx(CircleDot, { className: "h-2 w-2 animate-pulse text-green-500" }), "Live"]
						}), /* @__PURE__ */ jsx(ClientModalLink, {
							href: contacts.new(),
							loadingComponent: ContactFormSkeleton,
							modalConfig: {
								slideover: true,
								position: "right"
							},
							prefetch: true,
							children: /* @__PURE__ */ jsx("button", {
								className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
								children: "New contact"
							})
						})]
					})]
				}),
				hasPendingChanges && /* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: hasNewRecords ? `${pendingCount} new update${pendingCount > 1 ? "s" : ""} available` : "Some records have changed"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: refresh,
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90",
							children: "Refresh"
						}), /* @__PURE__ */ jsx("button", {
							onClick: dismissUpdates,
							className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					})]
				}),
				/* @__PURE__ */ jsx(Table, {
					resource: contacts$1,
					baseUrl: "/contacts",
					rowClassName: (row) => {
						const classes = [];
						if (row.deletedAt) classes.push("bg-muted/50 opacity-60");
						if (isHighlighted(row.id)) classes.push("animate-pulse bg-primary/10 ring-1 ring-primary/20");
						return classes.join(" ");
					},
					onRowClick: (row) => {
						router$1.visit(contacts.edit(row.id));
					},
					renderCell: (column, value, row) => {
						if (column.key === "name") return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-medium",
							children: row.name
						}), row.deletedAt && /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: "(deleted)"
						})] });
						if (column.key === "organizationName") {
							if (!row.organizationName) return null;
							return /* @__PURE__ */ jsx("span", {
								className: "text-muted-foreground",
								children: row.organizationName
							});
						}
						if (column.key === "city") {
							const parts = [row.city, row.region].filter(Boolean);
							return parts.length > 0 ? parts.join(", ") : null;
						}
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						contacts$1.meta.totalCount,
						" contact",
						contacts$1.meta.totalCount !== 1 ? "s" : "",
						" total"
					]
				})
			]
		})
	})] });
}
var Dashboard_exports = /* @__PURE__ */ __export({ default: () => Dashboard }, 1);
function Dashboard() {
	const { props: serverProps } = usePage();
	const { props } = useChannelProps(socket, "crm:lobby", {
		stats_updated: {
			prop: "stats",
			strategy: "reload"
		},
		activity_created: {
			prop: "activities",
			strategy: "prepend",
			transform: (event) => event.activity
		}
	}, { initialProps: serverProps });
	const onlineUsers = usePresence(socket, "crm:lobby").list();
	const { user, stats, activities } = props;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Dashboard" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8 flex items-start justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-xl font-semibold text-foreground",
						children: [
							"Good ",
							getGreeting(),
							user?.firstName ? `, ${user.firstName}` : ""
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Here's what's happening with your CRM today."
					})] }), onlineUsers.length > 0 && /* @__PURE__ */ jsx(OnlineUsersIndicator, { users: onlineUsers })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(StatCard$1, {
							title: "Contacts",
							value: stats?.contacts ?? 0,
							href: "/contacts",
							icon: Users
						}),
						/* @__PURE__ */ jsx(StatCard$1, {
							title: "Organizations",
							value: stats?.organizations ?? 0,
							href: "/organizations",
							icon: Building2
						}),
						/* @__PURE__ */ jsx(StatCard$1, {
							title: "Users",
							value: stats?.users ?? 0,
							href: "/users",
							icon: User
						}),
						/* @__PURE__ */ jsx(StatCard$1, {
							title: "Revenue",
							value: "$0",
							href: "/reports",
							icon: TrendingUp,
							isMonetary: true
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-2",
						children: /* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between border-b border-border px-5 py-4",
								children: [/* @__PURE__ */ jsx("h2", {
									className: "text-sm font-medium text-foreground",
									children: "Recent Activity"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ jsxs("span", {
										className: "flex items-center gap-1.5 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ jsx(CircleDot, { className: "h-2 w-2 animate-pulse text-green-500" }), "Live"]
									}), /* @__PURE__ */ jsx(Link, {
										href: "/reports",
										className: "text-xs font-medium text-primary hover:text-primary/80 transition-colors",
										children: "View all"
									})]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-5",
								children: activities && activities.length > 0 ? /* @__PURE__ */ jsx(ActivityFeed, { activities }) : /* @__PURE__ */ jsx(EmptyState$1, {
									icon: Clock,
									title: "No recent activity",
									description: "Activity will appear here as you create and update records."
								})
							})]
						})
					}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-border bg-card",
						children: [/* @__PURE__ */ jsx("div", {
							className: "border-b border-border px-5 py-4",
							children: /* @__PURE__ */ jsx("h2", {
								className: "text-sm font-medium text-foreground",
								children: "Quick Actions"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-2",
							children: [
								/* @__PURE__ */ jsx(QuickAction, {
									href: "/organizations/new",
									icon: Plus,
									title: "New organization",
									description: "Add a company to manage"
								}),
								/* @__PURE__ */ jsx(QuickAction, {
									href: "/contacts/new",
									icon: Plus,
									title: "New contact",
									description: "Add a person to your CRM"
								}),
								/* @__PURE__ */ jsx(QuickAction, {
									href: "/users/new",
									icon: Plus,
									title: "Invite user",
									description: "Add a team member"
								})
							]
						})]
					}) })]
				})
			]
		})
	})] });
}
function getGreeting() {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (hour < 12) return "morning";
	if (hour < 18) return "afternoon";
	return "evening";
}
function OnlineUsersIndicator({ users: users$1 }) {
	const allUsers = users$1.flatMap((u) => u.metas);
	const displayLimit = 3;
	const displayUsers = allUsers.slice(0, displayLimit);
	const remainingCount = allUsers.length - displayLimit;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex -space-x-2",
			children: [displayUsers.map((user, i) => /* @__PURE__ */ jsxs("div", {
				className: "relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-xs font-medium text-primary",
				title: user.name,
				children: [user.name.split(" ").map((n) => n[0]).join("").toUpperCase(), /* @__PURE__ */ jsx("span", { className: "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" })]
			}, i)), remainingCount > 0 && /* @__PURE__ */ jsxs("div", {
				className: "flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium text-muted-foreground",
				children: ["+", remainingCount]
			})]
		}), /* @__PURE__ */ jsxs("span", {
			className: "text-xs text-muted-foreground",
			children: [allUsers.length, " online"]
		})]
	});
}
function StatCard$1({ title, value, href, icon: Icon, isMonetary }) {
	return /* @__PURE__ */ jsx(Link, {
		href,
		className: "group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20 hover:bg-accent/50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-2xl font-semibold tabular-nums text-foreground",
				children: isMonetary ? value : typeof value === "number" ? value.toLocaleString() : value
			})] }), /* @__PURE__ */ jsx("div", {
				className: "rounded-md bg-primary/5 p-2 transition-colors group-hover:bg-primary/10",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary" })
			})]
		})
	});
}
function ActivityFeed({ activities }) {
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-3",
		children: activities.map((activity) => /* @__PURE__ */ jsx(ActivityItem, { activity }, activity.id))
	});
}
function ActivityItem({ activity }) {
	const ActionIcon = getActionIcon(activity.action);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-accent/50",
		children: [/* @__PURE__ */ jsx("div", {
			className: `mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${getActionColor(activity.action)}`,
			children: /* @__PURE__ */ jsx(ActionIcon, { className: "h-3.5 w-3.5" })
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-foreground",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: activity.userName || "System"
					}),
					" ",
					getActionVerb(activity.action),
					" ",
					/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: activity.resourceName
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "text-muted-foreground",
						children: [
							" ",
							"(",
							activity.resourceType,
							")"
						]
					})
				]
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: formatDistanceToNow(new Date(activity.insertedAt), { addSuffix: true })
			})]
		})]
	});
}
function getActionIcon(action) {
	switch (action) {
		case "created": return UserPlus;
		case "updated": return Pencil;
		case "deleted": return Trash2;
		case "restored": return RotateCcw;
		default: return Clock;
	}
}
function getActionColor(action) {
	switch (action) {
		case "created": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
		case "updated": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
		case "deleted": return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
		case "restored": return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
		default: return "bg-muted text-muted-foreground";
	}
}
function getActionVerb(action) {
	switch (action) {
		case "created": return "created";
		case "updated": return "updated";
		case "deleted": return "deleted";
		case "restored": return "restored";
		default: return action;
	}
}
function QuickAction({ href, icon: Icon, title, description }) {
	return /* @__PURE__ */ jsxs(Link, {
		href,
		className: "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/5",
			children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary" })
		}), /* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm font-medium text-foreground",
				children: title
			}), /* @__PURE__ */ jsx("p", {
				className: "truncate text-xs text-muted-foreground",
				children: description
			})]
		})]
	});
}
function EmptyState$1({ icon: Icon, title, description }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center py-8 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "rounded-full bg-muted p-3",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-muted-foreground" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-3 text-sm font-medium text-foreground",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: description
			})
		]
	});
}
var Home_exports = /* @__PURE__ */ __export({ default: () => Home$1 }, 1);
function Home$1({ greeting }) {
	return /* @__PURE__ */ jsxs("div", {
		style: {
			padding: "2rem",
			fontFamily: "sans-serif"
		},
		children: [
			/* @__PURE__ */ jsx("h1", { children: greeting || "Welcome to NbInertia!" }),
			/* @__PURE__ */ jsx("p", { children: "This is a sample Inertia.js page component created by the nb_inertia installer." }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Edit this file at ",
				/* @__PURE__ */ jsx("code", { children: "assets/js/pages/Home.jsx" }),
				" to get started."
			] }),
			/* @__PURE__ */ jsxs("div", {
				style: { marginTop: "2rem" },
				children: [/* @__PURE__ */ jsx("h2", { children: "Next Steps" }), /* @__PURE__ */ jsxs("ul", { children: [
					/* @__PURE__ */ jsx("li", { children: "Create more page components in assets/js/pages/" }),
					/* @__PURE__ */ jsxs("li", { children: [
						"Use ",
						/* @__PURE__ */ jsx("code", { children: "inertia_page" }),
						" macro to declare pages in your controllers"
					] }),
					/* @__PURE__ */ jsxs("li", { children: ["Render pages with ", /* @__PURE__ */ jsx("code", { children: "render_inertia(conn, :page_name, props)" })] })
				] })]
			}),
			/* @__PURE__ */ jsxs("div", {
				style: {
					marginTop: "2rem",
					padding: "1rem",
					background: "#f0f0f0",
					borderRadius: "0.5rem"
				},
				children: [/* @__PURE__ */ jsx("h3", { children: "Example Controller" }), /* @__PURE__ */ jsx("pre", {
					style: {
						background: "white",
						padding: "1rem",
						borderRadius: "0.25rem",
						overflow: "auto"
					},
					children: `defmodule MyAppWeb.PageController do
  use MyAppWeb, :controller
  use NbInertia.Controller

  inertia_page :home do
    prop :greeting, :string
  end

  def home(conn, _params) do
    render_inertia(conn, :home,
      greeting: "Hello from NbInertia!"
    )
  end
end`
				})]
			})
		]
	});
}
var Create_exports$1 = /* @__PURE__ */ __export({ default: () => OrganizationsCreate }, 1);
var COUNTRIES$1 = [
	{
		code: "US",
		name: "United States"
	},
	{
		code: "CA",
		name: "Canada"
	},
	{
		code: "MX",
		name: "Mexico"
	},
	{
		code: "GB",
		name: "United Kingdom"
	},
	{
		code: "DE",
		name: "Germany"
	},
	{
		code: "FR",
		name: "France"
	},
	{
		code: "AU",
		name: "Australia"
	}
];
function OrganizationsCreate({ onClose }) {
	const form = useForm({
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		region: "",
		country: "US",
		postal_code: ""
	}, organizations.create());
	const handleSubmit = (e) => {
		e.preventDefault();
		form.submit({
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router$1.visit(organizations.index());
			}
		});
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router$1.visit(organizations.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Create Organization" }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-lg font-semibold mb-6",
			children: "Create Organization"
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: handleSubmit,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "name",
						children: "Name"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "name",
						value: form.data.name,
						onChange: (e) => form.setData("name", e.target.value),
						className: "mt-1.5"
					}),
					form.errors.name && /* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-destructive",
						children: form.errors.name
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "email",
							children: "Email"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "email",
							type: "email",
							value: form.data.email,
							onChange: (e) => form.setData("email", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.email && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.email
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "phone",
							children: "Phone"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "phone",
							type: "tel",
							value: form.data.phone,
							onChange: (e) => form.setData("phone", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.phone && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.phone
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "address",
						children: "Address"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "address",
						value: form.data.address,
						onChange: (e) => form.setData("address", e.target.value),
						className: "mt-1.5"
					}),
					form.errors.address && /* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-destructive",
						children: form.errors.address
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "city",
							children: "City"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "city",
							value: form.data.city,
							onChange: (e) => form.setData("city", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.city && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.city
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "region",
							children: "State/Province"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "region",
							value: form.data.region,
							onChange: (e) => form.setData("region", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.region && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.region
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "country",
							children: "Country"
						}),
						/* @__PURE__ */ jsxs(Select, {
							value: form.data.country,
							onValueChange: (value) => form.setData("country", value),
							children: [/* @__PURE__ */ jsx(SelectTrigger, {
								className: "mt-1.5",
								children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a country" })
							}), /* @__PURE__ */ jsx(SelectContent, { children: COUNTRIES$1.map((country) => /* @__PURE__ */ jsx(SelectItem, {
								value: country.code,
								children: country.name
							}, country.code)) })]
						}),
						form.errors.country && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.country
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "postal_code",
							children: "Postal Code"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "postal_code",
							value: form.data.postal_code,
							onChange: (e) => form.setData("postal_code", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.postal_code && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.postal_code
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t border-border pt-5",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: handleCancel,
						children: "Cancel"
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.processing,
						children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Creating..."] }) : "Create Organization"
					})]
				})
			]
		})]
	})] });
}
var Edit_exports$1 = /* @__PURE__ */ __export({ default: () => OrganizationsEdit }, 1);
var COUNTRIES = [
	{
		code: "US",
		name: "United States"
	},
	{
		code: "CA",
		name: "Canada"
	},
	{
		code: "MX",
		name: "Mexico"
	},
	{
		code: "GB",
		name: "United Kingdom"
	},
	{
		code: "DE",
		name: "Germany"
	},
	{
		code: "FR",
		name: "France"
	},
	{
		code: "AU",
		name: "Australia"
	}
];
function OrganizationsEdit({ onClose }) {
	const { props } = usePage();
	const { organization } = props;
	const form = useForm({
		name: organization.name,
		email: organization.email || "",
		phone: organization.phone || "",
		address: organization.address || "",
		city: organization.city || "",
		region: organization.region || "",
		country: organization.country || "US",
		postal_code: organization.postalCode || ""
	}, organizations.update(organization.id));
	const handleSubmit = (e) => {
		e.preventDefault();
		form.submit({
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router$1.visit(organizations.index());
			}
		});
	};
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${organization.name}?`)) router$1.visit(organizations.delete(organization.id));
	};
	const handleRestore = () => {
		router$1.visit(organizations.restore(organization.id));
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router$1.visit(organizations.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Edit ${organization.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-lg font-semibold",
					children: ["Edit ", organization.name]
				}), /* @__PURE__ */ jsx(ViewerIndicator, {
					type: "organization",
					id: organization.id
				})]
			}),
			organization.deletedAt && /* @__PURE__ */ jsx(DeletedNotice, {
				entityName: "organization",
				onRestore: handleRestore
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "name",
							children: "Name"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "name",
							value: form.data.name,
							onChange: (e) => form.setData("name", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.name && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.name
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "email",
								children: "Email"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "email",
								type: "email",
								value: form.data.email,
								onChange: (e) => form.setData("email", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.email && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.email
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "phone",
								children: "Phone"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "phone",
								type: "tel",
								value: form.data.phone,
								onChange: (e) => form.setData("phone", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.phone && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.phone
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "address",
							children: "Address"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "address",
							value: form.data.address,
							onChange: (e) => form.setData("address", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.address && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.address
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "city",
								children: "City"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "city",
								value: form.data.city,
								onChange: (e) => form.setData("city", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.city && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.city
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "region",
								children: "State/Province"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "region",
								value: form.data.region,
								onChange: (e) => form.setData("region", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.region && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.region
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "country",
								children: "Country"
							}),
							/* @__PURE__ */ jsxs(Select, {
								value: form.data.country,
								onValueChange: (value) => form.setData("country", value),
								children: [/* @__PURE__ */ jsx(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a country" })
								}), /* @__PURE__ */ jsx(SelectContent, { children: COUNTRIES.map((country) => /* @__PURE__ */ jsx(SelectItem, {
									value: country.code,
									children: country.name
								}, country.code)) })]
							}),
							form.errors.country && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.country
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "postal_code",
								children: "Postal Code"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "postal_code",
								value: form.data.postal_code,
								onChange: (e) => form.setData("postal_code", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.postal_code && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.postal_code
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-t border-border pt-5",
						children: [!organization.deletedAt && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:text-destructive hover:bg-destructive/10",
							children: [/* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }), "Delete"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "ml-auto flex gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: handleCancel,
								children: "Cancel"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: form.processing,
								children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Saving..."] }) : "Save Changes"
							})]
						})]
					})
				]
			})
		]
	})] });
}
function OrganizationFormSkeleton() {
	return /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-44 mb-6" }), /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-14 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-10 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-28 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t border-border pt-5",
					children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-20" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-40" })]
				})
			]
		})]
	});
}
var Index_exports$1 = /* @__PURE__ */ __export({ default: () => OrganizationsIndex }, 1);
function OrganizationsIndex() {
	const { props } = usePage();
	const organizations$1 = props.organizations;
	const { hasPendingChanges, hasNewRecords, pendingCount, isHighlighted, refresh, dismissUpdates } = useTableRealtime({
		topic: "crm:organizations",
		createEvent: "organization_created",
		updateEvent: "organization_updated",
		deleteEvent: "organization_deleted"
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Organizations" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: "Organizations"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Manage your organizations and their contacts."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx(CircleDot, { className: "h-2 w-2 animate-pulse text-green-500" }), "Live"]
						}), /* @__PURE__ */ jsx(ClientModalLink, {
							href: organizations.new(),
							loadingComponent: OrganizationFormSkeleton,
							modalConfig: {
								slideover: true,
								position: "right"
							},
							prefetch: true,
							children: /* @__PURE__ */ jsx("button", {
								className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
								children: "New organization"
							})
						})]
					})]
				}),
				hasPendingChanges && /* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: hasNewRecords ? `${pendingCount} new update${pendingCount > 1 ? "s" : ""} available` : "Some records have changed"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: refresh,
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90",
							children: "Refresh"
						}), /* @__PURE__ */ jsx("button", {
							onClick: dismissUpdates,
							className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					})]
				}),
				/* @__PURE__ */ jsx(Table, {
					resource: organizations$1,
					baseUrl: "/organizations",
					rowClassName: (row) => {
						const classes = [];
						if (row.deletedAt) classes.push("bg-muted/50 opacity-60");
						if (isHighlighted(row.id)) classes.push("animate-pulse bg-primary/10 ring-1 ring-primary/20");
						return classes.join(" ");
					},
					onRowClick: (row) => {
						router$1.visit(organizations.edit(row.id));
					},
					renderCell: (column, value, row) => {
						if (column.key === "name") return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-medium",
							children: row.name
						}), row.deletedAt && /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: "(deleted)"
						})] });
						if (column.key === "city") {
							const parts = [row.city, row.region].filter(Boolean);
							return parts.length > 0 ? parts.join(", ") : null;
						}
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						organizations$1.meta.totalCount,
						" organization",
						organizations$1.meta.totalCount !== 1 ? "s" : "",
						" total"
					]
				})
			]
		})
	})] });
}
var Index_exports$2 = /* @__PURE__ */ __export({ default: () => ReportsIndex }, 1);
var COUNTRY_NAMES = {
	US: "United States",
	CA: "Canada",
	MX: "Mexico",
	GB: "United Kingdom",
	DE: "Germany",
	FR: "France",
	AU: "Australia"
};
function ReportsIndex() {
	const { props } = usePage();
	const { totals, contactsByOrganization, contactsByCountry, organizationsByCountry, contactsOverTime, recentActivity, trashed } = props;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Reports" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: "Reports"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Overview and analytics for your CRM data."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(StatCard, {
							title: "Total Contacts",
							value: totals?.contacts ?? 0,
							icon: Users,
							href: "/contacts"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Total Organizations",
							value: totals?.organizations ?? 0,
							icon: Building2,
							href: "/organizations"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Team Members",
							value: totals?.users ?? 0,
							icon: User,
							href: "/users"
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Trashed Items",
							value: (trashed?.contacts ?? 0) + (trashed?.organizations ?? 0),
							icon: Trash2,
							description: `${trashed?.contacts ?? 0} contacts, ${trashed?.organizations ?? 0} orgs`
						})
					]
				}),
				recentActivity && (recentActivity.contacts > 0 || recentActivity.organizations > 0) && /* @__PURE__ */ jsx("div", {
					className: "mb-8 rounded-lg border border-primary/20 bg-primary/5 p-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "rounded-md bg-primary/10 p-2",
							children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("p", {
							className: "text-sm font-medium text-foreground",
							children: [
								"Last ",
								recentActivity.days,
								" days activity"
							]
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-sm text-muted-foreground",
							children: [
								recentActivity.contacts,
								" new contact",
								recentActivity.contacts !== 1 ? "s" : "",
								",",
								" ",
								recentActivity.organizations,
								" new organization",
								recentActivity.organizations !== 1 ? "s" : ""
							]
						})] })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 lg:grid-cols-2",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between border-b border-border px-5 py-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(BarChart3, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("h2", {
										className: "text-sm font-medium text-foreground",
										children: "Contacts by Organization"
									})]
								}), /* @__PURE__ */ jsx(Link, {
									href: "/contacts",
									className: "text-xs font-medium text-primary hover:text-primary/80",
									children: "View all"
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-5",
								children: contactsByOrganization && contactsByOrganization.length > 0 ? /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: contactsByOrganization.map((org) => /* @__PURE__ */ jsx(BarRow, {
										label: org.name,
										value: org.count,
										maxValue: contactsByOrganization[0]?.count ?? 1,
										href: `/organizations/${org.id}/edit`
									}, org.id))
								}) : /* @__PURE__ */ jsx(EmptyState, {
									icon: Building2,
									title: "No data yet",
									description: "Add contacts to organizations to see this report."
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-between border-b border-border px-5 py-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("h2", {
										className: "text-sm font-medium text-foreground",
										children: "Contacts Over Time"
									})]
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "p-5",
								children: contactsOverTime && contactsOverTime.length > 0 ? /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: contactsOverTime.map((item, index$7) => /* @__PURE__ */ jsx(BarRow, {
										label: item.month,
										value: item.count,
										maxValue: Math.max(...contactsOverTime.map((i) => i.count), 1)
									}, index$7))
								}) : /* @__PURE__ */ jsx(EmptyState, {
									icon: Calendar,
									title: "No data yet",
									description: "Contacts added over time will appear here."
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-between border-b border-border px-5 py-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("h2", {
										className: "text-sm font-medium text-foreground",
										children: "Contacts by Country"
									})]
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "p-5",
								children: contactsByCountry && contactsByCountry.length > 0 ? /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: contactsByCountry.slice(0, 5).map((item, index$7) => /* @__PURE__ */ jsx(BarRow, {
										label: COUNTRY_NAMES[item.country] || item.country,
										value: item.count,
										maxValue: contactsByCountry[0]?.count ?? 1
									}, index$7))
								}) : /* @__PURE__ */ jsx(EmptyState, {
									icon: MapPin,
									title: "No data yet",
									description: "Add country information to contacts to see this report."
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-lg border border-border bg-card",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-between border-b border-border px-5 py-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("h2", {
										className: "text-sm font-medium text-foreground",
										children: "Organizations by Country"
									})]
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "p-5",
								children: organizationsByCountry && organizationsByCountry.length > 0 ? /* @__PURE__ */ jsx("div", {
									className: "space-y-4",
									children: organizationsByCountry.slice(0, 5).map((item, index$7) => /* @__PURE__ */ jsx(BarRow, {
										label: COUNTRY_NAMES[item.country] || item.country,
										value: item.count,
										maxValue: organizationsByCountry[0]?.count ?? 1
									}, index$7))
								}) : /* @__PURE__ */ jsx(EmptyState, {
									icon: MapPin,
									title: "No data yet",
									description: "Add country information to organizations to see this report."
								})
							})]
						})
					]
				}),
				(trashed?.contacts > 0 || trashed?.organizations > 0) && /* @__PURE__ */ jsx("div", {
					className: "mt-8",
					children: /* @__PURE__ */ jsx("div", {
						className: "rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/10",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "rounded-md bg-yellow-100 p-2 dark:bg-yellow-900/30",
								children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5 text-yellow-600 dark:text-yellow-500" })
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-yellow-800 dark:text-yellow-200",
										children: "Trashed Items"
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-1 text-sm text-yellow-700 dark:text-yellow-300",
										children: [
											"You have ",
											trashed.contacts,
											" trashed contact",
											trashed.contacts !== 1 ? "s" : "",
											" and",
											" ",
											trashed.organizations,
											" trashed organization",
											trashed.organizations !== 1 ? "s" : "",
											". You can restore them from the respective lists by filtering for trashed items."
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-3 flex gap-3",
										children: [trashed.contacts > 0 && /* @__PURE__ */ jsx(Link, {
											href: "/contacts?trashed=only",
											className: "text-sm font-medium text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300",
											children: "View trashed contacts"
										}), trashed.organizations > 0 && /* @__PURE__ */ jsx(Link, {
											href: "/organizations?trashed=only",
											className: "text-sm font-medium text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300",
											children: "View trashed organizations"
										})]
									})
								]
							})]
						})
					})
				})
			]
		})
	})] });
}
function StatCard({ title, value, icon: Icon, href, description }) {
	const content = /* @__PURE__ */ jsx("div", {
		className: "rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20 hover:bg-accent/50",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-2xl font-semibold tabular-nums text-foreground",
					children: value.toLocaleString()
				}),
				description && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: description
				})
			] }), /* @__PURE__ */ jsx("div", {
				className: "rounded-md bg-primary/5 p-2",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary" })
			})]
		})
	});
	if (href) return /* @__PURE__ */ jsx(Link, {
		href,
		children: content
	});
	return content;
}
function BarRow({ label, value, maxValue, href }) {
	const percentage = maxValue > 0 ? value / maxValue * 100 : 0;
	const content = /* @__PURE__ */ jsxs("div", {
		className: "group",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between text-sm",
			children: [/* @__PURE__ */ jsx("span", {
				className: "truncate text-foreground group-hover:text-primary transition-colors",
				children: label
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: "tabular-nums text-muted-foreground",
					children: value
				}), href && /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ jsx("div", {
				className: "h-full rounded-full bg-primary transition-all duration-300",
				style: { width: `${percentage}%` }
			})
		})]
	});
	if (href) return /* @__PURE__ */ jsx(Link, {
		href,
		className: "block",
		children: content
	});
	return content;
}
function EmptyState({ icon: Icon, title, description }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-center py-8 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "rounded-full bg-muted p-3",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-muted-foreground" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-3 text-sm font-medium text-foreground",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: description
			})
		]
	});
}
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ jsx(CheckboxPrimitive.Root, {
		"data-slot": "checkbox",
		className: cn("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none",
			children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
		})
	});
}
var Create_exports$2 = /* @__PURE__ */ __export({ default: () => UsersCreate }, 1);
function UsersCreate({ onClose }) {
	const form = useForm({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		owner: false
	}, users.create());
	const handleSubmit = (e) => {
		e.preventDefault();
		form.submit({
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router$1.visit(users.index());
			}
		});
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router$1.visit(users.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Create User" }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "text-lg font-semibold mb-6",
			children: "Create User"
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: handleSubmit,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "first_name",
							children: "First Name"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "first_name",
							value: form.data.first_name,
							onChange: (e) => form.setData("first_name", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.first_name && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.first_name
						})
					] }), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "last_name",
							children: "Last Name"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "last_name",
							value: form.data.last_name,
							onChange: (e) => form.setData("last_name", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.last_name && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.last_name
						})
					] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "email",
						children: "Email"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "email",
						type: "email",
						value: form.data.email,
						onChange: (e) => form.setData("email", e.target.value),
						className: "mt-1.5"
					}),
					form.errors.email && /* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-destructive",
						children: form.errors.email
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(Label, {
						htmlFor: "password",
						children: "Password"
					}),
					/* @__PURE__ */ jsx(Input, {
						id: "password",
						type: "password",
						value: form.data.password,
						onChange: (e) => form.setData("password", e.target.value),
						className: "mt-1.5"
					}),
					form.errors.password && /* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-destructive",
						children: form.errors.password
					})
				] }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Checkbox, {
						id: "owner",
						checked: form.data.owner,
						onCheckedChange: (checked) => form.setData("owner", checked === true)
					}), /* @__PURE__ */ jsx(Label, {
						htmlFor: "owner",
						className: "cursor-pointer",
						children: "Owner (Administrator)"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t border-border pt-5",
					children: [/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						onClick: handleCancel,
						children: "Cancel"
					}), /* @__PURE__ */ jsx(Button, {
						type: "submit",
						disabled: form.processing,
						children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Creating..."] }) : "Create User"
					})]
				})
			]
		})]
	})] });
}
var Edit_exports$2 = /* @__PURE__ */ __export({ default: () => UsersEdit }, 1);
function UsersEdit({ onClose }) {
	const { props } = usePage();
	const { user } = props;
	const form = useForm({
		first_name: user.firstName,
		last_name: user.lastName,
		email: user.email,
		owner: user.owner
	}, users.update(user.id));
	const handleSubmit = (e) => {
		e.preventDefault();
		form.submit({
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router$1.visit(users.index());
			}
		});
	};
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${user.name}?`)) router$1.visit(users.delete(user.id));
	};
	const handleRestore = () => {
		router$1.visit(users.restore(user.id));
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router$1.visit(users.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Edit ${user.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-lg font-semibold",
					children: ["Edit ", user.name]
				}), /* @__PURE__ */ jsx(ViewerIndicator, {
					type: "user",
					id: user.id
				})]
			}),
			user.deletedAt && /* @__PURE__ */ jsx(DeletedNotice, {
				entityName: "user",
				onRestore: handleRestore
			}),
			/* @__PURE__ */ jsxs("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "first_name",
								children: "First Name"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "first_name",
								value: form.data.first_name,
								onChange: (e) => form.setData("first_name", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.first_name && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.first_name
							})
						] }), /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx(Label, {
								htmlFor: "last_name",
								children: "Last Name"
							}),
							/* @__PURE__ */ jsx(Input, {
								id: "last_name",
								value: form.data.last_name,
								onChange: (e) => form.setData("last_name", e.target.value),
								className: "mt-1.5"
							}),
							form.errors.last_name && /* @__PURE__ */ jsx("p", {
								className: "mt-1.5 text-sm text-destructive",
								children: form.errors.last_name
							})
						] })]
					}),
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx(Label, {
							htmlFor: "email",
							children: "Email"
						}),
						/* @__PURE__ */ jsx(Input, {
							id: "email",
							type: "email",
							value: form.data.email,
							onChange: (e) => form.setData("email", e.target.value),
							className: "mt-1.5"
						}),
						form.errors.email && /* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-destructive",
							children: form.errors.email
						})
					] }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Checkbox, {
							id: "owner",
							checked: form.data.owner,
							onCheckedChange: (checked) => form.setData("owner", checked === true)
						}), /* @__PURE__ */ jsx(Label, {
							htmlFor: "owner",
							className: "cursor-pointer",
							children: "Owner (Administrator)"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between border-t border-border pt-5",
						children: [!user.deletedAt && /* @__PURE__ */ jsxs(Button, {
							type: "button",
							variant: "ghost",
							onClick: handleDelete,
							className: "text-destructive hover:text-destructive hover:bg-destructive/10",
							children: [/* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }), "Delete"]
						}), /* @__PURE__ */ jsxs("div", {
							className: "ml-auto flex gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "button",
								variant: "outline",
								onClick: handleCancel,
								children: "Cancel"
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								disabled: form.processing,
								children: form.processing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Saving..."] }) : "Save Changes"
							})]
						})]
					})
				]
			})
		]
	})] });
}
function UserFormSkeleton() {
	return /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-32 mb-6" }), /* @__PURE__ */ jsxs("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-20 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] })]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-12 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-18 mb-1.5" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })] }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-4 rounded" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-36" })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-3 border-t border-border pt-5",
					children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-20" }), /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-28" })]
				})
			]
		})]
	});
}
var Index_exports$3 = /* @__PURE__ */ __export({ default: () => UsersIndex }, 1);
function UsersIndex() {
	const { props } = usePage();
	const users$1 = props.users;
	const { hasPendingChanges, hasNewRecords, pendingCount, isHighlighted, refresh, dismissUpdates } = useTableRealtime({
		topic: "crm:users",
		createEvent: "user_created",
		updateEvent: "user_updated",
		deleteEvent: "user_deleted"
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Users" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: "Users"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Manage team members and their permissions."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1.5 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsx(CircleDot, { className: "h-2 w-2 animate-pulse text-green-500" }), "Live"]
						}), /* @__PURE__ */ jsx(ClientModalLink, {
							href: users.new(),
							loadingComponent: UserFormSkeleton,
							modalConfig: {
								slideover: true,
								position: "right"
							},
							prefetch: true,
							children: /* @__PURE__ */ jsx("button", {
								className: "inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
								children: "New user"
							})
						})]
					})]
				}),
				hasPendingChanges && /* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ jsx("span", {
							className: "text-foreground",
							children: hasNewRecords ? `${pendingCount} new update${pendingCount > 1 ? "s" : ""} available` : "Some records have changed"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: refresh,
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90",
							children: "Refresh"
						}), /* @__PURE__ */ jsx("button", {
							onClick: dismissUpdates,
							className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					})]
				}),
				/* @__PURE__ */ jsx(Table, {
					resource: users$1,
					baseUrl: "/users",
					rowClassName: (row) => {
						const classes = [];
						if (row.deletedAt) classes.push("bg-muted/50 opacity-60");
						if (isHighlighted(row.id)) classes.push("animate-pulse bg-primary/10 ring-1 ring-primary/20");
						return classes.join(" ");
					},
					onRowClick: (row) => {
						router$1.visit(users.edit(row.id));
					},
					renderCell: (column, value, row) => {
						if (column.key === "name") return /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [row.photo ? /* @__PURE__ */ jsx("img", {
								src: row.photo,
								alt: "",
								className: "h-8 w-8 rounded-full object-cover"
							}) : /* @__PURE__ */ jsx("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium",
								children: row.name?.charAt(0)?.toUpperCase()
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-medium",
								children: row.name
							}), row.deletedAt && /* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: "(deleted)"
							})] })]
						});
						if (column.key === "owner") return /* @__PURE__ */ jsx("span", {
							className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", value === "Owner" ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"),
							children: String(value)
						});
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						users$1.meta.totalCount,
						" user",
						users$1.meta.totalCount !== 1 ? "s" : "",
						" total"
					]
				})
			]
		})
	})] });
}
var pages = {
	"./pages/Auth/Login.tsx": Login_exports,
	"./pages/Auth/Register.tsx": Register_exports,
	"./pages/Contacts/Create.tsx": Create_exports,
	"./pages/Contacts/Edit.tsx": Edit_exports,
	"./pages/Contacts/Index.tsx": Index_exports,
	"./pages/Dashboard.tsx": Dashboard_exports,
	"./pages/Home.tsx": Home_exports,
	"./pages/Organizations/Create.tsx": Create_exports$1,
	"./pages/Organizations/Edit.tsx": Edit_exports$1,
	"./pages/Organizations/Index.tsx": Index_exports$1,
	"./pages/Reports/Index.tsx": Index_exports$2,
	"./pages/Users/Create.tsx": Create_exports$2,
	"./pages/Users/Edit.tsx": Edit_exports$2,
	"./pages/Users/Index.tsx": Index_exports$3
};
var guestPages = [
	"Auth/Login",
	"Auth/Register",
	"Auth/ForgotPassword",
	"Auth/ResetPassword"
];
async function render(page) {
	return await createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		resolve: (name) => {
			const module = pages[`./pages/${name}.tsx`];
			if (!module) {
				const availablePages = Object.keys(pages).map((p) => p.replace("./pages/", "").replace(".tsx", "")).sort();
				throw new Error(`SSR Page Not Found\n\nComponent: ${name}\nExpected file: assets/js/pages/${name}.tsx\n\nAvailable pages (${availablePages.length}):\n` + availablePages.map((p) => `  - ${p}`).join("\n"));
			}
			const pageComponent = module.default;
			if (!pageComponent.layout) if (guestPages.includes(name)) pageComponent.layout = (page$1) => /* @__PURE__ */ jsx(GuestLayout, { children: page$1 });
			else pageComponent.layout = (page$1) => /* @__PURE__ */ jsx(AppLayout, { children: page$1 });
			return module;
		},
		setup: ({ App, props }) => {
			const renderInertiaApp = ({ Component, props: pageProps, key }) => {
				const renderComponent = () => {
					const child = createElement(Component, {
						key,
						...pageProps
					});
					if (typeof Component.layout === "function") return Component.layout(child);
					if (Array.isArray(Component.layout)) return Component.layout.concat(child).reverse().reduce((children, Layout) => createElement(Layout, pageProps, children));
					return child;
				};
				return renderComponent();
			};
			return /* @__PURE__ */ jsx(ModalStackProvider, { children: /* @__PURE__ */ jsx(App, {
				...props,
				children: renderInertiaApp
			}) });
		}
	});
}
export { render };
