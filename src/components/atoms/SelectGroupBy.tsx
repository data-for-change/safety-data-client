import React, { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { useStore } from '../../stores/storeConfig';

interface IProps {
  id: string,
  labelText?: string,
}
const SelectGroupBy: React.FC<IProps> = observer(({ id, labelText = 'GroupBy' }) => {
  const { t } = useTranslation();
  const { filterStore } = useStore();
  const { groupByDict, groupBy, updateGroupby } = filterStore;
  const lable = (labelText !== '') ? (
    <Form.Label className="filterLable">
      {' '}
      {t(labelText)}
:
    </Form.Label>
  ) : null;
  const onSelectChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    updateGroupby(event.target.value);
  }, [updateGroupby]);
  return (
    <Form className="form-inline">
      <Form.Group controlId={`GrupForm.${id}.SelectGroupBy`}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {lable}
          <Form.Control
            as="select"
            value={groupBy.text}
            onChange={onSelectChange}
            className="form-select form-select-sm"
          >
            {Object.entries(groupByDict)
              .map(([key, x]: any[]) => (<option value={x.text} key={key}>{t(x.text)}</option>))}
          </Form.Control>
        </div>
      </Form.Group>
    </Form>
  );
});
export default SelectGroupBy;
