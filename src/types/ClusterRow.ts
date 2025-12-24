export type ClusterRow = {
  count: number;
  severityIndex: number;
  roadType: "Junction" | "Street";
  name: string;
  latitude: number;
  longitude: number;
};
