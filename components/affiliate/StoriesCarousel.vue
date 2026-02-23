<template>
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
</template>

<script setup lang="ts">
interface Story {
  id: number
  label: string
  icon: string
  change: string
  trend: 'naik' | 'turun' | 'stabil'
}

defineProps<{
  stories: Story[]
}>()
</script>

<style scoped>
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
</style>
