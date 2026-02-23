<template>
  <main class="campaign-list">
    <h2 class="campaign-list__title">Kampanye Unggulan</h2>
    <ul v-if="offers.length" class="campaign-list__items">
      <li
        v-for="offer in offers"
        :key="offer.id"
        class="campaign-list__item"
      >
        <div class="campaign-list__avatar" :aria-label="`Avatar ${offer.brand}`">
          {{ offer.brandInitials }}
        </div>
        <div class="campaign-list__body">
          <div class="campaign-list__header">
            <div>
              <p class="campaign-list__brand">{{ offer.brand }}</p>
              <p class="campaign-list__product">{{ offer.product }}</p>
            </div>
            <span class="campaign-list__earnings">{{ offer.commission }}</span>
          </div>
          <p class="campaign-list__description">{{ offer.description }}</p>
          <div class="campaign-list__meta">
            <span class="campaign-list__tag">{{ offer.category }}</span>
            <span class="campaign-list__separator">•</span>
            <span class="campaign-list__meta-text">Update {{ offer.lastUpdate }}</span>
            <span class="campaign-list__separator">•</span>
            <span class="campaign-list__meta-text">Konversi {{ offer.conversion }}%</span>
          </div>
        </div>
        <button class="campaign-list__cta" type="button">Promosikan</button>
      </li>
    </ul>
    <div v-else class="campaign-list__empty">
      <p class="campaign-list__empty-title">Tidak ada kampanye ditemukan</p>
      <p class="campaign-list__empty-text">
        Coba gunakan kata kunci lain atau pilih kategori berbeda untuk melihat rekomendasi.
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { OfferCard } from '~/types/affiliate'

defineProps<{
  offers: OfferCard[]
}>()
</script>

<style scoped>
.campaign-list {
  flex: 1;
  padding: 10px 0 72px;
  background-color: var(--color-surface);
  overflow-y: auto;
}

.campaign-list__title {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-ghost);
  margin: 0 20px 12px;
}

.campaign-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.campaign-list__item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color 0.2s ease;
}

.campaign-list__item:hover {
  background-color: var(--color-overlay-surface);
}

.campaign-list__avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-avatar-start), var(--color-accent-avatar-end));
  color: var(--color-accent);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.campaign-list__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.campaign-list__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.campaign-list__brand {
  font-size: 0.98rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.campaign-list__product {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: var(--color-text-subtle);
}

.campaign-list__earnings {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
}

.campaign-list__description {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.campaign-list__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--color-text-weak);
}

.campaign-list__tag {
  padding: 4px 8px;
  background-color: var(--color-overlay-surface-strong);
  border-radius: 999px;
  color: var(--color-text-subtle);
  font-weight: 600;
}

.campaign-list__separator {
  color: rgba(231, 241, 237, 0.3);
}

.campaign-list__meta-text {
  white-space: nowrap;
}

.campaign-list__cta {
  background: none;
  border: 1px solid var(--color-border-accent-faint);
  color: var(--color-accent);
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.campaign-list__cta:hover {
  background: var(--color-accent-overlay-soft);
}

.campaign-list__empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-subtle);
}

.campaign-list__empty-title {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 600;
}

.campaign-list__empty-text {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
}
</style>
