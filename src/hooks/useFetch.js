/**
 * @file Custom hook for outsourcing fetching data logic
 * @author Rediane Zemmouri
 */

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { resolveAllPromises } from "../helpers"
import { ajaxActions } from "../store/ajax-slice"

const config = {
  baseUrl: null,
  authentificationHeader: null,
  headers: {
    /*Here we put default headers */
  },
  method: "GET",
}

const configureAndFetch = (endpoint) => {
  endpoint = config.baseUrl ? config.baseUrl + endpoint : endpoint
  if (config.authentificationHeader) {
    const auth = config.authentificationHeader()
    config.headers = { ...config.headers, ...auth }
  }
  return fetch(endpoint, {
    method: config.method,
    headers: config.headers,
  })
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
  const [result, setResult] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)

      const promises = callbackFn(configureAndFetch)

      const resolvedAsArray = await resolveAllPromises(promises)

      dispatch(
        ajaxActions.loadData(
          resolvedAsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        )
      )
      setIsLoading(false)
    }
    loadData()
  }, [callbackFn, dispatch])
  return [result, isLoading]
}
const UseFetch = {
  configure(configureFn) {
    configureFn(config)
  },
}

export default UseFetch
