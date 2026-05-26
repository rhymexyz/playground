export type ExperimentStatus = "active" | "completed" | "paused" | "released";

export type Experiment = {
  id: string;
  title: string;
  status: ExperimentStatus;
  startDate: string;
  endDate: string;
  description: string;
  output: string;
  loot: string;
  linkedExperimentIds?: string[];
};

export type ExperimentTheme = {
  id: string;
  name: string;
  color: string;
  experiments: Experiment[];
};

export const experiments: ExperimentTheme[] = [
  {
    id: "wellness",
    name: "Wellness",
    color: "#AECABC",
    experiments: [
      {
        id: "morning-walk",
        title: "Morning Walk",
        status: "active",
        startDate: "2026-05-08",
        endDate: "2026-05-17",
        description: "A short walk outdoors before starting the workday.",
        output: "Took a short walk in the morning before starting the day.",
        loot: "A short walk creates a calmer transition into work and brightens the first hour.",
        linkedExperimentIds: ["sleep-wind-down-routine", "single-task-block"],
      },
      {
        id: "sleep-wind-down-routine",
        title: "Sleep Wind-Down",
        status: "completed",
        startDate: "2026-04-18",
        endDate: "2026-04-27",
        description: "Dimming lights, gentle stretching, and stopping screens 30 minutes before bed.",
        output: "Dimmed lights, stretched for five minutes, and stopped scrolling before bed.",
        loot: "Falling asleep became less dramatic when the last half hour felt gentler.",
        linkedExperimentIds: ["morning-walk", "phone-free-breakfast"],
      },
      {
        id: "phone-free-breakfast",
        title: "Phone-Free Breakfast",
        status: "released",
        startDate: "2026-04-24",
        endDate: "2026-05-03",
        description: "Keeping the phone away from the table until breakfast is finished.",
        output: "Kept my phone away from the table until breakfast was finished.",
        loot: "The morning felt slower in a good way, and hunger returned as an actual sensation.",
        linkedExperimentIds: ["sleep-wind-down-routine", "ten-minute-room-reset"],
      },
      {
        id: "ten-minute-room-reset",
        title: "10-Min Room Reset",
        status: "paused",
        startDate: "2026-05-02",
        endDate: "2026-05-13",
        description: "Spending ten minutes each evening restoring one shared space to order.",
        output: "Spent ten minutes each evening restoring one shared space.",
        loot: "A room reset changed the tone of the next morning more than I expected.",
        linkedExperimentIds: ["phone-free-breakfast"],
      },
    ],
  },
  {
    id: "creativity",
    name: "Creativity",
    color: "#D4AFA4",
    experiments: [
      {
        id: "daily-sketch",
        title: "Daily Sketch",
        status: "active",
        startDate: "2026-05-05",
        endDate: "2026-05-18",
        description: "One small sketch per day, no pressure on quality or subject.",
        output: "Made one small sketch each day without worrying about polish.",
        loot: "Lowering the bar made drawing feel like returning, not performing.",
        linkedExperimentIds: ["one-paragraph-journal", "daily-work-note"],
      },
      {
        id: "one-paragraph-journal",
        title: "One-Paragraph Journal",
        status: "released",
        startDate: "2026-04-01",
        endDate: "2026-04-14",
        description: "Closing each day with a single honest paragraph instead of a long entry.",
        output: "Closed each day with a single paragraph instead of a long entry.",
        loot: "A tiny writing shape was easier to sustain and still caught the emotional weather.",
        linkedExperimentIds: ["daily-sketch", "daily-work-note"],
      },
    ],
  },
  {
    id: "learning",
    name: "Learning",
    color: "#B8C9A0",
    experiments: [
      {
        id: "read-10-pages",
        title: "Read 10 Pages",
        status: "active",
        startDate: "2026-05-03",
        endDate: "2026-05-22",
        description: "Reading at least ten pages of a book each day, any time of day.",
        output: "Read at least ten pages of a book each day.",
        loot: "Small reading sessions kept momentum alive better than waiting for an ideal hour.",
        linkedExperimentIds: ["daily-flashcards", "two-minute-start"],
      },
      {
        id: "daily-flashcards",
        title: "Daily Flashcards",
        status: "paused",
        startDate: "2026-05-01",
        endDate: "2026-05-15",
        description: "Reviewing a compact flashcard deck during an afternoon reset.",
        output: "Reviewed a compact flashcard deck during an afternoon reset.",
        loot: "Recall improved, but timing mattered more than volume.",
        linkedExperimentIds: ["read-10-pages"],
      },
    ],
  },
  {
    id: "productivity",
    name: "Productivity",
    color: "#D4C298",
    experiments: [
      {
        id: "single-task-block",
        title: "Single-Task Block",
        status: "active",
        startDate: "2026-05-10",
        endDate: "2026-05-19",
        description: "Protecting a daily block for one meaningful task with everything else closed.",
        output: "Protected a daily block for one meaningful task with everything else closed.",
        loot: "Attention felt less brittle when I named one thing as the whole point of the hour.",
        linkedExperimentIds: ["two-minute-start", "morning-walk"],
      },
      {
        id: "two-minute-start",
        title: "Two-Minute Start",
        status: "completed",
        startDate: "2026-04-20",
        endDate: "2026-04-29",
        description: "Starting daunting tasks by committing to only the first two minutes.",
        output: "Started daunting tasks by committing to only the first two minutes.",
        loot: "Beginnings lost their drama once the ask became tiny and mechanical.",
        linkedExperimentIds: ["single-task-block", "read-10-pages"],
      },
      {
        id: "daily-work-note",
        title: "Daily Work Note",
        status: "active",
        startDate: "2026-05-06",
        endDate: "2026-05-20",
        description: "Ending each workday with a brief note on progress, friction, and next steps.",
        output: "Ended each workday with a brief note about progress, friction, and next steps.",
        loot: "Writing a note made re-entry easier and reduced vague background stress.",
        linkedExperimentIds: ["one-paragraph-journal", "daily-sketch", "send-one-thoughtful-message"],
      },
    ],
  },
  {
    id: "relationships",
    name: "Relationships",
    color: "#B8B2D0",
    experiments: [
      {
        id: "send-one-thoughtful-message",
        title: "Send One Message",
        status: "active",
        startDate: "2026-05-07",
        endDate: "2026-05-16",
        description: "Sending one considered note each day instead of waiting for a perfect catch-up.",
        output: "Sent one considered note each day instead of waiting for a perfect catch-up.",
        loot: "Small contact created more warmth than long-delayed intention.",
        linkedExperimentIds: ["daily-work-note"],
      },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const DAY_MS = 24 * 60 * 60 * 1000;

function toUtcDate(s: string) { return new Date(`${s}T00:00:00Z`); }
function toKey(d: Date) { return d.toISOString().slice(0, 10); }

export function generateDateRange(start: string, end: string): string[] {
  const dates: string[] = [];
  for (let t = toUtcDate(start).getTime(); t <= toUtcDate(end).getTime(); t += DAY_MS) {
    dates.push(toKey(new Date(t)));
  }
  return dates;
}

export function calculateProgress(exp: Experiment, ref = new Date()) {
  const all = generateDateRange(exp.startDate, exp.endDate);
  const today = toKey(ref);
  if (exp.status === "completed") return { elapsed: all.length, total: all.length, pct: 100, all };
  const elapsed = all.filter(d => d <= today);
  const pct = all.length ? Math.round((elapsed.length / all.length) * 100) : 0;
  return { elapsed: elapsed.length, total: all.length, pct, all };
}

export function findExperiment(id: string): { exp: Experiment; theme: ExperimentTheme } | null {
  for (const theme of experiments) {
    const exp = theme.experiments.find(e => e.id === id);
    if (exp) return { exp, theme };
  }
  return null;
}
