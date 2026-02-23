<template>
  <section class="stories-section" aria-label="Sorotan performa harian">
    <article
      v-for="story in stories"
      :key="story.id"
      class="stories-section__story"
    >
      <div class="stories-section__story-icon">{{ story.icon }}</div>
      <p class="stories-section__story-label">{{ story.label }}</p>
      <p class="stories-section__story-trend" :data-trend="story.trend">{{ story.change }}</p>
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
.stories-section {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  overflow-x: auto;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
}

.stories-section__story {
  min-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--color-accent-overlay), var(--color-accent-overlay-dark));
  border: 1px solid var(--color-border-accent);
}

.stories-section__story-icon {
  font-size: 1.5rem;
}

.stories-section__story-label {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
}

.stories-section__story-trend {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 600;
}

.stories-section__story-trend[data-trend='naik'] {
  color: var(--color-accent);
}

.stories-section__story-trend[data-trend='turun'] {
  color: var(--color-negative);
}

.stories-section__story-trend[data-trend='stabil'] {
  color: var(--color-text-muted);
}
</style>
