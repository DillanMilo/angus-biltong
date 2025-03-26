"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#f4f8f1]">
      <NavMini />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-center playfair underline"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg space-y-8"
        >
          <p className="text-gray-600">Last Updated: 12/10/2024</p>

          <p className="text-gray-700">
            At Angus Biltong, we are committed to protecting your privacy. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your personal information when you visit our website
            www.angusbiltong.com (the &quot;Site&quot;). By accessing or using
            the Site, you agree to the terms of this Privacy Policy.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We may collect the following types of personal information when
                you visit our Site:
              </p>
              <p className="text-gray-700 mb-2">
                Personal Identification Information: Name, email address, phone
                number, and other information you voluntarily provide when
                contacting us or subscribing to our services.
              </p>
              <p className="text-gray-700 mb-2">
                Usage Data: Information about how you use and interact with the
                Site, including IP addresses, browser types, device information,
                and pages viewed.
              </p>
              <p className="text-gray-700">
                Cookies and Tracking Technologies: We use cookies, web beacons,
                and similar technologies to enhance your experience on our Site.
                These tools help us analyze site traffic, understand user
                behavior, and improve functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We use the personal information we collect for various purposes,
                including:
              </p>
              <p className="text-gray-700 mb-2">
                To provide, maintain, and improve the Site and its services.
              </p>
              <p className="text-gray-700 mb-2">
                To personalize your experience on the Site.
              </p>
              <p className="text-gray-700 mb-2">
                To communicate with you, including responding to inquiries and
                sending newsletters or promotional content (with your consent).
              </p>
              <p className="text-gray-700 mb-2">
                To analyze usage trends and improve the functionality and
                content of the Site.
              </p>
              <p className="text-gray-700">
                To comply with legal obligations and enforce our terms of
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                3. Sharing Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell or rent your personal information to third
                parties. However, we may share your data in the following cases:
              </p>
              <p className="text-gray-700 mb-2">
                Service Providers: We may share information with third-party
                vendors and service providers who help us operate the Site, such
                as hosting providers, email services, and analytics providers.
                These service providers are obligated to protect your
                information and may only use it as necessary to perform services
                on our behalf.
              </p>
              <p className="text-gray-700">
                Legal Compliance: We may disclose your information if required
                by law or to protect our legal rights, such as to comply with a
                subpoena, court order, or legal process, or if we believe such
                action is necessary to protect the safety or rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                4. Data Security
              </h2>
              <p className="text-gray-700">
                We take reasonable steps to protect your personal information
                from unauthorized access, alteration, or disclosure. However, no
                method of transmission over the internet is 100% secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                5. Your Rights
              </h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <p className="text-gray-700 mb-2">
                The right to access, update, or delete your personal
                information.
              </p>
              <p className="text-gray-700 mb-2">
                The right to object to or restrict the processing of your
                personal data.
              </p>
              <p className="text-gray-700 mb-4">
                The right to withdraw consent at any time where we rely on
                consent for processing your data.
              </p>
              <p className="text-gray-700">
                If you wish to exercise any of these rights, please contact us
                using the contact details provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                6. Third-Party Links
              </h2>
              <p className="text-gray-700">
                Our Site may contain links to third-party websites. We are not
                responsible for the privacy practices or content of these
                external sites. We encourage you to read the privacy policies of
                any third-party websites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700">
                We use cookies and similar technologies to collect and store
                information about your usage of the Site. Cookies are small data
                files placed on your device that help us improve user experience
                and analyze traffic patterns. You can control cookies through
                your browser settings, though disabling cookies may affect your
                experience on the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-gray-700">
                Our Site is not intended for children under the age of 13, and
                we do not knowingly collect personal information from children.
                If we learn that we have collected personal information from a
                child under the age of 13, we will take steps to delete such
                information as quickly as possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. When we
                make significant changes, we will notify you by posting an
                updated version on this page. The &quot;Last Updated&quot; date
                at the top of this Privacy Policy indicates the most recent
                revision. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                10. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about this Privacy Policy
                or how we handle your personal information, please contact us
                at:
              </p>
              <div className="text-gray-700">
                <p className="font-semibold">Angus Biltong</p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:281-719-8577"
                    className="text-green-600 hover:text-green-700"
                  >
                    281-719-8577
                  </a>
                </p>
                <p>Address: 255 Sawdust rd, Spring Texas, 77380</p>
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
