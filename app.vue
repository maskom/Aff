<template>
  <div class="app">
    <header class="app__header">
      <div class="app__title">
        <span class="app__title-highlight">Affiliate</span> Connect
      </div>
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

    <section class="app__highlights">
      <div class="app__highlights-badge">Tips Hari Ini</div>
      <h1 class="app__highlights-title">Optimalkan penawaran terbaikmu</h1>
      <p class="app__highlights-text">
        Gunakan materi promosi siap pakai, atur ulang CTA sesuai audiens, dan pantau
        performa konversi untuk memaksimalkan komisi.
      </p>
      <button class="app__highlights-action" type="button">Lihat Toolkit</button>
    </section>

    <section class="app__stories" aria-label="Sorotan performa harian">
      <article
        v-for="story in stories"
        :key="story.id"
        class="app__story"
      >
        <div class="app__story-icon">{{ story.icon }}</div>
        <p class="app__story-label">{{ story.label }}</p>
        <p class="app__story-trend" :data-trend="story.trend">{{ story.change }}</p>
      </article>
    </section>

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
        <li
          v-for="offer in filteredOffers"
          :key="offer.id"
          class="app__list-item"
        >
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

    <nav class="app__bottom-nav" aria-label="Menu utama">
      <button
        v-for="item in bottomMenu"
        :key="item.label"
        :aria-label="item.label"
        :class="['app__bottom-nav-item', { 'is-active': activeMenu === item.label }]"
        type="button"
        @click="activeMenu = item.label"
      >
        <span class="app__bottom-nav-icon">{{ item.icon }}</span>
        <span class="app__bottom-nav-text">{{ item.label }}</span>
      </button>
    </nav>

    <button class="app__fab" type="button" aria-label="Tambah kampanye baru">
      ＋
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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

interface Story {
  id: number
  label: string
  icon: string
  change: string
  trend: 'naik' | 'turun' | 'stabil'
}

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
])

const bottomMenu = [
  { label: 'Beranda', icon: '🏠' },
  { label: 'Kampanye', icon: '📢' },
  { label: 'Insight', icon: '📈' },
  { label: 'Materi', icon: '🧰' },
  { label: 'Support', icon: '💬' },
]

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
])

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
:global(body) {
  margin: 0;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background-color: #0b141a;
}

.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #0b141a 0%, #111b21 40%, #111b21 100%);
  color: #e7f1ed;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.45);
}

.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 12px;
  background: linear-gradient(135deg, #075e54, #128c7e);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.app__title {
  font-weight: 700;
  font-size: 1.28rem;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.app__title-highlight {
  color: #25d366;
}

.app__menu-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.app__menu-button:hover {
  background: rgba(255, 255, 255, 0.18);
}

.app__menu-icon {
  font-size: 1rem;
}

.app__menu-text {
  font-size: 0.85rem;
}

.app__search {
  padding: 12px 20px 6px;
  background-color: #111b21;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app__search-input {
  width: 100%;
  background-color: #202c33;
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  color: #e7f1ed;
  font-size: 0.92rem;
  outline: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.app__search-input::placeholder {
  color: rgba(231, 241, 237, 0.6);
}

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

.app__stories {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  overflow-x: auto;
  background-color: #111b21;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app__story {
  min-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.16), rgba(18, 140, 126, 0.12));
  border: 1px solid rgba(37, 211, 102, 0.22);
}

.app__story-icon {
  font-size: 1.5rem;
}

.app__story-label {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
}

.app__story-trend {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 600;
}

.app__story-trend[data-trend='naik'] {
  color: #25d366;
}

.app__story-trend[data-trend='turun'] {
  color: #f87171;
}

.app__story-trend[data-trend='stabil'] {
  color: rgba(231, 241, 237, 0.78);
}

.app__filters {
  display: flex;
  gap: 10px;
  padding: 12px 20px;
  background-color: #111b21;
  overflow-x: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.app__filter {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(37, 211, 102, 0.28);
  background: rgba(32, 44, 51, 0.6);
  color: rgba(231, 241, 237, 0.76);
  font-weight: 600;
  font-size: 0.78rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease;
}

.app__filter.is-active {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.35), rgba(18, 140, 126, 0.35));
  color: #0b141a;
}

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

.app__bottom-nav {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #202c33;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.app__bottom-nav-item {
  background: none;
  border: none;
  color: rgba(231, 241, 237, 0.7);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 0.76rem;
}

.app__bottom-nav-item:focus-visible,
.app__bottom-nav-item:hover {
  color: #25d366;
}

.app__bottom-nav-item.is-active {
  color: #25d366;
}

.app__bottom-nav-icon {
  font-size: 1.1rem;
}

.app__fab {
  position: fixed;
  right: calc(50% - 200px);
  bottom: 84px;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #0b141a;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 26px rgba(18, 140, 126, 0.35);
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
