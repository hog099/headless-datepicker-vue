export interface DayCell {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export interface CalendarState {
  grid: DayCell[];
  currentMonth: number;
  currentYear: number;
  selectedDate: Date | null;
  viewDate: Date;
}

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfMonth = (year: number, month: number): Date =>
  new Date(year, month, 1);

const getGridStart = (year: number, month: number): Date => {
  const first = startOfMonth(year, month);
  const day = first.getDay(); // 0 = Sunday
  return new Date(year, month, 1 - day);
};

export const generateGrid = (
  year: number,
  month: number,
  selectedDate: Date | null,
  today: Date
): DayCell[] => {
  const start = getGridStart(year, month);
  const cells: DayCell[] = [];

  for (let i = 0; i < 42; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    cells.push({
      date,
      dayOfMonth: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
    });
  }

  return cells;
};

export const createEngine = (initialDate: Date = new Date()) => {
  const today = new Date(); // format date here is: Thu May 07 2026 14:34:44 GMT-0300 (Horário Padrão de Brasília)
  let state: CalendarState = {
    grid: generateGrid(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      null,
      today
    ),
    currentMonth: initialDate.getMonth(),
    currentYear: initialDate.getFullYear(),
    selectedDate: null,
    viewDate: new Date(initialDate.getFullYear(), initialDate.getMonth(), 1),
  };

  const refresh = () => {
    state.grid = generateGrid(
      state.currentYear,
      state.currentMonth,
      state.selectedDate,
      today
    );
  };

  return {
    getState: (): CalendarState => state,
  };
};