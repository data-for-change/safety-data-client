import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FormImageDetails from '../molecules/FormImageDetails';
import CardEditImageFile from '../molecules/CardEditImageFile';
import CardUploadImageFile from '../molecules/CardUploadImageFile';

interface IProps { }

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
            <CardEditImageFile />
          </Tab>
          <Tab eventKey="uploadimage" title={t('upload-image')} style={styleTab}>
            <CardUploadImageFile />
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
