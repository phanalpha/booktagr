import type { StoryFn } from '@storybook/vue3'
import HomeView from './HomeView.vue'
import { useBookmarks } from '../stores/bookmarks'

export default {
  component: HomeView
}

const Template: StoryFn<typeof HomeView> = (args) => ({
  components: { HomeView },
  setup() {
    const store = useBookmarks()
    store.$reset([
      {
        id: 'ZHan225mQtKAE3l-rQLksA',
        synopsis: {
          title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
          tags: ['javascript', 'vue']
        },
        url: 'https://vuejs.org/',
        favicon: 'https://vuejs.org/logo.svg'
      },
      {
        id: 'aBRnVCCvTXOtpEmZx9hT5w',
        synopsis: {
          title: 'Pinia | The intuitive store for Vue.js',
          tags: ['javascript', 'vue', 'store']
        },
        url: 'https://pinia.vuejs.org/',
        favicon: 'https://pinia.vuejs.org/logo.svg'
      },
      {
        id: 'MH4AFx2kT-yW5a-VLgavLA',
        synopsis: {
          title: 'Tree-sitter｜Introduction',
          tags: ['parser', 'c']
        },
        url: 'https://tree-sitter.github.io/tree-sitter/',
        favicon: 'https://tree-sitter.github.io/tree-sitter/assets/images/favicon-32x32.png'
      }
    ])

    return { args }
  },
  template: '<HomeView />'
})

export const Default = Template.bind({})
