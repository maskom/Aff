<template>
  <div class="app">
    <AffiliateAppHeader />
    <AffiliateSearchBar v-model="search" />
    <AffiliateHighlightsSection />
    <AffiliatePerformanceStories :stories="stories" />
    <AffiliateCategoryFilters
      :filters="filters"
      v-model:selected-filter="selectedFilter"
    />
    <AffiliateCampaignList :offers="filteredOffers" />
    <AffiliateBottomNav
      :items="bottomMenu"
      v-model:active-item="activeMenu"
    />
    <AffiliateFabButton />
  </div>
</template>

<script setup lang="ts">
import type { OfferCard } from '~/types/affiliate'

const { offers, bottomMenu, stories } = useAffiliateData()

const search = ref('')
const activeMenu = ref(bottomMenu[0].label)
const selectedFilter = ref('Semua')

const filters = computed(() => {
  const categories = new Set(offers.value.map((offer) => offer.category))
  return ['Semua', ...categories]
})

const offersWithInitials = computed<OfferCard[]>(() =>
  offers.value.map((offer) => ({
    ...offer,
    brandInitials: getInitials(offer.brand),
  })),
)

const filteredOffers = computed<OfferCard[]>(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) {
    return offersWithInitials.value.filter((offer) =>
      selectedFilter.value === 'Semua' ? true : offer.category === selectedFilter.value,
    )
  }

  return offersWithInitials.value.filter((offer) => {
    const matchesKeyword =
      offer.brand.toLowerCase().includes(keyword) ||
      offer.product.toLowerCase().includes(keyword) ||
      offer.category.toLowerCase().includes(keyword) ||
      offer.description.toLowerCase().includes(keyword)

    const matchesFilter =
      selectedFilter.value === 'Semua' || offer.category === selectedFilter.value

    return matchesKeyword && matchesFilter
  })
})

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<style scoped>
:global(:root) {
  --color-bg: #0b141a;
  --color-surface: #111b21;
  --color-surface-elevated: #202c33;
  --color-accent: #25d366;
  --color-accent-dark: #128c7e;
  --color-accent-darker: #075e54;
  --color-text: #e7f1ed;
  --color-text-muted: rgba(231, 241, 237, 0.78);
  --color-text-subtle: rgba(231, 241, 237, 0.7);
  --color-text-faint: rgba(231, 241, 237, 0.6);
  --color-text-weak: rgba(231, 241, 237, 0.5);
  --color-text-ghost: rgba(231, 241, 237, 0.58);
  --color-border: rgba(255, 255, 255, 0.05);
  --color-border-subtle: rgba(255, 255, 255, 0.04);
  --color-border-light: rgba(255, 255, 255, 0.08);
  --color-border-medium: rgba(255, 255, 255, 0.12);
  --color-border-accent: rgba(37, 211, 102, 0.22);
  --color-border-accent-soft: rgba(37, 211, 102, 0.28);
  --color-border-accent-faint: rgba(37, 211, 102, 0.5);
  --color-negative: #f87171;
  --color-overlay-light: rgba(255, 255, 255, 0.1);
  --color-overlay-lighter: rgba(255, 255, 255, 0.18);
  --color-overlay-surface: rgba(32, 44, 51, 0.6);
  --color-overlay-surface-strong: rgba(32, 44, 51, 0.8);
  --color-accent-overlay: rgba(37, 211, 102, 0.15);
  --color-accent-overlay-dark: rgba(18, 140, 126, 0.15);
  --color-accent-overlay-strong: rgba(37, 211, 102, 0.35);
  --color-accent-overlay-dark-strong: rgba(18, 140, 126, 0.35);
  --color-accent-overlay-soft: rgba(37, 211, 102, 0.12);
  --color-accent-overlay-badge: rgba(37, 211, 102, 0.14);
  --color-accent-avatar-start: rgba(37, 211, 102, 0.2);
  --color-accent-avatar-end: rgba(37, 211, 102, 0.45);
  --color-shadow: rgba(0, 0, 0, 0.3);
  --color-shadow-strong: rgba(0, 0, 0, 0.45);
  --color-shadow-accent: rgba(37, 211, 102, 0.3);
  --color-shadow-accent-strong: rgba(18, 140, 126, 0.35);
}

:global(body) {
  margin: 0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background-color: var(--color-bg);
}

.app {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 40%, var(--color-surface) 100%);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 48px var(--color-shadow-strong);
}

@media (max-width: 560px) {
  .app {
    max-width: 100%;
    border: none;
    box-shadow: none;
  }
}
</style>
