import { createSlice } from '@reduxjs/toolkit'
const initialState = {
 admin: ""
}
export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminDetails: (state, action) =>{
      state.admin = action.payload
    }
  },
})
export const { setAdminDetails } = adminSlice.actions
export default adminSlice.reducer