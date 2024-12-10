import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useStore } from '../../stores/storeConfig';
import GroupBy2 from '../../stores/filter/GroupBy2';
import SelectGroupBy from '../atoms/SelectGroupBy';
import SelectGroupBy2 from '../atoms/SelectGroupBy2';
import SmallCard2 from '../atoms/SmallCard2';
import ChartBar from './ChartBar';

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
   const { filterStore, uiStore } = useStore();
   const { group2Dict } = filterStore;
   const { groupBy } = group2Dict;
   const { chartType, direction } = uiStore;
   const metaDAta = (groupBy as GroupBy2).getBars();
   const reactDataGrp2 = toJS(filterStore.dataGroupby2);
   const show = true;
   return (
      <div>
         {show
            && (
               <SmallCard2>
                  <div style={divConstolsRow}>
                     <SelectGroupBy id="Graphs.Grp2" labelText="" />
                     {' '}
                     &nbsp;
                     <SelectGroupBy2 id="Graphs" />
                     {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
                  </div>
                  <hr />
                  <div style={styles.divChart}>
                     <ChartBar data={reactDataGrp2} metaData={metaDAta} chartType={chartType} dir={direction} />
                  </div>
               </SmallCard2>
            )}
      </div>
   );
});

export default CardChartGrpBy2;