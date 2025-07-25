"use client";
import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  FaTshirt,
  FaBook,
  FaUsers,
  FaHeartbeat,
  FaBuilding,
} from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VolunteerSection from "@/components/applications&contact";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vegasModalOpen, setVegasModalOpen] = useState(false);
  useEffect(() => {
  if (vegasModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [vegasModalOpen]);
  const volunteerRef = useRef<HTMLElement>(null);
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

  function scrollToId(id: string) {
    if (id === "volunteer") {
      if (volunteerRef.current) {
        volunteerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
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
              <button onClick={() => scrollToId("about")} className="hover:underline">About</button>
              <button onClick={() => scrollToId("programs")} className="hover:underline">Programs</button>
              <button onClick={() => scrollToId("volunteer")} className="hover:underline">Volunteer</button>
              <button onClick={() => window.open("https://tally.so/r/wkB97o", "_blank")} className="hover:underline">Contact</button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => scrollToId("donate")}
                className="bg-[#6D5CAE] text-white rounded-full px-4 py-1 font-medium">
                Donate Now
              </motion.button>
            </nav>
            <div className="md:hidden z-50 relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
              {menuOpen && (
                <div className="absolute top-14 right-0 w-56 bg-white shadow-lg rounded-md p-4 flex flex-col gap-4 text-sm z-50">
                  {[
                    { label: "About", id: "about" },
                    { label: "Programs", id: "programs" },
                    { label: "Volunteer", id: "volunteer" },
                    { label: "Contact", id: "contact" },
                  ].map(({ label, id }) => (
                    <button
                      key={id}
                      onClick={() => {
                        if (id === "contact") {
                          window.open("https://tally.so/r/wkB97o", "_blank");
                        } else {
                          scrollToId(id);
                        }
                        setMenuOpen(false);
                      }}
                      className="text-left hover:underline"
                    >
                      {label}
                    </button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToId("donate");
                      setMenuOpen(false);
                    }}
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
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 py-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        ></div>

        {/* Text Block */}
        <div className="max-w-xl relative z-10">
          <div className="inline-block px-3 py-1 bg-purple-100 text-[#6D5CAE] font-medium rounded-full text-sm mb-3 shadow relative">
            <span className="relative z-10">
              501(c)(3) Non-Profit Organization
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-5 relative z-10 mt-4">
            Helping{" "}
            <span className="relative inline-block">
              <span
                className="bg-purple-100 rounded-md absolute inset-0 -z-10 scale-102"
                aria-hidden="true"
              ></span>
              <span className="relative font-semibold text-[#6D5CAE]">
                Underprivileged
              </span>
            </span>{" "}
            Groups
          </h2>
          <p className="text-gray-600 mb-6 relative z-10">
            Based in Henderson, Nevada, empowering underserved communities
            through education, wellness, and compassionate outreach.
          </p>
          <div className="flex gap-4 relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToId("donate")}
              className="bg-[#6D5CAE] text-white px-6 py-2 rounded-md shadow cursor-pointer"
            >
              Get Involved
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToId("about")}
              className="border border-[#6D5CAE] text-[#6D5CAE] px-6 py-2 rounded-md cursor-pointer"
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-10 lg:mt-0 relative z-10 flex justify-center lg:justify-end w-full lg:w-[40%]">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-purple-100 rounded-xl z-0" />
            <Image
              src="/HUGlogo.png"
              alt="HUG Logo"
              width={500}
              height={500}
              className="relative z-10 rounded-lg shadow-lg w-[340px] sm:w-[380px] md:w-[420px] lg:w-[480px] xl:w-[520px]"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-20 py-14 bg-[#f9f8ff] text-center text-[#6D5CAE] font-semibold">
        <div>
          <p className="text-3xl">150+</p>
          <p className="text-sm text-gray-500">Active Volunteers</p>
        </div>
        <div>
          <p className="text-3xl">1k+</p>
          <p className="text-sm text-gray-500">Total Donations</p>
        </div>
        <div>
          <p className="text-3xl">2</p>
          <p className="text-sm text-gray-500">Community Programs</p>
        </div>
        <div>
          <p className="text-3xl">EST'24</p>
          <p className="text-sm text-gray-500">Established</p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="px-6 md:px-20 py-20 bg-white text-[#1d1d1f]"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="text-[#6D5CAE]">HUG Foundation</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          A distinguished 501(c)(3) non-profit organization devoted to
          empowering underserved communities through education, wellness, and
          compassionate outreach.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600 mb-8">
              At HUG Foundation, we are committed to fostering a culture of
              excellence, generosity, and human connection, building a brighter
              future one HUG at a time.
            </p>

            <h3 className="text-lg font-semibold mb-3">Our Values</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#6D5CAE] text-xl">✔</span>
                <span>
                  <strong>Compassionate Service</strong> - Approaching every
                  interaction with empathy and care
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6D5CAE] text-xl">✔</span>
                <span>
                  <strong>Inclusive Community</strong> - Creating spaces where
                  everyone feels valued and welcome
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6D5CAE] text-xl">✔</span>
                <span>
                  <strong>Leadership Development</strong> - Empowering students
                  to become tomorrow’s leaders
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6D5CAE] text-xl">✔</span>
                <span>
                  <strong>Sustainable Impact</strong> - Making lasting
                  differences in the communities we serve
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-6 bg-[#f4f2fd] rounded-lg shadow-sm">
              <h4 className="text-md font-semibold text-[#6D5CAE] mb-1">
                Student Volunteers
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We proudly engage student volunteers, providing leadership
                opportunities that make a lasting difference in both their lives
                and the communities they serve.
              </p>
            </div>
            <div className="p-6 bg-[#f4f2fd] rounded-lg shadow-sm">
              <h4 className="text-md font-semibold text-[#6D5CAE] mb-1">
                Community Impact
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Our programs directly address the needs of underserved
                communities, providing essential resources, educational support,
                and wellness initiatives.
              </p>
            </div>
            <div className="p-6 bg-[#f4f2fd] rounded-lg shadow-sm">
              <h4 className="text-md font-semibold text-[#6D5CAE] mb-1">
                Holistic Approach
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We believe in addressing the whole person – their educational
                needs, physical well-being, and emotional support – creating
                comprehensive solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="donate"
        className="bg-[#f9f8ff] py-20 px-6 md:px-20 flex flex-col lg:flex-row gap-10 items-start justify-center"
      >
        {/* Donorbox iframe */}
        <div className="bg-white shadow rounded-lg p-4 max-w-[500px] w-full">
          <iframe
            src="https://donorbox.org/embed/hug-cares-a-community-call-to-action-784141?"
            name="donorbox"
            allow="payment"
            seamless
            style={{
              maxWidth: "500px",
              minWidth: "250px",
              minHeight: "580px",
              maxHeight: "none",
              overflow: "hidden",
              border: "none",
            }}
            height="auto"
            width="100%"
          ></iframe>
        </div>

        {/* Your Impact Cards */}
        <div className="flex flex-col gap-6 w-full lg:max-w-md">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">$25 Provides</h3>
            <p className="text-gray-600 mb-4">
              Essential school supplies for a student in need, supporting their
              educational journey.
            </p>
            <a
              href="#"
              className="text-[#6D5CAE] text-sm font-medium hover:underline"
            >
              See impact stories →
            </a>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">$100 Provides</h3>
            <p className="text-gray-600 mb-4">
              An entire month of after-school programming for a child, including
              academic support and enrichment activities.
            </p>
            <a
              href="#"
              className="text-[#6D5CAE] text-sm font-medium hover:underline"
            >
              See impact stories →
            </a>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Clothing Donations</h3>
            <p className="text-gray-600 mb-4">
              Your donated clothing items go directly to families in need,
              providing warmth, comfort, and dignity.
            </p>
            <a
              href="#"
              className="text-[#6D5CAE] text-sm font-medium hover:underline"
            >
              See impact stories →
            </a>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="bg-white px-10 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our <span className="text-[#6D5CAE]">Programs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
            <FaTshirt className="text-[#6D5CAE] text-3xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Clothing Donation Drives
              </h3>
              <p className="text-gray-600 mb-2">
                We collect and distribute gently used apparel — with the
                exception of undergarments — to individuals and families in
                need.
              </p>
              <a
                href="https://tally.so/r/n949PG"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D5CAE] hover:underline"
              >
                Get Started →
              </a>
            </div>
          </div>
          <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
            <FaBook className="text-[#6D5CAE] text-3xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Educational Support
              </h3>
              <p className="text-gray-600 mb-2">
                Providing tutoring, mentorship, and educational resources to
                support academic success in underserved communities.
              </p>
              <a
                href="https://tally.so/r/w50p6Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D5CAE] hover:underline"
              >
                Apply now →
              </a>
            </div>
          </div>
          <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
            <FaUsers className="text-[#6D5CAE] text-3xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Leadership Development
              </h3>
              <p className="text-gray-600 mb-2">
                Creating opportunities for students to develop leadership skills
                through meaningful volunteer experiences.
              </p>
              <a
                href="https://tally.so/r/wv6dQ4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D5CAE] hover:underline"
              >
                Apply now →
              </a>
            </div>
          </div>
          <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
            <FaHeartbeat className="text-[#6D5CAE] text-3xl mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Wellness Initiatives
              </h3>
              <p className="text-gray-600 mb-2">
                Promoting physical and mental wellbeing through accessible
                health resources and community programs.
              </p>
              <a
                href="https://tally.so/r/3qQvLg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D5CAE] hover:underline"
              >
                Apply now →
              </a>
            </div>
          </div>
        </div>
      </section>

    {/* Partners Section */}
<section className="bg-[#f9f8ff] px-6 md:px-20 py-20">
  <h2 className="text-3xl font-bold text-center mb-3">
    Our <span className="text-[#6D5CAE]">Partners</span>
  </h2>
  <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
    Working together with community organizations to create lasting impact
    in Henderson and the greater Las Vegas area.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Vegas Stronger */}
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-3 bg-purple-100 rounded-full">
          <FaBuilding className="w-6 h-6 text-[#6D5CAE]" />
        </div>
        <h3 className="text-lg font-semibold">Vegas Stronger</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Collaborating to strengthen our community through unified efforts
        and shared resources, making Las Vegas a better place for everyone.
      </p>
      <button
        onClick={() => setVegasModalOpen(true)}
        className="text-[#6D5CAE] font-medium text-sm hover:underline"
      >
        Learn more about our partnership →
      </button>
    </div>

    {/* Become a Partner */}
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-3 bg-purple-100 rounded-full">
          <svg
            className="w-6 h-6 text-[#6D5CAE]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Become a Partner</h3>
      </div>
      <p className="text-gray-600 mb-4">
        We're always looking to collaborate with organizations that share
        our vision for a stronger, more inclusive community in Henderson
        and beyond.
      </p>
      <a
        href="https://tally.so/r/wkB97o"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#6D5CAE] font-medium text-sm hover:underline"
      >
        Get in touch →
      </a>
    </div>
  </div>
</section>

{/* Vegas Stronger Modal */}
<AnimatePresence>
  {vegasModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transitionEnd: { display: "none" },
      }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setVegasModalOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4 text-[#6D5CAE]">
          Our Partnership with Vegas Stronger
        </h2>
        <p className="text-gray-700 mb-4">
          HUG Foundation started in July 2024, where we collected 250 blankets and donated them all to Vegas Stronger. We worked with Stacey Lockhart to help hundreds of people to ensure their comfort in a time of need. As of now on a quarterly basis partnering with other school in the Clark County district to achieve a set goal of clothe donations ranging from shirts to shoes. HUG continues to strive for the warmth that everyone deserves.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Image
            src="/vegasstronger1.jpg"
            alt="Vegas Stronger 1"
            width={500}
            height={300}
            className="rounded-md object-cover w-full h-auto"
          />
          <Image
            src="/vegasstronger2.jpg"
            alt="Vegas Stronger 2"
            width={500}
            height={300}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      <VolunteerSection ref={volunteerRef} />

{/* Footer */}
<footer
  className="py-16 text-sm text-[#6D5CAE]"
  style={{ backgroundColor: "rgba(109, 92, 174, 0.1)" }}
>
  <div className="px-6 md:px-20 max-w-[1280px] mx-auto w-full">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
      {/* Left: Logo */}
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

      {/* Center: Nav buttons + copyright */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex flex-wrap justify-center gap-6 md:gap-4 mb-4">
          <button onClick={() => scrollToId("about")} className="hover:underline">
            About
          </button>
          <button onClick={() => scrollToId("programs")} className="hover:underline">
            Programs
          </button>
          <button onClick={() => scrollToId("volunteer")} className="hover:underline">
            Volunteer
          </button>
          <button
            onClick={() => window.open("https://tally.so/r/wkB97o", "_blank")}
            className="hover:underline"
          >
            Contact
          </button>
        </div>
        <p className="text-center text-xs">
          © {new Date().getFullYear()} HUG Foundation. All rights reserved.
          <br />
          Website designed by{" "}
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
      {/* Right: Location */}
      <div className="text-center md:text-right font-medium text-[#6D5CAE] md:flex-1 mt-4 md:mt-0">
        <p>Henderson, NV</p>
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}
