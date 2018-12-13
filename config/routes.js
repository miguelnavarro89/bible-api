import {
  getVersions,
  getVersionData,
  getBooks,
  getAnnotation,
  getChapter,
  getVerse,
  getHome,
} from '../controllers/routing/';

const routes = {
  get: [
    { path: '/versions', controller: getVersions },
    { path: '/versions/:version', controller: getVersionData },
    { path: '/:version/annotation/:annotationId', controller: getAnnotation },
    { path: '/:version/books', controller: getBooks },
    { path: '/:version/books/:book/:chapter', controller: getChapter },
    { path: '/:version/books/:book/:chapter/:verse', controller: getVerse },
    { path: '/*', controller: getHome },
  ],
};

export default routes;
