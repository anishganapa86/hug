// ─────────────────────────────────────────────────────────────────────────────
//  FLAT-FILE CMS  — editable site content
//
//  Content is stored in `data/content.json`. Pages read it on load (server-side);
//  an authenticated admin can edit it inline and POST changes to /api/content,
//  which persists the file. Non-admins only ever receive the saved content.
//
//  This module is import-safe on the client (no `fs`). File reads/writes live in
//  `pages/api/content.ts` and the `getServerSideProps` helper below.
// ─────────────────────────────────────────────────────────────────────────────


export interface ProgramContent {
  title: string;
  desc: string;
  provides: string;
}


export interface SiteContent {
  heroBadge: string;
  heroHeadlinePre: string;
  heroHeadlineHighlight: string;
  heroHeadlinePost: string;
  heroSubtitle: string;
  statPrograms: string;
  statVolunteers: string;
  statItems: string;
  statEstablished: string;
  aboutIntro: string;
  aboutMission: string;
  programs: ProgramContent[];
}


export const DEFAULT_CONTENT: SiteContent = {
  heroBadge: "501(c)(3) Non-Profit Organization",
  heroHeadlinePre: "Helping ",
  heroHeadlineHighlight: "Underprivileged",
  heroHeadlinePost: " Groups",
  heroSubtitle:
    "Based in Henderson, Nevada, empowering underserved communities through education, wellness, and compassionate outreach.",
  statPrograms: "4",
  statVolunteers: "50",
  statItems: "10k+",
  statEstablished: "EST'24",
  aboutIntro:
    "A distinguished 501(c)(3) non-profit organization devoted to empowering underserved communities through education, wellness, and compassionate outreach.",
  aboutMission:
    "At HUG Foundation, we are committed to fostering a culture of excellence, generosity, and human connection, building a brighter future one HUG at a time.",
  programs: [
    {
      title: "HUG for Hygiene",
      desc: "Hygiene packets — soap, shampoo, toothbrush, toothpaste, deodorant, and sanitary items — for people facing homelessness or hardship.",
      provides:
        "Each $25 assembles a complete hygiene packet that restores dignity, comfort, and confidence to someone in need.",
    },
    {
      title: "HUG for Education",
      desc: "Tutoring, mentorship, SAT prep, and educational resources for underserved students who deserve a fair shot.",
      provides:
        "Free 1-on-1 tutoring sessions and test-prep materials for students who would otherwise go without.",
    },
    {
      title: "HUG for Warmth",
