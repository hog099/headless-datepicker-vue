<template>
  <div class="date-picker" v-click-outside="closePopover" @keydown.esc="closePopover">
    <input type="text" readonly :value="formattedDate" @click="openPopover" placeholder="Select a date" class="date-input" />

    <div v-if="open" class="popover">
      <div class="header">
        <button type="button" @click="prevYear" class="nav-btn" aria-label="Previous year" title="Previous year">
          <img class="nav-icon" :src="chevronsLeftIcon" alt="" aria-hidden="true" />
        </button>
        <button type="button" @click="prevMonth" class="nav-btn" aria-label="Previous month" title="Previous month">
          <img class="nav-icon" :src="chevronLeftIcon" alt="" aria-hidden="true" />
        </button>
        <span class="month-label">{{ monthLabel }}</span>
        <button type="button" @click="nextMonth" class="nav-btn" aria-label="Next month" title="Next month">
          <img class="nav-icon" :src="chevronRightIcon" alt="" aria-hidden="true" />
        </button>
        <button type="button" @click="nextYear" class="nav-btn" aria-label="Next year" title="Next year">
          <img class="nav-icon" :src="chevronsRightIcon" alt="" aria-hidden="true" />
        </button>
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
          type="button"
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
        <button type="button" @click="goToToday" class="today-btn">Today</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDatePicker } from "../composables/useDatePicker";

const chevronLeftIcon = new URL("../assets/icons/chevron-left.svg", import.meta.url).href;
const chevronRightIcon = new URL("../assets/icons/chevron-right.svg", import.meta.url).href;
const chevronsLeftIcon = new URL("../assets/icons/chevrons-left.svg", import.meta.url).href;
const chevronsRightIcon = new URL("../assets/icons/chevrons-right.svg", import.meta.url).href;

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

.date-input:focus {
  border-color: var(--dp-primary);
  outline: 2px solid color-mix(in srgb, var(--dp-primary) 30%, transparent);
  outline-offset: 2px;
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
  padding: 0.25rem;
  color: var(--dp-text);
  border-radius: calc(var(--dp-radius) / 2);
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: var(--dp-hover);
}

.nav-icon {
  width: 1rem;
  height: 1rem;
  display: block;
  pointer-events: none;
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
