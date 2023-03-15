<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { Bookmark } from '@/bookmark'
import type { Synopsis } from '@/hashtag'
import FusionInput from '@/components/FusionInput.vue'

const props = defineProps<{
  value: Bookmark
  tags: string[]
}>()

const emit = defineEmits<{
  (e: 'save', value: Synopsis): void
  (e: 'cancel'): void
}>()

const synopsis = reactive(props.value.synopsis)
onMounted(() => {
  synopsis.tags.push('')
})

function handleChangeTags(tags: string[]) {
  synopsis.tags.splice(0, Infinity, ...tags)
}

function handleCancel() {
  emit('cancel')
}

function handleSave() {
  emit('save', { title: synopsis.title, tags: synopsis.tags.filter(s => !!s) })
}
</script>

<template>
  <form>
    <div class="lane">
      <label>Title</label>
      <input class="input" v-model="synopsis.title" />
    </div>
    <div class="lane">
      <label>Tags</label>
      <FusionInput class="input" :value="synopsis.tags" @change="handleChangeTags">
        <a v-for="tag in tags" :key="tag">{{ tag }}</a>
      </FusionInput>
    </div>

    <div class="actions">
      <button type="reset" @click="handleCancel">Cancel</button>
      <button type="submit" @click.prevent="handleSave">Save</button>
    </div>
  </form>
</template>

<style scoped>
.lane {
  margin-bottom: 16px;
}

.lane > label {
  display: block;
  margin-left: 8px;
}

.input {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  margin-top: 8px;
  padding: 0 16px;
  border: 1px solid #eee;
  border-radius: 4px;
  outline: none;
}

.input:focus,
.input:has(input:focus) {
  padding: 0 15px;
  border: 2px solid #1ea7fd;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 32px;
}

button {
  min-width: 80px;
  height: 32px;
  padding: 0 16px;
  background: #eee;
  border: none;
  border-radius: 2px;
}

button[type='submit'] {
  background: #1ea7fd;
  color: white;
}
</style>
