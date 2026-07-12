export interface IColumnFilterCombo {
  name: string;
  queryColName: string;
  // data for combo
  arrTypes: any[];
  // value to be sent as query to server
  queryValue: string | number;
  // special value, if selected no filter is needed
  allTypesOption: number;
  isEmpty: () => boolean;
  setBrowserQueryString: (param: URLSearchParams, delIfEmpthy?: boolean) => void;
  setValuesByQuery: (param: URLSearchParams) => void;
  setFilter: (value: string | number) => void;
  getFilter: () => string;
  // text is updated after filter submit
  text: string;
  setText: () => void;
}
