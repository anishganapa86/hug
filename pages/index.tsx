import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { readContent } from "@/lib/contentStore";
import { getByPath, type SiteContent } from "@/lib/content";
import Layout from "@/components/Layout";
import VolunteerSection from "@/components/applications&contact";
import ProgramFormModal from "@/components/ProgramFormModal";
import ProgramTabs from "@/components/ProgramTabs";
import GalleryGrid from "@/components/GalleryGrid";
import NebulaDivider from "@/components/NebulaDivider";
import {
  EditableProvider,
  Editable,
  useEditable,
} from "@/components/cms/EditableProvider";

gsap.registerPlugin(ScrollTrigger);

const GlobeScene = dynamic(() => import("@/components/GlobeScene"), {
  ssr: false,
  loading: () => null,
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [content, session] = await Promise.all([
    readContent(),
    getServerSession(ctx.req, ctx.res, authOptions),
  ]);
  return { props: { content, isAdmin: !!session } };
}

/**
 * A stat number that counts up when scrolled into view, but becomes inline
 * editable text for an admin in edit mode (parsing e.g. "6k+" → 6 + "k+").
 */
function StatNumber({ field }: { field: string }) {
  const { content, editing, isAdmin } = useEditable();
  const value = getByPath(content, field);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (editing) return;
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^([\d,]+)(.*)$/);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!match || reduced) {
      el.textContent = value;
      return;
    }
    const end = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration: 2.6,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString("en-US") + suffix;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, editing]);

  if (editing && isAdmin) {
    return <Editable as="span" field={field} />;
  }
  return <span ref={ref}>{value}</span>;
}

/** Subtle fade-and-rise when a block scrolls into view. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HomeContent() {
  const [impact1Open, setImpact1Open] = useState(false);
  const [impact2Open, setImpact2Open] = useState(false);
  const [impact3Open, setImpact3Open] = useState(false);
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [programName, setProgramName] = useState("");

  const volunteerRef = useRef<HTMLElement>(null);
  const aboutValuesRef = useRef<HTMLUListElement>(null);
  const donateCardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const anyModalOpen =
    impact1Open || impact2Open || impact3Open || programModalOpen;

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyModalOpen]);

  // Pause/hide video when user prefers reduced motion
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (aboutValuesRef.current) {
        gsap.fromTo(
          aboutValuesRef.current.querySelectorAll("li"),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: aboutValuesRef.current, start: "top 85%" },
          }
        );
      }

      if (donateCardsRef.current) {
        gsap.fromTo(
          donateCardsRef.current.querySelectorAll(".impact-card"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: donateCardsRef.current, start: "top 85%" },
          }
        );
      }

    });

    return () => ctx.revert();
  }, []);

  function scrollToSection(id: string) {
    if (id === "volunteer") {
      volunteerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openProgram(program: string) {
    setProgramName(program);
    setProgramModalOpen(true);
  }

  function closeAllModals() {
    setImpact1Open(false);
    setImpact2Open(false);
    setImpact3Open(false);
  }

  return (
    <>
      <Head>
        <title>HUG Foundation</title>
        <meta
          name="description"
          content="HUG Foundation is a student-run Henderson, NV non-profit. We assemble hygiene packets, run clothing drives with Vegas Stronger, and provide free SAT tutoring."
        />
      </Head>

      <Layout onScrollToSection={scrollToSection}>
        {/* ─── HERO (black space) ───────────────────────────────────────── */}
        <section
          id="hero"
          className="relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 lg:px-20 min-h-screen pt-24 pb-16 overflow-hidden bg-black"
        >
          {/* Video starfield background */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          >
            <source src="/space-bg.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay — ensures hero text passes WCAG AA over the video */}
          <div className="absolute inset-0 pointer-events-none z-[1] bg-black/40" />

          {/* Purple accent glow — top-left */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse at top left, rgba(109,92,174,0.35) 0%, transparent 55%)",
            }}
          />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl relative z-10"
          >
            <Editable
              as="div"
              field="heroBadge"
              className="inline-block px-3 py-1 bg-[#8B7BD8]/20 text-[#cabdf2] font-medium rounded-full text-sm mb-4 border border-[#8B7BD8]/40"
            />

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              <Editable as="span" field="heroHeadlinePre" className="text-white" />
              <span className="relative inline-block">
                <span
                  className="absolute inset-0 bg-purple-100 rounded-md -z-10"
                  aria-hidden="true"
                />
                <Editable
                  as="span"
                  field="heroHeadlineHighlight"
                  className="relative text-[#6D5CAE]"
                />
              </span>
              <Editable as="span" field="heroHeadlinePost" className="text-white" />
            </h1>

            <Editable
              as="p"
              field="heroSubtitle"
              className="text-[#cfcfcf] mb-8 text-lg leading-relaxed"
            />

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("donate")}
                className="bg-[#6D5CAE] text-white px-7 py-3 rounded-lg shadow-md font-medium hover:bg-[#5a4a99] transition-colors"
              >
                Get Involved
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="border border-white/70 text-white px-7 py-3 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-14 lg:mt-0 relative z-10 flex justify-center lg:justify-end w-full lg:w-[44%]"
          >
            <div className="relative">
              {/* purple glow behind the bright logo card */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-full bg-[#6D5CAE]/40 blur-3xl z-0"
              />
              <div className="absolute -top-5 -left-5 w-full h-full bg-purple-100/70 rounded-2xl z-0" />
              <Image
                src="/HUGlogo.png"
                alt="HUG Foundation"
                width={520}
                height={520}
                priority
                className="relative z-10 rounded-2xl shadow-2xl w-[260px] sm:w-[320px] md:w-[380px] lg:w-[440px] xl:w-[480px]"
              />
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection("stats")}
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 z-10 text-white opacity-70 hover:opacity-100 transition"
            style={{
              transform: "translateX(-50%)",
              animation: "bounce 2s ease-in-out infinite",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </section>

        {/* ─── STATS ─────────────────────────────────────────────────────────────── */}
        <motion.section
          id="stats"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-panel-white backdrop-blur-sm py-16 px-6 md:px-20 border-b border-purple-100/70"
        >
          <p className="max-w-3xl mx-auto text-center text-xl md:text-2xl font-medium leading-relaxed text-[#1d1d1f]">
            Since <Editable as="span" field="statEstablished" className="font-semibold text-[#6D5CAE]" />, we&apos;ve run{" "}
            <StatNumber field="statPrograms" /> programs with{" "}
            <StatNumber field="statVolunteers" /> volunteers and put{" "}
            <StatNumber field="statItems" /> items into the hands of people who
            need them.
          </p>
        </motion.section>

        <NebulaDivider />

        {/* ─── ABOUT ───────────────────────────────────────────────────────────── */}
        <section
          id="about"
          className="relative px-6 md:px-20 py-28 md:py-32 space-panel backdrop-blur-sm text-[#1d1d1f] overflow-hidden"
        >
          <div className="relative max-w-6xl mx-auto">
            {/* heading block */}
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.22em] text-[#6D5CAE] mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                About <span className="text-[#6D5CAE]">HUG Foundation</span>
              </h2>
              <Editable
                as="p"
                field="aboutIntro"
                className="block text-center text-gray-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Mission + Values */}
              <div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">
                  Our Mission
                </h3>
                <Editable
                  as="p"
                  field="aboutMission"
                  className="block text-gray-600 mb-11 leading-relaxed"
                />

                <h3 className="text-xl font-semibold mb-6 tracking-tight">
                  Our Values
                </h3>
                <ul ref={aboutValuesRef} className="space-y-5 text-gray-700">
                  {[
                    {
                      title: "Compassionate Service",
                      desc: "Approaching every interaction with empathy and care",
                    },
                    {
                      title: "Inclusive Community",
                      desc: "Creating spaces where everyone feels valued and welcome",
                    },
                    {
                      title: "Leadership Development",
                      desc: "Empowering students to become tomorrow's leaders",
                    },
                    {
                      title: "Sustainable Impact",
                      desc: "Making lasting differences in the communities we serve",
                    },
                  ].map(({ title, desc }) => (
                    <li key={title} className="value-item flex items-baseline gap-3">
                      <span className="mt-[3px] w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                      <span className="leading-relaxed">
                        <strong className="font-semibold text-[#1d1d1f]">
                          {title}
                        </strong>
                        <span className="text-gray-600">{" "}{desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info cards */}
              <div className="space-y-5">
                {[
                  {
                    title: "Student Volunteers",
                    body: "We proudly engage student volunteers, providing leadership opportunities that make a lasting difference in both their lives and the communities they serve.",
                  },
                  {
                    title: "Community Impact",
                    body: "Our programs directly address the needs of underserved communities, providing essential resources, educational support, and wellness initiatives.",
                  },
                  {
                    title: "Holistic Approach",
                    body: "We believe in addressing the whole person, including their educational needs, physical well-being, and emotional support, to create comprehensive solutions.",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm"
                  >
                    <h4 className="font-semibold text-[#6D5CAE] mb-2 text-lg">
                      {title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── GLOBE ───────────────────────────────────────────────────────────── */}
        <section className="space-panel-white backdrop-blur-sm py-20 px-6 md:px-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 h-64 md:h-80 relative overflow-visible">
              <GlobeScene />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Making an impact in{" "}
                  <span className="text-[#6D5CAE]">Henderson, NV</span> and beyond
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We started in July 2024 with a blanket drive for Vegas Stronger.
                  Since then our chapters have spread to California, New Jersey,
                  and India, with new drives and tutoring sessions running every
                  quarter.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <NebulaDivider />

        {/* ─── PROGRAMS (tabs) ───────────────────────────────────────────────────── */}
        <section
          id="programs"
          className="space-panel backdrop-blur-sm px-6 md:px-20 py-24"
        >
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-4">
              Our <span className="text-[#6D5CAE]">Programs</span>
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
              Four programs, run end-to-end by student volunteers.
            </p>
          </Reveal>

          <ProgramTabs onApply={openProgram} />
        </section>

        {/* ─── DONATE ───────────────────────────────────────────────────────────── */}
        <section
          id="donate"
          className="space-panel-white backdrop-blur-sm py-24 px-6 md:px-20 flex flex-col lg:flex-row gap-10 items-start justify-center"
        >
          {/* Donorbox iframe — untouched */}
          <div className="bg-white shadow-md rounded-xl p-4 max-w-[500px] w-full">
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
            />
          </div>

          {/* Impact cards */}
          <div
            ref={donateCardsRef}
            className="flex flex-col gap-5 w-full lg:max-w-md"
          >
            {[
              {
                open: impact1Open,
                setOpen: setImpact1Open,
                heading: "$25 Provides",
                body: "One complete hygiene packet: soap, shampoo, toothbrush, toothpaste, deodorant, and sanitary items.",
              },
              {
                open: impact2Open,
                setOpen: setImpact2Open,
                heading: "$100 Provides",
                body: "Four hygiene packets, plus a week of SAT tutoring and test-prep materials for three students.",
              },
              {
                open: impact3Open,
                setOpen: setImpact3Open,
                heading: "Clothing Donations",
                body: "Your donated clothing gets sorted and cleaned by volunteers, then handed directly to families through Vegas Stronger.",
              },
            ].map(({ heading, body, setOpen }) => (
              <div
                key={heading}
                className="impact-card bg-white rounded-xl shadow-sm p-6 border border-purple-50"
              >
                <h3 className="text-lg font-semibold mb-2">{heading}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {body}
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="text-[#6D5CAE] text-sm font-medium hover:underline"
                >
                  See impact stories →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Impact modals */}
        <AnimatePresence>
          {(impact1Open || impact2Open || impact3Open) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center px-4"
              onClick={closeAllModals}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white relative rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto"
              >
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold leading-none"
                  onClick={closeAllModals}
                  aria-label="Close"
                >
                  &times;
                </button>

                {impact1Open && (
                  <>
                    <h3 className="text-lg font-semibold mb-4">$25 Impact</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      A $25 donation covers the supplies for one complete
                      hygiene packet: soap, shampoo, conditioner, toothpaste, a
                      toothbrush, deodorant, and sanitary items. Volunteers
                      assemble these by hand and hand them out at community
                      outreach events. For someone who can&apos;t afford them, a
                      packet means showing up to a job interview or a school day
                      feeling clean. It&apos;s a small thing with an outsized
                      difference, and $25 covers one entirely.
                    </p>
                  </>
                )}
                {impact2Open && (
                  <>
                    <h3 className="text-lg font-semibold mb-4">$100 Impact</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Here&apos;s a real example of what $100 covered: four hygiene
                      packets, handed out at a community outreach event to people
                      experiencing homelessness. The same $100 paid for a week of
                      SAT tutoring and test-prep materials for three students who
                      couldn&apos;t have afforded a private tutor. What was left over
                      went to printing flyers and delivering supplies, which let
                      us reach more than 40 people in a single day. That&apos;s the
                      whole breakdown. We publish it because we want donors to
                      know exactly where their money goes.
                    </p>
                  </>
                )}
                {impact3Open && (
                  <>
                    <h3 className="text-lg font-semibold mb-4">
                      Clothing Donation Impact
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our clothing drives have collected over 1,000 articles of
                      clothing through school partnerships and neighborhood
                      drop-off events. Volunteers sorted and packed everything
                      before donating it to Vegas Stronger, a nonprofit that
                      helps people recovering from homelessness and addiction in
                      Las Vegas. The donations included warm jackets, work-ready
                      shirts, and everyday clothes for men, women, and children.
                      We run these drives quarterly and are always accepting
                      donations. If you have a closet to clean out, we&apos;ll make
                      sure it reaches someone who needs it.
                    </p>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <NebulaDivider />

        {/* ─── GALLERY ──────────────────────────────────────────────────────────────────── */}
        <section className="space-panel backdrop-blur-sm px-6 md:px-20 py-24">
          <Reveal>
            <h2 className="text-3xl font-bold text-center mb-4">
              Our Impact in <span className="text-[#6D5CAE]">Action</span>
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
              Photos from our drives, tutoring sessions, and outreach events.
            </p>
          </Reveal>
          <GalleryGrid />
        </section>

        {/* ─── VOLUNTEER ──────────────────────────────────────────────────────── */}
        <Reveal>
          <VolunteerSection ref={volunteerRef} />
        </Reveal>

        {/* Per-program interest form modal (opened from program tabs) */}
        <ProgramFormModal
          open={programModalOpen}
          onClose={() => setProgramModalOpen(false)}
          program={programName}
        />
      </Layout>
    </>
  );
}

export default function Home({
  content,
  isAdmin,
}: {
  content: SiteContent;
  isAdmin: boolean;
}) {
  return (
    <EditableProvider initialContent={content} isAdmin={isAdmin}>
      <HomeContent />
    </EditableProvider>
  );
}
