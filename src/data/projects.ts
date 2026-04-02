export type Project = {
  slug: string;
  title: string;
  intro: string;
  summary: string;
  tools: string[];
  outcome: string;
  image: string;
  icon: string;
  detail: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "story-library",
    title: "Story Library",
    intro: "A reading space for families.",
    summary:
      "A reading space for families to browse illustrated stories with calm navigation, clear typography, and accessibility built in from the start.",
    tools: ["Astro", "TypeScript", "Content Strategy"],
    outcome:
      "Improved discoverability and made the reading flow feel easier on both mobile and desktop.",
    image: "/images/project-story-library.svg",
    icon: "Book",
    detail: [
      "Story Library was designed as a calm digital shelf for illustrated stories. The focus was on making browsing feel easy for both adults and children without relying on loud interface patterns.",
      "I shaped the information architecture, simplified the page layouts, and used clear spacing and type to support a slower reading rhythm.",
      "The result was a friendlier experience with stronger accessibility and a smoother path from discovery to reading.",
    ],
    featured: true,
  },
  {
    slug: "garden-notes",
    title: "Garden Notes",
    intro: "A quiet journaling tool.",
    summary:
      "A journaling tool for seasonal observations, recurring prompts, and small rituals, built around quiet repetition rather than busy productivity features.",
    tools: ["UI Design", "Prototyping", "Design Systems"],
    outcome:
      "Created a more cohesive interface language and reduced friction in the daily note-taking flow.",
    image: "/images/project-garden-notes.svg",
    icon: "Leaf",
    detail: [
      "Garden Notes began as an experiment in softer software. The goal was to create a place for reflection that felt light enough to return to every day.",
      "I worked on interaction patterns, visual language, and reusable components that could support notes, prompts, and small collections without feeling overbuilt.",
      "The finished product felt quieter, clearer, and more consistent across screen sizes.",
    ],
    featured: true,
  },
  {
    slug: "studio-portfolio-refresh",
    title: "Studio Portfolio Refresh",
    intro: "An editorial portfolio redesign.",
    summary:
      "A portfolio redesign for a small creative studio, centered on editorial layouts, clearer case-study framing, and a more confident visual system.",
    tools: ["Astro", "CSS", "Art Direction"],
    outcome:
      "Helped the studio present its work with more confidence while keeping the site fast and easy to maintain.",
    image: "/images/project-studio-portfolio.svg",
    icon: "Frame",
    detail: [
      "This project focused on helping a studio show its work with more clarity. The previous site had strong projects, but the pages did not give them enough structure or room.",
      "I introduced a more editorial layout, improved hierarchy across project pages, and built a system that was easier for the team to update.",
      "The refresh made the work easier to scan while preserving a personal studio voice.",
    ],
  },
];
