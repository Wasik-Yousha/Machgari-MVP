"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Globe, Fish, TrendingUp, BarChart3, Shield, Smartphone, DollarSign, Users2, Package, FileText, LineChart, MapPin, Settings, Clock, CheckCircle2 } from "lucide-react"

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

        {/* Platform Overview */}
        <section className="py-16 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">মাছগাড়ি প্ল্যাটফর্ম</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mb-12 shadow-lg border-l-4 border-primary">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <span className="font-bold text-primary text-2xl">মাছগাড়ি</span> হল বাংলাদেশের প্রথম সমন্বিত ডিজিটাল মৎস্য পরিবহন এবং বাজার ব্যবস্থাপনা প্ল্যাটফর্ম। 
                  আমাদের লক্ষ্য হল জেলে, আড়তদার এবং সরকারি কর্মকর্তাদের মধ্যে একটি কার্যকর যোগাযোগ ব্যবস্থা গড়ে তোলা এবং মৎস্য শিল্পের সামগ্রিক উন্নয়নে অবদান রাখা।
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  আমাদের প্ল্যাটফর্ম <span className="font-semibold text-secondary">মধ্যস্থতাকারীদের সংখ্যা কমিয়ে</span> জেলেদের সরাসরি আড়তদারদের সাথে যুক্ত করে, 
                  যা উভয় পক্ষের জন্য <span className="font-semibold text-primary">ন্যায্য মূল্য নিশ্চিত করে</span>। 
                  একই সাথে, সরকারি কর্মকর্তারা সম্পূর্ণ বাজার পরিস্থিতি <span className="font-semibold text-secondary">রিয়েল-টাইমে পর্যবেক্ষণ</span> করতে পারেন।
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  ডিজিটাল প্রযুক্তির মাধ্যমে আমরা মৎস্য শিল্পে <span className="font-semibold">স্বচ্ছতা, দক্ষতা এবং টেকসই উন্নয়ন</span> নিশ্চিত করছি।
                </p>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-t-primary">
                  <CardContent className="pt-6">
                    <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">আমাদের লক্ষ্য</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      বাংলাদেশের মৎস্য শিল্পকে আধুনিক প্রযুক্তির সাথে সংযুক্ত করে একটি 
                      দক্ষ, স্বচ্ছ এবং লাভজনক বাজার ব্যবস্থা গড়ে তোলা যেখানে সকল অংশীদার 
                      ন্যায্য সুবিধা পাবেন এবং টেকসই উন্নয়ন সম্ভব হবে।
                    </p>
                  </CardContent>
                </Card>

                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-300 border-t-4 border-t-secondary">
                  <CardContent className="pt-6">
                    <Globe className="h-16 w-16 text-secondary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4 dark:text-white">আমাদের দৃষ্টিভঙ্গি</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      একটি টেকসই এবং উন্নত মৎস্য শিল্প গড়ে তোলা যেখানে প্রতিটি অংশীদার 
                      ন্যায্য মূল্য পাবেন, গুণগত পণ্য সরবরাহ করতে পারবেন এবং ডিজিটাল প্রযুক্তির 
                      সুবিধা ভোগ করে আধুনিক ব্যবসা পরিচালনা করতে পারবেন।
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Services for Each Role */}
        <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">আমাদের সেবাসমূহ</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                প্রতিটি ব্যবহারকারীর জন্য বিশেষভাবে ডিজাইন করা সেবা যা মৎস্য শিল্পের উন্নয়নে সহায়ক
              </p>
            </div>

            {/* Fishermen Services - Detailed */}
            <div className="max-w-6xl mx-auto mb-16">
              <Card className="overflow-hidden shadow-2xl border-t-8 border-t-secondary hover:shadow-3xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-secondary to-blue-600 text-white p-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Fish className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">জেলেদের জন্য বিশেষ সুবিধা</h3>
                      <p className="text-blue-100">সরাসরি বাজার সংযোগ এবং ন্যায্য মূল্য নিশ্চিতকরণ</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Service 1 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">সহজ মাছ আপলোড</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          মোবাইল দিয়ে মাছের ছবি তুলুন, পরিমাণ ও গুণমান লিখুন এবং তাৎক্ষণিক আড়তদারদের কাছে পৌঁছান। 
                          কোনো মধ্যস্থতাকারী ছাড়াই সরাসরি বিক্রয়ের সুযোগ।
                        </p>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">ন্যায্য মূল্য গ্যারান্টি</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          সরকার নির্ধারিত বেস প্রাইস অনুযায়ী ন্যূনতম মূল্যের নিশ্চয়তা। রিয়েল-টাইম মার্কেট প্রাইস 
                          দেখে আপনার মাছের সঠিক মূল্য জানুন এবং সেরা দাম পান।
                        </p>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Users2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">আড়তদার সংযোগ</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          আপনার এলাকার সকল আড়তদারের তালিকা দেখুন, তাদের দেওয়া দাম তুলনা করুন এবং 
                          সবচেয়ে ভালো অফার গ্রহণ করুন। সরাসরি যোগাযোগের সুবিধা।
                        </p>
                      </div>
                    </div>

                    {/* Service 4 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">বিক্রয় রেকর্ড সংরক্ষণ</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          প্রতিটি বিক্রয়ের সম্পূর্ণ তথ্য ডিজিটালি সংরক্ষিত থাকে। আপনার মাসিক ও বার্ষিক 
                          আয়ের হিসাব সহজেই দেখুন এবং ব্যবসায়িক সিদ্ধান্ত নিন।
                        </p>
                      </div>
                    </div>

                    {/* Service 5 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">বাজার মূল্য বিশ্লেষণ</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          বিভিন্ন মাছের দামের প্রবণতা দেখুন, সেরা বিক্রয়ের সময় জানুন এবং 
                          বাজার অনুযায়ী আপনার মৎস্য আহরণ পরিকল্পনা করুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 6 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">নিরাপদ লেনদেন</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          সম্পূর্ণ ডিজিটাল পেমেন্ট সিস্টেম। নগদ টাকার ঝামেলা নেই, নিরাপদ 
                          অনলাইন পেমেন্ট এবং তাৎক্ষণিক টাকা গ্রহণের সুবিধা।
                        </p>
                      </div>
                    </div>

                    {/* NEW Service 7 - AI Assistant */}
                    <div className="flex items-start space-x-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg border-2 border-purple-300 dark:border-purple-700 col-span-full">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          মাছগাড়ি সুপার AI সহায়ক - ২৪/৭ বিশেষজ্ঞ পরামর্শ
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          <span className="font-semibold text-purple-700 dark:text-purple-400">সরকারি অনুমোদিত AI পরামর্শদাতা</span> যা জেলেদের 
                          উন্নতির জন্য সর্বদা প্রস্তুত। দিন-রাত যেকোনো সময় যেকোনো প্রশ্ন করুন এবং তাৎক্ষণিক সমাধান পান।
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-start">
                            <span className="text-purple-500 mr-2 text-lg">💡</span>
                            <span><strong>মাছ ধরার পরামর্শ:</strong> কখন, কোথায়, কিভাবে মাছ ধরবেন - সবকিছু জানুন</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-green-500 mr-2 text-lg">💰</span>
                            <span><strong>মূল্য নির্ধারণ:</strong> সঠিক দাম কত হওয়া উচিত - AI পরামর্শ দেবে</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-blue-500 mr-2 text-lg">🌊</span>
                            <span><strong>আবহাওয়া তথ্য:</strong> সমুদ্র/নদীর অবস্থা এবং মাছ ধরার উপযুক্ত সময়</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-orange-500 mr-2 text-lg">📈</span>
                            <span><strong>ব্যবসায়িক পরামর্শ:</strong> কিভাবে আয় বাড়াবেন - স্মার্ট টিপস</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-red-500 mr-2 text-lg">🏥</span>
                            <span><strong>মাছের স্বাস্থ্য:</strong> মাছের রোগ সনাক্তকরণ ও সমাধান</span>
                          </div>
                          <div className="flex items-start">
                            <span className="text-teal-500 mr-2 text-lg">📚</span>
                            <span><strong>প্রশিক্ষণ ও শিক্ষা:</strong> আধুনিক মৎস্য চাষ পদ্ধতি শিখুন</span>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                          <p className="text-xs text-purple-800 dark:text-purple-200">
                            <strong>বিশেষ সুবিধা:</strong> সরকারি মৎস্য বিশেষজ্ঞদের জ্ঞান দিয়ে প্রশিক্ষিত AI যা বাংলা ভাষায় 
                            সহজভাবে পরামর্শ দেয়। ভয়েস কমান্ড সুবিধা - শুধু কথা বলুন, AI উত্তর দেবে!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Wholesalers Services - Detailed */}
            <div className="max-w-6xl mx-auto mb-16">
              <Card className="overflow-hidden shadow-2xl border-t-8 border-t-primary hover:shadow-3xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-primary to-orange-600 text-white p-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Package className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">আড়তদারদের জন্য ব্যবসায়িক সমাধান</h3>
                      <p className="text-orange-100">স্মার্ট ইনভেন্টরি ম্যানেজমেন্ট এবং প্রফিট ম্যাক্সিমাইজেশন</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Service 1 */}
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-primary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <Fish className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">জেলেদের তথ্য অ্যাক্সেস</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          আপনার এলাকার সকল জেলের মাছের তথ্য দেখুন - কী ধরনের মাছ, কত পরিমাণ, 
                          গুণমান কেমন এবং কোন লোকেশনে আছে। ছবি দেখে মাছের কোয়ালিটি যাচাই করুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-primary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">দাম নির্ধারণ ও আপডেট</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          প্রতিটি মাছের পাইকারি দাম নির্ধারণ করুন এবং বাজার পরিস্থিতি অনুযায়ী 
                          রিয়েল-টাইমে আপডেট করুন। প্রতিযোগিতামূলক মূল্য নির্ধারণে সহায়তা।
                        </p>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-primary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">লেনদেন ট্র্যাকিং</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          সকল কেনা-বেচার সম্পূর্ণ রেকর্ড একস্থানে। কোন জেলের কাছ থেকে কখন কত 
                          পরিমাণ মাছ কিনেছেন এবং কত দামে বিক্রি হয়েছে - সবকিছু ট্র্যাক করুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 4 */}
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-primary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <LineChart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">ব্যবসা বিশ্লেষণ</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          দৈনিক, সাপ্তাহিক ও মাসিক বিক্রয় রিপোর্ট দেখুন। কোন মাছে বেশি লাভ 
                          হচ্ছে, কোন সময়ে বেশি চাহিদা - সবকিছু ডেটা দিয়ে বুঝুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 5 */}
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-primary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">ইনভেন্টরি ম্যানেজমেন্ট</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          স্টকে কোন মাছ কত পরিমাণ আছে তার হিসাব রাখুন। মাছের তাজা থাকার 
                          সময়সীমা ট্র্যাক করুন এবং সময়মত বিক্রয়ের সিদ্ধান্ত নিন।
                        </p>
                      </div>
                    </div>

                    {/* Service 6 */}
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-primary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">লোকেশন ভিত্তিক সার্ভিস</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          আপনার আশেপাশের জেলেদের খুঁজে পান। দূরত্ব, পরিবহন খরচ এবং সময় 
                          বিবেচনা করে সবচেয়ে লাভজনক ডিল করুন।
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Government Services - Detailed */}
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden shadow-2xl border-t-8 border-t-secondary hover:shadow-3xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-secondary to-blue-600 text-white p-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Award className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">সরকারি কর্মকর্তাদের জন্য নিয়ন্ত্রণ ব্যবস্থা</h3>
                      <p className="text-blue-100">সম্পূর্ণ মৎস্য শিল্পের মনিটরিং এবং পলিসি ডেভেলপমেন্ট</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Service 1 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <LineChart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">রিয়েল-টাইম মার্কেট মনিটরিং</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          সম্পূর্ণ দেশের মৎস্য বাজারের পরিস্থিতি একটি ড্যাশবোর্ডে দেখুন। কোথায় কোন 
                          মাছের দাম কত, চাহিদা-সরবরাহ কেমন - সবকিছু লাইভ ট্র্যাক করুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">মূল্য নিয়ন্ত্রণ ব্যবস্থা</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          প্রতিটি মাছের বেস প্রাইস নির্ধারণ করুন এবং সর্বোচ্চ/সর্বনিম্ন মূল্যসীমা 
                          সেট করুন। বাজারে অস্বাভাবিক মূল্য বৃদ্ধি/হ্রাস নিয়ন্ত্রণ করুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">বিস্তারিত রিপোর্ট জেনারেশন</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          অঞ্চলভিত্তিক, মৎস্যভিত্তিক, সময়ভিত্তিক বিভিন্ন ধরনের রিপোর্ট তৈরি করুন। 
                          পলিসি মেকিং এর জন্য প্রয়োজনীয় সকল ডেটা পান।
                        </p>
                      </div>
                    </div>

                    {/* Service 4 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">স্টেকহোল্ডার ম্যানেজমেন্ট</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          সকল জেলে ও আড়তদারের তথ্য একসাথে দেখুন। লাইসেন্স, পারমিট এবং 
                          নিয়ন্ত্রণমূলক কাজ সহজে পরিচালনা করুন।
                        </p>
                      </div>
                    </div>

                    {/* Service 5 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">ট্রেন্ড এনালাইসিস</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          মৌসুমভিত্তিক মৎস্য উৎপাদন ট্রেন্ড, মূল্য পরিবর্তনের প্যাটার্ন এবং ভবিষ্যত 
                          পূর্বাভাস দেখুন। ডেটা-ড্রিভেন সিদ্ধান্ত নিন।
                        </p>
                      </div>
                    </div>

                    {/* Service 6 */}
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-secondary">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-2 dark:text-white">কোয়ালিটি কন্ট্রোল</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          খাদ্য নিরাপত্তা নিশ্চিত করুন। মৎস্য পণ্যের গুণগত মান পর্যবেক্ষণ করুন 
                          এবং স্ট্যান্ডার্ড বজায় রাখতে নিয়ন্ত্রণমূলক ব্যবস্থা নিন।
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Benefits */}
        <section className="py-16 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white">মাছগাড়ির সুবিধাসমূহ</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 dark:text-white">সম্পূর্ণ স্বচ্ছতা</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    প্রতিটি লেনদেন ডিজিটালি রেকর্ড করা হয় যা সকল পক্ষের কাছে স্বচ্ছ ও দৃশ্যমান
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 dark:text-white">সহজ ব্যবহার</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    মোবাইল অ্যাপ ও ওয়েব প্ল্যাটফর্ম - যেকোনো জায়গা থেকে যেকোনো সময় ব্যবহার করুন
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 dark:text-white">২৪/৭ সেবা</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    দিনের যেকোনো সময় প্ল্যাটফর্ম ব্যবহার করুন এবং তাৎক্ষণিক সেবা পান
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General AI Assistant Section - For Everyone */}
        <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 border-t-4 border-t-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <span className="text-4xl">🤖</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  মাছগাড়ি জেনারেল AI অ্যাসিস্ট্যান্ট
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  সবার জন্য উন্মুক্ত, সম্পূর্ণ বিনামূল্যে স্মার্ট AI সহায়ক - যেকোনো প্রশ্নের উত্তর পান তাৎক্ষণিক!
                </p>
              </div>

              {/* Main Feature Card */}
              <Card className="overflow-hidden shadow-2xl border-4 border-purple-200 dark:border-purple-800 mb-12">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm">
                      <span className="text-3xl">💬</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold">সকলের জন্য উন্মুক্ত AI পরামর্শদাতা</h3>
                      <p className="text-purple-100 text-sm md:text-base">জেলে, আড়তদার, সরকারি কর্মকর্তা এবং সাধারণ মানুষ - সবাই ব্যবহার করতে পারবেন</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8 md:p-12">
                  {/* What is it */}
                  <div className="mb-10">
                    <h4 className="text-2xl font-bold mb-4 flex items-center">
                      <span className="text-3xl mr-3">🌟</span>
                      এটি কী?
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      মাছগাড়ি জেনারেল AI হল একটি <span className="font-bold text-purple-600 dark:text-purple-400">বুদ্ধিমান কথোপকথন সহায়ক</span> যা 
                      মৎস্য শিল্প সম্পর্কিত যেকোনো প্রশ্নের উত্তর দিতে পারে। এটি <span className="font-semibold">সাধারণ মানুষ থেকে শুরু করে 
                      পেশাদার ব্যবসায়ী</span> - সবার জন্য ডিজাইন করা হয়েছে। বাংলা এবং ইংরেজি উভয় ভাষায় কথা বলতে পারে।
                    </p>
                  </div>

                  {/* Key Features Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                      <div className="text-3xl mb-3">🗣️</div>
                      <h5 className="font-bold text-lg mb-2 dark:text-white">প্রাকৃতিক কথোপকথন</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        সাধারণ কথার মতো প্রশ্ন করুন। AI বুঝতে পারবে এবং সহজ ভাষায় উত্তর দেবে।
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border-2 border-green-200 dark:border-green-700">
                      <div className="text-3xl mb-3">🌍</div>
                      <h5 className="font-bold text-lg mb-2 dark:text-white">বহুভাষিক সাপোর্ট</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        বাংলা এবং ইংরেজি - উভয় ভাষায় সমান দক্ষ। আঞ্চলিক শব্দও বোঝে।
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                      <div className="text-3xl mb-3">⚡</div>
                      <h5 className="font-bold text-lg mb-2 dark:text-white">তাৎক্ষণিক উত্তর</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        কয়েক সেকেন্ডের মধ্যে বিস্তারিত এবং নির্ভুল উত্তর পান।
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-700">
                      <div className="text-3xl mb-3">📚</div>
                      <h5 className="font-bold text-lg mb-2 dark:text-white">বিশাল জ্ঞান ভাণ্ডার</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        মৎস্য শিল্প, বাজার, দাম, চাষ পদ্ধতি - সবকিছু জানে।
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 p-6 rounded-xl border-2 border-pink-200 dark:border-pink-700">
                      <div className="text-3xl mb-3">🎯</div>
                      <h5 className="font-bold text-lg mb-2 dark:text-white">ব্যক্তিগত পরামর্শ</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        আপনার নির্দিষ্ট পরিস্থিতি অনুযায়ী কাস্টমাইজড পরামর্শ দেয়।
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-800/30 p-6 rounded-xl border-2 border-teal-200 dark:border-teal-700">
                      <div className="text-3xl mb-3">🔒</div>
                      <h5 className="font-bold text-lg mb-2 dark:text-white">সম্পূর্ণ বিনামূল্যে</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        কোনো চার্জ নেই। যত খুশি প্রশ্ন করুন, সীমাহীন ব্যবহার।
                      </p>
                    </div>
                  </div>

                  {/* What Can You Ask */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-700">
                    <h4 className="text-2xl font-bold mb-6 text-center">
                      <span className="text-3xl mr-2">💡</span>
                      কী কী প্রশ্ন করতে পারবেন?
                    </h4>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Column 1 */}
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <span className="text-2xl mr-3">🐟</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">মাছ সম্পর্কিত তথ্য</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "রুই মাছের বর্তমান দাম কত?", "ইলিশ মাছ কোথায় পাওয়া যায়?", "কোন মাছ সবচেয়ে লাভজনক?"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <span className="text-2xl mr-3">💰</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">বাজার ও মূল্য তথ্য</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "আজকের বাজার দর কেমন?", "দাম কেন বাড়ছে?", "কোন মৌসুমে কোন মাছের দাম বেশি?"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <span className="text-2xl mr-3">🌊</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">মৎস্য চাষ পদ্ধতি</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "পুকুরে মাছ চাষ কিভাবে শুরু করব?", "কোন খাবার ভালো?", "রোগ হলে কী করব?"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <span className="text-2xl mr-3">📊</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">ব্যবসায়িক পরামর্শ</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "মাছের ব্যবসা শুরু করতে কত টাকা লাগবে?", "লাভ কিভাবে বাড়াবো?", "কোন বাজারে বিক্রি করব?"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <span className="text-2xl mr-3">🏛️</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">সরকারি নীতি ও লাইসেন্স</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "লাইসেন্স নিতে কী করতে হবে?", "সরকারি সহায়তা কিভাবে পাব?", "নিয়ম-কানুন কী?"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <span className="text-2xl mr-3">🌤️</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">আবহাওয়া ও পরিবেশ</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "বর্ষাকালে কী সাবধানতা নেব?", "ঝড়ের আগে কী করব?", "পানির গুণমান কিভাবে ঠিক রাখব?"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <span className="text-2xl mr-3">🔧</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">প্রযুক্তি ও সরঞ্জাম</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "কোন জাল ভালো?", "আধুনিক যন্ত্রপাতি কোথায় পাব?", "মাছগাড়ি অ্যাপ কিভাবে ব্যবহার করব?"
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <span className="text-2xl mr-3">📖</span>
                          <div>
                            <h5 className="font-semibold mb-1 dark:text-white">শিক্ষা ও প্রশিক্ষণ</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              "প্রশিক্ষণ কোথায় পাব?", "বই বা রিসোর্স কোথায় পাওয়া যায়?", "নতুন পদ্ধতি শিখতে চাই"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* How to Access */}
                  <div className="mt-10 text-center">
                    <h4 className="text-2xl font-bold mb-6">
                      <span className="text-3xl mr-2">🚀</span>
                      কিভাবে ব্যবহার করবেন?
                    </h4>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full md:w-auto">
                        <div className="text-4xl mb-3">💬</div>
                        <h5 className="font-bold mb-2 dark:text-white">চ্যাট বক্স</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          প্রতিটি পেজের নিচে ডানদিকে<br/>চ্যাট আইকনে ক্লিক করুন
                        </p>
                      </div>

                      <div className="text-3xl">→</div>

                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full md:w-auto">
                        <div className="text-4xl mb-3">✍️</div>
                        <h5 className="font-bold mb-2 dark:text-white">প্রশ্ন করুন</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          টাইপ করুন বা ভয়েস দিয়ে<br/>আপনার প্রশ্ন জিজ্ঞাসা করুন
                        </p>
                      </div>

                      <div className="text-3xl">→</div>

                      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full md:w-auto">
                        <div className="text-4xl mb-3">✅</div>
                        <h5 className="font-bold mb-2 dark:text-white">উত্তর পান</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          তাৎক্ষণিক বিস্তারিত ও<br/>সঠিক উত্তর পাবেন
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        <span className="text-2xl mr-2">⭐</span>
                        মনে রাখবেন: যত বেশি ব্যবহার করবেন, AI তত বেশি স্মার্ট হবে এবং আরও ভালো পরামর্শ দিতে পারবে!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
