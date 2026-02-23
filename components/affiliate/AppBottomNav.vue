<template>
  <nav class="app-bottom-nav" aria-label="Menu utama">
    <button
      v-for="item in menuItems"
      :key="item.label"
      :aria-label="item.label"
      :class="['app-bottom-nav__item', { 'is-active': activeMenu === item.label }]"
      type="button"
      @click="$emit('update:activeMenu', item.label)"
    >
      <span class="app-bottom-nav__icon">{{ item.icon }}</span>
      <span class="app-bottom-nav__text">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string
  icon: string
}

defineProps<{ menuItems: MenuItem[]; activeMenu: string }>()
defineEmits<{ 'update:activeMenu': [value: string] }>()
</script>

<style scoped>
.app-bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #202c33;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.app-bottom-nav__item {
  background: none;
  border: none;
  color: rgba(231, 241, 237, 0.7);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 0.76rem;
}

.app-bottom-nav__item:focus-visible,
.app-bottom-nav__item:hover {
  color: #25d366;
}

.app-bottom-nav__item.is-active {
  color: #25d366;
}

.app-bottom-nav__icon {
  font-size: 1.1rem;
}

.app-bottom-nav__text {
  font-size: 0.76rem;
}
</style>
