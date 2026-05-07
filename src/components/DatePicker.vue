<template>
  <div class="date-picker" v-click-outside="closePopover" @keydown.esc="closePopover">
    <input type="text" readonly :value="formattedDate" @click="openPopover" placeholder="Select a date" class="date-input" />

    <div v-if="open" class="popover">
      <div class="header">
        <button @click="prevYear" class="nav-btn" aria-label="Previous year">«</button>
        <button @click="prevMonth" class="nav-btn" aria-label="Previous month">‹</button>
        <span class="month-label">{{ monthLabel }}</span>
        <button @click="nextMonth" class="nav-btn" aria-label="Next month">›</button>
        <button @click="nextYear" class="nav-btn" aria-label="Next year">»</button>
      </div>

      <div class="weekdays">
        <span v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">
          {{ day }}
        </span>
      </div>

      <div class="grid" role="grid">
        <button
          v-for="(cell, index) in state.grid"
          :key="index"
          :class="['cell', { 'other-month': !cell.isCurrentMonth }, { today: cell.isToday }, { selected: cell.isSelected }]"
          @click="handleSelect(cell.date)"
          role="gridcell"
          :tabindex="cell.isCurrentMonth ? 0 : -1"
          @keydown.enter="handleSelect(cell.date)"
        >
          {{ cell.dayOfMonth }}
        </button>
      </div>

      <div class="footer">
        <button @click="goToToday" class="today-btn">Today</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDatePicker } from "../composables/useDatePicker";

const { state, formattedDate, monthLabel, nextMonth, prevMonth, nextYear, prevYear, selectDate, goToToday } = useDatePicker();
const open = ref(false);

const openPopover = () => {
  open.value = true;
};

const closePopover = () => {
  open.value = false;
};

const handleSelect = (date: Date) => {
  selectDate(date);
  closePopover();
};

const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    (el as any).__clickOutside = (event: Event) => {
      if (!el.contains(event.target as Node)) binding.value();
    };
    document.addEventListener("click", (el as any).__clickOutside);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener("click", (el as any).__clickOutside);
  },
};
</script>

<style scoped>
.date-picker {
  position: relative;
  display: inline-block;
  font-family: system-ui, sans-serif;
}

.date-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius);
  font-size: var(--dp-font-sm);
  background: var(--dp-bg);
  color: var(--dp-text);
  cursor: pointer;
  min-width: 140px;
}

.popover {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: var(--dp-bg);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.75rem;
  z-index: 100;
  min-width: 280px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  color: var(--dp-text);
  border-radius: calc(var(--dp-radius) / 2);
}

.nav-btn:hover {
  background: var(--dp-hover);
}

.month-label {
  font-weight: 600;
  font-size: var(--dp-font-sm);
  color: var(--dp-text);
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 0.75rem;
  color: var(--dp-muted);
  margin-bottom: 0.25rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.cell {
  aspect-ratio: 1;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: calc(var(--dp-radius) / 2);
  font-size: var(--dp-font-sm);
  color: var(--dp-text);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell:hover:not(.selected) {
  background: var(--dp-hover);
}

.cell.other-month {
  color: var(--dp-muted);
}

.cell.today {
  font-weight: 700;
  color: var(--dp-primary);
}

.cell.selected {
  background: var(--dp-primary);
  color: white;
}

.footer {
  margin-top: 0.5rem;
  text-align: center;
}

.today-btn {
  background: none;
  border: none;
  color: var(--dp-primary);
  cursor: pointer;
  font-size: var(--dp-font-sm);
  font-weight: 500;
}

.today-btn:hover {
  text-decoration: underline;
}
</style>
