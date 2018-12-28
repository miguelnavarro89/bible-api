import express from 'express'
import bodyParser from 'body-parser'
import { mapObjIndexed, map, pipe, forEach, assoc, values, flatten, compose } from 'ramda'

import { routes } from './config'

class App {
  constructor() {
    this._express = express()
    this._setConfig()
    this._defineRoutes()
  }

  _setConfig() {
    this._express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    this._express.use(bodyParser.json())
    this._express.use(bodyParser.urlencoded({ extended: true }))
  }

  _defineRoutes() {
    const setRoute = ({ method, path, controller }) => this._express[method](path, controller)
    const enlist = pipe(
      mapObjIndexed((n, k, ob) => map(assoc('method', k))(ob[k])),
      values,
      flatten
    )
    const define = compose(forEach(setRoute), enlist)
    define(routes)
  }

  serve(cb) {
    cb = cb || (() => console.log(`  ✨ 🚀  Server running on port: ${server.address().port}`))
    const port = 8081
    const server = this._express.listen(port, cb)
    return server
  }
}

export default App
