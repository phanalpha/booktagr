<script setup lang="ts">
import type { Synopsis } from '@/hashtag'
import HashtagLabel from './HashtagLabel.vue'

const props = defineProps<{
  id: string
  synopsis: Synopsis
  url: string
  favicon: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'check', tag: string): void
}>()
</script>

<template>
  <div class="bookmark" @click="emit('click')">
    <div class="content">
      <img :src="favicon" alt="" class="favicon" />
      {{ synopsis.title }}
    </div>
    <div class="tags">
      <HashtagLabel v-for="tag in synopsis.tags" @click.stop="emit('check', tag)" :key="tag" easy>
        #{{ tag }}
      </HashtagLabel>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.bookmark {
  padding: 8px;
}

.content {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
}

.favicon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
}

.tags {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
}
</style>
