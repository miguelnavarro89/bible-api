import { execQuery } from '../utils'

export const getAnnotations = (req, res) => {
  const { version, book, chapter, verse } = req.params

  const query = {
    default: `
      SELECT * FROM ${version}_annotations
      WHERE reference = '${book}.${chapter}'
        ${verse ? `AND marker REGEXP '-${verse}[^0-9]'` : ''}
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
  execQuery(query[version] || query.default)
    .catch(res.status(404).send.bind(res))
    .then(res.send.bind(res))
}
