import { handleResponseWithQuery } from '../utils'

export const getAnnotations = handleResponseWithQuery((request) => {
  const { version, book, chapter, verse } = request.params

  const query = {
    default: `
      SELECT * FROM ${version}_annotations
      WHERE reference = '${book}.${chapter}'
      LIMIT 0, 1000
    `,
    nkjv: `
      SELECT * FROM ${version}_annotations
      WHERE book_id = (SELECT id FROM ${version}_books WHERE short_name = '${book}')
        AND chapter = ${chapter}
        ${verse ? `AND verse = ${verse}` : ''}
      LIMIT 0,1000
    `
  }

  return query[version] || query.default
})
