import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Checkbox from '../atoms/Checkbox';
import { useStore } from '../../stores/storeConfig';

interface IProps { }
const ConfigChart: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const { uiStore } = useStore();
  const {
    chartType, chartTypeList, updateChartType, showPercentageChart, updateShowPercentageChart,
  } = uiStore;
  const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateChartType(event.target.value);
  }, [updateChartType]);
  return (
    <div>
      <Form.Group controlId="ConfigFile.SelectChartType">
        {t('ChartType')}
        <Form.Control
          as="select"
          value={chartType}
          onChange={onSelectChange}
        >
          {Object.entries(chartTypeList).map(([key, x]: any[]) => (<option value={x} key={key}>{t(x)}</option>))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="ConfigFile.ControlShowPercentageChart">
        <Checkbox
          key={2}
          label="PercentageChart"
          group="ChartConfig"
          id={2}
          checked={showPercentageChart}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateShowPercentageChart(e.target.checked);
          }}
        />
      </Form.Group>
    </div>
  );
});
export default ConfigChart;
