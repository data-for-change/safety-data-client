import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useStore } from '../../stores/storeConfig';
import FormImageDetails from '../molecules/FormImageDetails';
import ImageEntity, { IimageEntity } from '../../stores/ImageEntity';

interface IProps { }

const UpdateImagePage: React.FC<IProps> = observer(() => {
  const styleSelect = {
    width: '150px',
  };
  const styleDiv = {
    margin: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
  };
  const styleDiv2 = {
    margin: '20px',
  };
  const styleDiv3 = {
    marginTop: '20px',
    width: '450px',
  };
  const { imageStore, uiStore } = useStore();
  const { getImagesByTag, setCurrImage } = imageStore;
  const { language } = uiStore;
  const isRTL = (language !== 'en');
  const [tag, setTag] = React.useState('הולכי רגל');
  useEffect(() => {
    getImagesByTag(tag);
  }, [getImagesByTag, tag]);
  // const [imageindex, setImageIndex] = React.useState(0);
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
  /*   useEffect(() => {
    if (arrayImages.length > 0) setCurrImage(arrayImages[imageindex]);
  }, [arrayImages]); */
  const onChangeFileHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      // console.log(event.target.files[0]);
      const file = event.target.files[0];
      const image = new ImageEntity(0, file.name, '', '', '', '');
      image.file = file;
      setCurrImage(image);
      console.log(file);
    }
  };

  return (
    <div style={styleDiv}>
      <div style={styleDiv2}>
        <Form>
          <Row>
            <Col>
              <Form.Group as={Col} controlId="exampleForm.SelectTag">
                <Form.Label>
                  tags
                </Form.Label>
                <Form.Control
                  as="select"
                  style={styleSelect}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTag(e.target.value); }}
                >
                  <option>הולכי רגל</option>
                  <option>רוכבי אופניים</option>
                  <option>רוכבי אופנוע</option>
                  <option>כללי</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <input type="file" name="file" onChange={onChangeFileHandler} />
            </Col>
          </Row>
          <Row>
            <div style={styleDiv3}>
              {isGotImages && (
              <ImageGallery
                items={images}
                isRTL={isRTL}
                onSlide={(currentIndex: number) => handleOnSlide(currentIndex)}
              />
              )}
              {!isGotImages && `${'not-found-images'}`}
            </div>
          </Row>
        </Form>
      </div>
      <div style={styleDiv2}>
        <FormImageDetails />
      </div>
    </div>
  );
});
export default UpdateImagePage;
