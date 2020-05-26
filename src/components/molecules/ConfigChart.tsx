import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Checkbox from '../atoms/Checkbox';
import { useStore } from '../../stores/storeConfig';

interface IProps { }
const ConfigChart: React.FC<IProps> = observer(() => {
  // const { t } = useTranslation();
  const { uiStore } = useStore();
  const { usePieChart, updateUsePieChart, showPercentageChart, updateShowPercentageChart } = uiStore;
  return (
    <div>
      <Form.Group controlId="ConfigFile.ControlUsePieChart">
        <Checkbox
          key={1}
          label="UsePieChart"
          group="ChartConfig"
          id={1}
          checked={usePieChart}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateUsePieChart(e.target.checked);
          }}
        />
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
