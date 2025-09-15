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

        {/* Split Section */}
        <section className="py-12 bg-gray-50 dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Us */}
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4">আমাদের সম্পর্কে</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  মাছগাড়ি হল বাংলাদেশের প্রথম ডিজিটাল মাছ পরিবহন এবং বাজার
                  ব্যবস্থাপনা প্ল্যাটফর্ম। আমরা জেলেদের সাথে আড়তদারদের সরাসরি
                  সংযোগ স্থাপন করি, যা মধ্যস্থতাকারীদের প্রয়োজনীয়তা দূর করে
                  এবং উভয় পক্ষের জন্য আরও ভালো মূল্য নিশ্চিত করে। আমাদের
                  প্ল্যাটফর্মের মাধ্যমে, আপনি সর্বদা তাজা মাছ পেতে পারেন এবং
                  বাজারের সর্বশেষ দাম জানতে পারেন।
                </p>
                <Button className="w-fit bg-primary hover:bg-primary/90">
                  আরও জানুন
                </Button>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-4">যোগাযোগ করুন</h2>
                <ContactForm />
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
