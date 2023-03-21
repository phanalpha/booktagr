import BookmarkList from './BookmarkList.vue'
import type { StoryFn } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'

export default {
  component: BookmarkList
}

const Template: StoryFn<typeof BookmarkList> = (args) => ({
  components: { BookmarkList },
  setup() {
    return { args }
  },
  template: '<BookmarkList v-bind="args" @click="handleClick" @amend="handleAmend" />',
  methods: {
    handleClick: action('click'),
    handleAmend: action('amend')
  }
})

export const Default = Template.bind({})
Default.args = {
  bookmarks: [
    {
      synopsis: {
        title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
        tags: ['javascript', 'vue']
      },
      url: 'https://vuejs.org/',
      favicon: 'https://vuejs.org/logo.svg'
    },
    {
      synopsis: {
        title: 'Pinia | The intuitive store for Vue.js',
        tags: ['javascript', 'vue', 'store']
      },
      url: 'https://pinia.vuejs.org/',
      favicon: 'https://pinia.vuejs.org/logo.svg'
    },
    {
      synopsis: {
        title: 'Tree-sitter｜Introduction',
        tags: ['parser', 'c']
      },
      url: 'https://tree-sitter.github.io/tree-sitter/',
      favicon: 'https://tree-sitter.github.io/tree-sitter/assets/images/favicon-32x32.png'
    }
  ]
}
