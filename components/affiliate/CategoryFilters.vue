<template>
  <section class="app__filters" aria-label="Filter kategori kampanye">
    <button
      v-for="filter in filters"
      :key="filter"
      :class="['app__filter', { 'is-active': selectedFilter === filter }]"
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
.app__filters {
  display: flex;
  gap: 10px;
  padding: 12px 20px;
  background-color: #111b21;
  overflow-x: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app__filter {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(37, 211, 102, 0.28);
  background: rgba(32, 44, 51, 0.6);
  color: rgba(231, 241, 237, 0.76);
  font-weight: 600;
  font-size: 0.78rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
}

.app__filter.is-active {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.35), rgba(18, 140, 126, 0.35));
  color: #0b141a;
}
</style>
