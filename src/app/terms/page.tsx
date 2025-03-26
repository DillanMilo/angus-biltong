"use client";

import NavMini from "@/app/components/NavMini";
import { motion } from "framer-motion";
import Footer from "@/app/components/Footer";

const TermsPage = () => {
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
          Terms of Service
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg space-y-8"
        >
          <p className="text-gray-600">Effective Date: 05/02/2022</p>

          <p className="text-gray-700">
            Welcome to Angus Biltong www.angusbiltong.com (referred to as "we",
            "us", "our"). By accessing or using our website at angusbiltong.com
            (the "Website"), you agree to be bound by these Terms of Service
            ("Terms") and our Privacy Policy. Please read them carefully. If you
            do not agree to these Terms, do not use the Website.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By using our Website, you acknowledge that you have read,
                understood, and agree to be bound by these Terms, and all
                applicable laws and regulations. If you do not agree with these
                Terms, please refrain from using the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                2. Changes to Terms
              </h2>
              <p className="text-gray-700">
                We may modify or update these Terms at any time without prior
                notice. Any changes will be posted on this page with an updated
                "Effective Date." It is your responsibility to review these
                Terms regularly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                3. User Account
              </h2>
              <p className="text-gray-700 mb-4">
                To access certain features or services on the Website, you may
                be required to create an account. You agree to provide accurate,
                current, and complete information and to update it as necessary.
              </p>
              <p className="text-gray-700">
                You are responsible for maintaining the confidentiality of your
                account and password, and for all activities that occur under
                your account. If you believe your account has been compromised,
                you should notify us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                4. Use of the Website
              </h2>
              <p className="text-gray-700 mb-4">
                You agree to use the Website only for lawful purposes and in
                accordance with these Terms. You may not:
              </p>
              <p className="text-gray-700 mb-2">
                Violate any applicable local, state, or international laws.
              </p>
              <p className="text-gray-700 mb-2">
                Impersonate any person or entity or falsely represent your
                affiliation with any person or entity.
              </p>
              <p className="text-gray-700 mb-2">
                Interfere with or disrupt the Website or its services.
              </p>
              <p className="text-gray-700">
                Upload or transmit harmful or malicious software.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                5. Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content, including but not limited to text, graphics, logos,
                images, and software, is the property of angusbiltong.com or its
                licensors and is protected by copyright, trademark, and other
                intellectual property laws. You may not use any content from the
                Website without express written permission from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                6. Third-Party Links
              </h2>
              <p className="text-gray-700">
                The Website may contain links to third-party websites. We are
                not responsible for the content or practices of these websites.
                Please review the terms of service and privacy policies of any
                third-party sites before using them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                7. Privacy Policy
              </h2>
              <p className="text-gray-700">
                Your use of the Website is also governed by our Privacy Policy,
                which can be found at https://angusbiltong.com/privacy-policy/.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-gray-700">
                The Website and its content are provided "as is" without
                warranties of any kind, either express or implied. We do not
                guarantee the accuracy, reliability, or availability of the
                Website at all times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                9. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                To the fullest extent permitted by law, angusbiltong.com will
                not be liable for any direct, indirect, incidental, special, or
                consequential damages resulting from your use of or inability to
                use the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                10. Indemnification
              </h2>
              <p className="text-gray-700">
                You agree to indemnify and hold harmless angusbiltong.com, its
                affiliates, and its employees from any claims, damages, losses,
                and expenses (including legal fees) arising from your use of the
                Website or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                11. Termination
              </h2>
              <p className="text-gray-700">
                We may suspend or terminate your access to the Website at our
                sole discretion, without notice, if you violate these Terms or
                engage in conduct that we deem harmful or inappropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                12. Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms are governed by and construed in accordance with the
                laws of the United States of America. Any disputes arising under
                or in connection with these Terms will be subject to the
                exclusive jurisdiction of the courts located in Spring Texas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 playfair">
                13. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="text-gray-700">
                <p>Email: info@angusbiltong.com</p>
                <p>Address: 255 Sawdust rd, Spring Texas, 77380</p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:281-719-8577"
                    className="text-green-600 hover:text-green-700"
                  >
                    281-719-8577
                  </a>
                </p>
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
