<template>
  <header class="app__header">
    <div class="app__title">
      <span class="app__title-highlight">Affiliate</span> Connect
    </div>
    <button class="app__menu-button" type="button">
      <span class="app__menu-icon">☰</span>
      <span class="app__menu-text">Login</span>
    </button>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  background: linear-gradient(135deg, #075e54, #128c7e);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.app__title {
  font-weight: 700;
  font-size: 1.28rem;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.app__title-highlight {
  color: #25d366;
}

.app__menu-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.app__menu-button:hover {
  background: rgba(255, 255, 255, 0.18);
}

.app__menu-icon {
  font-size: 1rem;
}

.app__menu-text {
  font-size: 0.85rem;
}
</style>
