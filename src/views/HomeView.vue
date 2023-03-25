<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import BookmarkList from '../components/BookmarkList.vue'
import BookmarkForm from '../components/BookmarkForm.vue'
import FusionInput from '../components/FusionInput.vue'
import FontAwesomeIcon from '../components/FontAwesomeIcon.vue'
import { useBookmarks } from '../stores/bookmarks'
import { countTags } from '../bookmark'
import type { Bookmark } from '@/bookmark'
import type { Synopsis } from '@/hashtag'

const emit = defineEmits<{
  (e: 'click', bookmark: Bookmark): void
}>()

const store = useBookmarks()
const tags = computed(() => store.tags.map(([tag]) => tag))
const pops = computed(() =>
  Array.from(store.tags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 21)
    .sort()
)

const query = reactive([''])
const matches = reactive<Array<[string, Bookmark[], Array<[string, number]>]>>([])
const hits = computed(() =>
  query.reduce<[Bookmark[], Array<[string, number]>]>(
    ([bs, ts], q, i) => {
      if (i < matches.length) {
        if (matches[i][0] === q) {
          return [matches[i][1], matches[i][2]]
        }

        matches.splice(i, Infinity)
      }
      if (!q) {
        return [bs, ts]
      }

      const b2 = q.startsWith('#')
        ? i < query.length - 1
          ? bs.filter((b) => b.synopsis.tags.includes(q.slice(1)))
          : bs.filter((b) => b.synopsis.tags.find((tag) => tag.startsWith(q.slice(1))))
        : bs.filter((b) => b.synopsis.title.includes(q) || b.url.includes(q))
      const t2 = countTags(b2).filter(([tag]) => {
        const j = query.indexOf(`#${tag}`)
        return j < 0 || i < j
      })
      matches.push([q, b2, t2])

      return [b2, t2]
    },
    [store.bookmarks, pops.value]
  )
)
const hitTags = computed(() => hits.value[1].map(([tag]) => '#' + tag))

const amend = ref()
const active = ref(false)

function handleChange(value: string[]) {
  query.splice(0, Infinity, ...value)
}

function handleAmend(bookmark: Bookmark) {
  amend.value = bookmark
  active.value = true
}

function handleCheck(tag: string) {
  query.splice(-1, 0, `#${tag}`)
}

function handleBack() {
  active.value = false
  setTimeout(() => (amend.value = undefined), 350)
}

function handleSave(synopsis: Synopsis) {
  store.save(Object.assign({}, amend.value, { synopsis }))
  handleBack()
}
</script>

<template>
  <FusionInput :value="query" :options="hitTags" @change="handleChange" />
  <div class="bookmarks">
    <BookmarkList
      :bookmarks="hits[0]"
      :tags="hits[1]"
      @click="(b) => emit('click', b)"
      @amend="handleAmend"
      @check="handleCheck"
    />
  </div>
  <div class="modal" :class="{ active }">
    <template v-if="amend">
      <div class="close">
        <FontAwesomeIcon icon="fa-solid fa-close" @click="handleBack" />
      </div>
      <BookmarkForm :value="amend" :tags="tags" @back="handleBack" @save="handleSave" />
    </template>
  </div>
</template>

<style scoped>
.bookmarks {
  margin-top: 8px;
}

.modal {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 8px;
  background: white;
  position: fixed;
  top: 0;
  left: 50%;
  opacity: 0;
  z-index: -1;
  transition: 0.35s ease-in-out;
}

.modal.active {
  left: 0;
  opacity: 1;
  z-index: 1000;
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}
</style>
