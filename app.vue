<template>
  <div class="app">
    <AppHeader />
    <SearchBar v-model="search" />
    <HighlightsCard />
    <StoriesCarousel :stories="stories" />
    <CategoryFilters
      :filters="filters"
      v-model:selectedFilter="selectedFilter"
    />
    <OfferList :offers="filteredOffers" />
    <BottomNavigation
      :menu-items="bottomMenu"
      v-model:activeMenu="activeMenu"
    />
    <button class="app__fab" type="button" aria-label="Tambah kampanye baru">
      ＋
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from './components/affiliate/AppHeader.vue'
import SearchBar from './components/affiliate/SearchBar.vue'
import HighlightsCard from './components/affiliate/HighlightsCard.vue'
import StoriesCarousel from './components/affiliate/StoriesCarousel.vue'
import CategoryFilters from './components/affiliate/CategoryFilters.vue'
import OfferList from './components/affiliate/OfferList.vue'
import BottomNavigation from './components/affiliate/BottomNavigation.vue'

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

  .app__fab {
    right: 20px;
  }
}
</style>
