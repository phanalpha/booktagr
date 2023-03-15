<script setup lang="ts">
import { useBookmarks } from '@/stores/bookmarks'
import BookmarkList from '@/components/BookmarkList.vue'

const store = useBookmarks()
</script>

<template>
  <BookmarkList :bookmarks="store.bookmarks" />
</template>
