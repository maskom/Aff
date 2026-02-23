<template>
  <section class="app__search">
    <input
      :value="modelValue"
      class="app__search-input"
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
.app__search {
  padding: 12px 20px 6px;
  background-color: #111b21;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app__search-input {
  width: 100%;
  background-color: #202c33;
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  color: #e7f1ed;
  font-size: 0.92rem;
  outline: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app__search-input::placeholder {
  color: rgba(231, 241, 237, 0.6);
}
</style>
