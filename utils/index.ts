import { IRoom } from "types/room";

export const addComma = (value: string) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const makeQueryString = (query: {
  [key: string]: string | string[] | number | number[] | null | undefined;
}) => {
  const keys = Object.keys(query);
  const values = Object.values(query);

  let queryString = "?";

  keys.forEach((key, i) => {
    if (!values[i]) return;

    // 필수 키워드 둘 이외에 0으로 들어오면 그 키는 리턴
    if (key !== "children" && key !== "infants" && values[i] === "0") return;

    if (typeof values[i] === "string") {
      queryString += `${key}=${encodeURIComponent(values[i] as string)}&`;
    } else if (typeof values[i] === "number") {
      queryString += `${key}=${encodeURIComponent(String(values[i]))}&`;
    } else {
      const arrayValue = values[i];
      if (arrayValue && typeof arrayValue !== "number") {
        for (let j = 0; j < arrayValue.length; j++) {
          queryString += `${key}=${encodeURIComponent(String(arrayValue[j]))}&`;
        }
      }
    }
  });

  return queryString.slice(0, -1);
};

export const extractKeywords = (query: {
  [key: string]: string | string[] | undefined;
}) => {
  const keywords = [
    "value",
    "latitude",
    "longitude",
    "checkIn",
    "checkOut",
    "adults",
    "children",
    "infants",
  ];
  const keys = Object.keys(query);
  const values = Object.values(query);

  const newObj: { [key: string]: string | string[] | undefined } = {};
  keys.forEach((key, i) => {
    if (!keywords.includes(key)) return;
    newObj[key] = values[i];
  });
  return newObj;
};

export const getRoomTypeText = (room: IRoom) => {
  switch (room.roomType) {
    case "entire":
      return "집 전체";
    case "private":
      return "개인실";
    case "public":
      return "다인실";
    default:
      return "";
  }
};
