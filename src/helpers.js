import LZString from "lz-string"

function mapObjectToArray(obj, cb) {
  var res = []
  for (var key in obj) res.push(cb(obj[key], key))
  return res
}

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

export const deleteFirstBiggestCacheElement = (result) => {
  const cachedData = LZString.decompress(localStorage.getItem("savedData"))
  const cachedSize = cachedData.length
  const newSize = JSON.stringify(result).length
  const diff = newSize - cachedSize

  console.error(
    `Local storage is full, deleting first element with size bigger than diff ${diff}`
  )
  const parsedCachedData = JSON.parse(cachedData)
  for (const key in parsedCachedData) {
    const itemSize = JSON.stringify(parsedCachedData[key]).length
    if (itemSize > diff && !parsedCachedData[key].isLocked) {
      delete parsedCachedData[key]
      localStorage.setItem(
        "savedData",
        LZString.compress(JSON.stringify(result))
      )
      break
    }
  }
}

export const compresser = {
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
          isCompressed: true,
          value: data[key].value,
        }
      }
      if (timer > 200) stopCompressing = true
    }
    return result
  },
  decompress(data) {
    //decompress
  },
}
