import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Edit, Mail, Phone, MapPin, CalendarDays } from "lucide-react"

interface GovernmentProfileProps {
  user: {
    name: string
    role: string
    department: string
    phone: string
    email: string
    joinDate: string
    areaOfResponsibility: string
    avatar: string
  }
}

export function GovernmentProfile({ user }: GovernmentProfileProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-3">
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            fill
            className="rounded-full object-cover border-4 border-primary/20"
          />
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1 mb-2">
          <Edit className="h-4 w-4" />
          প্রোফাইল সম্পাদনা
        </Button>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user.role}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">{user.department}</p>
          </div>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-500 px-3 py-1 rounded-full text-sm">
            সক্রিয়
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <Phone className="h-4 w-4" /> ফোন নম্বর
            </p>
            <p className="font-medium">{user.phone}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <Mail className="h-4 w-4" /> ইমেইল
            </p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <CalendarDays className="h-4 w-4" /> যোগদানের তারিখ
            </p>
            <p className="font-medium">{user.joinDate}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <MapPin className="h-4 w-4" /> দায়িত্বপ্রাপ্ত এলাকা
            </p>
            <p className="font-medium">{user.areaOfResponsibility}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
