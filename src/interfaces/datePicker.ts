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
