 /**
* set the QueryString of the browser by name and vlaue
*/
export const setBrowserQueryString = (name: string, val: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, val);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}
export const delBrowserQueryString = (name: string,) => {
  const params = new URLSearchParams(window.location.search);
  params.delete(name);
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

// get array of values by url query parmas
export function getQueryParamValues(
  query: URLSearchParams,
  key: string,
  defVal?: string,
  isMultiple: boolean = false
): string[] {
  let res = defVal ? [defVal] : [];
  const value = query.get(key);
  
  if (value !== null) {
    const arr = value.split(',');
    res = (arr.length > 1 && isMultiple) ? arr : [value];
  }
  return res;
}