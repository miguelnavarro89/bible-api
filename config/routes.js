import {
  getVersions,
  getVersion,
  getBooks,
  getAnnotations,
  getChapter,
  getVerse,
  getHome
  // getRandomVerse
} from '../controllers'

export const routes = {
  get: [
    { path: '/versions', controller: getVersions },
    { path: '/versions/:version', controller: getVersion },
    { path: '/:version/annotations/:book/:chapter/', controller: getAnnotations },
    { path: '/:version/annotations/:book/:chapter/:verse', controller: getAnnotations },
    { path: '/:version/books', controller: getBooks },
    { path: '/:version/books/:book/:chapter', controller: getChapter },
    { path: '/:version/books/:book/:chapter/:verse', controller: getVerse },
    // { path: '/verse/random', controller: getRandomVerse },
    { path: '/*', controller: getHome }
  ]
}
