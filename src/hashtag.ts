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

const SignatureTag = Booktagr.Separator + Booktagr.Signature

export function unpack(synopsis: string): Synopsis {
  const i = synopsis.lastIndexOf(SignatureTag)
  if (i < 0) {
    return {
      title: synopsis,
      tags: []
    }
  }

  return {
    title: synopsis.slice(0, i),
    tags: synopsis
      .slice(i + SignatureTag.length + Booktagr.Separator.length)
      .split(Booktagr.Separator)
  }
}
