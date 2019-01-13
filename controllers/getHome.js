import { __, replace, join, mapObjIndexed, map, pick, pipe, assoc, values, flatten } from 'ramda'
import { routes } from '../config'

const enlist = pipe(
  mapObjIndexed((n, k, ob) => map(assoc('method', k))(ob[k])),
  values,
  flatten
)
const doc = pipe(
  enlist,
  map(pick(['path', 'method'])),
  map((e) => `
    <tr>
      <td>${e.path}</td>
      <td>${e.method}</td>
    </tr>
  `),
  join(''),
  replace('{$1}', __, `
    <table>
      <tr>
        <th>Path</th>
        <th>Method</th>
      </tr>
      {$1}
    </table>
  `)
)

export const getHome = (req, res) => {
  res.send(`
    <h1>📖 BIBLE API is ready 🙏🏼</h1>
    ${doc(routes)}
  `)
}
