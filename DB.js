import mysql from 'mysql'
import dbConfig from './config/db'

class DB {
  constructor (config = dbConfig) {
    this.config = config
  }

  connect () {
    this.config = this.config || dbConfig
    this.connection = mysql.createConnection(this.config)
  }

  query (query) {
    if (!query) return
    !this.connection && this.connect()
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  close () {
    this.connection.end()
    this.connection = null
  }
}

export default DB
