import { is } from 'ramda'
import DB from '../DB'

export const execQuery = (sqlQuery) => {
  const db = new DB()
  const multipleQueries = is(Array, sqlQuery)
  let result

  if (multipleQueries) {
    result = Promise.all(sqlQuery.map(db.query.bind(db)))
  } else {
    result = db.query(sqlQuery)
  }

  db.close()

  return result.catch(({ code, errno }) => ({
    error: true,
    details: {
      errno,
      type: 'database',
      code
    }
  }))
}
