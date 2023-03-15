<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Bookmark } from '@/bookmark'
import BookmarkPlate from '@/components/BookmarkPlate.vue'
import FusionInput from '@/components/FusionInput.vue'

const props = defineProps<{
  bookmarks: Bookmark[]
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

const tags = computed(() => {
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

function handleChange(value: string[]) {
  query.splice(0, Infinity, ...value)
}
</script>

<template>
  <div class="bookmarkers">
    <FusionInput :value="query" @change="handleChange" />
    <div class="tags">
      <a v-for="[tag, count] in tags">#{{ tag }} ({{ count }})</a>
    </div>
    <BookmarkPlate v-for="hit in hits" v-bind="hit" class="bookmark" />
  </div>
</template>

<style scoped>
.bookmarks {
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 16px;
}

.tags > a {
  cursor: pointer;
}

.bookmark {
  padding: 8px 16px;
  border-radius: 4px;
}

.bookmark:hover {
  background: #eee;
}
</style>
