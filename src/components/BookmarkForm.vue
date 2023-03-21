<script setup lang="ts">
import { reactive } from 'vue'
import type { Bookmark } from '@/bookmark'
import type { Synopsis } from '@/hashtag'
import FusionInput from './FusionInput.vue'

const props = defineProps<{
  value: Bookmark
  tags: string[]
}>()

const emit = defineEmits<{
  (e: 'save', value: Synopsis): void
  (e: 'back'): void
}>()

const synopsis = reactive({
  title: props.value.synopsis.title,
  tags: props.value.synopsis.tags.concat('')
})

function handleChangeTags(tags: string[]) {
  synopsis.tags.splice(0, Infinity, ...tags)
}

function handleBack() {
  emit('back')
}

function handleSave() {
  emit('save', { title: synopsis.title, tags: synopsis.tags.filter((s) => !!s) })
}
</script>

<template>
  <form>
    <div class="lane">
      <label>Title</label>
      <input v-model="synopsis.title" />
    </div>
    <div class="lane">
      <label>Tags</label>
      <FusionInput :value="synopsis.tags" :options="tags" @change="handleChangeTags" drop />
    </div>

    <div class="lane">
      <button type="submit" @click.prevent="handleSave">Save</button>
      <button type="button" class="back" @click="handleBack">Back</button>
    </div>
  </form>
</template>

<style scoped>
.lane {
  margin-top: 8px;
}

.lane:last-child {
  margin-top: 16px;
}

label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

input {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 0 8px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 4px;
  outline: none;
  font-size: 13px;
}

input:focus {
  border-color: rgba(34, 36, 38, 0.35);
}

button[type='submit'] {
  width: 72px;
  height: 36px;
  background: hsl(160, 100%, 37%, 0.8);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  transition: ease-in-out .15s;
}

button[type='submit']:hover {
  background: hsl(160, 100%, 37%);
}

.back {
  padding: 0;
  margin-left: 16px;
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 700;
  text-decoration: underline;
  color: rgba(0, 0, 0, .6);
  transition: ease-in-out .15s;
}

.back:hover {
  color: rgba(0, 0, 0, .8);
}
</style>
