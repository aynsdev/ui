import { Combobox } from "@/components/ui/combobox"
const options = [{ id: "design", label: "Design system" }]
export default function States() {
  return <div className="grid w-full max-w-sm gap-6"><Combobox label="Unavailable project" options={options} isDisabled defaultSelectedKey="design" /><Combobox label="Required project" options={options} isInvalid errorMessage="Select a project to continue." /><Combobox label="Empty workspace" options={[]} /></div>
}
