 /**
* set the QueryString of the browser by name and vlaue
*/
export const setBrowserQueryString = (name: string, val: string) => {
  const params = new URLSearchParams(location.search);
  params.set(name, val);
  window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
}
export const delBrowserQueryString = (name: string,) => {
  const params = new URLSearchParams(location.search);
  params.delete(name);
  window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
}