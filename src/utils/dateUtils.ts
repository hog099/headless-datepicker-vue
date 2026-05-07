export const isSameDate = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startOfMonth = (year: number, month: number): Date =>
  new Date(year, month, 1);

export const getGridStart = (year: number, month: number): Date => {
  const first = startOfMonth(year, month);
  const day = first.getDay(); // 0 = Sunday
  return new Date(year, month, 1 - day);
};
