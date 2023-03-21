<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPen, faXmark)

defineProps<{
  icon: string
}>()
</script>

<template>
  <FontAwesomeIcon :icon="icon" />
</template>
