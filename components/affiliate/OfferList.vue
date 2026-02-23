<template>
  <main class="app__content">
    <h2 class="app__section-title">Kampanye Unggulan</h2>
    <ul v-if="offers.length" class="app__list">
      <OfferCard
        v-for="offer in offers"
        :key="offer.id"
        :offer="offer"
      />
    </ul>
    <div v-else class="app__empty-state">
      <p class="app__empty-title">Tidak ada kampanye ditemukan</p>
      <p class="app__empty-text">
        Coba gunakan kata kunci lain atau pilih kategori berbeda untuk melihat rekomendasi.
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import OfferCard from './OfferCard.vue'

interface Offer {
  id: number
  brand: string
  product: string
  description: string
  category: string
  commission: string
  lastUpdate: string
  conversion: number
}

interface OfferCard extends Offer {
  brandInitials: string
}

defineProps<{
  offers: OfferCard[]
}>()
</script>

<style scoped>
.app__content {
  flex: 1;
  padding: 10px 0 72px;
  background-color: #111b21;
  overflow-y: auto;
}

.app__section-title {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(231, 241, 237, 0.58);
  margin: 0 20px 12px;
}

.app__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.app__empty-state {
  text-align: center;
  padding: 60px 20px;
  color: rgba(231, 241, 237, 0.7);
}

.app__empty-title {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 600;
}

.app__empty-text {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
}
</style>
