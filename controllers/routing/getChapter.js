import { T, cond, equals, always } from 'ramda'
import { renderQuery } from '../../utils'

export const getChapter = (req, res) => {
  const { version, book, chapter } = req.params
  const { merged } = req.query
  const reference = `${book}.${chapter}`

  const defaultQ = merged
    ? `SELECT * FROM ${version}_chapters WHERE reference = '${reference}' LIMIT 0, 1000`
    : `
      SELECT * FROM ${version}_verses
      WHERE book = '${book}'
        AND verse LIKE '${chapter}.%'
      LIMIT 0, 1000
    `

  const NKJVQ = `
    SELECT * FROM ${version}_verses
    WHERE book_id = (SELECT id from ${version}_books WHERE short_name = '${book}')
    AND chapter = ${chapter}
    LIMIT 0, 1000
  `

  const sqlQuery = cond([
    [equals('nkjv'), always(NKJVQ)],
    [T, always(defaultQ)]
  ])(version)

  renderQuery(sqlQuery)(req, res)
}

export default { getChapter }
