import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Bookmark } from '@/bookmark'

export const useBookmarks = defineStore('bookmarks', () => {
  const bookmarks = reactive<Bookmark[]>([])
  function findById(id: string) {
    return bookmarks.find((b) => id === b.id)
  }
  function save(bookmark: Bookmark) {
    const i = bookmarks.findIndex(({ id }) => id === bookmark.id)
    bookmarks.splice(i, 1, bookmark)
  }
  function $reset(bookmarks_: Bookmark[]) {
    bookmarks.splice(0, Infinity, ...bookmarks_)
  }

  return { bookmarks, findById, save, $reset }
})
