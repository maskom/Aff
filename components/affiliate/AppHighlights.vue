<template>
  <section class="app-highlights">
    <div class="app-highlights__badge">Tips Hari Ini</div>
    <h1 class="app-highlights__title">Optimalkan penawaran terbaikmu</h1>
    <p class="app-highlights__text">
      Gunakan materi promosi siap pakai, atur ulang CTA sesuai audiens, dan pantau performa konversi
      untuk memaksimalkan komisi.
    </p>
    <button class="app-highlights__action" type="button">Lihat Toolkit</button>
  </section>
</template>

<style scoped>
.app-highlights {
  padding: 20px;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.15), rgba(18, 140, 126, 0.15));
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app-highlights__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(37, 211, 102, 0.14);
  color: #25d366;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.app-highlights__title {
  margin: 12px 0 8px;
  font-size: 1.35rem;
  color: #ffffff;
}

.app-highlights__text {
  margin: 0 0 16px;
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(231, 241, 237, 0.78);
}

.app-highlights__action {
  background: linear-gradient(135deg, #25d366, #128c7e);
  border: none;
  color: #0b141a;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);
}
</style>
