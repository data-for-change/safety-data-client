import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import { useStore } from '../../stores/storeConfig';
import SmallCard2 from '../atoms/SmallCard2';

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

type InjuredPerson = {
  _id: string;
  accident_year: string;
  injury_severity_hebrew: string;
  injured_type_hebrew: string;
  accident_yishuv_name: string;
  street1_hebrew: string;
  vehicle_vehicle_type_hebrew: string;
  accident_type_hebrew: string;
  age_group_hebrew: string;
  sex_hebrew: string;
};

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>();
const columnHelper1 = createColumnHelper<InjuredPerson>();

const columns = [
  columnHelper1.accessor('_id', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('accident_year', {
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Accident Year</span>,
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('injury_severity_hebrew', {
    header: () => 'Injury Severity',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('injured_type_hebrew', {
    header: () => <span>Injured Type</span>,
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('accident_yishuv_name', {
    header: 'Yishuv Name',
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('street1_hebrew', {
    header: 'Street',
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('vehicle_vehicle_type_hebrew', {
    header: 'Vehicle Type',
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('accident_type_hebrew', {
    header: 'Accident Type',
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('age_group_hebrew', {
    header: 'Age Group',
    footer: info => info.column.id,
  }),
  columnHelper1.accessor('sex_hebrew', {
    header: 'Sex',
    footer: info => info.column.id,
  }),
];

const columns2 = [
  columnHelper.accessor('firstName', {
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
    footer: info => info.column.id,
  }),
]

interface IProps { }
// const AccidentsTable: React.FC<IProps> = observer(() => {
//   const { filterStore } = useStore();
//   const { t } = useTranslation();
//   const divStyle = {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     marginBottom: '1rem'
//   };
//   const reactMarkers = toJS(filterStore.dataAllInjuries);
//   //const { ExportCSVButton } = CSVExport;
//   const [columns, setColumns] = useState(getColumnsByWidth(window.innerWidth, t));
//   React.useEffect(() => {
//     function handleResize() {
//       const cols = getColumnsByWidth(window.innerWidth, t);
//       setColumns(cols);
//     }
//     window.addEventListener('resize', handleResize);
//     return (() => { window.removeEventListener('resize', handleResize); });
//   });

//   // console.log(reactMarkers, filterStore.cityResult)
//   if (reactMarkers.length > 0) {
//     return (
//       <div>
//         <SmallCard2>
//           <ToolkitProvider
//             keyField="_id"
//             data={reactMarkers}
//             columns={columns}
//             exportCSV>
//             {(props: any) => (
//               <div>
//                 <div style={divStyle}>
//                   <ExportCSVButton
//                     className="button-sm" {...props.csvProps}>
//                     {t('export-to-csv')}
//                   </ExportCSVButton>
//                 </div>
//                 <BootstrapTable
//                   pagination={paginationFactory()}
//                   {...props.baseProps}
//                   headerClasses="table-header"
//                 />
//                 {/* <hr /> */}
//               </div>)}
//           </ToolkitProvider>
//         </SmallCard2>
//       </div>
//     );
//   }
//   return null
// });
const AccidentsTable: React.FC<IProps> = observer(() => {
  const { filterStore } = useStore();
  const reactMarkers = toJS(filterStore.dataAllInjuries);
  //@ts-ignore
  const defaultDAta2 = reactMarkers as InjuredPerson[];
  if (reactMarkers.length >0){
    const test = defaultDAta2;
  }
  const [data, _setData] = React.useState(() => [...defaultDAta2]);
  const [data1, _setData1] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
});
export default AccidentsTable;