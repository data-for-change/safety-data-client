import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

interface IProps {
    label: string,
    id: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => any
}
const GraphRangeSlider: React.FC<IProps> = ({ label, id, onChange }) => {
  const style = {
    paddingLeft: '10px',
    paddingRight: '10px',
  };
  const { t } = useTranslation();
  // <Form.Check inline label={t(label)} type={'checkbox'} id={`cbox`+id} onChange={onChange} />
  return (
    <div>
      <Form className="form-inline">
        <Form.Group controlId={`Range.${id}`}>
          <Form.Label style={style}>
            {t(label)}
:
            {' '}
          </Form.Label>
          <Form.Control type="range" onChange={onChange} />
        </Form.Group>
      </Form>
    </div>
  );
};
export default GraphRangeSlider;
