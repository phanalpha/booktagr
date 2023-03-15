import { describe, expect, test } from 'vitest'
import { pack, unpack } from './hashtag'

describe('pack', () => {
  test('pack without tags', () => {
    expect(
      pack({ title: 'Vue.js - The Progressive JavaScript Framework | Vue.js', tags: [] })
    ).toBe('Vue.js - The Progressive JavaScript Framework | Vue.js')
  })

  test('pack with tags', () => {
    expect(
      pack({
        title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
        tags: ['javascript']
      })
    ).toBe('Vue.js - The Progressive JavaScript Framework | Vue.js #_T@9r_ #javascript')
  })
})

describe('unpack', () => {
  test('unpack without tags', () => {
    expect(unpack('Vue.js - The Progressive JavaScript Framework | Vue.js')).toEqual({
      title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
      tags: []
    })
  })

  test('unpack without signature', () => {
    expect(unpack('Vue.js - The Progressive JavaScript Framework | Vue.js #javascript')).toEqual({
      title: 'Vue.js - The Progressive JavaScript Framework | Vue.js #javascript',
      tags: []
    })
  })

  test('unpack with tags', () => {
    expect(
      unpack('Vue.js - The Progressive JavaScript Framework | Vue.js #_T@9r_ #javascript')
    ).toEqual({
      title: 'Vue.js - The Progressive JavaScript Framework | Vue.js',
      tags: ['javascript']
    })
  })
})
