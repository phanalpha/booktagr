<script setup lang="ts">
import { computed, ref } from 'vue'
import { useBookmarks } from '../stores/bookmarks'
import BookmarkList from '../components/BookmarkList.vue'
import BookmarkForm from '../components/BookmarkForm.vue'
import FontAwesomeIcon from '../components/FontAwesomeIcon.vue'
import type { Bookmark } from '@/bookmark'
import type { Synopsis } from '@/hashtag'

const store = useBookmarks()
const amend = ref()
const active = ref(false)

const tags = computed(() =>
  Object.keys(
    store.bookmarks.reduce(
      (tags, bookmark) =>
        bookmark.synopsis.tags.reduce((ts, t) => Object.assign(ts, { [t]: '' }), tags),
      {}
    )
  )
)

function handleAmend(bookmark: Bookmark) {
  amend.value = bookmark
  active.value = true
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
  <BookmarkList :bookmarks="store.bookmarks" @amend="handleAmend" />
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
  transition: ease-in-out 0.35s;
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
