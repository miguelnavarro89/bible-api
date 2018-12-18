import { T, cond, equals, always } from 'ramda'
import { renderQuery } from '../../utils'

export const getVerse = (req, res) => {
  const { version, book, chapter, verse } = req.params
  const chapVerse = `${chapter}.${verse.padStart(3, '0')}`

  const defaultQ = `SELECT * FROM ${version}_verses WHERE book = '${book}' AND verse = '${chapVerse}' LIMIT 0, 1000`
  const NKJVQ = `
    SELECT * FROM ${version}_verses
    WHERE book_id = (SELECT id from ${version}_books WHERE short_name = '${book}')
    AND chapter = ${chapter}
    AND verse = ${verse}
    LIMIT 0, 1000
  `

  const sqlQuery = cond([
    [equals('nkjv'), always(NKJVQ)],
    [T, always(defaultQ)]
  ])(version)

  renderQuery(sqlQuery)(req, res)
};

export default { getVerse }
