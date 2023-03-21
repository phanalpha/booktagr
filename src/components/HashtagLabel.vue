<script setup lang="ts">
import FontAwesomeIcon from './FontAwesomeIcon.vue'

const props = defineProps<{
  easy?: boolean
  closable?: boolean
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', _e: Event, active?: boolean): void
  (e: 'close'): void
}>()

function handleClick(e: Event) {
  emit('click', e, props.active)
}
</script>

<template>
  <span :class="{ easy, closable, active }" @click.stop="handleClick">
    <slot />
    <FontAwesomeIcon
      class="icon"
      icon="fa-solid fa-xmark"
      @click.stop="emit('close')"
      v-if="closable"
    />
  </span>
</template>

<style scoped>
span {
  display: inline-block;
  height: 24px;
  padding: 0 8px;
  background: #eee;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.6);
  white-space: nowrap;
  cursor: pointer;
}

span.easy:not(.closable) {
  height: auto;
  padding: 0;
  background: none;
  border-radius: 0;
  line-height: initial;
}

span.active,
span:not(.closable):hover,
span.easy:not(.closable):hover {
  background: hsla(160, 100%, 37%, 0.2);
}

span.closable {
  border: 1px solid rgba(34, 36, 38, 0.15);
}

span.closable:hover {
  border-color: rgba(34, 36, 38, 0.35);
  color: rgba(0, 0, 0, 0.8);
}

.icon {
  margin-left: 4px;
  opacity: 0.5;
}

.icon:hover {
  opacity: 1;
}
</style>
