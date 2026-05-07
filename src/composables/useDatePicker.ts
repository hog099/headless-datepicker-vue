
import { reactive, computed } from 'vue';
import { createEngine } from '../engine/dateEngine';
import type { CalendarState } from '@/interfaces/datePicker';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export function useDatePicker() {
    const engine = createEngine();
    const state = reactive<CalendarState>(engine.getState());

    const sync = () => {
        const fresh = engine.getState();
        state.grid = fresh.grid;
        state.currentMonth = fresh.currentMonth;
        state.currentYear = fresh.currentYear;
        state.selectedDate = fresh.selectedDate;
        state.viewDate = fresh.viewDate;
    };

    const formattedDate = computed(() => {
        if (!state.selectedDate) return '';
        const d = state.selectedDate;
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    });

    const monthLabel = computed(() => {
        return `${MONTH_NAMES[state.currentMonth]} ${state.currentYear}`;
    });

    return {
        state,
        formattedDate,
        monthLabel,
        nextMonth: () => { engine.nextMonth(); sync(); },
        prevMonth: () => { engine.prevMonth(); sync(); },
        nextYear: () => { engine.nextYear(); sync(); },
        prevYear: () => { engine.prevYear(); sync(); },
        selectDate: (date: Date) => { engine.selectDate(date); sync(); },
        goToToday: () => { engine.goToToday(); sync(); },
    };
}