import React from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

interface Props {
    onChange: (val:string) => void;
    value: string;
}
const styleSelect = {
  width: '150px',
};

const SelectCityPop: React.FC<Props> = observer(({ onChange, value }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Form.Group as={Col} controlId="cityForm.SelectPopSize">
        <Form.Label className="filterLable">
        { t('city_size')}:
        </Form.Label>
        <Form.Control 
          as="select"
          style={styleSelect}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange(e.target.value); }}
        >
          <option value='{"min":-1,"max":-1}'>{t('all')}</option>
          <option value='{"min":200000,"max":1000000}'>{t('200K-1000K')}</option>
          <option value='{"min":100000,"max":200000}'>{t('100K-200K')}</option>
          <option value='{"min":50000,"max":100000}'>{t('50K-100K')}</option>
          <option value='{"min":20000,"max":50000}'>{t('20K-50K')}</option>
          <option value='{"min":10000,"max":20000}'>{t('10K-20K')}</option>
          <option value='{"min":000,"max":10000}'>{t('0-10K')}</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
});

export default SelectCityPop;
