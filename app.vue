<template>
  <div class="app">
    <header class="app__header">
      <div class="app__title"><span class="app__title-highlight">Affiliate</span> Connect</div>
      <button class="app__menu-button" type="button">
        <span class="app__menu-icon">☰</span>
        <span class="app__menu-text">Login</span>
      </button>
    </header>

    <section class="app__search">
      <input
        v-model="search"
        class="app__search-input"
        placeholder="Cari produk komisi tinggi atau kata kunci kampanye..."
        type="search"
      />
    </section>

    <AffiliateHighlightsSection
      badge="Tips Hari Ini"
      title="Optimalkan penawaran terbaikmu"
      text="Gunakan materi promosi siap pakai, atur ulang CTA sesuai audiens, dan pantau performa konversi untuk memaksimalkan komisi."
      action-label="Lihat Toolkit"
    />

    <AffiliateStoriesSection :stories="stories" />

    <section class="app__filters" aria-label="Filter kategori kampanye">
      <button
        v-for="filter in filters"
        :key="filter"
        :class="['app__filter', { 'is-active': selectedFilter === filter }]"
        type="button"
        @click="selectedFilter = filter"
      >
        {{ filter }}
      </button>
    </section>

    <main class="app__content">
      <h2 class="app__section-title">Kampanye Unggulan</h2>
      <ul v-if="filteredOffers.length" class="app__list">
        <li v-for="offer in filteredOffers" :key="offer.id" class="app__list-item">
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
      </ul>
      <div v-else class="app__empty-state">
        <p class="app__empty-title">Tidak ada kampanye ditemukan</p>
        <p class="app__empty-text">
          Coba gunakan kata kunci lain atau pilih kategori berbeda untuk melihat rekomendasi.
        </p>
      </div>
    </main>

    <AffiliateBottomNav v-model:active-item="activeMenu" :items="bottomMenu" />

    <button class="app__fab" type="button" aria-label="Tambah kampanye baru">＋</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Offer, OfferCard, Story } from '~/types';

const offers = ref<Offer[]>([
  {
    id: 1,
    brand: 'EcoGlow',
    product: 'Serum Vitamin C',
    description: 'Campaign evergreen dengan materi iklan ready-to-use untuk IG & TikTok.',
    category: 'Kecantikan',
    commission: '25%/order',
    lastUpdate: '2 jam lalu',
    conversion: 4.8,
  },
  {
    id: 2,
    brand: 'Finovest',
    product: 'Aplikasi Investasi Pemula',
    description: 'Bonus Rp75rb untuk referral baru + funnel onboarding otomatis.',
    category: 'Finansial',
    commission: 'Rp110.000/signup',
    lastUpdate: 'Hari ini',
    conversion: 6.1,
  },
  {
    id: 3,
    brand: 'FitFuel',
    product: 'Paket Makanan Sehat',
    description: 'Program meal plan premium untuk audiens wellness & gym enthusiast.',
    category: 'Kesehatan',
    commission: '18%/transaksi',
    lastUpdate: 'Kemarin',
    conversion: 5.4,
  },
  {
    id: 4,
    brand: 'EduPrime',
    product: 'Kursus Bahasa Inggris Online',
    description: 'Landing page konversi tinggi + webinar gratis untuk lead nurturing.',
    category: 'Pendidikan',
    commission: '30%/pembelian',
    lastUpdate: '3 hari lalu',
    conversion: 7.0,
  },
  {
    id: 5,
    brand: 'Travelight',
    product: 'Paket Liburan Nusa Tenggara',
    description: 'Komisi premium untuk bundling tiket+hotel, cocok untuk konten travel vlog.',
    category: 'Travel',
    commission: 'Rp450.000/paket',
    lastUpdate: '1 minggu lalu',
    conversion: 3.7,
  },
]);

const bottomMenu = [
  { label: 'Beranda', icon: '🏠' },
  { label: 'Kampanye', icon: '📢' },
  { label: 'Insight', icon: '📈' },
  { label: 'Materi', icon: '🧰' },
  { label: 'Support', icon: '💬' },
];

const stories = ref<Story[]>([
  {
    id: 1,
    label: 'Click Rate',
    icon: '📊',
    change: '+12%',
    trend: 'naik',
  },
  {
    id: 2,
    label: 'Lead Baru',
    icon: '🧲',
    change: '+36',
    trend: 'naik',
  },
  {
    id: 3,
    label: 'Retensi',
    icon: '🔁',
    change: '89%',
    trend: 'stabil',
  },
  {
    id: 4,
    label: 'Refund',
    icon: '💸',
    change: '-4%',
    trend: 'turun',
  },
]);

const search = ref('');
const activeMenu = ref(bottomMenu[0].label);
const selectedFilter = ref('Semua');

const filters = computed(() => {
  const categories = new Set(offers.value.map((offer) => offer.category));
  return ['Semua', ...categories];
});

const offersWithInitials = computed<OfferCard[]>(() =>
  offers.value.map((offer) => ({
    ...offer,
    brandInitials: getInitials(offer.brand),
  }))
);

const filteredOffers = computed<OfferCard[]>(() => {
  const keyword = search.value.trim().toLowerCase();

  if (!keyword) {
    return offersWithInitials.value.filter((offer) =>
      selectedFilter.value === 'Semua' ? true : offer.category === selectedFilter.value
    );
  }

  return offersWithInitials.value.filter((offer) => {
    const matchesKeyword =
      offer.brand.toLowerCase().includes(keyword) ||
      offer.product.toLowerCase().includes(keyword) ||
      offer.category.toLowerCase().includes(keyword) ||
      offer.description.toLowerCase().includes(keyword);

    const matchesFilter =
      selectedFilter.value === 'Semua' || offer.category === selectedFilter.value;

    return matchesKeyword && matchesFilter;
  });
});

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
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
  background: linear-gradient(
    180deg,
    var(--color-bg) 0%,
    var(--color-surface) 40%,
    var(--color-surface) 100%
  );
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 48px var(--color-shadow-strong);
}

.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  background: linear-gradient(135deg, var(--color-accent-darker), var(--color-accent-dark));
  border-bottom: 1px solid var(--color-border-medium);
}

.app__title {
  font-weight: 700;
  font-size: 1.28rem;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.app__title-highlight {
  color: var(--color-accent);
}

.app__menu-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-overlay-light);
  border: none;
  color: #ffffff;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.app__menu-button:hover {
  background: var(--color-overlay-lighter);
}

.app__menu-icon {
  font-size: 1rem;
}

.app__menu-text {
  font-size: 0.85rem;
}

.app__search {
  padding: 12px 20px 6px;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
}

.app__search-input {
  width: 100%;
  background-color: var(--color-surface-elevated);
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  color: var(--color-text);
  font-size: 0.92rem;
  outline: none;
  box-shadow: inset 0 2px 4px var(--color-shadow);
}

.app__search-input::placeholder {
  color: var(--color-text-faint);
}

.app__filters {
  display: flex;
  gap: 10px;
  padding: 12px 20px;
  background-color: var(--color-surface);
  overflow-x: auto;
  border-bottom: 1px solid var(--color-border-subtle);
}

.app__filter {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border-accent-soft);
  background: var(--color-overlay-surface);
  color: var(--color-text-subtle);
  font-weight: 600;
  font-size: 0.78rem;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.app__filter.is-active {
  background: linear-gradient(
    135deg,
    var(--color-accent-overlay-strong),
    var(--color-accent-overlay-dark-strong)
  );
  color: var(--color-bg);
}

.app__content {
  flex: 1;
  padding: 10px 0 72px;
  background-color: var(--color-surface);
  overflow-y: auto;
}

.app__section-title {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-ghost);
  margin: 0 20px 12px;
}

.app__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.app__list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color 0.2s ease;
}

.app__list-item:hover {
  background-color: var(--color-overlay-surface);
}

.app__avatar {
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
  color: var(--color-text-subtle);
}

.app__earnings {
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.85rem;
}

.app__description {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.app__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: var(--color-text-weak);
}

.app__tag {
  padding: 4px 8px;
  background-color: var(--color-overlay-surface-strong);
  border-radius: 999px;
  color: var(--color-text-subtle);
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

.app__cta:hover {
  background: var(--color-accent-overlay-soft);
}

.app__empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--color-text-subtle);
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

.app__fab {
  position: fixed;
  right: calc(50% - 200px);
  bottom: 84px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  color: var(--color-bg);
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 26px var(--color-shadow-accent-strong);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 560px) {
  .app {
    max-width: 100%;
    border: none;
    box-shadow: none;
  }

  .app__header {
    border-radius: 0;
  }

  .app__fab {
    right: 20px;
  }
}
</style>
