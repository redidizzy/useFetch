import { useCallback } from "react"
import "./App.css"
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
      }),
      games1: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
      }),
      games2: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
      }),
      games3: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
      }),
      games4: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
      }),
      games5: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
      }),
      games6: fetch("games", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 40,
        },
      }),
      genres: fetch("genres", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
      platforms: fetch("platforms", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
      publishers: fetch("publishers", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
      stores: fetch("stores", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
      tags: fetch("tags", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
      developers: fetch("developers", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
      creators: fetch("creators", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
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
