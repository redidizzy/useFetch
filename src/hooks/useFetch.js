/**
 * @file Custom hook for outsourcing fetching data logic
 * @author Rediane Zemmouri
 */

import LZString from "lz-string"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { querystring, resolveAllPromises } from "../helpers"
import { ajaxActions } from "../store/ajax-slice"

const config = {
  baseUrl: null,
  authentificationHeader: null,
  headers: {
    /*Here we put default headers */
  },
  method: "GET",
}

const configureAndFetch = (endpoint, params = {}) => {
  endpoint = config.baseUrl ? config.baseUrl + endpoint : endpoint
  if (params.queryParams) {
    endpoint += querystring(params.queryParams)
  }
  if (config.authentificationHeader) {
    const auth = config.authentificationHeader()
    config.headers = { ...config.headers, ...auth }
  }
  delete params.queryParams
  const options = {
    method: config.method,
    headers: config.headers,
    ...params,
  }
  return fetch(endpoint, options)
}

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
  const [cachedResult, setCachedResult] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const promises = callbackFn(configureAndFetch)

      const resolvedAsArray = await resolveAllPromises(promises)

      const result = resolvedAsArray.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      )
      dispatch(ajaxActions.loadData(result))
      localStorage.setItem(
        "savedData",
        LZString.compress(JSON.stringify(result))
      )
      setCachedResult(result)
      setIsLoading(false)
    }
    const result = localStorage.getItem("savedData")
    if (result) {
      setCachedResult(JSON.parse(LZString.decompress(result)))
    }
    loadData()
  }, [callbackFn, dispatch])
  return [cachedResult, !cachedResult && isLoading]
}
const UseFetch = {
  configure(configureFn) {
    configureFn(config)
  },
}

export default UseFetch
