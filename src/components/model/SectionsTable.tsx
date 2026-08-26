import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accident, ModelSeverityMode } from "../../types";
import './modelMainTab.css';
import { getSectionDisplayName } from '../../services/accidentSectionMatcher';
import type { StreetSection, MatchedAccidentRow, UnmatchedAccidentRow } from '../../services/accidentSectionMatcher';
import { buildSectionScores } from './modelhelper';

type Props = {
	matched: MatchedAccidentRow[];
	unmatched: UnmatchedAccidentRow[];
	streetSections: StreetSection[] | null;
	loadError: string | null;
	telAvivAccidents: Accident[];
	isTelAvivSelected: boolean;
	severityMode: ModelSeverityMode;
};

function SectionsTable({ matched, unmatched, streetSections, loadError, isTelAvivSelected, severityMode }: Props) {
	const { t } = useTranslation();

	const sectionRows = React.useMemo(() => {
		const scores = buildSectionScores(matched, severityMode);
		const sectionById = new Map((streetSections ?? []).map((s) => [s.id, s]));

		return Array.from(scores.entries())
			.map(([sectionId, score]) => {
				const section = sectionById.get(sectionId);
				return {
					sectionId,
					sectionName: section ? getSectionDisplayName(section) : sectionId,
					...score,
				};
			})
			.sort((a, b) => b.score - a.score);
	}, [matched, streetSections, severityMode]);

	return (
		<div>
			{!isTelAvivSelected && (
				<div className='mb-2'>
					{t('SelectCityForSections')}
				</div>
			)}

			{isTelAvivSelected && !streetSections && !loadError && <div className='mb-2'>{t('LoadingSections')}</div>}
			{isTelAvivSelected && loadError && (
				<div className='mb-2' style={{ color: 'var(--bs-danger)' }}>
					{t('FailedToLoadSections')}: {loadError}
				</div>
			)}

			<table className='cluster-table'>
				<thead>
					<tr>
						<th>#</th>
						<th>{t('SectionName')}</th>
						<th>{t('killed')}</th>
						<th>{t('severely-injured')}</th>
						<th>{t('Score')}</th>
					</tr>
				</thead>
				<tbody>
					{sectionRows.map((row, index) => (
						<tr key={row.sectionId}>
							<td className='num'>{index + 1}</td>
							<td>{row.sectionName}</td>
							<td className='num'>{row.killed}</td>
							<td className='num'>{row.severelyInjured}</td>
							<td className='num'>{Math.round(row.score * 100) / 100}</td>
						</tr>
					))}
					{isTelAvivSelected && streetSections && sectionRows.length === 0 && (
						<tr>
							<td colSpan={5}>{t('NoMatchedSections')}</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className='mt-4 mb-2'>
				<strong>{t('UnmatchedAccidents')}</strong>
			</div>
			<table className='cluster-table'>
				<thead>
					<tr>
						<th>#</th>
						<th>{t('Street')} 1</th>
						<th>{t('Street')} 1 ID</th>
						<th>{t('Street')} 2</th>
						<th>{t('Street')} 2 ID</th>
						<th>{t('AccidentType')}</th>
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
						</tr>
					))}
					{isTelAvivSelected && streetSections && unmatched.length === 0 && (
						<tr>
							<td colSpan={6}>{t('NoUnmatchedAccidents')}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
export default SectionsTable;
