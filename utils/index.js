import DB from '../DB';

export const renderQuery = sqlQuery => (req, res) => {
  const db = new DB()
  return db.query(sqlQuery)
    .catch(({ code, errno }) => {
      res.status(404).send({
        error: true,
        details: {
          errno,
          code,
          type: 'database'
        }
      });
    })
    .then((results) => {
      res.send(results)
    });
}
