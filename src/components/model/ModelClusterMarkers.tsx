import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { ClusterRow } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/types';
import ModelMarker from './ModelMarker';
import { buildSeveritySectors, getSeverityColor, getSeverityMinMax } from './modelhelper';

type Props = {
  clusters: ClusterRow[];
  colorBy?: string;
  isHeat: boolean;  
  sizeHeat: number;
};

const ModelClusterMarkers: FC<Props> = observer(
  ({ clusters, colorBy, isHeat , sizeHeat}) => {
   const { language } = useSelector((state: RootState) => state.appUi);
   const { min, max } = getSeverityMinMax(clusters);
   const sectors = buildSeveritySectors(min, max);
    return (
      <div>
        {clusters.map((cluster, index) => {
          const color = getSeverityColor(cluster.severityIndex, sectors);
          return (
          <ModelMarker
            key={`${cluster.name}-${index}`}
            position={[cluster.latitude, cluster.longitude]}
            data = {cluster}
            language={language}
            color={color}
            isHeat={isHeat}
            size= {sizeHeat}
            markerIconsType={'general'}
          />
        );
        })}
      </div>
    );
  }
);

export default ModelClusterMarkers;
