import * as React$1 from "react";
import { createElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Link, createInertiaApp, router } from "@inertiajs/react";
import { useForm } from "@nordbeam/nb-inertia/react/useForm";
import { Head } from "@nordbeam/nb-inertia/react/Head";
import { ClientModalLink, ModalStackProvider, usePage } from "@nordbeam/nb-inertia/react/modals";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle, ArrowDown, ArrowUp, ArrowUpDown, BarChart3, Building2, Check, CheckCircle, CheckIcon, ChevronDownIcon, ChevronLeft, ChevronRight, ChevronRightIcon, ChevronUpIcon, ChevronsUpDown, Clock, Filter, Home, Info, Loader2, Lock, LogOut, Mail, MapPin, MoreHorizontal, PanelLeftIcon, Phone, Plus, RotateCcw, Search, SearchIcon, Settings, Sparkles, Trash2, TrendingUp, User, UserCircle, Users, X, XCircle, XIcon } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
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
		router.post(contacts.create.url(), data, {
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router.visit(contacts.index());
			}
		});
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router.visit(contacts.index());
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
		router.put(contacts.update.url(contact.id), data, {
			preserveScroll: true,
			onSuccess: () => {
				if (onClose) onClose();
				router.visit(contacts.index());
			}
		});
	};
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${contact.name}?`)) router.visit(contacts.delete(contact.id));
	};
	const handleRestore = () => {
		router.visit(contacts.restore(contact.id));
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router.visit(contacts.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Edit ${contact.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "text-lg font-semibold mb-6",
				children: ["Edit ", contact.name]
			}),
			contact.deletedAt && /* @__PURE__ */ jsx(DeletedNotice, {
				entityName: "contact",
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
function detectPaginationMode(meta) {
	if (!meta) return "page";
	if (meta.startCursor !== null || meta.endCursor !== null) return "cursor";
	if (meta.currentOffset !== null) return "offset";
	return "page";
}
function flopToQueryParams(params, options = {}) {
	const { paginationType = "page", skipDefaultOrdering = false, skipFirstPage = true, defaultPageSize } = options;
	const query = {};
	if (!skipDefaultOrdering && params.orderBy?.length) params.orderBy.forEach((field) => {
		const key = "order_by[]";
		if (query[key]) query[key].push(field);
		else query[key] = [field];
	});
	if (!skipDefaultOrdering && params.orderDirections?.length) params.orderDirections.forEach((dir) => {
		const key = "order_directions[]";
		if (query[key]) query[key].push(dir);
		else query[key] = [dir];
	});
	if (paginationType === "page") {
		if (params.page != null && !(skipFirstPage && params.page === 1)) query["page"] = String(params.page);
		if (defaultPageSize !== void 0 && params.pageSize != null && params.pageSize !== defaultPageSize) query["page_size"] = String(params.pageSize);
	} else if (paginationType === "offset") {
		if (params.offset != null && params.offset !== 0) query["offset"] = String(params.offset);
		if (params.limit != null) query["limit"] = String(params.limit);
	} else if (paginationType === "cursor") {
		if (params.first != null) query["first"] = String(params.first);
		if (params.last != null) query["last"] = String(params.last);
		if (params.after != null) query["after"] = params.after;
		if (params.before != null) query["before"] = params.before;
	}
	if (params.filters?.length) params.filters.forEach((filter, index$7) => {
		query[`filters[${index$7}][field]`] = filter.field;
		query[`filters[${index$7}][op]`] = filter.op;
		query[`filters[${index$7}][value]`] = String(filter.value);
	});
	return query;
}
function useFlopParams(meta, options = {}) {
	const { onParamsChange, initialParams = {} } = options;
	const [params, setParamsState] = useState(() => ({
		...meta?.flop,
		...initialParams
	}));
	const paginationMode = useMemo(() => detectPaginationMode(meta), [meta]);
	const updateParams = useCallback((updater) => {
		setParamsState((prev) => {
			const next = updater(prev);
			onParamsChange?.(next);
			return next;
		});
	}, [onParamsChange]);
	const setSort = useCallback((field, direction = "asc") => {
		updateParams((prev) => ({
			...prev,
			orderBy: direction ? [field] : null,
			orderDirections: direction ? [direction] : null,
			page: paginationMode === "page" ? 1 : prev.page,
			offset: paginationMode === "offset" ? 0 : prev.offset,
			after: null,
			before: null
		}));
	}, [updateParams, paginationMode]);
	const toggleSort = useCallback((field) => {
		const currentField = params.orderBy?.[0];
		const currentDirection = params.orderDirections?.[0];
		let newDirection;
		if (currentField !== field) newDirection = "asc";
		else if (currentDirection === "asc") newDirection = "desc";
		else newDirection = null;
		setSort(field, newDirection);
	}, [
		params.orderBy,
		params.orderDirections,
		setSort
	]);
	const clearSort = useCallback(() => {
		updateParams((prev) => ({
			...prev,
			orderBy: null,
			orderDirections: null
		}));
	}, [updateParams]);
	const getSortDirection = useCallback((field) => {
		const index$7 = params.orderBy?.indexOf(field) ?? -1;
		if (index$7 === -1) return null;
		const dir = params.orderDirections?.[index$7];
		if (dir?.startsWith("asc")) return "asc";
		if (dir?.startsWith("desc")) return "desc";
		return null;
	}, [params.orderBy, params.orderDirections]);
	const setFilter = useCallback((field, op, value) => {
		updateParams((prev) => {
			const filters = prev.filters?.filter((f) => !(f.field === field && f.op === op)) ?? [];
			return {
				...prev,
				filters: [...filters, {
					field,
					op,
					value
				}],
				page: paginationMode === "page" ? 1 : prev.page,
				offset: paginationMode === "offset" ? 0 : prev.offset,
				after: null,
				before: null
			};
		});
	}, [updateParams, paginationMode]);
	const removeFilter = useCallback((field, op) => {
		updateParams((prev) => ({
			...prev,
			filters: prev.filters?.filter((f) => f.field !== field || op !== void 0 && f.op !== op),
			page: paginationMode === "page" ? 1 : prev.page,
			offset: paginationMode === "offset" ? 0 : prev.offset,
			after: null,
			before: null
		}));
	}, [updateParams, paginationMode]);
	const clearFilters = useCallback(() => {
		updateParams((prev) => ({
			...prev,
			filters: [],
			page: paginationMode === "page" ? 1 : prev.page,
			offset: paginationMode === "offset" ? 0 : prev.offset,
			after: null,
			before: null
		}));
	}, [updateParams, paginationMode]);
	const getFilterValue = useCallback((field, op) => {
		return (params.filters?.find((f) => f.field === field && (op === void 0 || f.op === op)))?.value;
	}, [params.filters]);
	const setPage = useCallback((page) => {
		updateParams((prev) => ({
			...prev,
			page
		}));
	}, [updateParams]);
	return {
		params,
		meta,
		paginationMode,
		setSort,
		toggleSort,
		clearSort,
		getSortDirection,
		setFilter,
		removeFilter,
		clearFilters,
		getFilterValue,
		setPage,
		nextPage: useCallback(() => {
			if (meta?.hasNextPage && meta.nextPage) setPage(meta.nextPage);
		}, [meta, setPage]),
		previousPage: useCallback(() => {
			if (meta?.hasPreviousPage && meta.previousPage) setPage(meta.previousPage);
		}, [meta, setPage]),
		setPageSize: useCallback((size) => {
			updateParams((prev) => ({
				...prev,
				pageSize: size,
				page: 1
			}));
		}, [updateParams]),
		setOffset: useCallback((offset) => {
			updateParams((prev) => ({
				...prev,
				offset
			}));
		}, [updateParams]),
		goToNextCursor: useCallback(() => {
			if (meta?.hasNextPage && meta.endCursor) updateParams((prev) => ({
				...prev,
				after: meta.endCursor,
				before: null
			}));
		}, [meta, updateParams]),
		goToPreviousCursor: useCallback(() => {
			if (meta?.hasPreviousPage && meta.startCursor) updateParams((prev) => ({
				...prev,
				before: meta.startCursor,
				after: null
			}));
		}, [meta, updateParams]),
		setParams: useCallback((newParams) => {
			updateParams((prev) => ({
				...prev,
				...newParams
			}));
		}, [updateParams]),
		resetParams: useCallback(() => {
			updateParams(() => ({
				...meta?.flop,
				...initialParams
			}));
		}, [
			updateParams,
			meta,
			initialParams
		])
	};
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
const OPERATOR_LABELS = {
	"==": "is",
	"!=": "is not",
	"ilike": "contains",
	"not_ilike": "does not contain",
	"like": "contains (case-sensitive)",
	"not_like": "does not contain (case-sensitive)",
	"empty": "is empty",
	"not_empty": "is not empty",
	">": "greater than",
	"<": "less than",
	">=": "at least",
	"<=": "at most",
	"in": "is any of",
	"not_in": "is none of",
	"=~": "matches"
};
function getOperatorLabel(op) {
	return OPERATOR_LABELS[op] || op;
}
function getDefaultOperator(type) {
	switch (type) {
		case "string": return "ilike";
		case "boolean": return "==";
		case "enum": return "==";
		case "relation": return "==";
		case "number": return "==";
		case "date": return "==";
		default: return "==";
	}
}
function formatFilterValue(value, options) {
	if (value === null || value === void 0 || value === "") return "(empty)";
	if (options) {
		const option = options.find((o) => o.value === value);
		if (option) return option.label;
	}
	if (typeof value === "boolean") return value ? "Yes" : "No";
	return String(value);
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
function FilterValueSelect({ options, value, onSelect, placeholder = "Search..." }) {
	return /* @__PURE__ */ jsxs(Command$1, {
		className: "rounded-lg border shadow-md",
		children: [/* @__PURE__ */ jsx(CommandInput, { placeholder }), /* @__PURE__ */ jsxs(CommandList, { children: [/* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }), /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => {
			const Icon = option.icon;
			const isSelected = option.value === value;
			return /* @__PURE__ */ jsxs(CommandItem, {
				value: option.label,
				onSelect: () => onSelect(option.value),
				className: isSelected ? "bg-accent" : "",
				children: [Icon && /* @__PURE__ */ jsx(Icon, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: option.label })]
			}, String(option.value));
		}) })] })]
	});
}
function FilterValueInput({ value = "", onChange, placeholder = "Enter value...", type = "text", debounceMs = 500 }) {
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
	return /* @__PURE__ */ jsx(Input, {
		type,
		value: localValue,
		onChange: handleChange,
		onKeyDown: handleKeyDown,
		onBlur: handleBlur,
		placeholder,
		className: "h-8"
	});
}
function FilterChip({ config, operator, value, filterOptions, onOperatorChange, onValueChange, onRemove }) {
	const Icon = config.icon;
	const operatorLabel = getOperatorLabel(operator);
	const options = filterOptions || config.options || [];
	const valueLabel = formatFilterValue(value, options);
	const hasMultipleOperators = config.operators.length > 1;
	const isSelectType = config.type === "enum" || config.type === "relation" || config.type === "boolean";
	return /* @__PURE__ */ jsxs(Badge, {
		variant: "secondary",
		className: "flex items-center gap-1 px-2 py-1 h-7 text-sm font-normal",
		children: [
			Icon && /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
			/* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: config.label
			}),
			hasMultipleOperators ? /* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "px-1 hover:bg-muted rounded text-xs text-muted-foreground hover:text-foreground transition-colors",
					children: operatorLabel
				})
			}), /* @__PURE__ */ jsx(PopoverContent, {
				className: "w-40 p-1",
				align: "start",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex flex-col gap-0.5",
					children: config.operators.map((op) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onOperatorChange(op),
						className: `text-left px-2 py-1.5 text-sm rounded hover:bg-muted transition-colors ${op === operator ? "bg-muted font-medium" : ""}`,
						children: getOperatorLabel(op)
					}, op))
				})
			})] }) : /* @__PURE__ */ jsx("span", {
				className: "text-xs text-muted-foreground",
				children: operatorLabel
			}),
			/* @__PURE__ */ jsxs(Popover, { children: [/* @__PURE__ */ jsx(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "px-1.5 py-0.5 bg-background border rounded text-xs font-medium hover:bg-muted transition-colors max-w-[120px] truncate",
					children: valueLabel
				})
			}), /* @__PURE__ */ jsx(PopoverContent, {
				className: "w-56 p-2",
				align: "start",
				children: isSelectType && options.length > 0 ? /* @__PURE__ */ jsx(FilterValueSelect, {
					options,
					value,
					onSelect: onValueChange,
					placeholder: config.placeholder
				}) : /* @__PURE__ */ jsx(FilterValueInput, {
					value: String(value || ""),
					onChange: onValueChange,
					placeholder: config.placeholder,
					type: config.type === "number" ? "number" : config.type === "date" ? "date" : "text"
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
function AddFilterButton({ configs, filterOptions = {}, onAddFilter }) {
	const [inputValues, setInputValues] = useState({});
	const [open, setOpen] = useState(false);
	const handleSelectValue = (field, type, value, operators) => {
		const op = getDefaultOperator(type);
		onAddFilter(field, operators.includes(op) ? op : operators[0], value);
		setOpen(false);
		setInputValues((prev) => ({
			...prev,
			[field]: ""
		}));
	};
	const handleInputKeyDown = (e, field, type, operators) => {
		if (e.key === "Enter") {
			const value = inputValues[field]?.trim();
			if (value) handleSelectValue(field, type, value, operators);
		}
	};
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
			children: configs.map((config) => {
				const Icon = config.icon;
				const options = config.optionsKey && filterOptions[config.optionsKey] || config.options || [];
				if (options.length > 0) return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, {
					className: "gap-2",
					children: [Icon && /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: config.label })]
				}), /* @__PURE__ */ jsx(DropdownMenuSubContent, {
					className: "p-0",
					children: /* @__PURE__ */ jsxs(Command$1, { children: [/* @__PURE__ */ jsx(CommandInput, { placeholder: `Search ${config.label.toLowerCase()}...` }), /* @__PURE__ */ jsxs(CommandList, { children: [/* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }), /* @__PURE__ */ jsx(CommandGroup, { children: options.map((option) => {
						const OptionIcon = option.icon;
						return /* @__PURE__ */ jsxs(CommandItem, {
							value: option.label,
							onSelect: () => handleSelectValue(config.customParam || config.field, config.type, option.value, config.operators),
							children: [OptionIcon && /* @__PURE__ */ jsx(OptionIcon, { className: "mr-2 h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: option.label })]
						}, String(option.value));
					}) })] })] })
				})] }, config.field);
				return /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [/* @__PURE__ */ jsxs(DropdownMenuSubTrigger, {
					className: "gap-2",
					children: [Icon && /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: config.label })]
				}), /* @__PURE__ */ jsxs(DropdownMenuSubContent, {
					className: "p-2 w-48",
					children: [/* @__PURE__ */ jsx(Input, {
						type: config.type === "number" ? "number" : "text",
						placeholder: config.placeholder || `Enter ${config.label.toLowerCase()}...`,
						value: inputValues[config.field] || "",
						onChange: (e) => setInputValues((prev) => ({
							...prev,
							[config.field]: e.target.value
						})),
						onKeyDown: (e) => handleInputKeyDown(e, config.customParam || config.field, config.type, config.operators),
						autoFocus: true,
						className: "h-8"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Press Enter to add filter"
					})]
				})] }, config.field);
			})
		})]
	});
}
function FilterModeToggle({ mode, onChange }) {
	const handleToggle = () => {
		onChange(mode === "all" ? "any" : "all");
	};
	return /* @__PURE__ */ jsx(Button, {
		variant: "ghost",
		size: "sm",
		className: "h-7 text-xs text-muted-foreground hover:text-foreground",
		onClick: handleToggle,
		children: mode === "all" ? "Match all filters" : "Match any filter"
	});
}
function FilterBar({ configs, filters, customFilters = {}, filterOptions = {}, filterMode, onFilterChange, onFilterRemove, onCustomFilterChange, onClearFilters, onFilterModeChange, className = "" }) {
	const activeFilters = [];
	configs.forEach((config) => {
		if (config.customParam && customFilters[config.customParam] !== void 0) {
			const value = customFilters[config.customParam];
			if (value !== "" && value !== null && value !== "all" && value !== "not_trashed") activeFilters.push({
				config,
				operator: "==",
				value,
				isCustom: true
			});
		}
	});
	filters.forEach((filter) => {
		const config = configs.find((c) => c.field === filter.field || c.customParam === filter.field);
		if (config && !config.customParam) activeFilters.push({
			config,
			operator: filter.op,
			value: filter.value,
			isCustom: false
		});
	});
	const hasActiveFilters = activeFilters.length > 0;
	const handleFilterChange = (config, isCustom, op, value) => {
		if (isCustom && config.customParam && onCustomFilterChange) onCustomFilterChange(config.customParam, value);
		else onFilterChange(config.field, op, value);
	};
	const handleFilterRemove = (config, isCustom, op) => {
		if (isCustom && config.customParam && onCustomFilterChange) onCustomFilterChange(config.customParam, void 0);
		else onFilterRemove(config.field, op);
	};
	const availableConfigs = configs.filter((config) => {
		if (config.customParam) return !activeFilters.some((af) => af.config.field === config.field);
		return true;
	});
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-wrap items-center gap-2 ${className}`,
		role: "group",
		"aria-label": "Active filters",
		children: [
			activeFilters.map((af, index$7) => {
				const options = af.config.optionsKey && filterOptions[af.config.optionsKey] || af.config.options;
				return /* @__PURE__ */ jsx(FilterChip, {
					config: af.config,
					operator: af.operator,
					value: af.value,
					filterOptions: options,
					onOperatorChange: (op) => handleFilterChange(af.config, af.isCustom, op, af.value),
					onValueChange: (value) => handleFilterChange(af.config, af.isCustom, af.operator, value),
					onRemove: () => handleFilterRemove(af.config, af.isCustom, af.operator)
				}, `${af.config.field}-${af.operator}-${index$7}`);
			}),
			availableConfigs.length > 0 && /* @__PURE__ */ jsx(AddFilterButton, {
				configs: availableConfigs,
				filterOptions,
				onAddFilter: (field, op, value) => {
					const config = configs.find((c) => c.field === field || c.customParam === field);
					if (config?.customParam && onCustomFilterChange) onCustomFilterChange(config.customParam, value);
					else onFilterChange(field, op, value);
				}
			}),
			activeFilters.length > 1 && /* @__PURE__ */ jsx(FilterModeToggle, {
				mode: filterMode,
				onChange: onFilterModeChange
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
const DataTableContext = React$1.createContext({});
function useDataTableContext() {
	return React$1.useContext(DataTableContext);
}
function DataTable({ columns, data, meta, onSortChange, getSortDirection, emptyState, className, rowClassName, onRowClick, footer }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		manualSorting: true,
		pageCount: meta?.totalPages ?? -1
	});
	const contextValue = React$1.useMemo(() => ({
		onSortChange,
		getSortDirection
	}), [onSortChange, getSortDirection]);
	const getRowClassName = (row) => {
		if (typeof rowClassName === "function") return rowClassName(row);
		return rowClassName ?? "";
	};
	return /* @__PURE__ */ jsx(DataTableContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("overflow-hidden", className),
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [
					/* @__PURE__ */ jsx("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", {
						className: "border-b border-border",
						children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx("th", {
							className: "h-10 px-4 text-left align-middle text-xs font-medium uppercase tracking-wider text-muted-foreground",
							children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
						}, header.id))
					}, headerGroup.id)) }),
					/* @__PURE__ */ jsx("tbody", { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row, index$7) => /* @__PURE__ */ jsx("tr", {
						"data-state": row.getIsSelected() && "selected",
						className: cn("transition-colors", "hover:bg-accent/50", "data-[state=selected]:bg-accent", index$7 !== table.getRowModel().rows.length - 1 && "border-b border-border", onRowClick && "cursor-pointer", getRowClassName(row)),
						onClick: onRowClick ? () => onRowClick(row) : void 0,
						children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx("td", {
							className: "px-4 py-3 align-middle text-foreground",
							children: flexRender(cell.column.columnDef.cell, cell.getContext())
						}, cell.id))
					}, row.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan: columns.length,
						className: "px-4 py-12 text-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col items-center gap-2",
							children: [/* @__PURE__ */ jsx(EmptyIcon, { className: "h-8 w-8 text-muted-foreground/50" }), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: emptyState ?? "No results found."
							})]
						})
					}) }) }),
					footer && /* @__PURE__ */ jsx("tfoot", {
						className: "border-t border-border bg-muted/30",
						children: footer(table)
					})
				]
			})
		})
	});
}
function EmptyIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		className,
		fill: "none",
		viewBox: "0 0 24 24",
		strokeWidth: 1.5,
		stroke: "currentColor",
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
		})
	});
}
function SortableColumnHeader({ field, children, className = "" }) {
	const { onSortChange, getSortDirection } = useDataTableContext();
	const direction = getSortDirection?.(field) ?? null;
	const isActive = direction !== null;
	const handleClick = () => {
		if (!onSortChange) return;
		let newDirection;
		if (!isActive) newDirection = "asc";
		else if (direction === "asc") newDirection = "desc";
		else newDirection = null;
		onSortChange(field, newDirection);
	};
	if (!onSortChange) return /* @__PURE__ */ jsx("span", {
		className: "text-xs font-medium uppercase tracking-wider",
		children
	});
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick: handleClick,
		className: cn("inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider transition-colors", "hover:text-foreground focus:outline-none focus-visible:text-foreground", isActive ? "text-foreground" : "text-muted-foreground", className),
		"aria-sort": direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none",
		children: [/* @__PURE__ */ jsx("span", { children }), direction === "asc" ? /* @__PURE__ */ jsx(ArrowUp, { className: "h-3.5 w-3.5" }) : direction === "desc" ? /* @__PURE__ */ jsx(ArrowDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx(ArrowUpDown, { className: "h-3.5 w-3.5 opacity-40" })]
	});
}
function PageHeader({ title, description, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-6 flex items-center justify-between",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-xl font-semibold text-foreground",
			children: title
		}), description && /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] }), action && /* @__PURE__ */ jsx(ClientModalLink, {
			href: action.href,
			loadingComponent: action.loadingComponent,
			modalConfig: action.modalConfig,
			prefetch: action.prefetch,
			cacheFor: action.cacheFor,
			children: /* @__PURE__ */ jsxs(Button, {
				size: "sm",
				className: "gap-1.5",
				children: [action.icon ?? /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), action.label]
			})
		})]
	});
}
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
const contactsFilterConfig = [
	{
		field: "organization_id",
		label: "Organization",
		type: "relation",
		operators: ["==", "!="],
		icon: Building2,
		optionsKey: "organizations"
	},
	{
		field: "trashed",
		label: "Status",
		type: "enum",
		operators: ["=="],
		icon: Settings,
		customParam: "trashed",
		options: [
			{
				value: "not_trashed",
				label: "Active"
			},
			{
				value: "with",
				label: "With Deleted"
			},
			{
				value: "only",
				label: "Only Deleted"
			}
		]
	},
	{
		field: "first_name",
		label: "First Name",
		type: "string",
		operators: [
			"ilike",
			"==",
			"!="
		],
		icon: User,
		placeholder: "Enter first name..."
	},
	{
		field: "last_name",
		label: "Last Name",
		type: "string",
		operators: [
			"ilike",
			"==",
			"!="
		],
		icon: User,
		placeholder: "Enter last name..."
	},
	{
		field: "email",
		label: "Email",
		type: "string",
		operators: ["ilike", "=="],
		icon: Mail,
		placeholder: "Enter email..."
	},
	{
		field: "phone",
		label: "Phone",
		type: "string",
		operators: ["ilike", "=="],
		icon: Phone,
		placeholder: "Enter phone..."
	},
	{
		field: "city",
		label: "City",
		type: "string",
		operators: ["ilike", "=="],
		icon: MapPin,
		placeholder: "Enter city..."
	},
	{
		field: "country",
		label: "Country",
		type: "string",
		operators: ["==", "!="],
		icon: MapPin,
		placeholder: "Enter country code..."
	}
];
var columns_exports = /* @__PURE__ */ __export({ createColumns: () => createColumns$2 }, 1);
function createColumns$2({ onDelete, onRestore }) {
	return [
		{
			accessorKey: "name",
			header: () => /* @__PURE__ */ jsx(SortableColumnHeader, {
				field: "last_name",
				children: "Name"
			}),
			cell: ({ row }) => {
				const contact = row.original;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: contact.name
					}), contact.deletedAt && /* @__PURE__ */ jsx(Badge, {
						variant: "destructive",
						children: "Deleted"
					})]
				});
			}
		},
		{
			accessorKey: "organizationName",
			header: "Organization",
			cell: ({ row }) => row.original.organizationName || "-"
		},
		{
			accessorKey: "city",
			header: () => /* @__PURE__ */ jsx(SortableColumnHeader, {
				field: "city",
				children: "City"
			}),
			cell: ({ row }) => row.original.city || "-"
		},
		{
			accessorKey: "phone",
			header: "Phone",
			cell: ({ row }) => row.original.phone || "-"
		},
		{
			id: "actions",
			header: () => /* @__PURE__ */ jsx("div", {
				className: "text-right",
				children: "Actions"
			}),
			cell: ({ row }) => {
				const contact = row.original;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ jsx(ClientModalLink, {
						href: contacts.edit(contact.id),
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							children: "Edit"
						})
					}), contact.deletedAt ? /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onRestore(contact),
						children: "Restore"
					}) : /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						className: "text-red-600 hover:text-red-700",
						onClick: () => onDelete(contact),
						children: "Delete"
					})]
				});
			}
		}
	];
}
var Index_exports = /* @__PURE__ */ __export({ default: () => ContactsIndex }, 1);
function ContactsIndex() {
	const { props } = usePage();
	const contacts$1 = props.contacts;
	const { meta, filters } = props;
	const filterOptions = props.filter_options || {};
	const [search, setSearch] = useState(filters?.search || "");
	const [filterMode, setFilterMode] = useState(props.filter_mode || "all");
	const flop = useFlopParams(meta, { onParamsChange: (params) => {
		const query = {
			...flopToQueryParams(params),
			search: search || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		};
		router.visit(contacts.index({ query }), {
			preserveState: true,
			preserveScroll: true
		});
	} });
	const handleSearch = (e) => {
		e.preventDefault();
		router.visit(contacts.index({ query: {
			search: search || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		} }), { preserveState: true });
	};
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		if (!value && filters?.search) router.visit(contacts.index({ query: {
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		} }), { preserveState: true });
	};
	const handleCustomFilterChange = (param, value) => {
		const query = {
			search: filters?.search,
			trashed: filters?.trashed,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		};
		query[param] = value;
		router.visit(contacts.index({ query }), { preserveState: true });
	};
	const handleFilterModeChange = (mode) => {
		setFilterMode(mode);
		router.visit(contacts.index({ query: {
			...flopToQueryParams(flop.params),
			search: filters?.search,
			trashed: filters?.trashed,
			filter_mode: mode !== "all" ? mode : void 0
		} }), { preserveState: true });
	};
	const handleClearFilters = () => {
		flop.clearFilters();
		router.visit(contacts.index({ query: { search: filters?.search } }), { preserveState: true });
	};
	const handleDelete = (contact) => {
		if (confirm(`Are you sure you want to delete ${contact.name}?`)) router.visit(contacts.delete(contact.id));
	};
	const handleRestore = (contact) => {
		router.visit(contacts.restore(contact.id));
	};
	const columns = useMemo(() => createColumns$2({
		onDelete: handleDelete,
		onRestore: handleRestore
	}), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Contacts" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsx(PageHeader, {
					title: "Contacts",
					description: "Manage your contacts and their information.",
					action: {
						label: "New contact",
						href: contacts.new(),
						loadingComponent: ContactFormSkeleton,
						modalConfig: {
							slideover: true,
							position: "right"
						},
						prefetch: true
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4 space-y-3",
					children: [/* @__PURE__ */ jsx(SearchInput, {
						value: search,
						onChange: handleSearchChange,
						onSubmit: handleSearch,
						placeholder: "Search contacts..."
					}), /* @__PURE__ */ jsx(FilterBar, {
						configs: contactsFilterConfig,
						filters: flop.params.filters ?? [],
						customFilters: filters,
						filterOptions,
						filterMode,
						onFilterChange: (field, op, value) => flop.setFilter(field, op, value),
						onFilterRemove: (field, op) => flop.removeFilter(field, op),
						onCustomFilterChange: handleCustomFilterChange,
						onClearFilters: handleClearFilters,
						onFilterModeChange: handleFilterModeChange
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-card",
					children: [/* @__PURE__ */ jsx(DataTable, {
						columns,
						data: contacts$1,
						meta,
						onSortChange: flop.setSort,
						getSortDirection: flop.getSortDirection,
						emptyState: "No contacts found.",
						rowClassName: (row) => row.original.deletedAt ? "bg-muted/50 opacity-60" : ""
					}), meta.totalPages && meta.totalPages > 1 && /* @__PURE__ */ jsx("div", {
						className: "border-t border-border px-4 py-3",
						children: /* @__PURE__ */ jsx(Pagination, {
							meta,
							onPageChange: flop.setPage,
							className: "flex items-center justify-center gap-1"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						meta.totalCount,
						" contact",
						meta.totalCount !== 1 ? "s" : "",
						" total"
					]
				})
			]
		})
	})] });
}
var Dashboard_exports = /* @__PURE__ */ __export({ default: () => Dashboard }, 1);
function Dashboard() {
	const { props } = usePage();
	const { user, stats } = props;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Dashboard" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8",
					children: [/* @__PURE__ */ jsxs("h1", {
						className: "text-xl font-semibold text-foreground",
						children: [
							"Good ",
							getGreeting(),
							user?.firstName ? `, ${user.firstName}` : ""
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Here's what's happening with your CRM today."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ jsx(StatCard, {
							title: "Contacts",
							value: stats?.contacts ?? 0,
							href: "/contacts",
							icon: Users
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Organizations",
							value: stats?.organizations ?? 0,
							href: "/organizations",
							icon: Building2
						}),
						/* @__PURE__ */ jsx(StatCard, {
							title: "Users",
							value: stats?.users ?? 0,
							href: "/users",
							icon: User
						}),
						/* @__PURE__ */ jsx(StatCard, {
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
								}), /* @__PURE__ */ jsx(Link, {
									href: "/reports",
									className: "text-xs font-medium text-primary hover:text-primary/80 transition-colors",
									children: "View all"
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "p-5",
								children: /* @__PURE__ */ jsx(EmptyState, {
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
function StatCard({ title, value, href, icon: Icon, isMonetary }) {
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
				children: isMonetary ? value : value.toLocaleString()
			})] }), /* @__PURE__ */ jsx("div", {
				className: "rounded-md bg-primary/5 p-2 transition-colors group-hover:bg-primary/10",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary" })
			})]
		})
	});
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
				router.visit(organizations.index());
			}
		});
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router.visit(organizations.index());
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
				router.visit(organizations.index());
			}
		});
	};
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${organization.name}?`)) router.visit(organizations.delete(organization.id));
	};
	const handleRestore = () => {
		router.visit(organizations.restore(organization.id));
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router.visit(organizations.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Edit ${organization.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "text-lg font-semibold mb-6",
				children: ["Edit ", organization.name]
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
const organizationsFilterConfig = [
	{
		field: "trashed",
		label: "Status",
		type: "enum",
		operators: ["=="],
		icon: Settings,
		customParam: "trashed",
		options: [
			{
				value: "not_trashed",
				label: "Active"
			},
			{
				value: "with",
				label: "With Deleted"
			},
			{
				value: "only",
				label: "Only Deleted"
			}
		]
	},
	{
		field: "name",
		label: "Name",
		type: "string",
		operators: [
			"ilike",
			"==",
			"!="
		],
		icon: Building2,
		placeholder: "Enter organization name..."
	},
	{
		field: "email",
		label: "Email",
		type: "string",
		operators: ["ilike", "=="],
		icon: Mail,
		placeholder: "Enter email..."
	},
	{
		field: "city",
		label: "City",
		type: "string",
		operators: ["ilike", "=="],
		icon: MapPin,
		placeholder: "Enter city..."
	},
	{
		field: "country",
		label: "Country",
		type: "string",
		operators: ["==", "!="],
		icon: MapPin,
		placeholder: "Enter country code..."
	}
];
var columns_exports$1 = /* @__PURE__ */ __export({ createColumns: () => createColumns$1 }, 1);
function createColumns$1({ onDelete, onRestore }) {
	return [
		{
			accessorKey: "name",
			header: () => /* @__PURE__ */ jsx(SortableColumnHeader, {
				field: "name",
				children: "Name"
			}),
			cell: ({ row }) => {
				const organization = row.original;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: organization.name
					}), organization.deletedAt && /* @__PURE__ */ jsx(Badge, {
						variant: "destructive",
						children: "Deleted"
					})]
				});
			}
		},
		{
			accessorKey: "city",
			header: () => /* @__PURE__ */ jsx(SortableColumnHeader, {
				field: "city",
				children: "City"
			}),
			cell: ({ row }) => row.original.city || "-"
		},
		{
			accessorKey: "phone",
			header: "Phone",
			cell: ({ row }) => row.original.phone || "-"
		},
		{
			id: "actions",
			header: () => /* @__PURE__ */ jsx("div", {
				className: "text-right",
				children: "Actions"
			}),
			cell: ({ row }) => {
				const organization = row.original;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ jsx(ClientModalLink, {
						href: organizations.edit(organization.id),
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							children: "Edit"
						})
					}), organization.deletedAt ? /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onRestore(organization),
						children: "Restore"
					}) : /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						className: "text-red-600 hover:text-red-700",
						onClick: () => onDelete(organization),
						children: "Delete"
					})]
				});
			}
		}
	];
}
var Index_exports$1 = /* @__PURE__ */ __export({ default: () => OrganizationsIndex }, 1);
function OrganizationsIndex() {
	const { props } = usePage();
	const organizations$1 = props.organizations;
	const { meta, filters } = props;
	const [search, setSearch] = useState(filters?.search || "");
	const [filterMode, setFilterMode] = useState(props.filter_mode || "all");
	const flop = useFlopParams(meta, { onParamsChange: (params) => {
		const query = {
			...flopToQueryParams(params),
			search: search || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		};
		router.visit(organizations.index({ query }), {
			preserveState: true,
			preserveScroll: true
		});
	} });
	const handleSearch = (e) => {
		e.preventDefault();
		router.visit(organizations.index({ query: {
			search: search || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		} }), { preserveState: true });
	};
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		if (!value && filters?.search) router.visit(organizations.index({ query: {
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		} }), { preserveState: true });
	};
	const handleCustomFilterChange = (param, value) => {
		const query = {
			search: filters?.search,
			trashed: filters?.trashed,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		};
		query[param] = value;
		router.visit(organizations.index({ query }), { preserveState: true });
	};
	const handleFilterModeChange = (mode) => {
		setFilterMode(mode);
		router.visit(organizations.index({ query: {
			...flopToQueryParams(flop.params),
			search: filters?.search,
			trashed: filters?.trashed,
			filter_mode: mode !== "all" ? mode : void 0
		} }), { preserveState: true });
	};
	const handleClearFilters = () => {
		flop.clearFilters();
		router.visit(organizations.index({ query: { search: filters?.search } }), { preserveState: true });
	};
	const handleDelete = (organization) => {
		if (confirm(`Are you sure you want to delete ${organization.name}?`)) router.visit(organizations.delete(organization.id));
	};
	const handleRestore = (organization) => {
		router.visit(organizations.restore(organization.id));
	};
	const columns = useMemo(() => createColumns$1({
		onDelete: handleDelete,
		onRestore: handleRestore
	}), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Organizations" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsx(PageHeader, {
					title: "Organizations",
					description: "Manage your organizations and their contacts.",
					action: {
						label: "New organization",
						href: organizations.new()
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4 space-y-3",
					children: [/* @__PURE__ */ jsx(SearchInput, {
						value: search,
						onChange: handleSearchChange,
						onSubmit: handleSearch,
						placeholder: "Search organizations..."
					}), /* @__PURE__ */ jsx(FilterBar, {
						configs: organizationsFilterConfig,
						filters: flop.params.filters ?? [],
						customFilters: filters,
						filterMode,
						onFilterChange: (field, op, value) => flop.setFilter(field, op, value),
						onFilterRemove: (field, op) => flop.removeFilter(field, op),
						onCustomFilterChange: handleCustomFilterChange,
						onClearFilters: handleClearFilters,
						onFilterModeChange: handleFilterModeChange
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-card",
					children: [/* @__PURE__ */ jsx(DataTable, {
						columns,
						data: organizations$1,
						meta,
						onSortChange: flop.setSort,
						getSortDirection: flop.getSortDirection,
						emptyState: "No organizations found.",
						rowClassName: (row) => row.original.deletedAt ? "bg-muted/50 opacity-60" : ""
					}), meta.totalPages && meta.totalPages > 1 && /* @__PURE__ */ jsx("div", {
						className: "border-t border-border px-4 py-3",
						children: /* @__PURE__ */ jsx(Pagination, {
							meta,
							onPageChange: flop.setPage,
							className: "flex items-center justify-center gap-1"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						meta.totalCount,
						" organization",
						meta.totalCount !== 1 ? "s" : "",
						" total"
					]
				})
			]
		})
	})] });
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
				router.visit(users.index());
			}
		});
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router.visit(users.index());
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
				router.visit(users.index());
			}
		});
	};
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${user.name}?`)) router.visit(users.delete(user.id));
	};
	const handleRestore = () => {
		router.visit(users.restore(user.id));
	};
	const handleCancel = () => {
		if (onClose) onClose();
		else router.visit(users.index());
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `Edit ${user.name}` }), /* @__PURE__ */ jsxs("div", {
		className: "p-6",
		children: [
			/* @__PURE__ */ jsxs("h2", {
				className: "text-lg font-semibold mb-6",
				children: ["Edit ", user.name]
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
const usersFilterConfig = [
	{
		field: "role",
		label: "Role",
		type: "enum",
		operators: ["==", "!="],
		icon: User,
		customParam: "role",
		options: [{
			value: "owner",
			label: "Owner"
		}, {
			value: "user",
			label: "User"
		}]
	},
	{
		field: "trashed",
		label: "Status",
		type: "enum",
		operators: ["=="],
		icon: Settings,
		customParam: "trashed",
		options: [
			{
				value: "not_trashed",
				label: "Active"
			},
			{
				value: "with",
				label: "With Deleted"
			},
			{
				value: "only",
				label: "Only Deleted"
			}
		]
	},
	{
		field: "first_name",
		label: "First Name",
		type: "string",
		operators: [
			"ilike",
			"==",
			"!="
		],
		icon: UserCircle,
		placeholder: "Enter first name..."
	},
	{
		field: "last_name",
		label: "Last Name",
		type: "string",
		operators: [
			"ilike",
			"==",
			"!="
		],
		icon: UserCircle,
		placeholder: "Enter last name..."
	},
	{
		field: "email",
		label: "Email",
		type: "string",
		operators: ["ilike", "=="],
		icon: Mail,
		placeholder: "Enter email..."
	}
];
var columns_exports$2 = /* @__PURE__ */ __export({ createColumns: () => createColumns }, 1);
function createColumns({ onDelete, onRestore }) {
	return [
		{
			accessorKey: "name",
			header: () => /* @__PURE__ */ jsx(SortableColumnHeader, {
				field: "last_name",
				children: "Name"
			}),
			cell: ({ row }) => {
				const user = row.original;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						user.photo ? /* @__PURE__ */ jsx("img", {
							src: user.photo,
							alt: "",
							className: "h-8 w-8 rounded-full object-cover"
						}) : /* @__PURE__ */ jsxs("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600",
							children: [user.firstName?.[0], user.lastName?.[0]]
						}),
						/* @__PURE__ */ jsx("span", {
							className: "font-medium",
							children: user.name
						}),
						user.deletedAt && /* @__PURE__ */ jsx(Badge, {
							variant: "destructive",
							children: "Deleted"
						})
					]
				});
			}
		},
		{
			accessorKey: "email",
			header: () => /* @__PURE__ */ jsx(SortableColumnHeader, {
				field: "email",
				children: "Email"
			})
		},
		{
			accessorKey: "owner",
			header: "Role",
			cell: ({ row }) => {
				const user = row.original;
				return /* @__PURE__ */ jsx(Badge, {
					variant: user.owner ? "default" : "secondary",
					children: user.owner ? "Owner" : "User"
				});
			}
		},
		{
			id: "actions",
			header: () => /* @__PURE__ */ jsx("div", {
				className: "text-right",
				children: "Actions"
			}),
			cell: ({ row }) => {
				const user = row.original;
				return /* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ jsx(ClientModalLink, {
						href: users.edit(user.id),
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "sm",
							children: "Edit"
						})
					}), user.deletedAt ? /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onRestore(user),
						children: "Restore"
					}) : /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "sm",
						className: "text-red-600 hover:text-red-700",
						onClick: () => onDelete(user),
						children: "Delete"
					})]
				});
			}
		}
	];
}
var Index_exports$2 = /* @__PURE__ */ __export({ default: () => UsersIndex }, 1);
function UsersIndex() {
	const { props } = usePage();
	const users$1 = props.users;
	const { meta, filters } = props;
	const [search, setSearch] = useState(filters?.search || "");
	const [filterMode, setFilterMode] = useState(props.filter_mode || "all");
	const flop = useFlopParams(meta, { onParamsChange: (params) => {
		const query = {
			...flopToQueryParams(params),
			search: search || void 0,
			role: filters?.role || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		};
		router.visit(users.index({ query }), {
			preserveState: true,
			preserveScroll: true
		});
	} });
	const handleSearch = (e) => {
		e.preventDefault();
		router.visit(users.index({ query: {
			search: search || void 0,
			role: filters?.role || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		} }), { preserveState: true });
	};
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setSearch(value);
		if (!value && filters?.search) router.visit(users.index({ query: {
			role: filters?.role || void 0,
			trashed: filters?.trashed || void 0,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		} }), { preserveState: true });
	};
	const handleCustomFilterChange = (param, value) => {
		const query = {
			search: filters?.search,
			role: filters?.role,
			trashed: filters?.trashed,
			filter_mode: filterMode !== "all" ? filterMode : void 0
		};
		query[param] = value;
		router.visit(users.index({ query }), { preserveState: true });
	};
	const handleFilterModeChange = (mode) => {
		setFilterMode(mode);
		router.visit(users.index({ query: {
			...flopToQueryParams(flop.params),
			search: filters?.search,
			role: filters?.role,
			trashed: filters?.trashed,
			filter_mode: mode !== "all" ? mode : void 0
		} }), { preserveState: true });
	};
	const handleClearFilters = () => {
		flop.clearFilters();
		router.visit(users.index({ query: { search: filters?.search } }), { preserveState: true });
	};
	const handleDelete = (user) => {
		if (confirm(`Are you sure you want to delete ${user.name}?`)) router.visit(users.delete(user.id));
	};
	const handleRestore = (user) => {
		router.visit(users.restore(user.id));
	};
	const columns = useMemo(() => createColumns({
		onDelete: handleDelete,
		onRestore: handleRestore
	}), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Users" }), /* @__PURE__ */ jsx("div", {
		className: "px-6 py-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-5xl",
			children: [
				/* @__PURE__ */ jsx(PageHeader, {
					title: "Users",
					description: "Manage team members and their permissions.",
					action: {
						label: "New user",
						href: users.new()
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-4 space-y-3",
					children: [/* @__PURE__ */ jsx(SearchInput, {
						value: search,
						onChange: handleSearchChange,
						onSubmit: handleSearch,
						placeholder: "Search users..."
					}), /* @__PURE__ */ jsx(FilterBar, {
						configs: usersFilterConfig,
						filters: flop.params.filters ?? [],
						customFilters: filters,
						filterMode,
						onFilterChange: (field, op, value) => flop.setFilter(field, op, value),
						onFilterRemove: (field, op) => flop.removeFilter(field, op),
						onCustomFilterChange: handleCustomFilterChange,
						onClearFilters: handleClearFilters,
						onFilterModeChange: handleFilterModeChange
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-border bg-card",
					children: [/* @__PURE__ */ jsx(DataTable, {
						columns,
						data: users$1,
						meta,
						onSortChange: flop.setSort,
						getSortDirection: flop.getSortDirection,
						emptyState: "No users found.",
						rowClassName: (row) => row.original.deletedAt ? "bg-muted/50 opacity-60" : ""
					}), meta.totalPages && meta.totalPages > 1 && /* @__PURE__ */ jsx("div", {
						className: "border-t border-border px-4 py-3",
						children: /* @__PURE__ */ jsx(Pagination, {
							meta,
							onPageChange: flop.setPage,
							className: "flex items-center justify-center gap-1"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						meta.totalCount,
						" user",
						meta.totalCount !== 1 ? "s" : "",
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
	"./pages/Contacts/columns.tsx": columns_exports,
	"./pages/Dashboard.tsx": Dashboard_exports,
	"./pages/Home.tsx": Home_exports,
	"./pages/Organizations/Create.tsx": Create_exports$1,
	"./pages/Organizations/Edit.tsx": Edit_exports$1,
	"./pages/Organizations/Index.tsx": Index_exports$1,
	"./pages/Organizations/columns.tsx": columns_exports$1,
	"./pages/Users/Create.tsx": Create_exports$2,
	"./pages/Users/Edit.tsx": Edit_exports$2,
	"./pages/Users/Index.tsx": Index_exports$2,
	"./pages/Users/columns.tsx": columns_exports$2
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
