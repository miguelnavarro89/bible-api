import { renderQuery } from '../../utils';

export const getVerse = (req, res) => {
  const { version, book, chapter, verse } = req.params
  const chapVerse = `${chapter}.${verse.padStart(3, '0')}`

  const sqlQuery = `SELECT * FROM ${version}_verses WHERE book = '${book}' AND verse = '${chapVerse}' LIMIT 0, 1000`
  
  renderQuery(sqlQuery)(req, res)
};

export default { getVerse };
