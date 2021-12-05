import { useCallback } from "react"
import "./App.css"
import MyFancyLoader from "./components/MyFancyLoader"
import { useFetch } from "./hooks/useFetch"

function App() {
  const callbackFn = useCallback(
    (fetch) => ({
      first: fetch("https://api.publicapis.org/entries"),
      second: fetch("https://api.publicapis.org/categories"),
    }),
    []
  )
  const [result, isLoading] = useFetch(callbackFn)
  return (
    <>
      <MyFancyLoader loading={isLoading} />
      {/* <FilterByCancerOrigin />
      <PatientList /> */}
    </>
  )
}

export default App
