import { propEq } from 'ramda'
import { execQuery } from '../utils'

export const getBooks = (req, res) => {
  const { version } = req.params
  const queryGeneralInfo = `SELECT id, short_name, long_name FROM ${version}_books`
  const queryStatistics = {
    default: `
      SELECT
        book,
        SUBSTRING(verse FROM 1 FOR POSITION('.' IN verse)-1) AS chapter,
        COUNT(*) as total_verses
      FROM ${version}_verses
      GROUP BY book, chapter
      ORDER BY id
    `,
    nkjv: `
      SELECT
        short_name,
        chapter,
        COUNT(*) as total_verses FROM ${version}_verses verses
      INNER JOIN ${version}_books books
        ON verses.book_id = books.id
      GROUP BY book_id, chapter
    `
  }

  const query = [
    queryGeneralInfo,
    queryStatistics[version] || queryStatistics.default
  ]

  const mergeBooksWithStatistics = function ([ books, totals ]) {
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
    res.send(booksWithMetadata)
  }

  execQuery(query)
    .catch(res.status(404).send.bind(res))
    .then(mergeBooksWithStatistics)
}
