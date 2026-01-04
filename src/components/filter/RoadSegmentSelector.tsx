import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useStore } from '../../stores/storeConfig';
import { getRoadSegments, toSegmentOptions } from '../../utils/FilterUtils';


interface IProps {
  isMultiple?: boolean;
}

const RoadSegmentSelector: React.FC<IProps> = observer(({ isMultiple = true }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { roads, roadSegment, updateRoadSegment } = filterStore;

  const allSegments = useMemo(() => getRoadSegments(), []);

  /** 🔹 Filter segments by selected roads */
  const filteredOptions = useMemo(() => {
    if (roads.arrValues.length === 0) return [];
    const roadNumbers = roads.arrValues.map(Number);
    return toSegmentOptions(
      allSegments.filter(s => roadNumbers.includes(s.road))
    );
  }, [roads.arrValues, allSegments]);

  return (
    <div id="filterForm.ControlRoadSegment">
      <div className="filterLable">
        {t('RoadSegment')}:
      </div>
      <Typeahead
        id="typeaheadRoadSegment"
        options={filteredOptions}
        labelKey="label"
        multiple={isMultiple}
        selected={filteredOptions.filter(o =>
          roadSegment.arrValues.includes(String(o.id))
        )}
        onChange={(selected) => {
          const ids = selected.map(o => (o as { id: number }).id);
          updateRoadSegment(ids);
        }}
        placeholder={t('Select road segment')}
      />
    </div>
  );
});

export default RoadSegmentSelector;
