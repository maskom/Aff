<template>
  <button class="fab-button" type="button" aria-label="Tambah kampanye baru">
    ＋
  </button>
</template>

<style scoped>
.fab-button {
  position: fixed;
  right: calc(50% - 200px);
  bottom: 84px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  color: var(--color-bg);
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 26px var(--color-shadow-accent-strong);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 560px) {
  .fab-button {
    right: 20px;
  }
}
</style>
