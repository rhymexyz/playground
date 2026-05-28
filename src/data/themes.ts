export type ThemeId = "wellness" | "creativity" | "learning" | "productivity" | "relationships";

export const themes: Record<ThemeId, { name: string; color: string }> = {
  wellness:      { name: "Wellness",      color: "#D4E5DC" },
  creativity:    { name: "Creativity",    color: "#EDD7D2" },
  learning:      { name: "Learning",      color: "#DAE7C8" },
  productivity:  { name: "Productivity",  color: "#EDE3C4" },
  relationships: { name: "Relationships", color: "#DAD8EB" },
};
