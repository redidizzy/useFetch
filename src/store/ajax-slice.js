import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  result: {},
}

const ajaxSlice = createSlice({
  name: "ajax",
  initialState,
  reducers: {
    loadData(store, { payload }) {
      store.result[payload.storeKey] = payload.result
    },
  },
})

export const ajaxActions = ajaxSlice.actions

export default ajaxSlice.reducer
