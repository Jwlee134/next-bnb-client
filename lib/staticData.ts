export const months = Array.from({ length: 12 }, (_, i) => i + 1).map(
  (month) => `${month}월`
);

export const days = Array.from({ length: 31 }, (_, i) => i + 1).map(
  (day) => `${day}일`
);

export const years = Array.from(Array(122), (_, i) => 2021 - i).map(
  (year) => `${year}년`
);
