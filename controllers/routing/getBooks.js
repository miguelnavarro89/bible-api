import { renderQuery } from "../../utils";

export const getBooks = (req, res) => {
  const { version } = req.params;
  const sqlQuery = `SELECT * FROM ${version}_books`;
  renderQuery(sqlQuery)(req, res);
};

export default { getBooks };
