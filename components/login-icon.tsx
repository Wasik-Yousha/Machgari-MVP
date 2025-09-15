import { UserIcon } from "lucide-react"

export function LoginIcon() {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-orange-100 p-5 rounded-full">
        <UserIcon className="h-10 w-10 text-orange-500" />
      </div>
    </div>
  )
}
