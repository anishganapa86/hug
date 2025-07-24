"use client";

import React, { forwardRef } from "react";

const VolunteerSection = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className="min-h-screen bg-white text-[#1d1d1f] py-12 px-4 md:px-16"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        <span className="text-[#6D5CAE]">Volunteer </span>
        <span className="text-[#1d1d1f]">with</span>
        <span className="text-[#6D5CAE]"> Us</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Left Column: Available Positions & Benefits */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#6D5CAE]">
            Available Positions
          </h2>
          <div className="space-y-6">
            {/* Clothing Drive Assistant */}
            <div className="bg-[#f9f8ff] rounded-md shadow p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-lg text-[#1d1d1f]">
                  Clothing Drive Assistant
                </h3>
                <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
                  Popular
                </span>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>🕒 4–8 hours monthly</li>
                <li>📅 Weekends</li>
                <li>📍 Various Locations</li>
              </ul>
            </div>

            {/* Student Mentor */}
            <div className="bg-[#f9f8ff] rounded-md shadow p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1 text-[#1d1d1f]">
                Student Mentor
              </h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>🕒 2–4 hours weekly</li>
                <li>📅 After School Hours</li>
                <li>📍 Local Schools</li>
              </ul>
            </div>

            {/* Event Coordinator */}
            <div className="bg-[#f9f8ff] rounded-md shadow p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1 text-[#1d1d1f]">
                Event Coordinator
              </h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>🕒 Variable</li>
                <li>📅 As Needed</li>
                <li>📍 Community Centers</li>
              </ul>
            </div>
          </div>

          {/* Why Volunteer */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3 text-[#6D5CAE]">
              Why Volunteer With Us?
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Develop valuable leadership skills</li>
              <li>Make a direct impact in your community</li>
              <li>Flexible scheduling for students</li>
              <li>Letters of recommendation for dedicated volunteers</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#6D5CAE]">
            Apply to Volunteer
          </h2>
          <iframe
            src="https://tally.so/r/wv6dQ4"
            title="Volunteer Form"
            className="w-full h-[650px] rounded-xl border border-gray-300"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
});

VolunteerSection.displayName = "VolunteerSection";

export default VolunteerSection;