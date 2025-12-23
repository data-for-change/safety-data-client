export type ClusterRow = {
  count: number;
  severityIndex: number;
  roadType: "junction" | "street";
  name: string;
  latitude: number;
  longitude: number;
};
