import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex items-center gap-6">
      <Avatar size="lg">
        <AvatarImage src="https://github.com/aynsdev.png" alt="aynsdev" />
        <AvatarFallback>AY</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>+3</AvatarFallback></Avatar>
      </AvatarGroup>
    </div>
  )
}
