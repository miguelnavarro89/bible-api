import { execQuery } from '../utils'

export const getVersion = (req, res) => {
  const { version } = req.params
  const query = `SELECT * FROM ${version}_metadata`

  execQuery(query)
    .catch(res.status(404).send.bind(res))
    .then(res.send.bind(res))
}
