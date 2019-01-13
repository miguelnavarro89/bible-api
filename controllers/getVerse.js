import { execQuery } from '../utils'

export const getVerse = (req, res) => {
  const { version, book, chapter, verse } = req.params
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

  execQuery(query[version] || query.default)
    .catch(res.status(404).send.bind(res))
    .then(res.send.bind(res))
}
