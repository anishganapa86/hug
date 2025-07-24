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
import { useState } from "react";
import { motion } from "framer-motion";
import VolunteerSection from "@/components/applications&contact";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <main className={`bg-[#f9f8ff] text-[#1d1d1f] ${poppins.className}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 bg-white shadow-sm relative">
        <div className="text-xl font-semibold text-purple-700">
          HUG Foundation
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm items-center z-10">
          <button
            onClick={() => scrollToId("about")}
            className="hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            About
          </button>
          <button
            onClick={() => scrollToId("programs")}
            className="hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Programs
          </button>
          <button
            onClick={() => scrollToId("donate")}
            className="hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Volunteer
          </button>
          <button
            onClick={() => scrollToId("contact")}
            className="hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Contact
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToId("donate")}
            className="bg-purple-600 text-white rounded-full px-4 py-1 font-medium cursor-pointer"
          >
            Donate Now
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden z-50 relative">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>

          {menuOpen && (
            <div className="absolute top-14 right-0 w-56 bg-white shadow-lg rounded-md p-4 flex flex-col gap-4 text-sm z-50">
              {[
                { label: "About", id: "about" },
                { label: "Programs", id: "programs" },
                { label: "Volunteer", id: "donate" },
                { label: "Contact", id: "contact" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToId(id);
                    setMenuOpen(false);
                  }}
                  className="text-left hover:underline bg-transparent border-none p-0"
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
                className="bg-purple-600 text-white rounded-full px-4 py-1 font-medium cursor-pointer"
              >
                Donate Now
              </motion.button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 py-20">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        ></div>

        {/* Text Block */}
        <div className="max-w-xl relative z-10">
          <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 font-medium rounded-full text-sm mb-3 shadow relative">
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
              <span className="relative font-semibold text-purple-800">
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
              className="bg-purple-600 text-white px-6 py-2 rounded-md shadow cursor-pointer"
            >
              Get Involved
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToId("about")}
              className="border border-purple-600 text-purple-600 px-6 py-2 rounded-md cursor-pointer"
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
      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-20 py-14 bg-[#f9f8ff] text-center text-purple-700 font-semibold">
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
          About <span className="text-purple-700">HUG Foundation</span>
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
                <span className="text-purple-600 text-xl">✔</span>
                <span>
                  <strong>Compassionate Service</strong> - Approaching every
                  interaction with empathy and care
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 text-xl">✔</span>
                <span>
                  <strong>Inclusive Community</strong> - Creating spaces where
                  everyone feels valued and welcome
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 text-xl">✔</span>
                <span>
                  <strong>Leadership Development</strong> - Empowering students
                  to become tomorrow’s leaders
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 text-xl">✔</span>
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
              <h4 className="text-md font-semibold text-purple-700 mb-1">
                Student Volunteers
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We proudly engage student volunteers, providing leadership
                opportunities that make a lasting difference in both their lives
                and the communities they serve.
              </p>
            </div>
            <div className="p-6 bg-[#f4f2fd] rounded-lg shadow-sm">
              <h4 className="text-md font-semibold text-purple-700 mb-1">
                Community Impact
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Our programs directly address the needs of underserved
                communities, providing essential resources, educational support,
                and wellness initiatives.
              </p>
            </div>
            <div className="p-6 bg-[#f4f2fd] rounded-lg shadow-sm">
              <h4 className="text-md font-semibold text-purple-700 mb-1">
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
              className="text-purple-600 text-sm font-medium hover:underline"
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
              className="text-purple-600 text-sm font-medium hover:underline"
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
              className="text-purple-600 text-sm font-medium hover:underline"
            >
              See impact stories →
            </a>
          </div>
        </div>
      </section>

      {/* Programs Section */}
<section id="programs" className="bg-white px-10 py-20">
  <h2 className="text-3xl font-bold text-center mb-10">
    Our <span className="text-purple-700">Programs</span>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
      <FaTshirt className="text-purple-600 text-3xl mt-1" />
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
          className="text-purple-600 hover:underline"
        >
          Get Started →
        </a>
      </div>
    </div>
    <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
      <FaBook className="text-purple-600 text-3xl mt-1" />
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
          className="text-purple-600 hover:underline"
        >
          Apply now →
        </a>
      </div>
    </div>
    <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
      <FaUsers className="text-purple-600 text-3xl mt-1" />
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
          className="text-purple-600 hover:underline"
        >
          Apply now →
        </a>
      </div>
    </div>
    <div className="p-6 bg-[#f9f8ff] rounded-md shadow flex gap-4 items-start">
      <FaHeartbeat className="text-purple-600 text-3xl mt-1" />
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
          className="text-purple-600 hover:underline"
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
          Our <span className="text-purple-700">Partners</span>
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
                <FaBuilding className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Vegas Stronger</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Collaborating to strengthen our community through unified efforts
              and shared resources, making Las Vegas a better place for
              everyone.
            </p>
            <a
              href="#"
              className="text-purple-600 font-medium text-sm hover:underline"
            >
              Learn more about our partnership →
            </a>
          </div>

          {/* Become a Partner */}
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
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
              href="#"
              className="text-purple-600 font-medium text-sm hover:underline"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>
       <VolunteerSection />
    </main>
  );
}
