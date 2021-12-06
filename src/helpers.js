/**
 * @file Helper functions
 * @author Rediane Zemmouri
 */
import LZString from "lz-string"

/**
 *
 * @param {Object} obj
 * @param {function} cb
 * @returns {Array}
 */
function mapObjectToArray(obj, cb) {
  var res = []
  for (var key in obj) res.push(cb(obj[key], key))
  return res
}

/**
 *
 * @param {Promise[]} promises
 * @returns {Object}
 */
export const resolveAllPromises = (promises) =>
  Promise.all(
    mapObjectToArray(promises, async ({ promise, isLocked }, key) => {
      const response = await promise
      if (!response.ok) {
        throw new Error(
          "Something went wrong with your requests, are your endpoints correct ?"
        )
      }
      const value = await response.json()
      return {
        [key]: {
          value,
          isLocked,
        },
      }
    })
  )
/**
 *
 * @param {Object} query query parameters object
 * @returns {string} stringified version of query
 */
export const querystring = (query = {}) => {
  // get array of key value pairs ([[k1, v1], [k2, v2]])
  const qs = Object.entries(query)
    // filter pairs with undefined value
    .filter((pair) => pair[1] !== undefined)
    // encode keys and values, remove the value if it is null, but leave the key
    .map((pair) =>
      pair
        .filter((i) => i !== null)
        .map(encodeURIComponent)
        .join("=")
    )
    .join("&")

  return qs && "?" + qs
}
/**
 *
 * @param {Object} result
 */
export const deleteFirstBiggestCacheElement = (result) => {
  const cachedData = compresser.decompress(localStorage.getItem("savedData"))
  const cachedSize = cachedData.length
  const newSize = JSON.stringify(result).length

  // The difference between the size of the new result and the size of the cache is what we'll use
  const diff = newSize - cachedSize

  console.error(
    `Local storage is full, deleting first element with size bigger than diff ${diff}`
  )

  const parsedCachedData = JSON.parse(cachedData)
  // Delete the first element whose size is bigger than diff and that is not locked
  for (const key in parsedCachedData) {
    const itemSize = JSON.stringify(parsedCachedData[key]).length
    if (itemSize > diff && !parsedCachedData[key].isLocked) {
      delete parsedCachedData[key]
      const compressedResult = compresser.compress(parsedCachedData)
      localStorage.setItem("savedData", compressedResult)
      break
    }
  }
}

export const compresser = {
  /**
   *
   * @param {Object} data
   * @returns {string}
   */
  compress(data) {
    let result = {}
    let timer = 0
    let stopCompressing = false
    for (const key in data) {
      const now = Date.now()
      const compressedValue = LZString.compress(JSON.stringify(data[key].value))
      timer += Date.now() - now
      if (!stopCompressing) {
        result[key] = {
          isLocked: data[key].isLocked,
          isCompressed: true,
          value: compressedValue,
        }
      } else {
        result[key] = {
          isLocked: data[key].isLocked,
          isCompressed: false,
          value: data[key].value,
        }
      }
      if (timer > 200) stopCompressing = true
    }
    return JSON.stringify(result)
  },
  /**
   *
   * @param {string} data
   * @returns {object}
   */
  decompress(data) {
    const result = JSON.parse(data)
    for (const key in result) {
      if (result[key].isCompressed) {
        result[key].value = JSON.parse(LZString.decompress(result[key].value))
      }
      delete result[key].isCompressed
    }
    return result
  },
}
