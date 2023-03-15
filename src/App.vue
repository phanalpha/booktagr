<script setup lang="ts">
/// <reference path="../node_modules/@types/chrome/index.d.ts" />
import { RouterView } from 'vue-router'
import { pack, unpack } from '@/bookmark'
import type { _Bookmark } from '@/bookmark'
import { useBookmarks } from '@/stores/bookmarks'

const store = useBookmarks()

chrome.bookmarks.getTree((bookmarks_) => {
  function rollOut(bookmarks: chrome.bookmarks.BookmarkTreeNode[]): _Bookmark[] {
    return bookmarks.reduce<_Bookmark[]>(
      (a, b) => a.concat(b.children ? rollOut(b.children) : (b as _Bookmark)),
      []
    )
  }

  store.$reset(rollOut(bookmarks_).map(unpack))
})

store.$onAction(({ name, args }) => {
  if ('save' === name) {
    const { id, title } = pack(args[0])
    chrome.bookmarks.update(id, { title })
  }
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
