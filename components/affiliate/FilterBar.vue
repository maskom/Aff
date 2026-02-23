<template>
  <section class="filter-bar" aria-label="Filter kategori kampanye">
    <button
      v-for="filter in filters"
      :key="filter"
      :class="['filter-bar__filter', { 'is-active': selectedFilter === filter }]"
      type="button"
      @click="$emit('update:selectedFilter', filter)"
    >
      {{ filter }}
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  filters: string[]
  selectedFilter: string
}>()

defineEmits<{
  'update:selectedFilter': [value: string]
}>()
</script>

<style scoped>
.filter-bar {
  display: flex;
  gap: 10px;
  padding: 12px 20px;
  background-color: var(--color-surface);
  overflow-x: auto;
  border-bottom: 1px solid var(--color-border-subtle);
}

.filter-bar__filter {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border-accent-soft);
  background: var(--color-overlay-surface);
  color: var(--color-text-subtle);
  font-weight: 600;
  font-size: 0.78rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
}

.filter-bar__filter.is-active {
  background: linear-gradient(135deg, var(--color-accent-overlay-strong), var(--color-accent-overlay-dark-strong));
  color: var(--color-bg);
}
</style>
