<template>
  <section class="search-bar">
    <input
      :value="modelValue"
      class="search-bar__input"
      placeholder="Cari produk komisi tinggi atau kata kunci kampanye..."
      type="search"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.search-bar {
  padding: 12px 20px 6px;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
}

.search-bar__input {
  width: 100%;
  background-color: var(--color-surface-elevated);
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  color: var(--color-text);
  font-size: 0.92rem;
  outline: none;
  box-shadow: inset 0 2px 4px var(--color-shadow);
}

.search-bar__input::placeholder {
  color: var(--color-text-faint);
}
</style>
