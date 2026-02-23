import type { MenuItem, Offer, Story } from '~/types/affiliate'

export function useAffiliateData() {
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

  const bottomMenu: MenuItem[] = [
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

  return {
    offers,
    bottomMenu,
    stories,
  }
}
