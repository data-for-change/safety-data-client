import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import i18n from 'i18next';
// import PropTypes from "prop-types";
import L from 'leaflet';
import { createLegendByColorType } from '../../../utils/mapUtils';

const legendHtmlFor = (title) => {
  const header = `<h5>${i18n.t(title)}</h5>`;
  const res = createLegendByColorType(title);
  res.unshift(header);
  return res.join('');
};

const Legend = ({ title }) => {
  const map = useMap();
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

export default Legend;

