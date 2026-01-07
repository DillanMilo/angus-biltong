"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";
import Image from "next/image";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-sand">
      <NavMini />

      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[240px] overflow-hidden mt-24 sm:mt-28">
        <Image
          src="/image-5.jpg"
          alt="Privacy Policy"
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
            <h1 className="heading-xl text-white mb-4">Privacy Policy</h1>
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
          <p className="font-condensed text-espresso/60 text-sm tracking-wider uppercase mb-6">Last Updated: 12/10/2024</p>

          <p className="font-body text-espresso/90 mb-8 leading-relaxed">
            At Angus Biltong, we are committed to protecting your privacy. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your personal information when you visit our website
            www.angusbiltong.com (the &quot;Site&quot;). By accessing or using
            the Site, you agree to the terms of this Privacy Policy.
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                1. Information We Collect
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  We may collect the following types of personal information when
                  you visit our Site:
                </p>
                <div className="space-y-3 ml-4">
                  <div className="flex gap-3">
                    <span className="w-2 h-2 bg-terracotta rounded-full mt-2 flex-shrink-0"></span>
                    <p><span className="font-semibold text-espresso">Personal Identification Information:</span> Name, email address, phone
                    number, and other information you voluntarily provide when
                    contacting us or subscribing to our services.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-2 h-2 bg-terracotta rounded-full mt-2 flex-shrink-0"></span>
                    <p><span className="font-semibold text-espresso">Usage Data:</span> Information about how you use and interact with the
                    Site, including IP addresses, browser types, device information,
                    and pages viewed.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-2 h-2 bg-terracotta rounded-full mt-2 flex-shrink-0"></span>
                    <p><span className="font-semibold text-espresso">Cookies and Tracking Technologies:</span> We use cookies, web beacons,
                    and similar technologies to enhance your experience on our Site.
                    These tools help us analyze site traffic, understand user
                    behavior, and improve functionality.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                2. How We Use Your Information
              </h2>
              <div className="font-body text-espresso/90 space-y-3">
                <p>
                  We use the personal information we collect for various purposes,
                  including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full mt-2"></span>
                    To provide, maintain, and improve the Site and its services
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full mt-2"></span>
                    To personalize your experience on the Site
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full mt-2"></span>
                    To communicate with you, including responding to inquiries and sending newsletters or promotional content (with your consent)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full mt-2"></span>
                    To analyze usage trends and improve the functionality and content of the Site
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-olive rounded-full mt-2"></span>
                    To comply with legal obligations and enforce our terms of service
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                3. Sharing Your Information
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  We do not sell or rent your personal information to third
                  parties. However, we may share your data in the following cases:
                </p>
                <div className="bg-sand p-4 border-l-4 border-olive space-y-3">
                  <p><span className="font-semibold text-espresso">Service Providers:</span> We may share information with third-party
                  vendors and service providers who help us operate the Site, such
                  as hosting providers, email services, and analytics providers.
                  These service providers are obligated to protect your
                  information and may only use it as necessary to perform services
                  on our behalf.</p>
                  <p><span className="font-semibold text-espresso">Legal Compliance:</span> We may disclose your information if required
                  by law or to protect our legal rights, such as to comply with a
                  subpoena, court order, or legal process, or if we believe such
                  action is necessary to protect the safety or rights of others.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                4. Data Security
              </h2>
              <p className="font-body text-espresso/90">
                We take reasonable steps to protect your personal information
                from unauthorized access, alteration, or disclosure. However, no
                method of transmission over the internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                5. Your Rights
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber rounded-full mt-2"></span>
                    The right to access, update, or delete your personal information
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber rounded-full mt-2"></span>
                    The right to object to or restrict the processing of your personal data
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber rounded-full mt-2"></span>
                    The right to withdraw consent at any time where we rely on consent for processing your data
                  </li>
                </ul>
                <p>
                  If you wish to exercise any of these rights, please contact us
                  using the contact details provided below.
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                6. Third-Party Links
              </h2>
              <p className="font-body text-espresso/90">
                Our Site may contain links to third-party websites. We are not
                responsible for the privacy practices or content of these
                external sites. We encourage you to read the privacy policies of
                any third-party websites you visit.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="font-body text-espresso/90">
                We use cookies and similar technologies to collect and store
                information about your usage of the Site. Cookies are small data
                files placed on your device that help us improve user experience
                and analyze traffic patterns. You can control cookies through
                your browser settings, though disabling cookies may affect your
                experience on the Site.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                8. Children&apos;s Privacy
              </h2>
              <p className="font-body text-espresso/90">
                Our Site is not intended for children under the age of 13, and
                we do not knowingly collect personal information from children.
                If we learn that we have collected personal information from a
                child under the age of 13, we will take steps to delete such
                information as quickly as possible.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                9. Changes to This Privacy Policy
              </h2>
              <p className="font-body text-espresso/90">
                We may update this Privacy Policy from time to time. When we
                make significant changes, we will notify you by posting an
                updated version on this page. The &quot;Last Updated&quot; date
                at the top of this Privacy Policy indicates the most recent
                revision. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="heading-md text-espresso mb-4 pb-2 border-b border-espresso/10">
                10. Contact Us
              </h2>
              <div className="font-body text-espresso/90 space-y-4">
                <p>
                  If you have any questions or concerns about this Privacy Policy
                  or how we handle your personal information, please contact us
                  at:
                </p>
                <div className="bg-sand p-6 space-y-2">
                  <p className="font-display text-xl text-espresso">ANGUS BILTONG</p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:281-719-8577"
                      className="text-terracotta hover:text-terracotta-dark transition-colors font-semibold"
                    >
                      281-719-8577
                    </a>
                  </p>
                  <p>Address: 255 Sawdust Rd, Spring Texas, 77380</p>
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

export default PrivacyPage;
