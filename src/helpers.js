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
