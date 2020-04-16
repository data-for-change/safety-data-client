import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
// @ts-ignore
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { CasualtiesSumLabel } from '../atoms/CasualtiesSumLabel';
import { useStore } from '../../stores/storeConfig';

const getColumnsByWidth = (width: number, t: any) => {
  const columns1 = [{
    dataField: '_id',
    text: 'ID',
    hidden: true,
  }, {
    dataField: 'accident_year',
    text: t('Year'),
    sort: true,
  }, {
    dataField: 'injury_severity_hebrew',
    text: t('Severity'),
    sort: true,
  }, {
    dataField: 'injured_type_hebrew',
    text: t('TypeInjured'),
    sort: true,
  }];
  const colCity = {
    dataField: 'accident_yishuv_name',
    text: t('City'),
    sort: true,
  };
  const colStreet = {
    dataField: 'street1_hebrew',
    text: t('Street'),
    sort: true,
  };
  const columns3 = [{
    dataField: 'vehicle_vehicle_type_hebrew',
    text: t('Vehicle'),
    sort: true,
  }, {
    dataField: 'accident_type_hebrew',
    text: t('AccidentType'),
    sort: true,
  }];
  const columns4 = [{
    dataField: 'age_group_hebrew',
    text: t('Age'),
    sort: true,
  }, {
    dataField: 'sex_hebrew',
    text: t('Gender'),
    sort: true,
  }];

  let columns = columns1;
  if (width > 500) columns.splice(2, 0, colCity);
  if (width > 700) columns.splice(3, 0, colStreet);
  if (width > 900) columns = columns.concat(columns3);
  columns = columns.concat(columns4);
  return columns;
};

interface IProps { }
const AccidentsTable: React.FC<IProps> = observer(() => {
  const { filterStore } = useStore();
  const { t } = useTranslation();
  const divStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const reactMarkers = toJS(filterStore.dataAllInjuries);
  const { ExportCSVButton } = CSVExport;
  const [columns, setColumns] = useState(getColumnsByWidth(window.innerWidth, t));
  React.useEffect(() => {
    function handleResize() {
      const cols = getColumnsByWidth(window.innerWidth, t);
      setColumns(cols);
    }
    window.addEventListener('resize', handleResize);
    return (() => { window.removeEventListener('resize', handleResize); });
  });
  if (reactMarkers.length > 0) {
    return (
      <div>
        <CasualtiesSumLabel length={reactMarkers.length} name={filterStore.cityResult} />
        <ToolkitProvider
          keyField="id"
          data={reactMarkers}
          columns={columns}
          exportCSV
        >
          {
                    (props: any) => (
                      <div>
                        <BootstrapTable {...props.baseProps} pagination={paginationFactory()} headerClasses="table-header" />
                        <hr />
                        <div style={divStyle}>
                          <ExportCSVButton className="button-sm" {...props.csvProps}>{t('export-to-csv')}</ExportCSVButton>
                        </div>
                      </div>
                    )
                }
        </ToolkitProvider>
      </div>
    );
  }
  return (
    <CasualtiesSumLabel length={reactMarkers.length} name={filterStore.cityResult} />
  );
});
export default AccidentsTable;
