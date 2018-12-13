import { renderQuery } from '../../utils';

export const getVersions = renderQuery('SELECT * FROM versions');

export default { getVersions };
