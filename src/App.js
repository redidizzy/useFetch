import "./App.css"
import MyFancyLoader from "./components/MyFancyLoader"
import { useFetch } from "./hooks/useFetch"

function App() {
  const [result, isLoading] = useFetch("https://api.publicapis.org/entries")
  console.log(result)
  return (
    <>
      <MyFancyLoader loading={isLoading} />
      {/* <FilterByCancerOrigin />
      <PatientList /> */}
    </>
  )
}

export default App
