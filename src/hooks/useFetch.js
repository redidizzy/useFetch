/**
 * @file Custom hook for outsourcing fetching data logic
 * @author Rediane Zemmouri
 */

import { useEffect, useState } from "react"
import { resolveAllPromises } from "../helpers"

/**
 *
 * @param {string} endpoint
 * @typedef returnType
 * @type {array}
 * @property {Object[] | Object} 0 - results of fetch query
 * @property {boolean} 1 - loading state of fetch query
 *
 * @returns {returnType}
 */
export const useFetch = (callbackFn) => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      const promises = callbackFn(fetch)

      const resolvedAsArray = await resolveAllPromises(promises)

      setResult(
        resolvedAsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      )
      setIsLoading(false)
    }
    loadData()
  }, [])
  return [result, isLoading]
}
