<template>
  <header class="header" data-testid="header">
    <div class="header__title"><span class="header__title-highlight">Affiliate</span> Connect</div>
    <button class="header__menu-button" type="button" data-testid="login-button">
      <span class="header__menu-icon">☰</span>
      <span class="header__menu-text">Login</span>
    </button>
  </header>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AffiliateHeader',
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  background: linear-gradient(135deg, var(--color-accent-darker), var(--color-accent-dark));
  border-bottom: 1px solid var(--color-border-medium);
}

.header__title {
  font-weight: 700;
  font-size: 1.28rem;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.header__title-highlight {
  color: var(--color-accent);
}

.header__menu-button {
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

.header__menu-button:hover {
  background: var(--color-overlay-lighter);
}

.header__menu-icon {
  font-size: 1rem;
}

.header__menu-text {
  font-size: 0.85rem;
}

@media (max-width: 560px) {
  .header {
    border-radius: 0;
  }
}
</style>
