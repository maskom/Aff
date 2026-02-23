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
  background: linear-gradient(135deg, var(--color-accent-darker), var(--color-accent-dark));
  border-bottom: 1px solid var(--color-border-medium);
}

.app-header__title {
  font-weight: 700;
  font-size: 1.28rem;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.app-header__title-highlight {
  color: var(--color-accent);
}

.app-header__menu-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-overlay-light);
  border: none;
  color: #ffffff;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.app-header__menu-button:hover {
  background: var(--color-overlay-lighter);
}

.app-header__menu-icon {
  font-size: 1rem;
}

.app-header__menu-text {
  font-size: 0.85rem;
}
</style>
