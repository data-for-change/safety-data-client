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