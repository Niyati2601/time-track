import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './adminSlice'
export const Store = configureStore({
  reducer: {
    admin: adminReducer
  },
})









