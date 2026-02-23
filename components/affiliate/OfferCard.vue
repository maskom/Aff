<template>
  <li class="app__list-item">
    <div class="app__avatar" :aria-label="`Avatar ${offer.brand}`">
      {{ offer.brandInitials }}
    </div>
    <div class="app__item-body">
      <div class="app__item-header">
        <div>
          <p class="app__brand">{{ offer.brand }}</p>
          <p class="app__product">{{ offer.product }}</p>
        </div>
        <span class="app__earnings">{{ offer.commission }}</span>
      </div>
      <p class="app__description">{{ offer.description }}</p>
      <div class="app__meta">
        <span class="app__tag">{{ offer.category }}</span>
        <span class="app__meta-separator">•</span>
        <span class="app__meta-text">Update {{ offer.lastUpdate }}</span>
        <span class="app__meta-separator">•</span>
        <span class="app__meta-text">Konversi {{ offer.conversion }}%</span>
      </div>
    </div>
    <button class="app__cta" type="button">Promosikan</button>
  </li>
</template>

<script setup lang="ts">
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
  offer: OfferCard
}>()
</script>

<style scoped>
.app__list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background-color 0.2s ease;
}

.app__list-item:hover {
  background-color: rgba(32, 44, 51, 0.6);
}

.app__avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.2), rgba(37, 211, 102, 0.45));
  color: #25d366;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app__item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.app__item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.app__brand {
  font-size: 0.98rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.app__product {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: rgba(231, 241, 237, 0.7);
}

.app__earnings {
  color: #25d366;
  font-weight: 700;
  font-size: 0.85rem;
}

.app__description {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.45;
  color: rgba(231, 241, 237, 0.68);
}

.app__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: rgba(231, 241, 237, 0.5);
}

.app__tag {
  padding: 4px 8px;
  background-color: rgba(32, 44, 51, 0.8);
  border-radius: 999px;
  color: rgba(231, 241, 237, 0.76);
  font-weight: 600;
}

.app__meta-separator {
  color: rgba(231, 241, 237, 0.3);
}

.app__meta-text {
  white-space: nowrap;
}

.app__cta {
  background: none;
  border: 1px solid rgba(37, 211, 102, 0.5);
  color: #25d366;
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.app__cta:hover {
  background: rgba(37, 211, 102, 0.12);
}
</style>
