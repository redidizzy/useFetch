function mapObjectToArray(obj, cb) {
  var res = []
  for (var key in obj) res.push(cb(obj[key], key))
  return res
}

export const resolveAllPromises = (promises) =>
  Promise.all(
    mapObjectToArray(promises, async (promise, key) => {
      const response = await promise
      if (!response.ok) {
        throw new Error(
          "Something went wrong with your requests, are your endpoints correct ?"
        )
      }
      const value = await response.json()
      return {
        [key]: value,
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
