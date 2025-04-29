import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Form from 'react-bootstrap/Form';
import { Checkbox } from '../common';
import { IColumnFilter } from '../../stores/filter/ColumnFilterCheckBoxList';
import { useMemos } from "../../hooks/myUseMemo";
import './groupCheckBox.css';

interface IProps {
  formName: string,
  colFilter: IColumnFilter,
  onChange: (aType: number, val: boolean) => void
}

/**
 * group of check boxs, that represnat single filter
 * each filter can get several boolean paramters - for exampe car and bycle
 * each of this paramters is repreansted as a number, and get a true/false value
 * in some cases there is a "select all" option.
 */
const GroupCheckbox: React.FC<IProps> = observer(({ formName, colFilter, onChange }) => {
  const styleFeedback = {
    marginTop: '.25rem',
    fontSize: '80%',
    color: '#dc3545',
  };
  const { t } = useTranslation();
  const { isAllValsFalse, name, arrTypes } = colFilter;
  const onGroupChange = (aType: number, checked: boolean) => {
    // checkValid(checked)
    onChange(aType, checked);
  };
  const feedback = (
    <div style={styleFeedback}>
      {' '}
      {t('check_one_checkbox')}
    </div>
  );
  const isvalid = (isAllValsFalse) ? feedback : null;
  const list = arrTypes.map((fChecker, index) => {
    return useMemos([fChecker.checked], <Checkbox
      key={fChecker.label}
      label={fChecker.label}
      group={colFilter.name}
      id={index}
      checked={fChecker.checked}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onGroupChange(index, e.target.checked);
      }}
    />);
  });
  return (
    <div>
      <Form.Group className='checkBoxList' controlId={`${formName}.Control${name}`}>
        <div className="filterLable">
          {t(name)}:
        </div>
        {list}
        {isvalid}
      </Form.Group>
    </div>
  );
});
export default GroupCheckbox;
