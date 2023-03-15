enum Booktagr {
  Separator = ' #',
  Signature = '_T@9r_'
}

export interface Synopsis {
  title: string
  tags: string[]
}

export function pack({ title, tags }: Synopsis): string {
  if (!tags.length) {
    return title
  }

  return Array<string>().concat(title, Booktagr.Signature, tags).join(Booktagr.Separator)
}

export function unpack(synopsis: string): Synopsis {
  const [title, tags] = synopsis.split(Booktagr.Separator + Booktagr.Signature)

  return {
    title,
    tags: tags?.split(Booktagr.Separator).slice(1) || []
  }
}
