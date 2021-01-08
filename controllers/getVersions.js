import { handleResponseWithQuery } from '../utils'

export const getVersions = handleResponseWithQuery(() => {
  return 'SELECT * FROM versions'
})
