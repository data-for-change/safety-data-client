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

interface IProps { }

const UpdateImagePage: React.FC<IProps> = observer(() => {
  const styleSelect = {
    width: '150px',
  };
  const styleInput = {
    width: '350px',
  };
  const styleText = {
    width: '450px',
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
  const arrayImages = toJS(imageStore.imageList);
  const images = arrayImages.map((x: any) => ({
    original: x.filename,
    thumbnail: x.filename,
    originalTitle: x.titlehe,
    description: x.texthe,
  }));
  let selectedImage = null;
  if (arrayImages.length > 0) selectedImage = arrayImages[0];
  const isGotImages = (images.length > 0);
  return (
    <div style={styleDiv}>
      <div>
        <Form>
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
        </Form>
      </div>
      <div style={styleDiv2}>
        {isGotImages && <ImageGallery items={images} isRTL={isRTL} />}
        {!isGotImages && `${'not-found-images'}`}
      </div>
      <div>
        <Form>
          <Row>
            <Col>
              <Form.Group as={Col} controlId="exampleForm.ControlTitleHe">
                <Form.Label>
                  he title
                </Form.Label>
                <Form.Control
                  style={styleInput}
                  value={(selectedImage !== null) ? selectedImage.titlehe : ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlTitleEn">
                <Form.Label>
                  en title
                </Form.Label>
                <Form.Control
                  style={styleInput}
                  value={(selectedImage !== null) ? selectedImage.titleen : ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlTitleAr">
                <Form.Label>
                  ar title
                </Form.Label>
                <Form.Control
                  style={styleInput}
                  value={(selectedImage !== null) ? selectedImage.titlear : ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlFileName">
                <Form.Label>
                  file name
                </Form.Label>
                <Form.Control
                  disabled
                  style={styleInput}
                  value={(selectedImage !== null) ? selectedImage.filename : ''}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} controlId="exampleForm.ControlTextHe">
                <Form.Label>
                  he text
                </Form.Label>
                <Form.Control
                  as="textarea"
                  style={styleText}
                  value={(selectedImage !== null) ? selectedImage.texthe : ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlTextEn">
                <Form.Label>
                  en text
                </Form.Label>
                <Form.Control
                  as="textarea"
                  style={styleText}
                  value={(selectedImage !== null) ? selectedImage.texten : ''}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlTextAr">
                <Form.Label>
                  ar text
                </Form.Label>
                <Form.Control
                  as="textarea"
                  style={styleText}
                  value={(selectedImage !== null) ? selectedImage.textear : ''}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
});
export default UpdateImagePage;
