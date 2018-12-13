import DB from '../DB';

export const renderQuery = sqlQuery => (req, res) =>
  DB.query(sqlQuery)
    .catch(({ code, errno }) => {
      res.status(404).send({
        error: true,
        details: {
          errno,
          code,
          type: 'dbQuery',
        },
      });
    })
    .then((results) => {
      res.send(results);
    });

export default { renderQuery };
