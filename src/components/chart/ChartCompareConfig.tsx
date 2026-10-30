import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';
import { YEARS } from '../../stores/filter/columnFilterCombo/data';

/** "compare to period" settings of the main chart: checkbox + from/to year */
const ChartCompareConfig: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { compareEnabled, compareFromYear, compareToYear, setCompareEnabled, setCompareYears } = filterStore;

  const yearSelect = (id: string, value: number, onChange: (year: number) => void) => (
    <Form.Control
      as="select"
      size="sm"
      id={id}
      value={value}
      disabled={!compareEnabled}
      style={{ width: '5.5rem' }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
    >
      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
    </Form.Control>
  );

  return (
    <div style={{ margin: '0.5rem 0' }}>
      <Form.Check
        type="checkbox"
        id="Graphs.Main.CompareEnabled"
        label={t('compare_to_period')}
        checked={compareEnabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompareEnabled(e.target.checked)}
      />
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <label htmlFor="Graphs.Main.CompareFrom">{t('FromYear')}</label>
        {yearSelect('Graphs.Main.CompareFrom', compareFromYear, y => setCompareYears(y, Math.max(y, compareToYear)))}
        <label htmlFor="Graphs.Main.CompareTo">{t('ToYear')}</label>
        {yearSelect('Graphs.Main.CompareTo', compareToYear, y => setCompareYears(Math.min(y, compareFromYear), y))}
      </div>
      <small className="text-danger">{t('compare_until_update_month')}</small>
    </div>
  );
});

export default ChartCompareConfig;
