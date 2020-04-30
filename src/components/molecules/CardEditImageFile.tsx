import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useStore } from '../../stores/storeConfig';
import { IimageEntity } from '../../stores/ImageEntity';

interface IProps { }
const styleSelect = {
  width: '150px',
};
const styleCard = {
  marginLeft: '5px',
  marginRight: '5px',
  width: '90%',
};

const CardEditImageFile = observer(() => {
  const { t } = useTranslation();
  const [tag, setTags] = React.useState('כללי');
  const { imageStore, uiStore } = useStore();
  const { getImagesByTag, setCurrImage } = imageStore;
  const { language } = uiStore;
  const isRTL = (language !== 'en');
  useEffect(() => {
    getImagesByTag(tag, '');
  }, [getImagesByTag, tag]);
  // useEffect(() => {
  //   getImagesByTag(tag);
  // }, [getImagesByTag, tag]);
  const arrayImages = toJS(imageStore.imageList);
  const images = arrayImages.map((x: IimageEntity) => ({
    original: x.filename,
    thumbnail: x.filename,
    originalTitle: x.titlehe,
    description: x.texthe,
  }));
  const handleOnSlide = (currentIndex:number) => {
    // console.log(currentIndex);
    if (arrayImages.length > 0) setCurrImage(arrayImages[currentIndex]);
    return true;
  };
  const isGotImages = (images.length > 0);
  return (
    <div>
      <Form>
        <Form.Group as={Col} controlId="exampleForm.SelectTag">
          <Form.Label>
            tags
          </Form.Label>
          <Form.Control
            as="select"
            style={styleSelect}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTags(e.target.value); }}
          >
            <option>כללי</option>
            <option>הולכי רגל</option>
            <option>רוכבי אופניים</option>
            <option>רוכבי אופנוע</option>
            <option>מכוניות</option>
            <option>אוטובוסים</option>
            <option>משאיות</option>
            <option>ילדים</option>
          </Form.Control>
        </Form.Group>
        <Card style={styleCard}>
          {isGotImages && (
          <ImageGallery
            items={images}
            // @ts-ignore
            disableKeyDown
            thumbnailPosition="top"
            isRTL={isRTL}
            onSlide={(currentIndex: number) => handleOnSlide(currentIndex)}
          />
          )}
          {!isGotImages && `${t('not-found-images')}`}
        </Card>
      </Form>
    </div>
  );
});
export default CardEditImageFile;
