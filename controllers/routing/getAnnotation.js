import { renderQuery } from '../../utils';

export const getAnnotation = (req, res) => {
  const { version, annotationId } = req.params;
  const sqlQuery = `SELECT * FROM ${version}_annotations WHERE link = '${annotationId}'`;
  renderQuery(sqlQuery)(req, res);
};

export default { getAnnotation };
