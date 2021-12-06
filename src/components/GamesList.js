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
  const games = useSelector(({ result }) => result?.store1?.games?.value)
  const callbackFn = useCallback(
    (fetch) => ({
      singleGame: fetch("game", {
        queryParams: {
          id: "452",
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
                  <ListItemText primary={game.title} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>
    </Box>
  )
}

export default GamesList
