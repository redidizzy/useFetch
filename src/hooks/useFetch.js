/**
 * @file Custom hook for outsourcing fetching data logic
 * @author Rediane Zemmouri
 *
 * @typedef PromiseObject
 * @property {Promise} Promise
 * @property {boolean} isLocked
 *
 * @typedef returnType
 * @type {array}
 * @property {Object[] | Object} 0 - results of fetch query
 * @property {boolean} 1 - loading state of fetch query
 */

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  compresser,
  deleteFirstBiggestCacheElement,
  querystring,
  resolveAllPromises,
} from "../helpers"
import { ajaxActions } from "../store/ajax-slice"

const config = {
  baseUrl: null,
  authentificationHeader: null,
  headers: {
    /*Here we put default headers */
  },
  method: "GET",
}
/**
 * Prepare fetch promise by configuring it according to config and adding options
 * @param {string} endpoint
 * @param {Object} params
 * @returns {PromiseObject}
 */
const configureAndFetch = (endpoint, params = {}) => {
  // If baseUrl is given, prepend it to endpoint
  endpoint = config.baseUrl ? config.baseUrl + endpoint : endpoint

  if (params.queryParams) {
    endpoint += querystring(params.queryParams)
  }

  if (config.authentificationHeader) {
    const auth = config.authentificationHeader()
    config.headers = { ...config.headers, ...auth }
  }
  // queryParams are treated in line 41, we should delete them to spread the params object in line 54
  delete params.queryParams

  const options = {
    method: config.method,
    headers: config.headers,
    ...params,
  }

  return {
    promise: fetch(endpoint, options),
    isLocked: params.isLocked,
  }
}

/**
 *
 * @param {function} callbackFn
 * @param {string} storeKey
 *
 * @returns {returnType}
 */

export const useFetch = (callbackFn, storeKey = "store1") => {
  const [isLoading, setIsLoading] = useState(false)
  const [cachedResult, setCachedResult] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const promises = callbackFn(configureAndFetch)

      const resolvedAsArray = await resolveAllPromises(promises)

      // We reduce the array to an object
      const result = resolvedAsArray.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      )
      dispatch(ajaxActions.loadData({ result, storeKey }))
      try {
        console.log(e)
      } catch (e) {
        console.log(e)
        if (e === "QUOTA_EXCEEDED_ERR") {
          deleteFirstBiggestCacheElement(result)
        }
      }
      setCachedResult(result)
      setIsLoading(false)
    }
    const result = localStorage.getItem(storeKey)
    if (result) {
      const decompressedResult = compresser.decompress(result)
      dispatch(ajaxActions.loadData({ result: decompressedResult, storeKey }))
      setCachedResult(decompressedResult)
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
