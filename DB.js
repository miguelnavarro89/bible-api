import mysql from 'mysql'
import DbSettings from './config/db'

export function DB (config = DbSettings) {
  const _config = config
  let connection

  function connect () {
    connection = mysql.createConnection(_config)
  }

  function query (query) {
    if (!query) return
    !connection && connect()
    return new Promise((resolve, reject) => {
      connection.query(query, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  function close () {
    connection.end()
    connection = null
  }

  return {
    connect,
    query,
    close
  }
}
