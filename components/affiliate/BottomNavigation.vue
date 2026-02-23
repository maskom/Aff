<template>
  <nav class="app__bottom-nav" aria-label="Menu utama">
    <button
      v-for="item in menuItems"
      :key="item.label"
      :aria-label="item.label"
      :class="['app__bottom-nav-item', { 'is-active': activeMenu === item.label }]"
      type="button"
      @click="$emit('update:activeMenu', item.label)"
    >
      <span class="app__bottom-nav-icon">{{ item.icon }}</span>
      <span class="app__bottom-nav-text">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string
  icon: string
}

defineProps<{
  menuItems: MenuItem[]
  activeMenu: string
}>()

defineEmits<{
  'update:activeMenu': [value: string]
}>()
</script>

<style scoped>
.app__bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #202c33;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.app__bottom-nav-item {
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

.app__bottom-nav-item:focus-visible,
.app__bottom-nav-item:hover {
  color: #25d366;
}

.app__bottom-nav-item.is-active {
  color: #25d366;
}

.app__bottom-nav-icon {
  font-size: 1.1rem;
}
</style>
