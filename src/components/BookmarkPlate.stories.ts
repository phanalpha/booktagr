import BookmarkPlate from './BookmarkPlate.vue'
import type { StoryFn } from '@storybook/vue3'

export default {
  component: BookmarkPlate
}

const Template: StoryFn<typeof BookmarkPlate> = args => ({
  components: { BookmarkPlate },
  setup() {
    return { args }
  },
  template: '<BookmarkPlate v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
  synopsis: {
    title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
    tags: ['javascript', 'vue']
  },
  url: 'https://vuejs.org/',
  favicon: 'https://vuejs.org/logo.svg',
}
