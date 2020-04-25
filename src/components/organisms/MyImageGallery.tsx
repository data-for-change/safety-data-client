import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ButtonToggle from '../atoms/ButtonToggle';
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
  const { imageStore, uiStore } = useStore();
  const { getImages, setCurrImage } = imageStore;
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
  const handleOnSlide = (currentIndex:number) => {
    if (arrayImagesProps.length > 0) setCurrImage(arrayImagesProps[currentIndex]);
    return true;
  };
  return (
    <Card style={styleCard}>
      <Row>
        <Col />
        <Col xs={10}>
          {' '}
          {isGotImages && <ImageTitle />}
        </Col>
        <Col>{isGotImages && <ButtonToggleHideDescription />}</Col>
      </Row>
      {isGotImages && (
      <ImageGallery
        items={images}
        isRTL={isRTL}
        onSlide={(currentIndex: number) => handleOnSlide(currentIndex)}
      />
      )}
      {!isGotImages && <ImageMsg />}
    </Card>
  );
});

const ButtonToggleHideDescription: React.FC<{}> = observer(() => {
  const { imageStore } = useStore();
  const { hideDescription, toggleHideDescription } = imageStore;
  return (
    <ButtonToggle
      condtion={hideDescription}
      textTrue="show-description"
      textFalse="hide-description"
      onClick={toggleHideDescription}
    />
  );
});

const styleTitle: React.CSSProperties = {
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 18,
  margin: '10px',
};
const ImageTitle: React.FC<{}> = observer(() => {
  const { imageStore } = useStore();
  const { currImage } = imageStore;
  return (
    <div style={styleTitle}>{currImage?.titlehe}</div>
  );
});

const ImageMsg: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { imageStore } = useStore();
  const { isLoading } = imageStore;
  return (
    <span>{(isLoading) ? `${t('Loading…')}` : `${t('not-found-images')}` }</span>
  );
});

export default MyImageGallery;
