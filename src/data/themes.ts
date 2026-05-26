export type ThemeId = "wellness" | "creativity" | "learning" | "productivity" | "relationships";

export const themes: Record<ThemeId, { name: string; color: string }> = {
  wellness:      { name: "Wellness",      color: "#AECABC" },
  creativity:    { name: "Creativity",    color: "#D4AFA4" },
  learning:      { name: "Learning",      color: "#B8C9A0" },
  productivity:  { name: "Productivity",  color: "#D4C298" },
  relationships: { name: "Relationships", color: "#B8B2D0" },
};
