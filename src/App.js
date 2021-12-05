import { useCallback } from "react"
import "./App.css"
import MyFancyLoader from "./components/MyFancyLoader"
import UseFetch, { useFetch } from "./hooks/useFetch"

UseFetch.configure((config) => {
  config.baseUrl = "https://community-healthcaregov.p.rapidapi.com/api/"
  config.authentificationHeader = () => {
    return {
      "x-rapidapi-host": "community-healthcaregov.p.rapidapi.com",
      "x-rapidapi-key": "410ee145bemsh72dbbe02125b4d0p1e5666jsn8b53df71a6b8",
    }
  }
})

function App() {
  const callbackFn = useCallback(
    (fetch) => ({
      glossary: fetch("glossary.json"),
      index: fetch("index.json", {
        queryParams: { order: "label ASC" },
        body: { age: 100 },
      }),
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
