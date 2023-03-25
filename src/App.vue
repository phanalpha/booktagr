<script setup lang="ts">
/// <reference path="../node_modules/@types/chrome/index.d.ts" />
import { pack, unpack } from '@/bookmark'
import { useBookmarks } from '@/stores/bookmarks'
import HomeView from '@/views/HomeView.vue'

import type { Bookmark, PackedBookmark } from '@/bookmark'

const store = useBookmarks()

function make_squash() {
  const bookmarks = Array<Bookmark>()

  return function squash(bs: chrome.bookmarks.BookmarkTreeNode[]) {
    for (const b of bs) {
      if (b.children) {
        squash(b.children)
      } else {
        bookmarks.push(unpack(b as PackedBookmark))
      }
    }

    return bookmarks
  }
}

chrome.bookmarks.getTree((bookmarks) => store.$reset(make_squash()(bookmarks)))

store.$onAction(({ name, args }) => {
  if ('save' === name) {
    const { id, title } = pack(args[0])
    chrome.bookmarks.update(id, { title })
  }
})

function handleClick(bookmark: Bookmark) {
  chrome.tabs.update({ url: bookmark.url })
  window.close()
}
</script>

<template>
  <HomeView @click="handleClick" />
</template>

<style scoped></style>
