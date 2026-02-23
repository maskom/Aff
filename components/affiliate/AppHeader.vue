<template>
  <header class="app-header">
    <div class="app-header__title">
      <span class="app-header__title-highlight">Affiliate</span> Connect
    </div>
    <button class="app-header__menu-button" type="button">
      <span class="app-header__menu-icon">☰</span>
      <span class="app-header__menu-text">Login</span>
    </button>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  background: linear-gradient(135deg, #075e54, #128c7e);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.app-header__title {
  font-weight: 700;
  font-size: 1.28rem;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.app-header__title-highlight {
  color: #25d366;
}

.app-header__menu-button {
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

.app-header__menu-button:hover {
  background: rgba(255, 255, 255, 0.18);
}

.app-header__menu-icon {
  font-size: 1rem;
}

.app-header__menu-text {
  font-size: 0.85rem;
}
</style>
