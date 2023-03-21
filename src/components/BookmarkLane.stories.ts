import type { StoryFn } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import BookmarkLane from './BookmarkLane.vue'

export default {
  component: BookmarkLane
}

const Template: StoryFn<typeof BookmarkLane> = (args) => ({
  components: { BookmarkPlate: BookmarkLane },
  setup() {
    return { args }
  },
  template: '<BookmarkLane v-bind="args" @click="handleClick" @check="handleCheck" />',
  methods: {
    handleClick: action('click'),
    handleCheck: action('check')
  }
})

export const Default = Template.bind({})
Default.args = {
  synopsis: {
    title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
    tags: ['javascript', 'vue']
  },
  url: 'https://vuejs.org/',
  favicon: 'https://vuejs.org/logo.svg'
}
