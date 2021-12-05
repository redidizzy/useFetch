import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { useSelector } from "react-redux"

const GamesList = () => {
  const games = useSelector(({ result }) => result?.games?.value?.results)
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
