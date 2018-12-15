import { T, cond, equals, always } from 'ramda'
import { renderQuery } from '../../utils';

export const getChapter = (req, res) => {
  const { version, book, chapter } = req.params;
  const reference = `${book}.${chapter}`;

  const defaultQ = `SELECT * FROM ${version}_chapters WHERE reference_osis = '${reference}' LIMIT 0, 1000`;
  const NKJVQ = `
    SELECT * FROM ${version}_verses
    WHERE book_number = (SELECT book_number from ${version}_books WHERE short_name = '${book}')
    AND chapter = ${chapter}
    LIMIT 0, 1000
  `;

  const sqlQuery = cond([
    [equals('nkjv'), always(NKJVQ)],
    [T, always(defaultQ)]
  ])(version)

  renderQuery(sqlQuery)(req, res);
};

export default { getChapter };
