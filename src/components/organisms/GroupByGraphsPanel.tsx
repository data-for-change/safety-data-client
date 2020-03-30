import React, { useState} from 'react'
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { toJS } from 'mobx'
import { useStore } from '../../stores/storeConfig'
import { SmallCard } from '../atoms/SmallCard'
import { SelectGroupBy } from '../atoms/SelectGroupBy'
import { SelectGroupBy2 } from '../atoms/SelectGroupBy2'
// import { RangeSlider } from '../atoms/RangeSlider'
import MyBarChart from '../molecules/MyBarChart'

interface IProps { }
let getSize = (width: number) => {
    let size: number = 500;
    if (width <= 500)
        size = 450;
    else if (width <= 1500)
        size = width * 0.75;
    else
        size = 1200;
    return size;
}

export const GroupByGraphsPanel: React.FC<IProps> = observer(() => {
    const { t } = useTranslation();
    const store = useStore();
    const [graphSize, setGraphSize] = useState(getSize(window.innerWidth));
    const style = {
        marginLeft: "0",
        marginRight: "0",
        marginTop: "20px"
    };
    const styleLable = {
        fontWeight: 700,
        marginTop: "5px",
        marginLeft: "20px",
        marginRight: "20px"
    };
    // const onSizeSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     let size:number = parseInt(event.target.value)
    //     switch(true) {
    //         case (size <= 25):
    //             size= 300;
    //             break;
    //         case (size <= 50):
    //             size= 500;
    //           break;
    //         case (size <= 75):
    //             size= 800;
    //           break;
    //         case (size <= 100):
    //             size= 1200;
    //           break;
    //         default:
    //             size= 500;
    //       }
    //     setGraphSize(size) 
    //   }; 
    React.useEffect(() => {
        function handleResize() {
            const size = getSize(window.innerWidth)
            setGraphSize(size)
        }
        window.addEventListener('resize', handleResize)
        return (() => { window.removeEventListener('resize', handleResize) })
    })
    //let width = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;  
    //const graphSize = getSize(width);
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
                    <SelectGroupBy id="Graphs.Main" />
                    <MyBarChart data={reactData3} width={600} height={390}></MyBarChart>
                </SmallCard>
                <SmallCard styleType={3} width={graphSize + 150}>
                    <div className="row">
                        <span style={styleLable}> {t('GroupBy')}:</span>
                        <SelectGroupBy id="Graphs.Grp2" labelText='' />
                        <SelectGroupBy2 id="Graphs" />
                        {/* <RangeSlider id="Graphs" label="resize" value={80} onChange={onSizeSliderChange}/> */}
                    </div>
                    <MyBarChart data={reactDataGrp2} bars={barsGrp2} width={graphSize} height={graphSize * 0.62} legendType="top"></MyBarChart>
                </SmallCard>
            </div>
        )
    }
    else return null;
})

// function debounce(fn:()=>void, ms:any ) {
//     let timer :any
//     return _ => {
//       clearTimeout(timer)
//       timer = setTimeout(_ => {
//         timer = null
//         fn.apply(this , arguments)
//       }, ms)
//     };
//   }