import { curry, is } from 'ramda'
import { DB } from '../DB'

export const execQuery = (query) => {
  const db = DB()
  const multipleQueries = is(Array, query)
  let result

  if (multipleQueries) {
    result = Promise.all(query.map(db.query.bind(db)))
  } else {
    result = db.query(query)
  }

  db.close()

  return new Promise((resolve, reject) => {
    /* eslint-disable prefer-promise-reject-errors */
    result
      .catch((error) => {
        reject({
          error: true,
          type: 'database',
          details: error
        })
      })
      .then(resolve)
    /* eslint-enable prefer-promise-reject-errors */
  })
}

export function getRandomOf (total = 10) {
  return Math.floor(Math.random() * total)
}

export const handleResponseWithQuery = curry(async (getSQLQuery, request, response) => {
  try {
    let query = getSQLQuery(request)
    let postProcess

    if (is(Array, query)) {
      [query, postProcess] = query
    }

    let result = await execQuery(query)
    if (postProcess) {
      console.log(result)
      result = postProcess(result)
    }

    response.send(result)
  } catch (e) {
    response.status(404).send(e)
  }
})
