/// <reference path="../node_modules/@types/chrome/index.d.ts" />
import { pack as _pack, unpack as _unpack } from '@/hashtag'
import type { Synopsis } from '@/hashtag'

export interface Bookmark {
  id: string
  synopsis: Synopsis
  url: string
  favicon: string
}

export interface _Bookmark {
  id: string
  title: string
  url: string
}

export function pack({ id, synopsis, url }: Bookmark): _Bookmark {
  return {
    id,
    title: _pack(synopsis),
    url
  }
}

export function unpack({ id, title, url }: _Bookmark): Bookmark {
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
