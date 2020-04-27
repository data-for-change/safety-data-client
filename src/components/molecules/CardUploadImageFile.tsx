import React from 'react';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useStore } from '../../stores/storeConfig';
import ImageEntity from '../../stores/ImageEntity';

interface IProps { }

const CardUploadImageFile = observer(() => {
  const styleInput = {
    marginTop: '15px',
    marginLeft: '5px',
    marginRight: '5px',
    width: '90%',
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

export default CardUploadImageFile;
