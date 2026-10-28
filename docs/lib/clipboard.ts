import { toast } from "sonner"

export async function copy(text: string, message = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(message)
  } catch {
    toast.error("Couldn't copy. Your browser blocked clipboard access.")
  }
}
