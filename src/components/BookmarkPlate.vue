<script setup lang="ts">
/// <reference path="../../node_modules/@types/chrome/index.d.ts" />
import { useRouter } from 'vue-router'
import type { Synopsis } from '@/hashtag'

const router = useRouter()
const props = defineProps<{
  id: string
  synopsis: Synopsis
  url: string
  favicon: string
}>()

function handleClick() {
  chrome.tabs.update({ url: props.url })
  window.close()
}

function handleEdit() {
  router.push({ name: 'bookmark', params: { id: props.id } })
}
</script>

<template>
  <div class="bookmark">
    <div class="content" @click="handleClick">
      <img :src="favicon" alt="" class="favicon" />
      {{ synopsis.title }}
      <a class="action">EDIT</a>
      <a @click.stop="handleEdit" class="action">EDIT</a>
    </div>
    <div class="tags">
      <a v-for="tag in synopsis.tags">#{{ tag }}</a>
    </div>
  </div>
</template>

<style scoped>
.bookmark {
}

.content {
  position: relative;
}

.favicon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: middle;
}

.title {
  text-decoration: none;
  color: black;
}

.action {
  margin-left: 2em;
  font-size: 12px;
  visibility: hidden;
}

.action + .action {
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  visibility: visible;
}

.bookmark:hover .action + .action {
  display: block;
}

.tags {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.tags > a {
  cursor: pointer;
}
</style>
