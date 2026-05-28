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
  liveUrl?: string;
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
    slug: "frog-start-ritual",
    title: "Frog Start Ritual",
    intro: "A quiet ritual to eat the frog.",
    summary:
      "A personal web ritual tool built around Brian Tracy's Eat That Frog — write down today's hardest task and its first bite, move through a 5-4-3-2-1 launch ritual, complete a body check-in after your focus round, and export the whole session as Markdown back to Obsidian.",
    tools: ["HTML", "CSS", "JavaScript", "localStorage", "GitHub Pages"],
    outcome:
      "A single quiet loop from naming the frog to archiving the session — emphasising the first bite over finishing, with a body check-in built into the end of every round.",
    image: "/images/project-frog-start-ritual-cover.png",
    icon: "Zap",
    liveUrl: "https://rhymexyz.github.io/frog-start-ritual/",
    detail: [
      "Frog Start Ritual started from a simple friction point: knowing you should do the hardest thing first, but still finding your mind and body resisting. The missing piece wasn't another to-do list — it was a short ritual that could actually carry you across the threshold.",
      "The experience is a single linear flow: write down today's frog and the concrete first bite, optionally settle in with a five-minute meditation, then enter a cinematic 5-4-3-2-1 countdown that ends not with pressure but with a quiet reminder — the frog is chosen, the first bite is written, now just begin one round. Timer options split for real-world use: reach for your physical Pomodoro timer, or let the built-in 40-minute frog clock run.",
      "When the bell rings, the focus isn't on logging completion — it's on checking in with the body first. Quick-tap chips lower the barrier to writing, and a few short prompts capture what actually moved and how you returned when you wanted to escape. The whole session compresses into a structured Markdown block, ready to paste straight into Obsidian. It pairs naturally with the Meditation Companion: meditation handles the settling before action, the frog ritual locks that energy into a first bite and one focused round.",
    ],
    featured: true,
  },
  {
    slug: "meditation-companion",
    title: "Meditation Companion",
    intro: "A quiet, bilingual meditation guide.",
    summary:
      "A personal meditation web app that meets you where you are: a few gentle guided questions surface your current state, an AI-generated meditation script is created just for you, and one tap produces a narrated audio session with optional ambient background.",
    tools: ["Next.js", "TypeScript", "React", "OpenAI API"],
    outcome:
      "A single private flow — from emotional check-in to editable script to downloadable guided audio — that stays calm and minimal on both mobile and desktop.",
    image: "/images/project-meditation-companion-cover.png",
    icon: "Wind",
    liveUrl: "https://meditationapp.vercel.app",
    detail: [
      "Meditation Companion grew from one question: what if calming down didn't have to start from a blank text box? Instead of asking you to describe how you feel from scratch, the app opens with a gentle conversational check-in — your current situation, how your body and emotions feel, any thought that keeps recurring. No empty canvas, just a few warm questions.",
      "The backend turns that free-text into a structured state card, which a separate orchestration layer uses to generate a meditation script tuned to your moment. You choose a focus direction (soothe, clarify, or take action), a narrator voice, session length, posture, and ambient sound. The script is fully editable before you generate audio — because sometimes the right word is yours, not the model's.",
      "The audio layer uses OpenAI TTS with natural pauses timed to the meditation rhythm, then mixes in optional ambient sounds (singing bowl, rain, ocean) and exports a WAV file you can keep. The whole loop — check in, generate, adjust, listen — takes under a minute. Access is currently protected by a passcode to keep API costs contained.",
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
