import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import appState from './app'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import api from './api'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
}

const logger = createLogger({
  predicate: (getState, action) => true,
  collapsed: true,
})

const reducer = combineReducers({
  app: appState.reducer,
  api: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ thunk: false }).concat(),
})

export type AppState = ReturnType<typeof reducer>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
