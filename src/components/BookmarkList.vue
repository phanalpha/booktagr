<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Bookmark } from '@/bookmark'
import BookmarkPlate from './BookmarkLane.vue'
import FusionInput from './FusionInput.vue'
import HashtagLabel from './HashtagLabel.vue'
import FontAwesomeIcon from './FontAwesomeIcon.vue'

const props = defineProps<{
  bookmarks: Bookmark[]
}>()

const emit = defineEmits<{
  (e: 'click', bookmark: Bookmark): void
  (e: 'amend', bookmark: Bookmark): void
}>()

const query = reactive([''])

const hits = computed(() =>
  query.reduce(
    (bookmarks: Bookmark[], q: string, i) =>
      bookmarks.filter(({ synopsis: { title, tags }, url }) =>
        q.startsWith('#')
          ? i < query.length - 1
            ? tags.includes(q.slice(1))
            : tags.find((tag) => tag.startsWith(q.slice(1)))
          : title.includes(q) || url.includes(q)
      ),
    props.bookmarks
  )
)

const counts = computed(() => {
  const qs = query
    .slice(0, -1)
    .filter((q) => q.startsWith('#'))
    .map((q) => q.slice(1))
  const s = hits.value.reduce<Record<string, number>>(
    (stat, bookmark) =>
      bookmark.synopsis.tags.reduce(
        (st, tag) => Object.assign(st, { [tag]: 1 + (st[tag] || 0) }),
        stat
      ),
    {}
  )

  return Object.keys(s)
    .sort()
    .filter((tag) => !qs.includes(tag))
    .map<[string, number]>((tag) => [tag, s[tag]])
})

const tags = computed(() => counts.value.map(([tag]) => '#' + tag))

function handleChange(value: string[]) {
  query.splice(0, Infinity, ...value)
}
</script>

<template>
  <FusionInput :value="query" :options="tags" @change="handleChange" />
  <div class="tags">
    <HashtagLabel v-for="[tag, count] in counts" :key="tag">{{ tag }} ({{ count }})</HashtagLabel>
  </div>
  <BookmarkPlate
    v-for="hit in hits"
    v-bind="hit"
    class="bookmark"
    :key="hit.id"
    @click="emit('click', hit)"
  >
    <div>
      <FontAwesomeIcon icon="fa-slid fa-pen" @click.stop="emit('amend', hit)" />
    </div>
  </BookmarkPlate>
</template>

<style scoped>
.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.bookmark {
  margin-top: 8px;
  border-radius: 4px;
  position: relative;
  transition: ease-in-out 0.15s;
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
  transition: ease-in-out 0.15s;
}

.bookmark:hover {
  background: rgba(0, 0, 0, 0.05);
}

.bookmark:hover > div {
  opacity: 1;
}
</style>
