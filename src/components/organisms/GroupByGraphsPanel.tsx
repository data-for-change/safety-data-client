import React ,{useState, ChangeEvent}from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import { SelectGroupBy2 } from '../atoms/SelectGroupBy2'
import {RangeSlider} from '../atoms/RangeSlider'
import MyBarChart from '../molecules/MyBarChart'

interface IProps { }

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const [graphSize, setGraphSize] = useState(500);
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    const onSizeSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
        let size:number = parseInt(event.target.value)
        switch(true) {
            case (size <= 20):
                size= 300;
                break;
            case (size <= 40):
                size= 500;
              break;
            case (size <= 60):
                size= 600;
              break;
            case (size <= 80):
                size= 800;
              break;
            case (size <= 100):
                size= 1200;
              break;
            default:
                size= 500;
          }
        setGraphSize(size) 
      };  
    let reactData1 = toJS(store.dataByYears)
    let reactData2 = toJS(store.dataFilterdByYears)
    let reactData3 = toJS(store.dataFilterd)
    let barsGrp2 = store.groupBy2.getBars();
    let reactDataGrp2 = toJS(store.dataGroupby2)
    if (reactData1.length > 0) {
        return (
            <div className="row" style={style}>
                <SmallCard styleType={2} title={t('CasualtiesByFilter')}>
                    <MyBarChart data={reactData2} />
                </SmallCard>
                <SmallCard styleType={3}>
                    <SelectGroupBy id="Graphs.Main"/>
                    <MyBarChart data={reactData3} width={600} height={390}></MyBarChart>
                </SmallCard>
                <SmallCard styleType={3} width={graphSize+150}>
                    <div className="row"> 
                        <SelectGroupBy id="Graphs.Grp2"/>
                        <SelectGroupBy2 id="Graphs"/>
                        <RangeSlider id="Graphs" label="resize" onChange={onSizeSliderChange}/>
                    </div>
                    <MyBarChart data={reactDataGrp2} bars={barsGrp2} width={graphSize} height={graphSize*0.62}></MyBarChart>
                </SmallCard>
            </div>
        )
    }
    else return null;
})
