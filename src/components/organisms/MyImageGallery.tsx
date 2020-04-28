import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import ButtonToggle from '../atoms/ButtonToggle';
import { useStore } from '../../stores/storeConfig';

interface Props {
  type: string;
}
const styleCard: React.CSSProperties = {
  borderRadius: '5px',
  padding: '5px',
  margin: '7px',
  width: '80%',
};
const styleButCol: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const MyImageGallery: React.FC<Props> = observer(({ type }) => {
  const { imageStore, uiStore } = useStore();
  const {
    getImages, setCurrImage, imageList, setCurrTag,
  } = imageStore;
  const { language } = uiStore;
  const isRTL = (language !== 'en');
  useEffect(() => {
    getImages(type);
  }, [getImages, type]);
  const arrayImagesProps = toJS(imageList);
  const images = arrayImagesProps.map((x: any) => ({
    original: x.filename,
    thumbnail: x.filename,
    originalTitle: x.titlehe,
    description: x.texthe,
  }));
  const isGotImages = (images.length > 0);
  const handleOnSlide = (currentIndex: number) => {
    if (arrayImagesProps.length > 0) setCurrImage(arrayImagesProps[currentIndex]);
    return true;
  };
  return (
    <Card style={styleCard}>
      <Row>
        <Col md={2}>
          <SelectImageByTag onChange={(val:string) => setCurrTag(val)} />
        </Col>
        <Col xs={12} md={8}>
          {isGotImages && <ImageTitle />}
        </Col>
        <Col md={2} style={styleButCol}>
          {isGotImages && <ButtonToggleHideDescription />}
        </Col>
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

const styleButtonToggle = {
  marginLeft: '3px',
  marginRight: '3px',
  marginBottom: '3px',
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

interface PropsSelectImageByTag {
  onChange: (val:string) => void;
}
const styleSelect = {
  width: '150px',
};
const SelectImageByTag: React.FC<PropsSelectImageByTag> = observer(({ onChange }) => (
  <div>
    <Form.Group as={Col} controlId="exampleForm.SelectTag">
      {/* <Form.Label>
        tags
      </Form.Label> */}
      <Form.Control
        as="select"
        style={styleSelect}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange(e.target.value); }}
      >
        <option>כללי</option>
        <option>הולכי רגל</option>
        <option>רוכבי אופניים</option>
        <option>רוכבי אופנוע</option>
        <option>מכוניות</option>
        <option>אוטובוסים</option>
        <option>ילדים</option>
      </Form.Control>
    </Form.Group>
  </div>
));

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
    <span>{(isLoading) ? `${t('Loading…')}` : `${t('not-found-images')}`}</span>
  );
});

export default MyImageGallery;
