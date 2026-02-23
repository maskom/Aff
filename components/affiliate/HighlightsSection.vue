<template>
  <section class="highlights">
    <div class="highlights__badge">{{ badge }}</div>
    <h1 class="highlights__title">{{ title }}</h1>
    <p class="highlights__text">{{ text }}</p>
    <button class="highlights__action" type="button">{{ actionLabel }}</button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  badge: string;
  title: string;
  text: string;
  actionLabel: string;
}>();
</script>

<style scoped>
.highlights {
  padding: 20px;
  background: linear-gradient(
    135deg,
    var(--color-accent-overlay),
    var(--color-accent-overlay-dark)
  );
  border-bottom: 1px solid var(--color-border-subtle);
}

.highlights__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--color-accent-overlay-badge);
  color: var(--color-accent);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.highlights__title {
  margin: 12px 0 8px;
  font-size: 1.35rem;
  color: #ffffff;
}

.highlights__text {
  margin: 0 0 16px;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--color-text-muted);
}

.highlights__action {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-dark));
  border: none;
  color: var(--color-bg);
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 6px 18px var(--color-shadow-accent);
}
</style>
