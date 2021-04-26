import { IRoom } from "types/room";

export const enterKey = (
  e: React.KeyboardEvent<HTMLDivElement | HTMLLIElement | HTMLSpanElement>
) => e.key === "Enter";

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
    if (!values[i] && key !== "children" && key !== "infants") return;
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

  const newObj: { [key: string]: string | string[] | number | undefined } = {};
  keys.forEach((key, i) => {
    if (!keywords.includes(key)) return;
    if (key === "value" || key === "checkIn" || key === "checkOut") {
      newObj[key] = values[i];
    } else {
      newObj[key] = Number(values[i]);
    }
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
