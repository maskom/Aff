<template>
  <section class="stories" aria-label="Sorotan performa harian" data-testid="stories-section">
    <article
      v-for="story in stories"
      :key="story.id"
      class="stories__item"
      :data-testid="`story-${story.id}`"
    >
      <div class="stories__icon">{{ story.icon }}</div>
      <p class="stories__label">{{ story.label }}</p>
      <p class="stories__trend" :data-trend="story.trend">{{ story.change }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
interface Story {
  id: number;
  label: string;
  icon: string;
  change: string;
  trend: 'naik' | 'turun' | 'stabil';
}

defineProps<{
  stories: Story[];
}>();
</script>

<style scoped>
.stories {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  overflow-x: auto;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
}

.stories__item {
  min-width: 110px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    var(--color-accent-overlay),
    var(--color-accent-overlay-dark)
  );
  border: 1px solid var(--color-border-accent);
}

.stories__icon {
  font-size: 1.5rem;
}

.stories__label {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
}

.stories__trend {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 600;
}

.stories__trend[data-trend='naik'] {
  color: var(--color-accent);
}

.stories__trend[data-trend='turun'] {
  color: var(--color-negative);
}

.stories__trend[data-trend='stabil'] {
  color: var(--color-text-muted);
}
</style>
