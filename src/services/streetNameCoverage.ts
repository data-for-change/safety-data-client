import type { Accident } from '../types';
import type { StreetSection } from './accidentSectionMatcher';

export type StreetIdCoverageRow = {
  lamasId: number;
  inJson: boolean;
  inAccidentStreet1: boolean;
  inAccidentStreet2: boolean;
};

export function buildStreetIdCoverageRows(
  sections: StreetSection[],
  accidents: Accident[],
): StreetIdCoverageRow[] {
  const jsonIds = new Set<number>();
  const acc1Ids = new Set<number>();
  const acc2Ids = new Set<number>();

  for (const s of sections) {
    if (s.lamas_id != null) jsonIds.add(s.lamas_id);
  }
  for (const a of accidents) {
    if (a.street1 != null) acc1Ids.add(a.street1);
    if (a.street2 != null) acc2Ids.add(a.street2);
  }

  const allIds = new Set<number>([...jsonIds, ...acc1Ids, ...acc2Ids]);
  return [...allIds].sort((a, b) => a - b).map((id) => ({
    lamasId: id,
    inJson: jsonIds.has(id),
    inAccidentStreet1: acc1Ids.has(id),
    inAccidentStreet2: acc2Ids.has(id),
  }));
}
