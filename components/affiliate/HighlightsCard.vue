<template>
  <section class="app__highlights">
    <div class="app__highlights-badge">Tips Hari Ini</div>
    <h1 class="app__highlights-title">Optimalkan penawaran terbaikmu</h1>
    <p class="app__highlights-text">
      Gunakan materi promosi siap pakai, atur ulang CTA sesuai audiens, dan pantau
      performa konversi untuk memaksimalkan komisi.
    </p>
    <button class="app__highlights-action" type="button">Lihat Toolkit</button>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app__highlights {
  padding: 20px;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.15), rgba(18, 140, 126, 0.15));
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app__highlights-badge {
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

.app__highlights-title {
  margin: 12px 0 8px;
  font-size: 1.35rem;
  color: #ffffff;
}

.app__highlights-text {
  margin: 0 0 16px;
  font-size: 0.92rem;
  line-height: 1.5;
  color: rgba(231, 241, 237, 0.78);
}

.app__highlights-action {
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
