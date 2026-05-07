import type { CalendarState, DayCell } from "../interfaces/datePicker";
import { getGridStart, isSameDate } from "../utils/dateUtils";

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
      isToday: isSameDate(date, today),
      isSelected: selectedDate ? isSameDate(date, selectedDate) : false,
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

    nextMonth: () => {
      state.viewDate.setMonth(state.viewDate.getMonth() + 1);
      state.currentMonth = state.viewDate.getMonth();
      state.currentYear = state.viewDate.getFullYear();
      refresh();
    },

    prevMonth: () => {
      state.viewDate.setMonth(state.viewDate.getMonth() - 1);
      state.currentMonth = state.viewDate.getMonth();
      state.currentYear = state.viewDate.getFullYear();
      refresh();
    },

    nextYear: () => {
      state.viewDate.setFullYear(state.viewDate.getFullYear() + 1);
      state.currentYear = state.viewDate.getFullYear();
      refresh();
    },

    prevYear: () => {
      state.viewDate.setFullYear(state.viewDate.getFullYear() - 1);
      state.currentYear = state.viewDate.getFullYear();
      refresh();
    },

    selectDate: (date: Date) => {
      state.selectedDate = new Date(date);
      console.log("Selected date:", state.selectedDate);
      refresh();
    },

    goToToday: () => {
      const now = new Date();
      state.viewDate = new Date(now.getFullYear(), now.getMonth(), 1);
      state.currentMonth = now.getMonth();
      state.currentYear = now.getFullYear();
      refresh();
    },
  };
};
