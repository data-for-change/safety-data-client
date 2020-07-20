import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

interface PropsSelectImageByTag {
    onChange: (val:string) => void;
}
const styleSelect = {
  width: '150px',
};

const SelectImageByTag: React.FC<PropsSelectImageByTag> = observer(({ onChange }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Form.Group as={Col} controlId="exampleForm.SelectTag">
        {/* <Form.Label>
          tags
        </Form.Label> */}
        <Form.Control
          as="select"
          style={styleSelect}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange(e.target.value); }}
        >
          <option value="כללי">{t('general')}</option>
          <option value="הולכי רגל">{t('pedestrian')}</option>
          <option value="רוכבי אופניים">{t('cyclist')}</option>
          <option value="רוכבי אופנוע">{t('motorcycle')}</option>
          <option value="מכוניות">{t('car')}</option>
          <option value="אוטובוסים">{t('bus')}</option>
          <option value="ילדים">{t('kids')}</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
});

export default SelectImageByTag;
