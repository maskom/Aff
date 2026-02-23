<template>
  <main class="offer-list" data-testid="main-content">
    <h2 class="offer-list__title">Kampanye Unggulan</h2>
    <ul v-if="offers.length" class="offer-list__list" data-testid="offers-list">
      <li
        v-for="offer in offers"
        :key="offer.id"
        class="offer-list__item"
        :data-testid="`offer-${offer.id}`"
      >
        <div class="offer-list__avatar" :aria-label="`Avatar ${offer.brand}`">
          {{ offer.brandInitials }}
        </div>
        <div class="offer-list__body">
          <div class="offer-list__header">
            <div>
              <p class="offer-list__brand">{{ offer.brand }}</p>
              <p class="offer-list__product">{{ offer.product }}</p>
            </div>
            <span class="offer-list__earnings">{{ offer.commission }}</span>
          </div>
          <p class="offer-list__description">{{ offer.description }}</p>
          <div class="offer-list__meta">
            <span class="offer-list__tag">{{ offer.category }}</span>
            <span class="offer-list__separator">•</span>
            <span class="offer-list__meta-text">Update {{ offer.lastUpdate }}</span>
            <span class="offer-list__separator">•</span>
            <span class="offer-list__meta-text">Konversi {{ offer.conversion }}%</span>
          </div>
        </div>
        <button class="offer-list__cta" type="button" :data-testid="`cta-${offer.id}`">
          Promosikan
        </button>
      </li>
    </ul>
    <div v-else class="offer-list__empty" data-testid="empty-state">
      <p class="offer-list__empty-title">Tidak ada kampanye ditemukan</p>
      <p class="offer-list__empty-text">
        Coba gunakan kata kunci lain atau pilih kategori berbeda untuk melihat rekomendasi.
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { OfferCard } from '~/types';

defineProps<{
  offers: OfferCard[];
}>();

defineEmits<{
  promote: [offer: OfferCard];
}>();

defineOptions({
  name: 'AffiliateOfferList',
});
</script>

<style scoped>
.offer-list {
  flex: 1;
  padding: 10px 0 72px;
  background-color: var(--color-surface);
  overflow-y: auto;
}

.offer-list__title {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-ghost);
  margin: 0 20px 12px;
}

.offer-list__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.offer-list__item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color 0.2s ease;
}

.offer-list__item:hover {
  background-color: var(--color-overlay-surface);
}

.offer-list__avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-accent-avatar-start),
    var(--color-accent-avatar-end)
  );
  color: var(--color-accent);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.offer-list__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.offer-list__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.offer-list__brand {
  font-size: 0.98rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.offer-list__product {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: var(--color-text-subtle);
}

.offer-list__earnings {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
}

.offer-list__description {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.offer-list__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--color-text-weak);
}

.offer-list__tag {
  padding: 4px 8px;
  background-color: var(--color-overlay-surface-strong);
  border-radius: 999px;
  color: var(--color-text-subtle);
  font-weight: 600;
}

.offer-list__separator {
  color: rgba(231, 241, 237, 0.3);
}

.offer-list__meta-text {
  white-space: nowrap;
}

.offer-list__cta {
  background: none;
  border: 1px solid var(--color-border-accent-faint);
  color: var(--color-accent);
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.offer-list__cta:hover {
  background: var(--color-accent-overlay-soft);
}

.offer-list__empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-subtle);
}

.offer-list__empty-title {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 600;
}

.offer-list__empty-text {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
}
</style>
