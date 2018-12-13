import { renderQuery } from '../../utils';

export const getVerse = (req, res) => {
  const {
    version, book, chapter, verse,
  } = req.params;
  const chapterVerse = `${chapter}.${verse.padStart(3, '0')}`;
  const sqlQuery = `SELECT * FROM ${version}_verses WHERE book = '${book}' AND verse = '${chapterVerse}'`;
  renderQuery(sqlQuery)(req, res);
};

export default { getVerse };
