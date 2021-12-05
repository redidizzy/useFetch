import { configureStore } from "@reduxjs/toolkit"
import ajaxReducer from "./ajax-slice"

const store = configureStore({
  reducer: ajaxReducer,
})

export default store
