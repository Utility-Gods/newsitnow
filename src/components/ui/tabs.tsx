import type { Component } from "solid-js";
import { splitProps } from "solid-js";

import { Tabs as TabsPrimitive } from "@kobalte/core";

import { cn } from "~/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList: Component<TabsPrimitive.TabsListProps> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.List
      class={cn(
        "inline-flex h-10 items-center border border-secondary justify-center rounded-md bg-white px-1 text-secondary",
        props.class,
      )}
      {...rest}
    />
  );
};

const TabsTrigger: Component<TabsPrimitive.TabsTriggerProps> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Trigger
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-secondary data-[selected]:text-secondary-foreground data-[selected]:shadow-sm",
        props.class,
      )}
      {...rest}
    />
  );
};

const TabsContent: Component<TabsPrimitive.TabsContentProps> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Content
      class={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.class,
      )}
      {...rest}
    />
  );
};

const TabsIndicator: Component<TabsPrimitive.TabsIndicatorProps> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <TabsPrimitive.Indicator
      class={cn("duration-250ms absolute transition-all ", props.class)}
      {...rest}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator };
