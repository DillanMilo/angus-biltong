"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

const RecipesPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#f4f8f1]">
      <NavMini />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center playfair underline"
        >
          Recipes
        </motion.h1>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-gray-700 leading-relaxed"
        >
          This page serves as a guide on how to prepare any of our fresh
          sausages. As with any raw product, please follow all the safe handling
          instructions on the packaging and always cook to an internal
          temperature of at least 145F. A good instant ready thermometer can
          help if you are new to this.
        </motion.p>

        {/* Boerewors Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 playfair">Boerewors</h2>
          <div className="space-y-6">
            <p className="text-gray-700">
              Never poke holes in the boerewors while grilling it. You will lose
              a lot of flavor and it will end up being dry.
            </p>
            <p className="text-gray-700">
              Boerewors does not like to be grilled or cooked frozen, you are
              setting yourself up for heartache. Always thaw it first. Also,
              never show up at someone else's braai with frozen boerewors. Show
              some respect.
            </p>
          </div>
        </motion.section>

        {/* Cooking Methods */}
        <div className="space-y-12">
          {/* Grill Method */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Grill</h3>
            <p className="text-gray-700 mb-4">
              Boerewors likes to be grilled on hot coals. Turn every 4 to 6
              minutes but depending on the coal temperatures keep checking so
              that you do not overdo a given side.
            </p>
            <p className="text-gray-700">
              The traditional barometer for boerewors has always been, if you
              bend it and it breaks it is ready but please do use an instant
              read thermometer to ensure you hit at least 145F. Total cooking
              time is going to be somewhere between 10 and 15 minutes, depending
              on the heat and height of your grill grid.
            </p>
          </motion.section>

          {/* Air Fryer Method */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Air Fryer</h3>
            <p className="text-gray-700">
              There are many variables at play when it comes to individual air
              fryers so your particular model may require different timings. The
              following is for thawed boerewors.
            </p>
            <p className="text-gray-700 mt-4">
              Set the air fryer to 375 for 8 minutes, if the boerewors has
              somewhat of a grill color after 8 minutes turn over and run it at
              400F for another 4 to 6 minutes, checking the internal temperature
              when done. If it darkens too quickly reduce to 375F.
            </p>
          </motion.section>

          {/* Pan Method */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Pan</h3>
            <p className="text-gray-700">
              Cooking boerewors in a pan is a 2 step process. Start off with a
              little water (1/2 inch) in the pan. Add the boerewors. Bring it to
              a boil then cover and reduce the heat for 3-5 minutes. Turn the
              boerewors over and cover for another 3-5 minutes. Now remove the
              lid and allow the water boil away leaving behind the rendered fat
              from the boerewors. Brown the outside of the boerewors by turning
              it over 2 to 3 times. Once the color is good the boerewors is
              ready. Check to make sure the internal temperature is at least
              145F.
            </p>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecipesPage;
