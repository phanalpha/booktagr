import { createPinia } from 'pinia'
import { app } from '@storybook/vue3'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import '../src/assets/main.css'

const pinia = createPinia()
app.use(pinia)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
