"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden bg-accent select-none",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        default: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[28%]",
      },
    },
    defaultVariants: { size: "default", shape: "circle" },
  }
)

/** Circle for people, square for workspaces, teams and apps. */
function Avatar({
  className,
  size,
  shape,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size, shape }), className)} {...props} />
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full object-cover", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center font-semibold tracking-[-0.01em] text-accent-foreground uppercase", className)}
      {...props}
    />
  )
}

/** Overlapping avatars. Show 3–5, then a "+N" count. The ring matches the page; set ring-card on a card. */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("flex items-center -space-x-1.5 *:data-[slot=avatar]:ring-[3px] *:data-[slot=avatar]:ring-background", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage }
