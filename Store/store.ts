import { configureStore } from '@reduxjs/toolkit'
import datafetch from './Slice'
import WeatherSlice from './WeatherSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {datastore: datafetch,weatherstore : WeatherSlice}
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']