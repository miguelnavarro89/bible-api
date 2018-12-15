import { renderQuery } from '../../utils';

export const getVersion = (req, res) => {
  const { version } = req.params;
  const sqlQuery = `SELECT * FROM ${version}_metadata`;
  renderQuery(sqlQuery)(req, res);
};

export default { getVersion };
