// ──────────────────────────────────────────────────────────────────────────────────────
//  FLAT-FILE CMS  — editable site content
//
//  Content is stored in `data/content.json`. Pages read it on load (server-side);
//  an authenticated admin can edit it inline and POST changes to /api/content,
//  which persists the file. Non-admins only ever receive the saved content.
//
//  This module is import-safe on the client (no `fs`). File reads/writes live in
//  `pages/api/content.ts` and the `getServerSideProps` helper below.
// ────────────────────────────────────────────────────────────────────────────────────────

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
    "A Henderson, Nevada non-profit run by students. We assemble hygiene packets, run clothing drives, and provide free SAT tutoring.",
  statPrograms: "4",
  statVolunteers: "50",
  statItems: "10,000+",
  statEstablished: "2024",
  aboutIntro:
    "A distinguished 501(c)(3) non-profit organization devoted to empowering underserved communities through education, wellness, and compassionate outreach.",
  aboutMission:
    "At HUG Foundation, we are committed to fostering a culture of excellence, generosity, and human connection, building a brighter future one HUG at a time.",
  programs: [
    {
      title: "HUG for Hygiene",
      desc: "Hygiene packets, including soap, shampoo, toothbrush, toothpaste, deodorant, and sanitary items, for people facing homelessness or hardship.",
      provides:
        "Each $25 buys the supplies for one complete packet, assembled by volunteers and handed directly to someone who needs it.",
    },
    {
      title: "HUG for Education",
      desc: "Free tutoring, mentorship, and SAT prep for students who can't afford private tutoring, plus school supplies where they're needed.",
      provides:
        "Free 1-on-1 tutoring sessions and test-prep materials from tutors who scored 1500+ on the SAT.",
    },
    {
      title: "HUG for Warmth",
      desc: "Clothing and blanket drives that get warm clothes to families facing hardship, in partnership with Vegas Stronger.",
      provides:
        "Jackets, blankets, and clean clothing, sorted by volunteers and delivered where they're needed most.",
    },
    {
      title: "International Scholars Program",
      desc: "Mentorship and school supplies for students outside the valley, from India to New Jersey.",
      provides:
        "Mentoring sessions and resources that help motivated students keep learning, wherever they live.",
    },
  ],
};

/** Read a string value from content by dot-path (supports array indices). */
export function getByPath(content: SiteContent, path: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = content;
  for (const part of path.split(".")) {
    if (cur == null) return "";
    cur = cur[part];
  }
  return cur == null ? "" : String(cur);
}

/** Return a deep clone of content with the dot-path set to `value`. */
export function setByPath(
  content: SiteContent,
  path: string,
  value: string
): SiteContent {
  const next: SiteContent = JSON.parse(JSON.stringify(content));
  const parts = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = next;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]];
    if (cur == null) return next;
  }
  cur[parts[parts.length - 1]] = value;
  return next;
}

/** Merge an unknown parsed object over the defaults, keeping the shape valid. */
export function mergeContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== "object") return DEFAULT_CONTENT;
  const obj = raw as Partial<SiteContent>;
  const programs =
    Array.isArray(obj.programs) && obj.programs.length
      ? obj.programs.map((p, i) => ({
          ...DEFAULT_CONTENT.programs[i % DEFAULT_CONTENT.programs.length],
          ...p,
        }))
      : DEFAULT_CONTENT.programs;
  return { ...DEFAULT_CONTENT, ...obj, programs };
}
