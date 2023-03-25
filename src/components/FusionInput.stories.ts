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

export const Normal = Template.bind({})
Normal.args = { value: ['#Hashtag', ''], options: ['#Hashtag', '#javascript', '#vue'] }
export const TooManyOptions = Template.bind({})
TooManyOptions.args = {
  value: ['#Hashtag', ''],
  options: [
    '#ai',
    '#android',
    '#apm',
    '#automation',
    '#building',
    '#c++',
    '#cicd',
    '#cloud',
    '#component',
    '#crypto',
    '#css',
    '#database',
    '#dependency injection',
    '#devops',
    '#distributed',
    '#dotnet',
    '#elixir',
    '#emacs',
    '#erlang',
    '#event streaming',
    '#functional',
    '#gateway',
    '#geo',
    '#go'
  ]
}
export const NoOptions = Template.bind({})
NoOptions.args = { value: ['#Hashtag', ''] }
