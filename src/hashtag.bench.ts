import { bench, describe } from 'vitest'
import { unpack } from './hashtag'

describe('unpack', () => {
    bench('unpack with tags', () => {
        unpack('Vue.js - The Progressive JavaScript Framework | Vue.js #_T@9r_ #javascript #progressive #vue')
    })
})
