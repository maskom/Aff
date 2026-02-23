<template>
  <button class="app-fab" type="button" aria-label="Tambah kampanye baru">＋</button>
</template>

<style scoped>
.app-fab {
  position: fixed;
  right: calc(50% - 200px);
  bottom: 84px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #0b141a;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(18, 140, 126, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 560px) {
  .app-fab {
    right: 20px;
  }
}
</style>
