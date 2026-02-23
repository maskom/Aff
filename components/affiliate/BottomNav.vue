<template>
  <nav class="bottom-nav" aria-label="Menu utama">
    <button
      v-for="item in menuItems"
      :key="item.label"
      :aria-label="item.label"
      :class="['bottom-nav__item', { 'is-active': activeMenu === item.label }]"
      type="button"
      @click="$emit('update:activeMenu', item.label)"
    >
      <span class="bottom-nav__icon">{{ item.icon }}</span>
      <span class="bottom-nav__text">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/types/affiliate'

defineProps<{
  menuItems: MenuItem[]
  activeMenu: string
}>()

defineEmits<{
  'update:activeMenu': [value: string]
}>()
</script>

<style scoped>
.bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border-light);
}

.bottom-nav__item {
  background: none;
  border: none;
  color: var(--color-text-subtle);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 0.76rem;
}

.bottom-nav__item:focus-visible,
.bottom-nav__item:hover {
  color: var(--color-accent);
}

.bottom-nav__item.is-active {
  color: var(--color-accent);
}

.bottom-nav__icon {
  font-size: 1.1rem;
}

.bottom-nav__text {
  font-size: inherit;
}
</style>
