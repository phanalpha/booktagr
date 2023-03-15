import BookmarkForm from './BookmarkForm.vue'
import type { StoryFn } from '@storybook/vue3'

export default {
  component: BookmarkForm
}

const Template: StoryFn<typeof BookmarkForm> = (args) => ({
  components: { BookmarkForm },
  setup() {
    return { args }
  },
  template: '<BookmarkForm v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  value: {
    synopsis: {
      title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
      tags: ['javascript', 'vue']
    },
    url: 'https://vuejs.org/',
    favicon: 'https://vuejs.org/logo.svg'
  },
  tags: ['c', 'javascript', 'parser', 'store', 'vue']
}
