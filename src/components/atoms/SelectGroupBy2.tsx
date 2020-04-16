import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';


interface IProps { id: string }

const SelectGroupBy2: React.FC<IProps> = observer(({ id }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { group2Dict, groupBy2, updateGroupBy2 } = filterStore;
  const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateGroupBy2(event.target.value);
  }, [updateGroupBy2]);
  return (
    <Form className="form-inline">
      <Form.Group controlId={`GrupForm.${id}.SelectGroupBy2`}>
        {/* <Form.Label className="filterLable"> {t('GroupBy')}:</Form.Label> */}
        <Form.Control
          as="select"
          value={groupBy2.text}
          onChange={onSelectChange}
        >
          {Object.entries(group2Dict).map(([key, x]: any[]) => (<option value={x.text} key={key}>{t(x.text)}</option>))}
        </Form.Control>
      </Form.Group>
    </Form>
  );
});
export default SelectGroupBy2;
