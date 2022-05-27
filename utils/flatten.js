/* eslint-disable */
function flatten(data) {
  const result = {}

  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      const l = cur.length
      for (let i = 0; i < l; i++)
        recurse(cur[i], prop ? prop + '.' + i : '' + i)
      if (l == 0) result[prop] = []
    } else {
      let isEmpty = true
      for (const p in cur) {
        isEmpty = false
        recurse(cur[p], prop ? prop + '.' + p : p)
      }
      if (isEmpty) result[prop] = {}
    }
  }
  recurse(data, '')

  return result
}

module.exports = flatten
