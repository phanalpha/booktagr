import type { StoryFn } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import FusionInput from './FusionInput.vue'

export default {
  component: FusionInput
}

const Template: StoryFn<typeof FusionInput> = (args) => ({
  components: { FusionInput },
  setup() {
    return { args }
  },
  template: '<FusionInput v-bind="args" @change="handleChange" />',
  methods: {
    handleChange: action('change')
  }
})

export const Default = Template.bind({})
Default.args = { value: ['#Hashtag', ''], options: ['#Hashtag', '#javascript', '#vue'] }
export const Blank = Template.bind({})
Blank.args = { value: ['#Hashtag', ''] }
