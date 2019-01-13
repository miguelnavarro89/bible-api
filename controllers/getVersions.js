import { execQuery } from '../utils'

export const getVersions = (req, res) => {
  execQuery('SELECT * FROM versions')
    .catch(res.status(404).send.bind(res))
    .then(res.send.bind(res))
}
