import { Accident, ClusterRow, ModelSeverityMode } from "../../types";

const JUNCTION_RADIUS_METERS = 50;

function haversineDistance(a: Accident, b: Accident): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);

  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);

  const h =
    sinLat * sinLat +
    Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;

  return 2 * R * Math.asin(Math.sqrt(h));
}


export function clusterPoints(points: Accident[], junctionRaduis = JUNCTION_RADIUS_METERS): Accident[][] {
  const clusters: Accident[][] = [];
  const assigned = new Set<number>();

  // 🚫 Remove inaccurate junction points completely
  const filteredPoints = points.filter(
    p =>
      !(
        p.road_type_hebrew === "עירונית בצומת" &&
        p.location_accuracy_hebrew !== "עיגון מדויק"
      )
  );
  // 1. Extract junctions
  const junctions = filteredPoints
    .map((p, i) => ({ p, i }))
    .filter(x => x.p.road_type_hebrew === "עירונית בצומת");

  // 2. Junction-based clustering
  for (const { p: junction, i: junctionIndex } of junctions) {
    const cluster: Accident[] = [];

    for (let i = 0; i < filteredPoints.length; i++) {
      if (assigned.has(i)) continue;

      const point = filteredPoints[i];
      const distance = haversineDistance(junction, point);

      if (distance <= junctionRaduis) {
        cluster.push(point);
        assigned.add(i);
      }
    }

    if (cluster.length > 0) {
      clusters.push(cluster);
    }
  }

  // 3. Remaining points → group by street name
  const streetMap = new Map<string, Accident[]>();

  for (let i = 0; i < filteredPoints.length; i++) {
    if (assigned.has(i)) continue;

    const point = filteredPoints[i];
    const street = point.street1_hebrew || "__NO_STREET__";

    if (!streetMap.has(street)) {
      streetMap.set(street, []);
    }

    streetMap.get(street)!.push(point);
  }

  // 4. Add street clusters
  for (const group of streetMap.values()) {
    clusters.push(group);
  }

  return clusters;
}

export function buildClusterTable(
  clusters: Accident[][],
  minValue: number = 4,
  mode: ModelSeverityMode = 1
): ClusterRow[] {
  const junctionRows: ClusterRow[] = [];
  const streetRows: ClusterRow[] = [];

  for (const cluster of clusters) {
    const count = cluster.length;
    const severityIndex = calcSeverityIndex(cluster, mode);

    const junctionPoint = cluster.find(
      p => p.road_type_hebrew === "עירונית בצומת"
    );

    // ----- Junction cluster -----
    if (junctionPoint) {
      junctionRows.push({
        count,
        severityIndex,
        roadType: "junction",
        name: `${junctionPoint.street1_hebrew ?? ""} / ${junctionPoint.street2_hebrew ?? ""}`.trim(),
        latitude: Number(junctionPoint.latitude),
        longitude: Number(junctionPoint.longitude),
      });
      continue;
    }

    // ----- Street cluster -----
    const representative = closestToCentroid(cluster);

    streetRows.push({
      count,
      severityIndex,
      roadType: "street",
      name: representative.street1_hebrew ?? "__UNKNOWN__",
      latitude: Number(representative.latitude),
      longitude: Number(representative.longitude),
    });
  }

  // Sort each group by severity (descending)
  junctionRows.sort((a, b) => b.severityIndex - a.severityIndex);
  streetRows.sort((a, b) => b.severityIndex - a.severityIndex);

  // Combine and filter by minValue
  return [...junctionRows, ...streetRows].filter(
    row => row.severityIndex >= minValue
  );
}
//weighted severity index
function calcSeverityIndex(
  points: Accident[],
  mode: ModelSeverityMode = 1
): number {
  return points.reduce((sum, p) => {
    let weight = 1;

    switch (mode) {
      // 1️⃣ All accidents equal
      case 1:
        weight = 1;
        break;

      // 2️⃣ Pedestrian = 2
      case 2:
        weight =
          p.vehicle_vehicle_type_hebrew === "הולך רגל" ? 2 : 1;
        break;

      // 3️⃣ Pedestrian = 2, electric bike / scooter = 1.5
      case 3:
        if (p.vehicle_vehicle_type_hebrew === "הולך רגל") {
          weight = 2;
        } else if (
          p.vehicle_vehicle_type_hebrew === "אופניים חשמליים" ||
          p.vehicle_vehicle_type_hebrew === "קורקינט חשמלי"||
           p.vehicle_vehicle_type_hebrew === "אופניים" 
        ) {
          weight = 1.5;
        } else {
          weight = 1;
        }
        break;

      // 4️⃣ Same as 1–3, but fatal = 2 
      case 4:
        if (p.injury_severity_hebrew === "הרוג") {
          weight = 2.5;
        } else {
          weight = 1;
        }
        break;
    }

    return sum + weight;
  }, 0);
}


//centroid (mean location)
function centroid(points: Accident[]): { lat: number; lon: number } {
  const sum = points.reduce(
    (acc, p) => {
      acc.lat += p.latitude;
      acc.lon += p.longitude;
      return acc;
    },
    { lat: 0, lon: 0 }
  );

  return {
    lat: sum.lat / points.length,
    lon: sum.lon / points.length,
  };
}

//closest point to centroid
function closestToCentroid(points: Accident[]): Accident {
  const c = centroid(points);

  let best = points[0];
  let bestDist = Infinity;

  for (const p of points) {
    const d = haversineDistance(
      { latitude: c.lat, longitude: c.lon } as Accident,
      p
    );

    if (d < bestDist) {
      bestDist = d;
      best = p;
    }
  }

  return best;
}