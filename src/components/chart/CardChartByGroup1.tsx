import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import Button from 'react-bootstrap/Button';
import { useStore } from '../../stores/storeConfig';
import SelectGroupBy from '../groupby/SelectGroupBy';
import SmallCard2 from '../atoms/SmallCard2';
import ChartBar from './ChartBar';
import ConfigChart from './ConfigChart';
import ConfigModal from '../organisms/ConfigModal';
import { useMemos } from '../../hooks/myUseMemo';
import SvgIconSettings from '../../assets/SvgIconSettings';
import { ItemCount } from '../../types';
import SelectSortBy from '../groupby/SelectSortBy';

const foramtDataPrecision = (data: ItemCount[]) => {
    const data2 = data.map((x) => {
       if (typeof x.count === 'number' && !Number.isInteger(x.count)) {
          return { _id: x._id, count: x.count.toFixed(1) };
       }
       return { _id: x._id, count: x.count };
    });
    return data2;
 };
 
const CardChartByGroup1: React.FC<{}> = observer(() => {
    const styles = {
       divConfig: {
          display: 'flex',
          justifyContent: 'space-between',
       },
       divChart: {
          width: '100%',
          height: '57vh',
       },
    };
    // const { t } = useTranslation();
    const [showModel, setShowModal] = useState(false);
    const { filterStore, uiStore } = useStore();
    const { dataFilterd } = filterStore;
    const reactData = toJS(dataFilterd);
    const dataFormated = foramtDataPrecision(reactData);
    const { chartType, direction } = uiStore;
    const chart = <ChartBar
       data={dataFormated}
       fill="#8884d8"
       chartType={chartType}
       height={150}
       dir={direction}
    />;
    const memoSettingsIcon = useMemos([],
       <SvgIconSettings color={'var(--onprimary-color)'} />
    );
    // const memoSettingsIcon = <SvgIconSettings color={'var(--onprimary-color)'} />;   
    return (
       <SmallCard2 style={{marginBottom: '0.5rem'}}>
          <div style={styles.divConfig}>
             <SelectGroupBy id="Graphs.Main.SelectGroupby" />
             <SelectSortBy id="Graphs.Main.SelectSort"/>
          </div>
          <ConfigModal title="Chart Options" showModal={showModel} setShow={setShowModal}>
             <ConfigChart />
          </ConfigModal>
          <div >
             <hr />
             <div style={styles.divChart} >
                {chart}
             </div>
          </div>
       </SmallCard2>
    );
 });
 
 export default CardChartByGroup1;