import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';
import { useDispatch, useSelector } from 'react-redux';
import {updateChartType} from '../../stores'
import { RootState , AppDispatch } from '../../stores/store';
// import Checkbox from '../atoms/Checkbox';

interface IProps { }
const ConfigChart: React.FC<IProps> = observer(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {chartType, chartTypeList}  = useSelector((state: RootState) => state.appUi);
  const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateChartType(event.target.value));
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
          {Object.entries(chartTypeList)
            .map(([key, x]: any[]) => (<option value={x} key={key}>{t(x)}</option>))}
        </Form.Control>
      </Form.Group>
      {/* <Form.Group controlId="ConfigFile.ControlShowPercentageChart">
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
      </Form.Group> */}
    </div>
  );
});
export default ConfigChart;
