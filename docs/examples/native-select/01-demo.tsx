import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect aria-label="Role" defaultValue="member" className="max-w-xs">
      <NativeSelectOption value="owner">Owner</NativeSelectOption>
      <NativeSelectOption value="admin">Admin</NativeSelectOption>
      <NativeSelectOption value="member">Member</NativeSelectOption>
      <NativeSelectOption value="viewer">Viewer</NativeSelectOption>
    </NativeSelect>
  )
}
