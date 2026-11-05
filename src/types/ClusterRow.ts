export type ClusterRow = {
  count: number;
  severityIndex: number;
  roadType: "Junction" | "Street";
  name: string;
  latitude: number;
  longitude: number;
  // only set for municipal crossroad rows (used by the section map popup)
  streets?: string[]; // all streets meeting at the crossroad, most frequent first
  killed?: number;
  severelyInjured?: number;
};
