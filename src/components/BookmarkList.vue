<script setup lang="ts">
import BookmarkLane from './BookmarkLane.vue'
import HashtagLabel from './HashtagLabel.vue'
import FontAwesomeIcon from './FontAwesomeIcon.vue'
import type { Bookmark } from '@/bookmark'

defineProps<{
  bookmarks: Bookmark[]
  tags: Array<[string, number]>
}>()

const emit = defineEmits<{
  (e: 'click', bookmark: Bookmark): void
  (e: 'amend', bookmark: Bookmark): void
  (e: 'check', tag: string): void
}>()
</script>

<template>
  <div class="tags">
    <HashtagLabel v-for="[tag, count] in tags" :key="tag" @click="emit('check', tag)">
      {{ tag }} ({{ count }})
    </HashtagLabel>
  </div>
  <BookmarkLane
    v-for="bookmark in bookmarks"
    v-bind="bookmark"
    class="bookmark"
    :key="bookmark.id"
    @click="emit('click', bookmark)"
    @check="(tag) => emit('check', tag)"
  >
    <div @click.stop="emit('amend', bookmark)">
      <FontAwesomeIcon icon="fa-slid fa-pen" class="i" />
    </div>
  </BookmarkLane>
</template>

<style scoped>
.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.bookmark {
  margin-top: 8px;
  border-radius: 4px;
  position: relative;
  transition: 0.15s ease-in-out;
}

.bookmark > div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0 4px 0 4px;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: 0.15s ease-in-out;
}

.bookmark:hover {
  background: rgba(0, 0, 0, 0.05);
}

.bookmark:hover > div {
  opacity: 1;
}

.bookmark:hover > div > .i {
  opacity: 0.5;
  transition: 0.15s ease-in-out;
}

.bookmark:hover > div:hover > .i {
  opacity: 1;
}
</style>
