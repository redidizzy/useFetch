import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { useFetch } from "../hooks/useFetch"

const GamesList = () => {
  const games = useSelector(
    ({ result: { store1 } }) => store1?.games?.value?.results
  )
  const callbackFn = useCallback(
    (fetch) => ({
      developers: fetch("developers", {
        queryParams: {
          key: "deb1a3cbc7f44df59dbfb2a7934ea9e8",
          page_size: 500,
        },
      }),
    }),
    []
  )
  const [result, isLoading] = useFetch(callbackFn, "store2")
  return (
    <Box
      sx={{ width: "100%", maxWidth: 360, bgcolor: "indigo", color: "white" }}
    >
      <nav>
        <List>
          {games &&
            games.map((game, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText primary={game.name} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>
    </Box>
  )
}

export default GamesList
