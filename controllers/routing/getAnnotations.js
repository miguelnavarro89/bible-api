import { T, cond, equals, always } from 'ramda'
import { renderQuery } from '../../utils'

export const getAnnotations = (req, res) => {
  const { version, book, chapter, verse } = req.params
  
  const defaultQ = `
    SELECT * FROM ${version}_annotations
    WHERE osis = '${book}.${chapter}'
      ${verse ? `AND link REGEXP '-${verse}[^0-9]'` : ''}
    LIMIT 0, 1000
  `
  const NKJVQ = `
    SELECT * FROM ${version}_annotations
    WHERE book_number = (SELECT book_number FROM ${version}_books WHERE short_name = '${book}')
      AND chapter = ${chapter}
      ${verse ? `AND verse = ${verse}` : ''}
    LIMIT 0,1000
  `

  const sqlQuery = cond([
    [equals('nkjv'), always(NKJVQ)],
    [T, always(defaultQ)]
  ])(version)

  renderQuery(sqlQuery)(req, res)
}

export default { getAnnotations }
