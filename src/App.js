import { useCallback } from "react"
import "./App.css"
import GamesList from "./components/GamesList"
import MyFancyLoader from "./components/MyFancyLoader"
import UseFetch, { useFetch } from "./hooks/useFetch"

UseFetch.configure((config) => {
  config.baseUrl = "https://rawg-video-games-database.p.rapidapi.com/"
  config.authentificationHeader = () => {
    return {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": "410ee145bemsh72dbbe02125b4d0p1e5666jsn8b53df71a6b8",
    }
  }
})

function App() {
  const callbackFn = useCallback(
    (fetch) => ({
      games: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
        // This will serve for avoiding to delete the entry when clearing cache in deleteFirstBiggestCacheElement
        isLocked: true,
      }),
    }),
    []
  )
  const [result, isLoading] = useFetch(callbackFn)
  return (
    <>
      <MyFancyLoader loading={isLoading} />
      <GamesList />
    </>
  )
}

export default App
