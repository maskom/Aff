<template>
  <main class="campaign-list">
    <h2 class="campaign-list__title">Kampanye Unggulan</h2>
    <ul v-if="offers.length" class="campaign-list__list">
      <CampaignCard v-for="offer in offers" :key="offer.id" :offer="offer" />
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
import CampaignCard from './CampaignCard.vue'

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

.campaign-list__list {
  list-style: none;
  margin: 0;
  padding: 0;
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
