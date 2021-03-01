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
