import { renderQuery } from '../../utils';

export const getVersionData = (req, res) => {
  const { version } = req.params;
  const sqlQuery = `SELECT * FROM ${version}_metadata`;
  renderQuery(sqlQuery)(req, res);
};

export default { getVersionData };
