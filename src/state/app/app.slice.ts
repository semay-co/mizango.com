import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

import reducers from './app.reducers'

export interface AppState {
  ui?: {
    contentLoading?: boolean
  }
}

const initialState: AppState = {}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers,
})

export const selectIntention = (state: RootState) => state.app

const appState = slice

export default appState
