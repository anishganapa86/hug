"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function SATTutoring() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) setShowHeader(true);
      else if (currentScrollY > lastScrollY.current) setShowHeader(false);
      else setShowHeader(true);
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function openForm() {
    window.open("https://tally.so/r/mD8jyR", "_blank");
  }

  return (
    <>
      <Head>
        <title>SAT Tutoring | HUG Foundation</title>
        <meta
          name="description"
          content="Free, high-quality SAT tutoring for underprivileged students. Breaking the income–score barrier with top tutors (1500+ scorers)."
        />
      </Head>

      <main className={`bg-[#f9f8ff] text-[#1d1d1f] ${poppins.className}`}>
        {/* Header */}
        <AnimatePresence>
          {showHeader && (
            <motion.header
              key="header"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-between px-10 py-6 bg-white shadow-sm fixed top-0 left-0 right-0 z-50"
            >
              <div className="text-xl font-semibold text-[#6D5CAE]">
                HUG Foundation
              </div>
              <nav className="hidden md:flex gap-6 text-sm items-center z-10">
                <a href="/" className="hover:underline">
                  Home
                </a>
                <a
                  href="https://tally.so/r/wkB97o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Contact
                </a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.open(
                      "https://donorbox.org/hug-cares-a-community-call-to-action-784141",
                      "_blank"
                    )
                  }
                  className="bg-[#6D5CAE] text-white rounded-full px-4 py-1 font-medium"
                >
                  Donate Now
                </motion.button>
              </nav>
              <div className="md:hidden z-50 relative">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
                {menuOpen && (
                  <div className="absolute top-14 right-0 w-56 bg-white shadow-lg rounded-md p-4 flex flex-col gap-4 text-sm z-50">
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                    <a
                      href="https://tally.so/r/wkB97o"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Contact
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        window.open(
                          "https://donorbox.org/hug-cares-a-community-call-to-action-784141",
                          "_blank"
                        )
                      }
                      className="bg-[#6D5CAE] text-white rounded-full px-4 py-1 font-medium"
                    >
                      Donate Now
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent pointer-events-none"></div>

          {/* Text Block */}
          <div className="max-w-xl relative z-10">
            <h1 className="text-4xl font-bold leading-tight mb-5 relative z-10">
              Free{" "}
              <span className="relative inline-block">
                <span
                  className="bg-purple-100 rounded-md absolute inset-0 -z-10 scale-102"
                  aria-hidden="true"
                ></span>
                <span className="relative font-semibold text-[#6D5CAE]">
                  SAT Tutoring
                </span>
              </span>{" "}
              For Every Student
            </h1>
            <p className="text-gray-600 mb-6 relative z-10">
              We believe that a student’s SAT score should reflect their
              potential—not their family’s income. That’s why we provide
              personalized, high-quality SAT tutoring completely free of charge.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openForm}
              className="bg-[#6D5CAE] text-white px-6 py-2 rounded-md shadow cursor-pointer"
            >
              Sign Up Now
            </motion.button>
          </div>

          {/* Image */}
          <div className="mt-10 lg:mt-0 relative z-10 flex justify-center lg:justify-end w-full lg:w-[40%]">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-purple-100 rounded-xl z-0" />
              <Image
                src="/sat-students.jpg"
                alt="Students studying for SAT"
                width={480}
                height={400}
                className="relative z-10 rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="px-6 md:px-20 py-16 bg-white">
          <h2 className="text-3xl font-bold text-center mb-4">
            Breaking the{" "}
            <span className="text-[#6D5CAE]">Income–Score Barrier</span>
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            Studies show a clear correlation between household income and SAT
            scores. Higher income often means access to costly prep classes and
            private tutoring—leaving low-income students at a disadvantage. We
            are here to change that narrative.
          </p>
        </section>

        {/* How We Help */}
        <section className="px-6 md:px-20 py-20 bg-[#f9f8ff]">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-[#6D5CAE]">Tutoring Program</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Top Scorers</h3>
              <p className="text-gray-600">
                Every tutor scored 1500+ on the SAT and knows what it takes to
                excel.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Personalized Prep</h3>
              <p className="text-gray-600">
                We adapt tutoring to each student’s strengths, weaknesses, and
                goals—no one-size-fits-all.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Completely Free</h3>
              <p className="text-gray-600">
                Families never pay a cent. Access to quality SAT prep should be
                a right, not a privilege.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-20 py-20 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Boost Your SAT Score?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you’re aiming for college scholarships or admissions, our
            tutors are here to help you achieve your goals. Sign up today to
            reserve your spot.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openForm}
            className="bg-[#6D5CAE] text-white px-8 py-3 rounded-md shadow-lg text-lg font-medium"
          >
            Sign Up for Free Tutoring
          </motion.button>
        </section>

        {/* Footer */}
        <footer
          className="py-16 text-sm text-[#6D5CAE]"
          style={{ backgroundColor: "rgba(109, 92, 174, 0.1)" }}
        >
          <div className="px-6 md:px-20 max-w-[1280px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 md:flex-1">
              <Image
                src="/HUGlogo.png"
                alt="HUG Foundation Logo"
                width={50}
                height={50}
                className="rounded"
              />
              <span className="font-semibold">HUG Foundation</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="flex flex-wrap justify-center gap-6 md:gap-4 mb-4">
                <a href="/" className="hover:underline">
                  Home
                </a>
                <a
                  href="https://tally.so/r/wkB97o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Contact
                </a>
              </div>
              <p className="text-center text-xs">
                © {new Date().getFullYear()} HUG Foundation. All rights
                reserved.
                <br />
                Website designed and built by{" "}
                <a
                  href="https://arghyav.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#4b3a8f]"
                >
                  Arghya Vyas
                </a>
              </p>     
            </div>
            <div className="text-center md:text-right font-medium text-[#6D5CAE] md:flex-1 mt-4 md:mt-0">
              <p>Henderson, NV</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
