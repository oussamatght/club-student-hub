"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

// Root Tabs container
interface TabsProps {
  className?: string
  children?: string
  defaultValue?: string
}

function Tabs({ className, children, defaultValue }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={cn("w-full", className)}
      defaultValue={defaultValue}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

// Tabs List (the row of triggers)
interface TabsListProps {
  className?: string
  children?:string
}

function TabsList({ className, children }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  )
}

// Tabs Trigger (each tab button)
interface TabsTriggerProps {
  className?: string
  value: string
  children?: string
}

function TabsTrigger({ className, value, children }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

// Tabs Content (what shows when active)
interface TabsContentProps {
  className?: string
  value: string
  children?: string
}

function TabsContent({ className, value, children }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      value={value}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </TabsPrimitive.Content>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
}