import express from 'express'
import bodyParser from 'body-parser'

import routes from './config/routes'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const factory = (routes, express) => {
  const defineRoutes = ({ path, controller }) => {
    express[method](path, controller);
  }
  const byMethods = (method) => {
    forEach(defineRoutes)(routes[method])
  }

  forEach(byMethods)(routes)
}

factory(routes, app)

const server = app.listen(8081, () => {
  console.log(`Server listening on port: ${server.address().port}`)
})
