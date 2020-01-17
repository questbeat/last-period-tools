import { applyMiddleware, createStore as reduxCreateStore } from 'redux'
import { State, rootReducer } from './modules'

export const createStore = (initialState: State) => {
  let middlewares = []

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }

  const store = reduxCreateStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}
