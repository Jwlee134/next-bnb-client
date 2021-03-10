export const extractToken = (cookie: string) => {
  // key=value; key=value => ["key=value", "key=value"]
  const cookieArray = cookie.split(/\s*;\s*/);
  const obj: { [key: string]: string } = {};
  cookieArray.forEach((data) => {
    // "key=value" => ["key": "value"]
    const pair = data.split(/\s*=\s*/);
    // ["key", "value"] => {"key": "value"}
    // value에 = 가 포함되어 있을 수도 있으므로 join("=")
    obj[pair[0]] = pair.splice(1).join("=");
  });
  return obj;
};

export const addComma = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/* export const makeQueryString = (baseUrl: string, queryObject: Object) => {
  const keys = Object.keys(queryObject);
  const values = Object.values(queryObject);
  let url = `${baseUrl}?`;
  // value값이 있을때만 url에 추가
  values.forEach((value, i) => {
    if (value) {
      url += `${keys[i]}=${value}&`;
    }
  });
  // 마지막 & 제거
  const query = url.slice(0, -1);
  return query;
}; */
