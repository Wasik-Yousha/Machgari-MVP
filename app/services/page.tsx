"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import {
  GraduationCap,
  SproutIcon as Seedling,
  DollarSign,
  Shovel,
  CreditCard,
  Settings,
  TrendingUp,
  Heart,
  Plane,
  Shield,
  CheckCircle,
  Microscope,
} from "lucide-react"

const services = [
  {
    id: 1,
    title: "মৎস্য চাষ প্রশিক্ষণ",
    description: "আধুনিক মৎস্য চাষ পদ্ধতি এবং প্রযুক্তি সম্পর্কে বিনামূল্যে প্রশিক্ষণ প্রোগ্রাম",
    icon: GraduationCap,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 2,
    title: "বীজ মাছ সরবরাহ",
    description: "উন্নত জাতের বীজ মাছ সরবরাহ এবং বিতরণ কর্মসূচি সারাদেশে",
    icon: Seedling,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    id: 3,
    title: "মৎস্য খাদ্য ভর্তুকি",
    description: "মৎস্য খাদ্যে সরকারি ভর্তুকি প্রদান এবং সাশ্রয়ী মূল্যে সরবরাহ",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: 4,
    title: "পুকুর খনন সহায়তা",
    description: "নতুন পুকুর খনন এবং পুরাতন পুকুর সংস্কারে আর্থিক ও কারিগরি সহায়তা",
    icon: Shovel,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: 5,
    title: "মৎস্য ঋণ সুবিধা",
    description: "কম সুদে মৎস্য চাষের জন্য ঋণ প্রদান এবং সহজ শর্তে পরিশোধ সুবিধা",
    icon: CreditCard,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    id: 6,
    title: "প্রযুক্তিগত সহায়তা",
    description: "আধুনিক মৎস্য চাষ প্রযুক্তি এবং যন্ত্রপাতি ব্যবহারে কারিগরি সহায়তা",
    icon: Settings,
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
  {
    id: 7,
    title: "বাজারজাতকরণ সহায়তা",
    description: "মৎস্য বিপণন এবং বাজারজাতকরণে সহায়তা ও পরামর্শ সেবা",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: 8,
    title: "মৎস্য স্বাস্থ্য সেবা",
    description: "মাছের রোগ নির্ণয়, চিকিৎসা এবং প্রতিরোধমূলক ব্যবস্থাপনা সেবা",
    icon: Heart,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    id: 9,
    title: "রপ্তানি সহায়তা",
    description: "মৎস্য রপ্তানিতে সহায়তা এবং আন্তর্জাতিক বাজারে প্রবেশের সুবিধা",
    icon: Plane,
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-50 dark:bg-sky-900/20",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    id: 10,
    title: "মৎস্য বীমা",
    description: "প্রাকৃতিক দুর্যোগ ও ঝুঁকির বিপরীতে মৎস্য চাষের বীমা সুবিধা",
    icon: Shield,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    id: 11,
    title: "গুণগত মান নিয়ন্ত্রণ",
    description: "মৎস্য পণ্যের গুণগত মান নিয়ন্ত্রণ এবং সার্টিফিকেশন সেবা",
    icon: CheckCircle,
    color: "from-lime-500 to-lime-600",
    bgColor: "bg-lime-50 dark:bg-lime-900/20",
    iconColor: "text-lime-600 dark:text-lime-400",
  },
  {
    id: 12,
    title: "মৎস্য গবেষণা সহায়তা",
    description: "মৎস্য গবেষণা ও উন্নয়নে সহায়তা এবং নতুন প্রযুক্তি উদ্ভাবন",
    icon: Microscope,
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
]

export default function servicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">সরকারি সেবাসমূহ</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                মৎস্য উৎপাদন বৃদ্ধি এবং বিক্রয় সহায়তার জন্য সরকারি সেবা ও সুবিধাদি
              </p>
              <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
        </section>

        {/* Services Grid Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">আমাদের সেবাসমূহ</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                মৎস্য চাষ ও ব্যবসায়ের উন্নয়নে সরকারের পক্ষ থেকে প্রদত্ত বিভিন্ন সেবা ও সুবিধা
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-secondary/10 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">আরও তথ্যের জন্য যোগাযোগ করুন</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              আমাদের সেবা সম্পর্কে বিস্তারিত জানতে এবং আবেদন করতে নিকটস্থ মৎস্য অফিসে যোগাযোগ করুন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">হটলাইন নম্বর</h3>
                <p className="text-primary text-xl font-bold">১৬২৬৩</p>
              </div>
              <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">ইমেইল</h3>
                <p className="text-primary text-lg">info@fisheries.gov.bd</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
