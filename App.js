import express from 'express'
import bodyParser from 'body-parser'

import { routes } from './config'

let app

function createExpressApp () {
  app = express()
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}

function defineRoutes () {
  const httpMethods = Object.keys(routes)
  httpMethods.forEach((method) => {
    routes[method].forEach(({ path, controller }) => {
      app[method](path, controller)
    })
  })
}

function serve (cb) {
  cb = cb || function () {
    console.log(`  ✨ 🚀  Server running on port: http://localhost:${server.address().port}`)
  }
  const port = 8081
  const server = app.listen(port, cb)
  return server
}

export function initApp () {
  createExpressApp()
  defineRoutes()

  return {
    serve
  }
}
