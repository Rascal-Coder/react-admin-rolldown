import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Separator } from "@/components/base/separator";
import { Sheet, SheetContent } from "@/components/base/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/base/tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";
import { composeRefs } from "@/lib/compose-refs";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { cn } from "@/utils";
import { useSidebarResize } from "./use-sidebar-resize";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "5rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

//* new constants for sidebar resizing
const MIN_SIDEBAR_WIDTH = "14rem";
const MAX_SIDEBAR_WIDTH = "22rem";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  //* new properties for sidebar resizing
  width: string;
  setWidth: (width: string) => void;
  //* new properties for tracking is dragging rail
  isDraggingRail: boolean;
  setIsDraggingRail: (isDraggingRail: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

type SidebarProviderProps = React.ComponentPropsWithoutRef<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  //* new prop for default width
  defaultWidth?: string;
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  defaultWidth = SIDEBAR_WIDTH,
  ref,
  ...props
}: SidebarProviderProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();

  // Get initial state from settings store or use defaults
  const initialOpen = settings.sidebarOpen ?? defaultOpen;
  const initialWidth = settings.sidebarWidth ?? defaultWidth;

  //* new state for sidebar width
  const [width, setWidthState] = React.useState(initialWidth);
  const [openMobile, setOpenMobile] = React.useState(false);
  //* new state for tracking is dragging rail
  const [isDraggingRail, setIsDraggingRail] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(initialOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((_value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // Save to setting store instead of cookie
      updateAppSettings({ sidebarOpen: openState });
    },
    [setOpenProp, open, updateAppSettings]
  );

  // Wrapper for setWidth that also saves to store
  const setWidth = React.useCallback(
    (newWidth: string) => {
      setWidthState(newWidth);
      updateAppSettings({ sidebarWidth: newWidth });
    },
    [updateAppSettings]
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(
    () =>
      isMobile
        ? setOpenMobile((_openState) => !_openState)
        : setOpen((_openState) => !_openState),
    [
      isMobile,
      setOpen,
      //* remove setOpenMobile from dependencies because setOpenMobile are state setters created by useState
      // setOpenMobile
    ]
  );

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      //* new context for sidebar resizing
      width,
      setWidth,
      //* new context for tracking is dragging rail
      isDraggingRail,
      setIsDraggingRail,
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      //* remove setOpenMobile from dependencies because setOpenMobile are state setters created by useState
      // setOpenMobile,
      toggleSidebar,
      //* add width to dependencies
      width,
      setWidth,
      //* add isDraggingRail to dependencies
      isDraggingRail,
    ]
  );

  return (
    <SidebarContext value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
            className
          )}
          ref={ref}
          style={
            {
              // * update '--sidebar-width' to use the new width state
              "--sidebar-width": width,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  );
};

type SidebarProps = React.ComponentPropsWithoutRef<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
  ref?: React.Ref<HTMLDivElement>;
};

const Sidebar = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ref,
  ...props
}: SidebarProps) => {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    //* new property for tracking is dragging rail
    isDraggingRail,
  } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
        <SheetContent
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          data-mobile="true"
          data-sidebar="sidebar"
          side={side}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <VisuallyHidden.Root>
            <DialogDescription>Sidebar Description</DialogDescription>
            <DialogTitle>Sidebar Title</DialogTitle>
          </VisuallyHidden.Root>

          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-dragging={isDraggingRail}
      data-side={side}
      data-state={state}
      data-variant={variant}
      //* add data-dragging attribute
      ref={ref}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          //* set duration to 0 for all elements when dragging
          "group-data-[dragging=true]:duration-0! group-data-[dragging=true]_*:duration-0!"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          //* set duration to 0 for all elements when dragging
          "group-data-[dragging=true]:duration-0! group-data-[dragging=true]_*:duration-0!",
          className
        )}
        {...props}
      >
        <div
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
          data-sidebar="sidebar"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

type SidebarTriggerProps = React.ComponentPropsWithoutRef<typeof Button> & {
  ref?: React.Ref<React.ElementRef<typeof Button>>;
};

const SidebarTrigger = ({
  className,
  onClick,
  ref,
  ...props
}: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={cn("h-7 w-7", className)}
      data-sidebar="trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      ref={ref}
      size="icon"
      variant="ghost"
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

type SidebarRailProps = React.ComponentPropsWithoutRef<"button"> & {
  //* new prop for enabling drag
  enableDrag?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const SidebarRail = ({
  className,
  enableDrag = true,
  ref,
  ...props
}: SidebarRailProps) => {
  const { toggleSidebar, setWidth, state, width, setIsDraggingRail } =
    useSidebar();

  const { dragRef, handleMouseDown } = useSidebarResize({
    direction: "right",
    enableDrag,
    onResize: setWidth,
    onToggle: toggleSidebar,
    currentWidth: width,
    isCollapsed: state === "collapsed",
    minResizeWidth: MIN_SIDEBAR_WIDTH,
    maxResizeWidth: MAX_SIDEBAR_WIDTH,
    setIsDraggingRail,
  });

  const combinedRef = composeRefs(ref, dragRef);
  return (
    <button
      //* updated ref to use combinedRef
      aria-label="Toggle Sidebar"
      className={cn(
        "-translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-sidebar-border group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      data-sidebar="rail"
      onMouseDown={handleMouseDown}
      // onClick={toggleSidebar}
      //* replace onClick with onMouseDown
      ref={combinedRef}
      tabIndex={-1}
      title="Toggle Sidebar"
      {...props}
    />
  );
};

type SidebarInsetProps = React.ComponentPropsWithoutRef<"main"> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarInset = ({ className, ref, ...props }: SidebarInsetProps) => (
  <main
    className={cn(
      "relative flex min-h-svh flex-1 flex-col bg-background",
      "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-md",
      className
    )}
    ref={ref}
    {...props}
  />
);

type SidebarInputProps = React.ComponentPropsWithoutRef<typeof Input> & {
  ref?: React.Ref<React.ElementRef<typeof Input>>;
};

const SidebarInput = ({ className, ref, ...props }: SidebarInputProps) => (
  <Input
    className={cn(
      "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
      className
    )}
    data-sidebar="input"
    ref={ref}
    {...props}
  />
);

type SidebarHeaderProps = React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarHeader = ({ className, ref, ...props }: SidebarHeaderProps) => (
  <div
    className={cn("flex flex-col gap-2 p-2", className)}
    data-sidebar="header"
    ref={ref}
    {...props}
  />
);

type SidebarFooterProps = React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarFooter = ({ className, ref, ...props }: SidebarFooterProps) => (
  <div
    className={cn("flex flex-col gap-2 p-2", className)}
    data-sidebar="footer"
    ref={ref}
    {...props}
  />
);

type SidebarSeparatorProps = React.ComponentPropsWithoutRef<
  typeof Separator
> & {
  ref?: React.Ref<React.ElementRef<typeof Separator>>;
};

const SidebarSeparator = ({
  className,
  ref,
  ...props
}: SidebarSeparatorProps) => (
  <Separator
    className={cn("mx-2 w-auto bg-sidebar-border", className)}
    data-sidebar="separator"
    ref={ref}
    {...props}
  />
);

type SidebarContentProps = React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarContent = ({ className, ref, ...props }: SidebarContentProps) => (
  <div
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
      className
    )}
    data-sidebar="content"
    ref={ref}
    {...props}
  />
);

type SidebarGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarGroup = ({ className, ref, ...props }: SidebarGroupProps) => (
  <div
    className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
    data-sidebar="group"
    ref={ref}
    {...props}
  />
);

type SidebarGroupLabelProps = React.ComponentPropsWithoutRef<"div"> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarGroupLabel = ({
  className,
  asChild = false,
  ref,
  ...props
}: SidebarGroupLabelProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 font-medium text-sidebar-foreground/70 text-xs outline-hidden ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      data-sidebar="group-label"
      ref={ref}
      {...props}
    />
  );
};

type SidebarGroupActionProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const SidebarGroupAction = ({
  className,
  asChild = false,
  ref,
  ...props
}: SidebarGroupActionProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-hidden ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      data-sidebar="group-action"
      ref={ref}
      {...props}
    />
  );
};

type SidebarGroupContentProps = React.ComponentPropsWithoutRef<"div"> & {
  ref?: React.Ref<HTMLDivElement>;
};

const SidebarGroupContent = ({
  className,
  ref,
  ...props
}: SidebarGroupContentProps) => (
  <div
    className={cn("w-full text-sm", className)}
    data-sidebar="group-content"
    ref={ref}
    {...props}
  />
);

type SidebarMenuProps = React.ComponentPropsWithoutRef<"ul"> & {
  ref?: React.Ref<HTMLUListElement>;
};

const SidebarMenu = ({ className, ref, ...props }: SidebarMenuProps) => (
  <ul
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    data-sidebar="menu"
    ref={ref}
    {...props}
  />
);

type SidebarMenuItemProps = React.ComponentPropsWithoutRef<"li"> & {
  ref?: React.Ref<HTMLLIElement>;
};

const SidebarMenuItem = ({
  className,
  ref,
  ...props
}: SidebarMenuItemProps) => (
  <li
    className={cn(
      "group/menu-item relative flex items-center justify-center",
      className
    )}
    data-sidebar="menu-item"
    ref={ref}
    {...props}
  />
);

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type SidebarMenuButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
    ref?: React.Ref<HTMLButtonElement>;
  };

const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ref,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      ref={ref}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  const tooltipProps =
    typeof tooltip === "string"
      ? {
          children: tooltip,
        }
      : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        align="center"
        hidden={state !== "collapsed" || isMobile}
        side="right"
        {...tooltipProps}
      />
    </Tooltip>
  );
};

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
