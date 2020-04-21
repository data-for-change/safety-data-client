import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useStore } from '../../stores/storeConfig';

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
    marginTop: '80px',
    width: '450px',
  };
  const { imageStore, uiStore } = useStore();
  const { getImagesByTag } = imageStore;
  const { language } = uiStore;
  const isRTL = (language !== 'en');
  const [tag, setTag] = React.useState('הולכי רגל');
  useEffect(() => {
    getImagesByTag(tag);
  }, [getImagesByTag, tag]);
  const arrayImagesProps = toJS(imageStore.imageList);
  const images = arrayImagesProps.map((x: any) => ({
    thumbnail: x.filename,
    originalTitle: x.titlehe,
    description: x.texthe,
  }));
  const isGotImages = (images.length > 0);
  return (
    <div style={styleDiv}>
      <div>
        <Form>
          <Form.Group as={Col} controlId="exampleForm.ControlSelectStartYear">
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
        </Form>
      </div>
      <div style={styleDiv2}>
        {isGotImages && <ImageGallery items={images} isRTL={isRTL} />}
        {!isGotImages && `${'not-found-images'}`}
      </div>
    </div>
  );
});
export default UpdateImagePage;
