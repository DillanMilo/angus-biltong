"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const RecipesPage = () => {
  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[35vh] min-h-[280px] overflow-hidden mt-32 sm:mt-36">
        <Image
          src="/image-5.jpg"
          alt="Recipes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C2420]/60 via-[#2C2420]/40 to-[#C25A3E]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="heading-xl text-white mb-4">Recipes</h1>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cream p-8 border border-[#2C2420]/8 mb-12"
        >
          <p className="font-body text-espresso/90 leading-relaxed text-center">
            This page serves as a guide on how to prepare any of our fresh
            sausages. As with any raw product, please follow all the safe handling
            instructions on the packaging and always cook to an internal
            temperature of at least <span className="text-terracotta font-semibold">165°F</span>. A good instant read thermometer can
            help if you are new to this.
          </p>
        </motion.div>

        {/* Boerewors Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="geo-border pb-6 mb-8">
            <h2 className="heading-lg text-espresso text-center">Boerewors</h2>
          </div>
          <div className="bg-cream p-8 border border-[#2C2420]/8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="font-body text-espresso/90">
                Never poke holes in the boerewors while grilling it. You&apos;ll
                lose a lot of flavor and it will end up being dry.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-olive rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-body text-espresso/90">
                Boerewors does not like to be grilled or cooked frozen,
                you&apos;re setting yourself up for heartache. Always thaw it
                first. Also, never show up at someone else&apos;s braai with
                frozen boerewors. <span className="italic text-terracotta">Show some respect.</span>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Cooking Methods */}
        <div className="space-y-8">
          {/* Grill Method */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <h3 className="heading-md text-espresso">Grill</h3>
            </div>
            <div className="font-body text-espresso/90 space-y-4">
              <p>
                Boerewors likes to be grilled on hot coals. Turn every 4 to 6
                minutes but depending on the coal temperatures keep checking so
                that you do not overdo a given side.
              </p>
              <p>
                The traditional barometer for boerewors has always been, if you
                bend it and it breaks it is ready but please do use an instant
                read thermometer to ensure you hit at least <span className="text-terracotta font-semibold">165°F</span>. Total cooking
                time is going to be somewhere between 10 and 15 minutes, depending
                on the heat and height of your grill grid.
              </p>
            </div>
          </motion.section>

          {/* Air Fryer Method */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-olive rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="heading-md text-espresso">Air Fryer</h3>
            </div>
            <div className="font-body text-espresso/90 space-y-4">
              <p>
                There are many variables at play when it comes to individual air
                fryers so your particular model may require different timings. The
                following is for thawed boerewors.
              </p>
              <div className="bg-sand p-4 border-l-4 border-terracotta">
                <p>
                  Set the air fryer to <span className="text-terracotta font-semibold">375°F for 8 minutes</span>, if the boerewors has
                  somewhat of a grill color after 8 minutes turn over and run it at
                  <span className="text-terracotta font-semibold"> 400°F for another 4 to 6 minutes</span>, checking the internal temperature
                  when done. If it darkens too quickly reduce to 375°F.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Pan Method */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="card-product bg-cream p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="heading-md text-espresso">Pan</h3>
            </div>
            <div className="font-body text-espresso/90">
              <p className="mb-4">Cooking boerewors in a pan is a 2 step process:</p>
              <ol className="list-decimal list-inside space-y-3 ml-4">
                <li>Start off with a little water (1/2 inch) in the pan. Add the boerewors. Bring it to a boil then cover and reduce the heat for 3-5 minutes. Turn the boerewors over and cover for another 3-5 minutes.</li>
                <li>Now remove the lid and allow the water boil away leaving behind the rendered fat from the boerewors. Brown the outside of the boerewors by turning it over 2 to 3 times.</li>
              </ol>
              <p className="mt-4 bg-sand p-4 border-l-4 border-amber">
                Once the color is good the boerewors is ready. Check to make sure the internal temperature is at least <span className="text-terracotta font-semibold">165°F</span>.
              </p>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;
