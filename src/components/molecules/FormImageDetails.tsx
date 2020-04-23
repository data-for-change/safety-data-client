import React from 'react';
import { observer } from 'mobx-react';
import 'react-image-gallery/styles/css/image-gallery.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import IimageEntity from '../../stores/ImageEntity';
import { useStore } from '../../stores/storeConfig';


const styleControl1 = {
  width: '250px',
};
const styleControl2 = {
  width: '250px',
};
interface IProps { }
interface IGroupProps {name: string}
// interface IGroupProps {image: IimageEntity}

const GroupPlace: React.FC<IGroupProps> = observer(({ name }) => {
  const { imageStore } = useStore();
  const { setCurrImageVal } = imageStore;
  const myVal = imageStore.currImage?.place;
  return (
    <Form.Group as={Col} controlId={`exampleForm.Control${name}`}>
      <Form.Label>
        {name}
      </Form.Label>
      <Form.Control
        style={styleControl1}
        value={myVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrImageVal('place', e.target.value)}
      />
    </Form.Group>
  );
});
const GroupTags: React.FC<IGroupProps> = observer(({ name }) => {
  const { imageStore } = useStore();
  const { setCurrImageVal } = imageStore;
  const myVal = imageStore.currImage?.tags;
  return (
    <Form.Group as={Col} controlId={`exampleForm.Control${name}`}>
      <Form.Label>
        {name}
      </Form.Label>
      <Form.Control
        style={styleControl2}
        value={myVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrImageVal('tags', e.target.value)}
      />
    </Form.Group>
  );
});

const GroupTitleHe: React.FC<IGroupProps> = observer(({ name }) => {
  const { imageStore } = useStore();
  const { setCurrImageVal } = imageStore;
  const myVal = imageStore.currImage?.titlehe;
  return (
    <Form.Group as={Col} controlId={`exampleForm.Control${name}`}>
      <Form.Label>
        {name}
      </Form.Label>
      <Form.Control
        value={myVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrImageVal('titlehe', e.target.value)}
      />
    </Form.Group>
  );
});

const GroupTextHe: React.FC<IGroupProps> = observer(({ name }) => {
  const { imageStore } = useStore();
  const { setCurrImageVal } = imageStore;
  const myVal = imageStore.currImage?.texthe;
  return (
    <Form.Group as={Col} controlId={`exampleForm.Control${name}`}>
      <Form.Label>
        {name}
      </Form.Label>
      <Form.Control
        as="textarea"
        value={myVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrImageVal('texthe', e.target.value)}
      />
    </Form.Group>
  );
});


const FormImageDetails: React.FC<IProps> = observer(() => {
  const { imageStore } = useStore();
  const { currImage, setCurrImageVal, submitImageFile } = imageStore;

  const isLoading = false;
  const isValidAllContols = true;
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
            value={(currImage !== null) ? currImage.filename : ''}
          />
        </Form.Group>
        <Col>
          <GroupTags name="tags" />
        </Col>
        <Col>
          <GroupPlace name="place" />
        </Col>
      </Row>
      <Row>
        <Col>
          <GroupTitleHe name="titlehe" />
          <GroupTextHe name="texthe" />
          <Form.Group as={Col} controlId="exampleForm.ControlTitleEn">
            <Form.Label>
              en title
            </Form.Label>
            <Form.Control
              value={(currImage !== null) ? currImage.titleen : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrImageVal('titleen', e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="exampleForm.ControlTextEn">
            <Form.Label>
              en text
            </Form.Label>
            <Form.Control
              as="textarea"
              value={(currImage !== null) ? currImage.texten : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrImageVal('texten', e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group as={Col} controlId="exampleForm.ControlTitleAr">
            <Form.Label>
              ar title
            </Form.Label>
            <Form.Control
              value={(selectedImage !== null) ? selectedImage.titlear : ''}
            />
          </Form.Group> */}
          {/* <Form.Group as={Col} controlId="exampleForm.ControlTextAr">
            <Form.Label>
              ar text
            </Form.Label>
            <Form.Control
              as="textarea"
              value={(selectedImage !== null) ? selectedImage.textear : ''}
            />
          </Form.Group> */}
          <Button
            variant="primary"
            disabled={isLoading || !isValidAllContols}
            onClick={() => { submitImageFile(); }}
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
