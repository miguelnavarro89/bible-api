import { handleResponseWithQuery } from '../utils'

export const getChapter = handleResponseWithQuery((request) => {
  const { version, book, chapter } = request.params
  const { merged } = request.query
  const reference = `${book}.${chapter}`

  const query = {
    default: merged
      ? `
        SELECT * FROM ${version}_chapters WHERE reference = '${reference}' LIMIT 0, 1000
      `
      : `
        SELECT * FROM ${version}_verses
        WHERE book = '${book}'
          AND verse LIKE '${chapter}.%'
        LIMIT 0, 1000
      `,
    nkjv: `
      SELECT * FROM ${version}_verses
      WHERE book_id = (SELECT id from ${version}_books WHERE short_name = '${book}')
      AND chapter = ${chapter}
      LIMIT 0, 1000
    `
  }

  return query[version] || query.default
})
