<template>
  <li class="offer-card">
    <div class="offer-card__avatar" :aria-label="`Avatar ${offer.brand}`">
      {{ offer.brandInitials }}
    </div>
    <div class="offer-card__body">
      <div class="offer-card__header">
        <div>
          <p class="offer-card__brand">
            {{ offer.brand }}
          </p>
          <p class="offer-card__product">
            {{ offer.product }}
          </p>
        </div>
        <span class="offer-card__earnings">{{ offer.commission }}</span>
      </div>
      <p class="offer-card__description">
        {{ offer.description }}
      </p>
      <div class="offer-card__meta">
        <span class="offer-card__tag">{{ offer.category }}</span>
        <span class="offer-card__separator">•</span>
        <span class="offer-card__meta-text">Update {{ offer.lastUpdate }}</span>
        <span class="offer-card__separator">•</span>
        <span class="offer-card__meta-text">Konversi {{ offer.conversion }}%</span>
      </div>
    </div>
    <button class="offer-card__cta" type="button">Promosikan</button>
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
  brandInitials: string
}

defineProps<{ offer: Offer }>()
</script>

<style scoped>
.offer-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background-color 0.2s ease;
}

.offer-card:hover {
  background-color: rgba(32, 44, 51, 0.6);
}

.offer-card__avatar {
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

.offer-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.offer-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.offer-card__brand {
  font-size: 0.98rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.offer-card__product {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: rgba(231, 241, 237, 0.7);
}

.offer-card__earnings {
  color: #25d366;
  font-weight: 700;
  font-size: 0.85rem;
}

.offer-card__description {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.45;
  color: rgba(231, 241, 237, 0.68);
}

.offer-card__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: rgba(231, 241, 237, 0.5);
}

.offer-card__tag {
  padding: 4px 8px;
  background-color: rgba(32, 44, 51, 0.8);
  border-radius: 999px;
  color: rgba(231, 241, 237, 0.76);
  font-weight: 600;
}

.offer-card__separator {
  color: rgba(231, 241, 237, 0.3);
}

.offer-card__meta-text {
  white-space: nowrap;
}

.offer-card__cta {
  background: none;
  border: 1px solid rgba(37, 211, 102, 0.5);
  color: #25d366;
  border-radius: 999px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.offer-card__cta:hover {
  background: rgba(37, 211, 102, 0.12);
}
</style>
