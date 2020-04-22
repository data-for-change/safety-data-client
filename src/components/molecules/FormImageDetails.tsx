import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateImgProps } from '../../services/ImageService';
import ImageEntity from '../../stores/ImageEntity';
// import { useStore } from '../../stores/storeConfig';

interface IProps {selectedImage:any }

const FormImageDetails: React.FC<IProps> = observer(({ selectedImage }) => {
  const styleCol = {
    width: '50vw', maxWidth: '100%',
  };
  const styleControl1 = {
    width: '250px',
  };
  const styleControl2 = {
    width: '250px',
  };
  const [titlehe, setTitleHe] = useState('');
  useEffect(() => {
    setTitleHe(selectedImage.titlehe);
  }, []);

  const isLoading = false;
  const isValidAllContols = true;
  const submitFile = () => {
    const image = new ImageEntity(1, selectedImage.filename, titlehe, 'text', 'tag,tag2', 'place');
    console.log(image);
    // updateImgProps(image);
  };
  return (
    <Form>
      <Row>
        <Col />
        <Form.Group as={Col} controlId="exampleForm.ControlFileName">
          <Form.Label>
            file name
          </Form.Label>
          <Form.Control
            disabled
            style={styleControl1}
            value={(selectedImage !== null) ? selectedImage.filename : ''}
          />
        </Form.Group>
        <Col>
          <Form.Group as={Col} controlId="exampleForm.ControlTags">
            <Form.Label>
              tags
            </Form.Label>
            <Form.Control
              style={styleControl2}
              value={selectedImage.tags}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="exampleForm.ControlPlace">
            <Form.Label>
              place
            </Form.Label>
            <Form.Control
              style={styleControl1}
              value={(selectedImage !== null) ? selectedImage.place : ''}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col style={styleCol}>
          <Form.Group as={Col} controlId="exampleForm.ControlTitleHe">
            <Form.Label>
              he title
            </Form.Label>
            <Form.Control
              value={titlehe}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitleHe(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTextHe">
            <Form.Label>
              he text
            </Form.Label>
            <Form.Control
              as="textarea"
              value={(selectedImage !== null) ? selectedImage.texthe : ''}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTitleEn">
            <Form.Label>
              en title
            </Form.Label>
            <Form.Control
              value={(selectedImage !== null) ? selectedImage.titleen : ''}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTextEn">
            <Form.Label>
              en text
            </Form.Label>
            <Form.Control
              as="textarea"
              value={(selectedImage !== null) ? selectedImage.texten : ''}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTitleAr">
            <Form.Label>
              ar title
            </Form.Label>
            <Form.Control
              value={(selectedImage !== null) ? selectedImage.titlear : ''}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTextAr">
            <Form.Label>
              ar text
            </Form.Label>
            <Form.Control
              as="textarea"

              value={(selectedImage !== null) ? selectedImage.textear : ''}
            />
          </Form.Group>
          <Button
            variant="primary"
            disabled={isLoading || !isValidAllContols}
            onClick={() => { submitFile(); }}
          >
            {isLoading ? 'Loading…' : 'Submit'}
            {' '}
          </Button>
        </Col>
      </Row>
    </Form>
  );
});
export default FormImageDetails;
