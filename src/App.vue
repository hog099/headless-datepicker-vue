<template>
  <div class="app">
    <h1>Headless Date Picker</h1>
    <DatePicker />
  </div>
</template>

<script setup lang="ts">
import DatePicker from "./components/DatePicker.vue";
</script>

<style>
:root {
  --dp-primary: #3b82f6;
  --dp-bg: #ffffff;
  --dp-border: #e5e7eb;
  --dp-text: #1f2937;
  --dp-muted: #9ca3af;
  --dp-hover: #f3f4f6;
  --dp-radius: 8px;
  --dp-font-sm: 0.875rem;
}

body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background: #f9fafb;
  padding: 2rem;
}

.app {
  max-width: 400px;
  margin: 0 auto;
}
</style>
