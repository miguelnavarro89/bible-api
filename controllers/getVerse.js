import { handleResponseWithQuery } from '../utils'

export const getVerse = handleResponseWithQuery((request) => {
  const { version, book, chapter, verse } = request.params
  const chapVerse = `${chapter}.${verse.padStart(3, '0')}`

  const query = {
    default: `SELECT * FROM ${version}_verses WHERE book = '${book}' AND verse = '${chapVerse}' LIMIT 0, 1000`,
    nkjv: `
      SELECT * FROM ${version}_verses
      WHERE book_id = (SELECT id from ${version}_books WHERE short_name = '${book}')
        AND chapter = ${chapter}
        AND verse = ${verse}
      LIMIT 0, 1000
    `
  }

  return query[version] || query.default
})
