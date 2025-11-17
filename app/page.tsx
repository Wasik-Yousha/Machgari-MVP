"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageSlider } from "@/components/image-slider";
import { MarketSummarySection } from "@/components/market-summary-section";
import { ContactForm } from "@/components/contact-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col text-[80%]">
      {/* Use the shared Header component */}
      <Header />

      <main className="flex-grow">
        {/* Image Slider */}
        <section className="relative">
          <ImageSlider />
        </section>

        {/* Dashboard Section */}
        <section className="py-12 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              মাছের বাজার দর
            </h2>

            <MarketSummarySection />
          </div>
        </section>

        {/* YouTube Video Section */}
        <section className="py-12 bg-white dark:bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              কিভাবে মাছগাড়ি ব্যবহার করবেন
            </h2>

            <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
              <iframe
                className="w-full h-[300px] md:h-[450px] rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/watch?v=iLW_0p67ITE"
                title="মাছগাড়ি টিউটোরিয়াল"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-background dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                আমাদের সম্পর্কে
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                বাংলাদেশের মৎস্য শিল্পের ডিজিটাল বিপ্লব - সবার জন্য স্বচ্ছতা, ন্যায্য মূল্য এবং সহজ ব্যবস্থাপনা
              </p>
            </div>

            {/* Main Description */}
            <div className="max-w-5xl mx-auto mb-12">
              <Card className="p-6 md:p-8 shadow-xl border-2 border-primary/20">
                <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p className="text-lg leading-relaxed">
                    <span className="font-bold text-primary text-xl">মাছগাড়ি</span> হল বাংলাদেশের প্রথম সমন্বিত ডিজিটাল মৎস্য পরিবহন এবং বাজার ব্যবস্থাপনা প্ল্যাটফর্ম। 
                    আমরা জেলে, আড়তদার এবং সরকারি কর্মকর্তাদের একসাথে সংযুক্ত করে মৎস্য শিল্পের সম্পূর্ণ মূল্য শৃঙ্খলকে আধুনিক ও কার্যকর করে তুলেছি।
                  </p>
                  <p className="text-lg leading-relaxed">
                    আমাদের প্ল্যাটফর্ম <span className="font-semibold text-secondary">মধ্যস্থতাকারীদের প্রয়োজনীয়তা কমিয়ে</span> জেলেদের সরাসরি আড়তদারদের সাথে যুক্ত করে, 
                    যা উভয় পক্ষের জন্য <span className="font-semibold text-green-600 dark:text-green-400">ন্যায্য মূল্য নিশ্চিত করে</span>। 
                    একই সাথে, সরকারি কর্মকর্তারা সম্পূর্ণ বাজার পরিস্থিতি <span className="font-semibold text-blue-600 dark:text-blue-400">রিয়েল-টাইমে পর্যবেক্ষণ</span> করতে পারেন এবং 
                    প্রয়োজনীয় নীতি সিদ্ধান্ত নিতে পারেন।
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Services for Three Roles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Fishermen Services */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">🎣</span>
                    </div>
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">জেলেদের জন্য</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>সরাসরি আড়তদারদের কাছে মাছ বিক্রয়</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>ন্যায্য বাজার মূল্য নিশ্চিতকরণ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>মাছের তথ্য ও ছবি আপলোড সুবিধা</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>রিয়েল-টাইম দাম তথ্য</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Wholesalers Services */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">🏪</span>
                    </div>
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400">আড়তদারদের জন্য</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>জেলেদের তথ্য ও মাছের বিবরণ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>পাইকারি দাম নির্ধারণ ও আপডেট</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>লেনদেন ইতিহাস ও পরিসংখ্যান</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span>স্টক ও ব্যবসা ব্যবস্থাপনা</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Government Services */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">সরকারের জন্য</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">✓</span>
                      <span>সম্পূর্ণ বাজার পরিস্থিতি পর্যবেক্ষণ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">✓</span>
                      <span>মূল্য নিয়ন্ত্রণ ও নির্ধারণ</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">✓</span>
                      <span>বিস্তারিত বিশ্লেষণ ও রিপোর্ট</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2">✓</span>
                      <span>নীতি সিদ্ধান্তের জন্য ডেটা</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                onClick={() => window.location.href = '/about'}
              >
                বিস্তারিত জানুন →
              </Button>
            </div>
          </div>
        </section>

        {/* Split Section */}
        <section className="py-12 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-4">যোগাযোগ করুন</h2>
                <ContactForm />
              </div>

              {/* Additional Info */}
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">কেন মাছগাড়ি?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">সম্পূর্ণ স্বচ্ছতা</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">প্রতিটি লেনদেন ডিজিটালি রেকর্ড এবং ট্র্যাক করা হয়</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">দ্রুত ও সহজ</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">মোবাইল অ্যাপের মাধ্যমে যেকোনো সময় ব্যবহার করুন</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-purple-600 dark:text-purple-400">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">নিরাপদ পেমেন্ট</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">সুরক্ষিত ডিজিটাল পেমেন্ট সিস্টেম</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Use the shared Footer component */}
      <Footer />
    </div>
  );
}
