import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Card from 'react-bootstrap/Card';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useStore } from '../../stores/storeConfig';

interface Props {
  type: string;
}
const styleCard: any = {
  borderRadius: '5px',
  padding: '5px',
  margin: '7px',
  width: '80%',
};

const MyImageGallery: React.FC<Props> = observer(({ type }) => {
  const { t } = useTranslation();
  const { imageStore, uiStore } = useStore();
  const { getImages } = imageStore;
  const { language } = uiStore;
  const isRTL = (language !== 'en');
  useEffect(() => {
    getImages(type);
  }, [getImages, type]);
  const arrayImagesProps = toJS(imageStore.imageList);
  const images = arrayImagesProps.map((x: any) => ({
    original: x.filename,
    thumbnail: x.filename,
    originalTitle: x.titlehe,
    description: x.texthe,
  }));
  const isGotImages = (images.length > 0);
  return (
    <Card style={styleCard}>
      {isGotImages && <ImageGallery items={images} isRTL={isRTL} />}
      {!isGotImages && `${t('not-found-images')}`}
    </Card>
  );
});
export default MyImageGallery;
