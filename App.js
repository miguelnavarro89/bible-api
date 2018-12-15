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
    cb = cb || (() => console.log(`  ✨ 🚀  Server listening on port: ${server.address().port}`))
    const server = this._express.listen(8081, cb)
    return server
  }
}

export default App
