import { renderQuery } from '../../utils';

export const getChapter = (req, res) => {
  const { version, book, chapter } = req.params;
  const reference = `${book}.${chapter}`;
  const sqlQuery = `SELECT * FROM ${version}_chapters WHERE reference_osis = '${reference}'`;
  renderQuery(sqlQuery)(req, res);
};

export default { getChapter };
