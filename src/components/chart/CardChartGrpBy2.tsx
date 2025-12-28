import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/storeConfig';
import GroupBy2 from '../../stores/filter/GroupBy2';
import SelectGroupBy from '../groupby/SelectGroupBy';
import SelectGroupBy2 from '../groupby/SelectGroupBy2';
import { SmallCard } from '../common';
import ChartBar from './ChartBar';
import { RootState } from '../../stores/store';
import { useSelector } from 'react-redux';
import ChartDataFilterSlider from '../organisms/ChartDataFilterSlider';
import { EchartId } from '../types';

interface IProps { }
const CardChartGrpBy2: FC<IProps> = observer(() => {
   const styles = {
      styleLable: {
         fontWeight: 700,
         marginTop: '5px',
         marginLeft: '20px',
         marginRight: '20px',
      },
      divChart: {
         width: '100%',
         height: '60vh',
      },
   }
   const divConstolsRow = {
      display: 'flex',
      flexWrap: 'wrap',
   } as React.CSSProperties;
   const { filterStore } = useStore();
   const { group2Dict, getChartData, dataGroupby2 } = filterStore;
   const chartId = EchartId.Group_2;
   const dataFormated = getChartData(chartId);
   const { groupBy } = group2Dict;
   const { chartType, direction } = useSelector((state: RootState) => state.appUi);
   const metaDAta = (groupBy as GroupBy2).getBars();
   const show = true;
   return (
      <div>
         {show
            && (
               <SmallCard>
                  <div style={divConstolsRow}>
                     <SelectGroupBy id="Graphs.Grp2" labelText="" />
                     {' '}
                  &nbsp;
                     &nbsp;
                     <SelectGroupBy2 id="Graphs" />
                     {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
                  <div style={{ width: '40%', margin: '0 auto' }}>
                     <ChartDataFilterSlider id={chartId} data={dataGroupby2} />
                  </div>
                  </div>
                  <hr />
                  <div style={styles.divChart}>
                     <ChartBar data={dataFormated} metaData={metaDAta} chartType={chartType} dir={direction} />
                  </div>
               </SmallCard>
            )}
      </div>
   );
});

export default CardChartGrpBy2;