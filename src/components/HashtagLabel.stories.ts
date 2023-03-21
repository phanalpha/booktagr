import type { StoryFn } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import HashtagLabel from './HashtagLabel.vue'

export default {
  component: HashtagLabel
}

const Template: StoryFn<typeof HashtagLabel> = (args) => ({
  components: { HashtagLabel },
  setup() {
    return { args }
  },
  template: `
    <HashtagLabel v-bind="args" @click="handleClick" @close="handleClose">
      #Hashtag
    </HashtagLabel>
  `,
  methods: {
    handleClick: action('click'),
    handleClose: action('close')
  }
})

export const Default = Template.bind({})
export const Easy = Template.bind({})
Easy.args = { easy: true }
export const Closable = Template.bind({})
Closable.args = { closable: true }
export const Active = Template.bind({})
Active.args = { active: true }
