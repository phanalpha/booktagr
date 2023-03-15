<script setup lang="ts">
/// <reference path="../../node_modules/@types/chrome/index.d.ts" />
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Bookmark } from '@/bookmark'
import type { Synopsis } from '@/hashtag'
import { useBookmarks } from '@/stores/bookmarks'
import BookmarkForm from '@/components/BookmarkForm.vue'

const router = useRouter()
const route = useRoute()
const store = useBookmarks()

const bookmark = ref<Bookmark | undefined>(undefined)

onMounted(() => {
  bookmark.value = store.findById(route.params.id as string)
})

function handleCancel() {
  router.back()
}

function handleSave(synopsis: Synopsis) {
  store.save({ ...bookmark.value!, synopsis })
  router.back()
}
</script>

<template>
  <BookmarkForm
    :value="bookmark"
    :tags="[]"
    v-if="bookmark"
    @cancel="handleCancel"
    @save="handleSave"
  />
</template>

<style scoped></style>
