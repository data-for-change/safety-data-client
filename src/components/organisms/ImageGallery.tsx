import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useStore } from '../../stores/storeConfig';


interface Props {
  type: string;
}

const ImageGallery: React.FC<Props> = observer(({ type }) => {
  const { t } = useTranslation();
  const { imageStore } = useStore();
  const { getImages } = imageStore;
  useEffect(() => {
    getImages(type);
  }, [getImages, type]);
  const arrayImagesProps = toJS(imageStore.imageList);
  const reactGallery = arrayImagesProps.map((x: any) => (
    <Col xs={6} md={4} key={`col-${x._id}`}>
      <Image src={x.filename} thumbnail key={`img-${x._id}`} />
      <div><b>{x.titlehe}</b></div>
      <div>{x.texthe}</div>
    </Col>
  ));
  return (
    <div>
      <h2>{t('Images')}</h2>
      <Container>
        <Row>
          {reactGallery}
        </Row>
      </Container>
    </div>
  );
});
export default ImageGallery;
