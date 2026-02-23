<template>
  <nav class="bottom-nav" aria-label="Menu utama" data-testid="bottom-nav">
    <button
      v-for="item in items"
      :key="item.label"
      :aria-label="item.label"
      :class="['bottom-nav__item', { 'is-active': activeItem === item.label }]"
      type="button"
      :data-testid="`nav-${item.label.toLowerCase()}`"
      @click="$emit('update:activeItem', item.label)"
    >
      <span class="bottom-nav__icon">{{ item.icon }}</span>
      <span class="bottom-nav__text">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string;
  icon: string;
}

defineProps<{
  items: MenuItem[];
  activeItem: string;
}>();

defineEmits<{
  'update:activeItem': [value: string];
}>();
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

.bottom-nav__item:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -2px;
  border-radius: 4px;
}

.bottom-nav__icon {
  font-size: 1.1rem;
}
</style>
