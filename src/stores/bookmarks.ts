import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { countTags } from '../bookmark'
import type { Bookmark } from '@/bookmark'

export const useBookmarks = defineStore('bookmarks', () => {
  const bookmarks = reactive<Bookmark[]>([])
  const tags = computed(() => countTags(bookmarks))

  function save(bookmark: Bookmark) {
    const i = bookmarks.findIndex(({ id }) => id === bookmark.id)
    bookmarks.splice(i, 1, bookmark)
  }

  function $reset(bookmarks_: Bookmark[]) {
    bookmarks.splice(0, Infinity, ...bookmarks_)
  }

  return { bookmarks, tags, save, $reset }
})
