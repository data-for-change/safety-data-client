import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
// import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useStore } from '../../stores/storeConfig';
import FormImageDetails from '../molecules/FormImageDetails';
import ImageEntity, { IimageEntity } from '../../stores/ImageEntity';

interface IProps { }
const styleSelect = {
  width: '150px',
};
const styleCard = {
  marginLeft: '5px',
  marginRight: '5px',
  width: '90%',
};

const CardEditFile = observer(() => {
  const { t } = useTranslation();
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTag(e.target.value); }}
          >
            <option>הולכי רגל</option>
            <option>רוכבי אופניים</option>
            <option>רוכבי אופנוע</option>
            <option>מכוניות</option>
            <option>אוטובוסים</option>
            <option>משאיות</option>
            <option>כללי</option>
          </Form.Control>
        </Form.Group>
        <Card style={styleCard}>
          {isGotImages && (
          <ImageGallery
            items={images}
            disableArrowKeys
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
const CardUploadFile = observer(() => {
  const styleInput = {
    marginTop: '15px',
    marginLeft: '5px',
    marginRight: '5px',
    width: '70%',
  };
  const [ifile, setFile] = React.useState('');
  const { imageStore } = useStore();
  const { setCurrImage } = imageStore;
  const onChangeFileHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null && event.target.files.length > 0) {
      // console.log(event.target.files[0]);
      const file = event.target.files[0];
      const image = new ImageEntity(0, file.name, '', '', '', '');
      image.file = file;
      setCurrImage(image);
      setFile(URL.createObjectURL(file));
    }
  };
  return (
    <Card>
      <div>
        <Form>
          <Row>
            <Col>
              <input type="file" name="file" onChange={onChangeFileHandler} />
              <img src={ifile} alt="" style={styleInput} />
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
  );
});

const UpdateImagePage: React.FC<IProps> = observer(() => {
  const styleDiv = {
    margin: '20px',
    display: 'flex',
    justifyContent: 'flex-start',
  };
  const styleDiv1 = {
    margin: '20px',
    width: '450px',
  };
  const styleDiv2 = {
    margin: '20px',
  };
  const styleTab = {
    marginTop: '20px',
  };
  const { t } = useTranslation();
  return (
    <div style={styleDiv}>
      <div style={styleDiv1}>
        <Tabs
          defaultActiveKey="editimage"
          id="image-tabs"
        >
          <Tab eventKey="editimage" title={t('edit-image')} style={styleTab}>
            <CardEditFile />
          </Tab>
          <Tab eventKey="uploadimage" title={t('upload-image')} style={styleTab}>
            <CardUploadFile />
          </Tab>
        </Tabs>
      </div>
      <div style={styleDiv2}>
        <FormImageDetails />
      </div>
    </div>
  );
});
export default UpdateImagePage;
