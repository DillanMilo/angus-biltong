"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[240px] overflow-hidden mt-24 sm:mt-28">
        <Image
          src="/image-5.jpg"
          alt="Terms of Service"
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
            <h1 className="heading-xl text-white mb-4">Terms of Service</h1>
            <div className="w-24 h-1 bg-amber mx-auto" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-cream p-8 md:p-12 border border-[#2C2420]/8"
        >
          <p className="font-condensed text-espresso/60 text-sm tracking-wider uppercase mb-6">Effective Date: 05/02/2022</p>

          <p className="font-body text-espresso/90 mb-8 leading-relaxed">
            Welcome to Angus Biltong www.angusbiltong.com (referred to as
            &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing or
            using our website at angusbiltong.com (the &quot;Website&quot;), you
            agree to be bound by these Terms of Service (&quot;Terms&quot;) and
            our Privacy Policy. Please read them carefully. If you do not agree
            to these Terms, do not use the Website.
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                1. Acceptance of Terms
              </h2>
              <p className="font-body text-espresso/90">
                By using our Website, you acknowledge that you have read,
                understood, and agree to be bound by these Terms, and all
                applicable laws and regulations. If you do not agree with these
                Terms, please refrain from using the Website.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                2. Changes to Terms
              </h2>
              <p className="font-body text-espresso/90">
                We may modify or update these Terms at any time without prior
                notice. Any changes will be posted on this page with an updated
                &quot;Effective Date.&quot; It is your responsibility to review
                these Terms regularly.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                3. User Account
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  To access certain features or services on the Website, you may
                  be required to create an account. You agree to provide accurate,
                  current, and complete information and to update it as necessary.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of your
                  account and password, and for all activities that occur under
                  your account. If you believe your account has been compromised,
                  you should notify us immediately.
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                4. Use of the Website
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  You agree to use the Website only for lawful purposes and in
                  accordance with these Terms. You may not:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2"></span>
                    Violate any applicable local, state, or international laws
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2"></span>
                    Impersonate any person or entity or falsely represent your affiliation with any person or entity
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2"></span>
                    Interfere with or disrupt the Website or its services
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2"></span>
                    Upload or transmit harmful or malicious software
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                5. Intellectual Property
              </h2>
              <p className="font-body text-espresso/90">
                All content, including but not limited to text, graphics, logos,
                images, and software, is the property of angusbiltong.com or its
                licensors and is protected by copyright, trademark, and other
                intellectual property laws. You may not use any content from the
                Website without express written permission from us.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                6. Third-Party Links
              </h2>
              <p className="font-body text-espresso/90">
                The Website may contain links to third-party websites. We are
                not responsible for the content or practices of these websites.
                Please review the terms of service and privacy policies of any
                third-party sites before using them.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                7. Privacy Policy
              </h2>
              <p className="font-body text-espresso/90">
                Your use of the Website is also governed by our Privacy Policy,
                which can be found at https://angusbiltong.com/privacy-policy/.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                8. Disclaimer of Warranties
              </h2>
              <div className="font-body text-espresso/90">
                <div className="bg-sand p-4 border-l-4 border-amber">
                  The Website and its content are provided &quot;as is&quot;
                  without warranties of any kind, either express or implied. We do
                  not guarantee the accuracy, reliability, or availability of the
                  Website at all times.
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                9. Limitation of Liability
              </h2>
              <p className="font-body text-espresso/90">
                To the fullest extent permitted by law, angusbiltong.com will
                not be liable for any direct, indirect, incidental, special, or
                consequential damages resulting from your use of or inability to
                use the Website.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                10. Indemnification
              </h2>
              <p className="font-body text-espresso/90">
                You agree to indemnify and hold harmless angusbiltong.com, its
                affiliates, and its employees from any claims, damages, losses,
                and expenses (including legal fees) arising from your use of the
                Website or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                11. Termination
              </h2>
              <p className="font-body text-espresso/90">
                We may suspend or terminate your access to the Website at our
                sole discretion, without notice, if you violate these Terms or
                engage in conduct that we deem harmful or inappropriate.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                12. Governing Law
              </h2>
              <p className="font-body text-espresso/90">
                These Terms are governed by and construed in accordance with the
                laws of the United States of America. Any disputes arising under
                or in connection with these Terms will be subject to the
                exclusive jurisdiction of the courts located in Spring Texas.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                13. Contact Information
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="bg-sand p-6 space-y-2">
                  <p className="font-display text-xl text-espresso">ANGUS BILTONG</p>
                  <p>Email: info@angusbiltong.com</p>
                  <p>Address: 255 Sawdust Rd, Spring Texas, 77380</p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:281-719-8577"
                      className="text-terracotta hover:text-terracotta-dark transition-colors font-semibold"
                    >
                      281-719-8577
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
