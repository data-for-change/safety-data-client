
// eslint-disable-next-line import/prefer-default-export
/* export const getSVGPinByCategory = (category, myStyle) => {
  let pin;
  switch (category) {
    case 'motorcycle':
      pin = <PinMoto {...myStyle} />;
      break;
    case 'truck':
      pin = <PinMoto {...myStyle} />;
      break;
    default:
      // pin = <PinPadrao {...myStyle}/>
      break;
  }
  const iconMarkup = renderToStaticMarkup(
    pin,
  );
  const customMarketIcon = divIcon({
    html: iconMarkup,
  });
  return customMarketIcon;
}; */

export const getColorByVehicle = (category: string) => {
  let res = '';
  switch (category) {
    case '':
      res = '#FF0F80';
      break;
    case 'רכב נוסעים פרטי':
      res = '#FE4E00';
      break;
    case 'אופנוע עד 50 סמ"ק':
    case 'אופנוע 51 עד 125 סמ"ק':
    case 'אופנוע 126 עד 400 סמ"ק':
    case 'אופנוע 401+ סמ"ק':
      res = '#E9190F';
      break;
    case 'אופניים':
      res = '#F41448';
      break;
    case 'אופניים חשמליים':
      res = '#EF172C';
      break;
    case 'קורקינט חשמלי':
      res = '#EF172C';
      break;
    default:
      res = '#FE4E00';
      break;
  }
  return res;
};
