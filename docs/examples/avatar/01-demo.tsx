import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Avatar>
        <AvatarImage src="https://github.com/aynsdev.png" alt="aynsdev" />
        <AvatarFallback>AY</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>SL</AvatarFallback></Avatar>
        <Avatar><AvatarFallback className="text-muted-foreground">+3</AvatarFallback></Avatar>
      </AvatarGroup>
    </div>
  )
}
