<script setup lang="ts">
import { computed, ref } from 'vue'
import HashtagLabel from './HashtagLabel.vue'

const props = withDefaults(
  defineProps<{
    value: string[]
    options?: string[]
    drop?: boolean
  }>(),
  {
    options: () => []
  }
)

const input = ref<HTMLInputElement>()
const active = ref(false)
const inactive = ref(false)

const init = computed(() => props.value.slice(0, -1))
const tail = computed(() => props.value.at(-1) || '')

const bit = ref(tail.value)
const hits = computed(() =>
  !props.drop && !bit.value
    ? []
    : props.options.filter((opt) => !init.value.includes(opt) && opt.includes(bit.value))
)

const emit = defineEmits<{
  (e: 'change', value: string[]): void
}>()

let t: any = undefined

function handleActive() {
  if (t !== undefined) {
    clearTimeout(t)
    t = undefined
  }
  inactive.value = false
  input.value?.focus()
}

function handleFocus() {
  active.value = true
}

function handleBlur() {
  t = setTimeout(() => {
    t = setTimeout(() => (active.value = false), 150)
    inactive.value = true
  }, 150)
}

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement

  bit.value = value
  emit('change', init.value.concat(value))
}

function handleKey(e: KeyboardEvent) {
  const el = e.target as HTMLInputElement

  switch (e.key) {
    case 'Backspace':
      if (!el.value) {
        emit('change', init.value.slice(0, -1).concat(''))
      }
      break

    case 'Enter':
      e.preventDefault()
      if (!['', '#'].includes(el.value)) {
        bit.value = ''
        emit('change', init.value.concat(el.value, ''))
      }
      break

    case 'Escape':
      if (props.drop) {
        e.preventDefault()
        el.blur()
      }
  }
}

function handleAppend(tag: string) {
  emit('change', init.value.concat(tag, ''))
  handleActive()
  bit.value = ''
}

function handleClose(tag: string) {
  emit('change', init.value.filter((i) => i !== tag).concat(bit.value))
}
</script>

<template>
  <div class="fusion" :class="{ active, inactive }" @click="handleActive">
    <div class="input">
      <HashtagLabel v-for="i in init" :key="i" closable @close="handleClose(i)">
        {{ i }}
      </HashtagLabel>
      <input
        ref="input"
        :value="bit"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKey"
      />
    </div>
    <div class="options">
      <HashtagLabel v-for="i in hits" :key="i" @click="handleAppend(i)">
        {{ i }}
      </HashtagLabel>
    </div>
  </div>
</template>

<style scoped>
.fusion {
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.fusion.active {
  overflow: visible;
}

.input {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 7px;
  background: white;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 4px;
}

.fusion.active .input {
  border-color: rgba(34, 36, 38, 0.35);
}

.fusion.active:has(.options:not(:empty)) .input {
  border-radius: 4px 4px 0 0;
}

input {
  flex: 1;
  min-width: 80px;
  height: 24px;
  padding: 0;
  border: none;
  outline: none;
  font-size: 13px;
}

.options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  max-height: 200px;
  padding: 8px;
  background: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 4px 4px;
  overflow-y: auto;
  position: absolute;
  top: 50%;
  opacity: 0;
  z-index: -1;
  transition: 0.15s ease-in-out;
}

.fusion.active:not(.inactive) .options:not(:empty) {
  top: 100%;
  opacity: 1;
}
</style>
