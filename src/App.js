import { Button } from "@mui/material"
import { useCallback } from "react"
import "./App.css"
import GamesList from "./components/GamesList"
import MyFancyLoader from "./components/MyFancyLoader"
import UseFetch, { useFetch } from "./hooks/useFetch"

UseFetch.configure((config) => {
  config.baseUrl = "https://free-to-play-games-database.p.rapidapi.com/api/"
  config.authentificationHeader = () => {
    return {
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "x-rapidapi-key": "410ee145bemsh72dbbe02125b4d0p1e5666jsn8b53df71a6b8",
    }
  }
})

function App() {
  const callbackFn = useCallback(
    (fetch) => ({
      games: fetch("games"),
    }),
    []
  )
  const [result, isLoading, rerun] = useFetch(callbackFn)
  return (
    <>
      <MyFancyLoader loading={isLoading} />
      <Button onClick={rerun}>Reload</Button>
      <GamesList />
    </>
  )
}

export default App
