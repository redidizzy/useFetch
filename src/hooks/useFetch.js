/**
 * @file Custom hook for outsourcing fetching data logic
 * @author Rediane Zemmouri
 */

import { useCallback, useEffect, useState } from "react"

/**
 *
 * @param {string} endpoint
 * @typedef returnType
 * @type {array}
 * @property {Object[]} 0 - results of fetch query
 * @property {boolean} 1 - loading state of fetch query
 *
 * @returns {returnType}
 */
export const useFetch = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const loadData = async () => {
    setIsLoading(true)
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(
        "The request has thrown an error, is your endpoint correct?"
      )
    }
    const data = await response.json()
    setResult(data)
    setIsLoading(false)
  }
  useEffect(() => {
    loadData()
  }, [])
  return [result, isLoading]
}
