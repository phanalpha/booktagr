<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  value: string[]
}>()

const input = ref<HTMLInputElement>()

const init = computed(() => props.value.slice(0, -1))
const tail = computed(() => props.value.at(-1) || '')

const emit = defineEmits<{
  (e: 'change', value: string[]): void
}>()

function handleFocus() {
  input.value?.focus()
}

function handleInput(e: Event) {
  emit('change', init.value.concat((e.target as HTMLInputElement).value))
}

function handleKey(e: KeyboardEvent) {
  switch (e.key) {
    case 'Backspace':
      if (!tail.value) {
        emit('change', init.value.slice(0, -1).concat(''))
      }
      break
    case 'Enter':
      e.preventDefault()
      if (!['', '#'].includes(tail.value)) {
        emit('change', props.value.concat(''))
      }
      break
  }
}
</script>

<template>
  <div class="fusion" @click="handleFocus">
    <span v-for="i in init" :key="i">{{ i }}</span>
    <input ref="input" :value="tail" @input="handleInput" @keydown="handleKey" />
  </div>
</template>

<style scoped>
.fusion {
  display: flex;
  align-items: center;
  gap: 8px;
}

.fusion > span {
  white-space: nowrap;
}

.fusion > input {
  border: none;
  outline: none;
}
</style>
