import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  result: null,
}

const ajaxSlice = createSlice({
  name: "ajax",
  initialState,
  reducers: {
    loadData(store, { payload }) {
      store.result = payload
    },
  },
})

export const ajaxActions = ajaxSlice.actions

export default ajaxSlice.reducer
