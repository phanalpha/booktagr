/// <reference path="../node_modules/@types/chrome/index.d.ts" />
import { pack as _pack, unpack as _unpack } from './hashtag'
import type { Synopsis } from '@/hashtag'

export interface Bookmark {
  id: string
  synopsis: Synopsis
  url: string
  favicon: string
}

export interface PackedBookmark {
  id: string
  title: string
  url: string
}

export function pack({ id, synopsis, url }: Bookmark): PackedBookmark {
  return {
    id,
    title: _pack(synopsis),
    url
  }
}

export function unpack({ id, title, url }: PackedBookmark): Bookmark {
  return {
    id,
    synopsis: _unpack(title),
    url,
    favicon: faviconURL(url)
  }
}

function faviconURL(pageUrl: string) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', pageUrl)
  url.searchParams.set('size', '32')

  return url.toString()
}

export function countTags(bs: Bookmark[]): Array<[string, number]> {
  const counts: Record<string, number> = {}
  for (const b of bs) {
    for (const t of b.synopsis.tags) {
      counts[t] = 1 + (counts[t] || 0)
    }
  }

  return Object.keys(counts)
    .sort()
    .map((tag) => [tag, counts[tag]])
}
