export const getQueryParam = (key) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  console.log(r)
  if (r != null) {
      return decodeURI(r[2]);
  }
  return null;
}
