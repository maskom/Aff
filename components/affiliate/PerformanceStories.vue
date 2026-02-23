<template>
  <section class="performance-stories" aria-label="Sorotan performa harian">
    <article
      v-for="story in stories"
      :key="story.id"
      class="performance-stories__item"
    >
      <div class="performance-stories__icon">{{ story.icon }}</div>
      <p class="performance-stories__label">{{ story.label }}</p>
      <p class="performance-stories__trend" :data-trend="story.trend">{{ story.change }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Story } from '~/types/affiliate'

defineProps<{
  stories: Story[]
}>()
</script>

<style scoped>
.performance-stories {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  overflow-x: auto;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
}

.performance-stories__item {
  min-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--color-accent-overlay), var(--color-accent-overlay-dark));
  border: 1px solid var(--color-border-accent);
}

.performance-stories__icon {
  font-size: 1.5rem;
}

.performance-stories__label {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
}

.performance-stories__trend {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 600;
}

.performance-stories__trend[data-trend='naik'] {
  color: var(--color-accent);
}

.performance-stories__trend[data-trend='turun'] {
  color: var(--color-negative);
}

.performance-stories__trend[data-trend='stabil'] {
  color: var(--color-text-muted);
}
</style>
