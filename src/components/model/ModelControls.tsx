import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { ModelFilterType, ModelSeverityMode } from '../../types';
import { DataWithLabel } from '../common';
import { JunctionRadiusPicker } from './JunctionRadiusPicker';
import { SeverityModePicker } from './SeverityModePicker';
import { ClusterFilterTypePicker } from './ClusterFilterTypePicker';
import { MaxClustersPicker } from './MaxClustersPicker';
import { MAX_MATCH_DISTANCE_METERS } from './useStreetSections';

export interface ModelControlsProps {
	heatmapRadius: number;
	onHeatmapRadiusChange: (value: number) => void;
	junctionRadius: number;
	onJunctionRadiusChange: (value: number) => void;
	severityMode: ModelSeverityMode;
	onSeverityModeChange: (value: ModelSeverityMode) => void;
	filterType: ModelFilterType;
	onFilterTypeChange: (value: ModelFilterType) => void;
	maxClusters: number;
	onMaxClustersChange: (value: number) => void;
	maxDistanceMeters: number;
	onMaxDistanceMetersChange: (value: number) => void;
	sectionStrokeWidth: number;
	onSectionStrokeWidthChange: (value: number) => void;
	showAccidentPoints: boolean;
	onShowAccidentPointsChange: (value: boolean) => void;
}

const ModelControls: React.FC<ModelControlsProps> = ({
	heatmapRadius,
	onHeatmapRadiusChange,
	junctionRadius,
	onJunctionRadiusChange,
	severityMode,
	onSeverityModeChange,
	filterType,
	onFilterTypeChange,
	maxClusters,
	onMaxClustersChange,
	maxDistanceMeters,
	onMaxDistanceMetersChange,
	sectionStrokeWidth,
	onSectionStrokeWidthChange,
	showAccidentPoints,
	onShowAccidentPointsChange,
}) => {
	const { t } = useTranslation();

	return (
		<div className='d-flex flex-wrap gap-3 mb-3'>
			<DataWithLabel label={t('HeatmapRadius')}>
				<JunctionRadiusPicker value={heatmapRadius} onChange={onHeatmapRadiusChange} min={100} max={200} step={50} />
			</DataWithLabel>
			<DataWithLabel label={t('JunctionRadius')}>
				<JunctionRadiusPicker value={junctionRadius} onChange={onJunctionRadiusChange} />
			</DataWithLabel>

			<DataWithLabel label={t('SeverityModeLabel')}>
				<SeverityModePicker value={severityMode} onChange={onSeverityModeChange} />
			</DataWithLabel>

			<DataWithLabel label={t('ClusterType')}>
				<ClusterFilterTypePicker value={filterType} onChange={onFilterTypeChange} />
			</DataWithLabel>

			<DataWithLabel label={t('MaxClusters')}>
				<MaxClustersPicker value={maxClusters} onChange={onMaxClustersChange} />
			</DataWithLabel>

			<DataWithLabel label={t('MaxDistance')}>
				<JunctionRadiusPicker value={maxDistanceMeters} onChange={onMaxDistanceMetersChange} min={0} max={MAX_MATCH_DISTANCE_METERS} step={5} />
			</DataWithLabel>

			<DataWithLabel label={t('StrokeWidth')}>
				<div className='d-flex align-items-center gap-2'>
					<div className='d-flex' style={{ width: 100 }}>
						<Form.Range
							min={1}
							max={10}
							step={1}
							value={sectionStrokeWidth}
							onChange={(e) => onSectionStrokeWidthChange(Number(e.target.value))}
						/>
					</div>
					<span className='fw-bold' style={{ fontSize: 14 }}>
						{sectionStrokeWidth}
					</span>
				</div>
			</DataWithLabel>

			<DataWithLabel label={t('ShowAccidentPoints')}>
				<Form.Check
					type='switch'
					id='show-accident-points-switch'
					checked={showAccidentPoints}
					onChange={(e) => onShowAccidentPointsChange(e.target.checked)}
				/>
			</DataWithLabel>
		</div>
	);
};

export default React.memo(ModelControls);
