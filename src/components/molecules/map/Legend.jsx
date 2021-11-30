/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { useEffect } from 'react';
import { useLeaflet } from 'react-leaflet';
import i18n from 'i18next';
// import PropTypes from "prop-types";
import L from 'leaflet';
import { createLegendByColorType } from '../../../stores/mapUtils.ts';

const legendHtmlFor = (title) => {
  const header = `<h5>${i18n.t(title)}</h5>`;
  const res = createLegendByColorType(title);
  res.unshift(header);
  return res.join('');
};

const Legend = ({ title }) => {
  const { map } = useLeaflet();
  useEffect(() => {
    const legend = L.control({ position: 'bottomleft' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = legendHtmlFor(title);
      return div;
    };
    legend.addTo(map);
    return () => legend.remove();
  }, [map, title]);
  return null;
};

/* Legend.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}; */

export default Legend;

/*
import { MapControl, withLeaflet } from 'react-leaflet';
// import { observer } from 'mobx-react';
import L from 'leaflet';
// import { store } from '../../../stores/storeConfig.ts';
import { createLegendBySchema } from '../../../stores/mapUtils.ts';

// const Legend = observer(
class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {
    // const { mapStore } = store;
    // const { markerColorType } = mapStore;
    // console.log(markerColorType);
    // console.log(this.props.byColor);
    const legend = L.control({ position: 'bottomright' });
    const div1 = L.DomUtil.create('div', 'info legend');
    legend.onAdd = () => createLegendBySchema('Gender', div1);
    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);
*/
