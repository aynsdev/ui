import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AvatarSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
      <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
    </div>
  )
}
