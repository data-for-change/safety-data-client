import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Checkbox from '../atoms/Checkbox';
import { useStore } from '../../stores/storeConfig';

interface IProps { }
const ConfigChart: React.FC<IProps> = observer(() => {
  // const { t } = useTranslation();
  const { uiStore } = useStore();
  const { usePieChart, updateUsePieChart } = uiStore;
  return (
    <Form.Group controlId="ConfigFile.ControlVehicles">
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

  );
});
export default ConfigChart;
