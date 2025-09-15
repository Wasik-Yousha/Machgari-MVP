"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-secondary py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">আমাদের সম্পর্কে</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                বাংলাদেশের মৎস্য শিল্পের ডিজিটাল রূপান্তরের অগ্রদূত
              </p>
              <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">মাছগাড়ি প্ল্যাটফর্ম</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  মাছগাড়ি হল বাংলাদেশের প্রথম সমন্বিত ডিজিটাল মৎস্য পরিবহন এবং বাজার ব্যবস্থাপনা প্ল্যাটফর্ম। 
                  আমাদের লক্ষ্য হল জেলে, আড়তদার এবং সরকারি কর্মকর্তাদের মধ্যে একটি কার্যকর যোগাযোগ ব্যবস্থা 
                  গড়ে তোলা এবং মৎস্য শিল্পের সামগ্রিক উন্নয়নে অবদান রাখা।
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">আমাদের লক্ষ্য</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      বাংলাদেশের মৎস্য শিল্পকে আধুনিক প্রযুক্তির সাথে সংযুক্ত করে একটি 
                      দক্ষ, স্বচ্ছ এবং লাভজনক বাজার ব্যবস্থা গড়ে তোলা।
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Globe className="h-16 w-16 text-secondary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">আমাদের দৃষ্টিভঙ্গি</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      একটি টেকসই এবং উন্নত মৎস্য শিল্প গড়ে তোলা যেখানে প্রতিটি অংশীদার 
                      ন্যায্য মূল্য পাবেন এবং গুণগত পণ্য সরবরাহ করতে পারবেন।
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">জেলেদের সহায়তা</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    জেলেদের সরাসরি বাজারে পৌঁছানোর সুবিধা এবং ন্যায্য মূল্য নিশ্চিতকরণ
                  </p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">গুণগত নিশ্চয়তা</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    মৎস্য পণ্যের গুণগত মান বজায় রাখা এবং খাদ্য নিরাপত্তা নিশ্চিতকরণ
                  </p>
                </div>
                <div className="text-center">
                  <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">বাজার সংযোগ</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    উৎপাদনকারী এবং ক্রেতাদের মধ্যে সরাসরি যোগাযোগ স্থাপন
                  </p>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-8">আমাদের অর্জন</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">১০০০+</div>
                    <div className="text-gray-600 dark:text-gray-400">নিবন্ধিত জেলে</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">৫০০+</div>
                    <div className="text-gray-600 dark:text-gray-400">আড়তদার</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-500 mb-2">৫০+</div>
                    <div className="text-gray-600 dark:text-gray-400">জেলা কভারেজ</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-500 mb-2">২৪/৭</div>
                    <div className="text-gray-600 dark:text-gray-400">সেবা প্রদান</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
