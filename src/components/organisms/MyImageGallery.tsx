import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import {ButtonToggle} from '../common';
import Select from '../atoms/Select';
import { useStore } from '../../stores/storeConfig';
import SmallCard2 from '../atoms/SmallCard2';
import {API_URL} from '../../utils/globalEnvs';
import { RootState } from '../../stores/store';
import { useSelector } from 'react-redux';

interface Props {
  type: string;
}

const styles = {
  divImageGallery: {
    width:0,
    minWidth: '100%',
  },
  styleCol: {
    display: 'flex',
    justifyContent: 'center',
  }
};

const MyImageGallery: React.FC<Props> = observer(({ type }) => {
  const { imageStore} = useStore();
  const {
    getImages, setCurrImage, imageList, tagsArr, setCurrTag, currTag,
  } = imageStore;
  const language  = useSelector((state: RootState) => state.appUi.language);
  const isRTL = (language !== 'en');
  useEffect(() => {
    getImages(type);
  }, [getImages, type]);
  const apiUrl = API_URL || '';
  const titleKey = `title${language}`;
  const destkey = `text${language}`;
  const arrayImagesProps = toJS(imageList);
  const images = arrayImagesProps.map((x: any) => ({
    original: `${apiUrl}/api/v1/img/${x.filename}`,
    thumbnail: `${apiUrl}/api/v1/img/${x.filename}`,
    originalTitle: x[titleKey],
    description: x[destkey],
  }));
  const isGotImages = (images.length > 0);
  const handleOnSlide = (currentIndex: number) => {
    if (arrayImagesProps.length > 0) setCurrImage(arrayImagesProps[currentIndex]);
    return true;
  };

  return (
    <SmallCard2>
      <div style={styles.divImageGallery}>
      <Row >
        <Col md={3} style={styles.styleCol}>
          <Select
            id='exampleForm.SelectTag'
            value={currTag}
            data={tagsArr}
            onChange={(val: string) => setCurrTag(val)}
          />
          {/* <SelectImageByTag onChange={(val: string) => setCurrTag(val)} /> */}
        </Col>
        <Col xs={12} md={6}>
          {isGotImages && <ImageTitle />}
        </Col>
        <Col md={3} style={styles.styleCol}>
          {isGotImages && <ButtonToggleHideDescription />}
        </Col>
      </Row>
      <hr />
      {isGotImages && (
        <ImageGallery
          items={images}
          isRTL={isRTL}
          onSlide={(currentIndex: number) => handleOnSlide(currentIndex)}
        />
      )}
      {!isGotImages && <ImageMsg />}
      </div>
    </SmallCard2>
  );
});

const styleButtonToggle = {
  width: 'auto'
};
const ButtonToggleHideDescription: React.FC<{}> = observer(() => {
  const { imageStore } = useStore();
  const { hideDescription, toggleHideDescription } = imageStore;
  return (
    <div style={styleButtonToggle}>
      <ButtonToggle
        condtion={hideDescription}
        textTrue="show-description"
        textFalse="hide-description"
        onClick={toggleHideDescription}
      />
    </div>
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
  const language  = useSelector((state: RootState) => state.appUi.language);
  const titleKey = `title${language}`;
  // @ts-ignore
  const title: string = (currImage !== null) ? currImage[titleKey] : '';
  return (
    <div style={styleTitle}>{title}</div>
  );
});

const ImageMsg: React.FC<{}> = observer(() => {
  const { t } = useTranslation();
  const { imageStore } = useStore();
  const { isLoading } = imageStore;
  return (
    <span>{(isLoading) ? `${t('Loading')}` : `${t('not-found-images')}`}</span>
  );
});

export default MyImageGallery;
