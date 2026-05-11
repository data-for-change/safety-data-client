import React from 'react';
import { Accident } from "../../types";
import './modelMainTab.css';
import type { StreetSection, MatchedAccidentRow, UnmatchedAccidentRow } from '../../services/accidentSectionMatcher';
// import type { StreetIdCoverageRow } from '../../services/streetNameCoverage';
// import { buildStreetIdCoverageRows } from '../../services/streetNameCoverage';

type Props = {
	matched: MatchedAccidentRow[];
	unmatched: UnmatchedAccidentRow[];
	streetSections: StreetSection[] | null;
	loadError: string | null;
	telAvivAccidents: Accident[];
	isTelAvivSelected: boolean;
};

function SectionsTable({ matched, unmatched, streetSections, loadError, telAvivAccidents, isTelAvivSelected }: Props) {
	// const streetIdCoverageRows = React.useMemo<StreetIdCoverageRow[]>(() => {
	// 	if (!isTelAvivSelected) return [];
	// 	if (!streetSections) return [];
	// 	return buildStreetIdCoverageRows(streetSections, telAvivAccidents);
	// }, [isTelAvivSelected, streetSections, telAvivAccidents]);

	return (
		<div>
			{!isTelAvivSelected && (
				<div className='mb-2'>
					Select <strong>תל אביב - יפו</strong> in the city filter to view section matching.
				</div>
			)}

			{isTelAvivSelected && !streetSections && !loadError && <div className='mb-2'>Loading street sections…</div>}
			{isTelAvivSelected && loadError && (
				<div className='mb-2' style={{ color: 'var(--bs-danger)' }}>
					Failed to load `telAviv_streets.json`: {loadError}
				</div>
			)}

			<table className='cluster-table'>
				<thead>
					<tr>
						<th>#</th>
						<th>Accident severity</th>
						<th>Street name (from json)</th>
						<th>LAMAS ID</th>
						<th>Accident street1</th>
						<th>street1 ID</th>
						<th>Accident street2</th>
						<th>street2 ID</th>
						<th>Accident latitude</th>
						<th>Accident longitude</th>
					</tr>
				</thead>
				<tbody>
					{matched.map((row, index) => (
						<tr key={row.accidentId ?? index}>
							<td className='num'>{index + 1}</td>
							<td>{row.severity}</td>
							<td>{row.streetNameFromJson}</td>
							<td className='num'>{row.matchedLamasId ?? ''}</td>
							<td>{row.accidentStreet1 ?? ''}</td>
							<td className='num'>{row.accidentStreet1Id ?? ''}</td>
							<td>{row.accidentStreet2 ?? ''}</td>
							<td className='num'>{row.accidentStreet2Id ?? ''}</td>
							<td className='num'>{Number(row.latitude).toFixed(6)}</td>
							<td className='num'>{Number(row.longitude).toFixed(6)}</td>
						</tr>
					))}
					{isTelAvivSelected && streetSections && matched.length === 0 && (
						<tr>
							<td colSpan={10}>No matched accidents (within threshold).</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className='mt-4 mb-2'>
				<strong>Unmatched accidents</strong>
			</div>
			<table className='cluster-table'>
				<thead>
					<tr>
						<th>#</th>
						<th>Accident street1</th>
						<th>street1 ID</th>
						<th>Accident street2</th>
						<th>street2 ID</th>
						<th>Accident type</th>
						<th>Accident latitude</th>
						<th>Accident longitude</th>
					</tr>
				</thead>
				<tbody>
					{unmatched.map((row, index) => (
						<tr key={row.accidentId ?? index}>
							<td className='num'>{index + 1}</td>
							<td>{row.accidentStreet1 ?? ''}</td>
							<td className='num'>{row.accidentStreet1Id ?? ''}</td>
							<td>{row.accidentStreet2 ?? ''}</td>
							<td className='num'>{row.accidentStreet2Id ?? ''}</td>
							<td>{row.accidentType}</td>
							<td className='num'>{Number(row.latitude).toFixed(6)}</td>
							<td className='num'>{Number(row.longitude).toFixed(6)}</td>
						</tr>
					))}
					{isTelAvivSelected && streetSections && unmatched.length === 0 && (
						<tr>
							<td colSpan={8}>No unmatched accidents.</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* <div className="mt-4 mb-2">
        <strong>Street ID coverage (lamas_id: JSON vs accidents)</strong>
      </div>
      <table className="cluster-table">
        <thead>
          <tr>
            <th>#</th>
            <th>LAMAS ID</th>
            <th>In JSON</th>
            <th>In street1</th>
            <th>In street2</th>
          </tr>
        </thead>
        <tbody>
          {streetIdCoverageRows.map((row, index) => (
            <tr key={row.lamasId}>
              <td className="num">{index + 1}</td>
              <td className="num">{row.lamasId}</td>
              <td>{row.inJson ? '✓' : ''}</td>
              <td>{row.inAccidentStreet1 ? '✓' : ''}</td>
              <td>{row.inAccidentStreet2 ? '✓' : ''}</td>
            </tr>
          ))}
          {isTelAvivSelected && streetSections && streetIdCoverageRows.length === 0 && (
            <tr>
              <td colSpan={5}>No street IDs to compare.</td>
            </tr>
          )}
        </tbody>
      </table> */}
		</div>
	);
}
export default SectionsTable;
