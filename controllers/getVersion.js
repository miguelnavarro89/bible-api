import { handleResponseWithQuery } from '../utils'

export const getVersion = handleResponseWithQuery((request) => {
  const { version } = request.params
  const query = `SELECT * FROM ${version}_metadata`
  return query
})
