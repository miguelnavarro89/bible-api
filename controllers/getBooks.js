import { propEq } from 'ramda'
import { handleResponseWithQuery } from '../utils'

export const getBooks = handleResponseWithQuery((req) => {
  const { version } = req.params
  const queryGeneralInfo = `SELECT id, short_name, long_name FROM ${version}_books`
  const queryMetadata = {
    default: `
    SELECT 
      book,
      SUBSTRING(verse FROM 1 FOR POSITION('.' IN verse)-1) AS chapter,
      COUNT(*) as total_verses
    FROM ${version}_verses
    GROUP BY book, chapter
    ORDER BY book AND chapter ASC
    `,
    nkjv: `
      SELECT
        short_name AS book,
        chapter,
        COUNT(*) as total_verses FROM ${version}_verses verses
      INNER JOIN ${version}_books books
        ON verses.book_id = books.id
      GROUP BY book_id, chapter
    `
  }

  const query = [
    queryGeneralInfo,
    queryMetadata[version] || queryMetadata.default
  ]

  return [query, mergeBooksWithMetadata]
})

function mergeBooksWithMetadata ([books, totals]) {
  const booksWithMetadata = books.map(
    (book) => {
      const chapters = totals.filter(propEq('book', book.short_name))
      return {
        ...book,
        total_chapters: chapters.length,
        total_verses: chapters.map(
          ({ total_verses: value }) => value
        )
      }
    }
  )
  return booksWithMetadata
}
