export type ThemeId = "wellness" | "creativity" | "learning" | "productivity" | "relationships";

export const themes: Record<ThemeId, { name: string; color: string }> = {
  wellness:      { name: "Wellness",      color: "#B8D4C6" },
  creativity:    { name: "Creativity",    color: "#DDB8B0" },
  learning:      { name: "Learning",      color: "#C0D8A4" },
  productivity:  { name: "Productivity",  color: "#E0CF9A" },
  relationships: { name: "Relationships", color: "#C2BEE0" },
};
