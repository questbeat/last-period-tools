import { applyMiddleware, createStore } from 'redux'
import { rootReducer, State } from './modules'

export default (initialState: State) => {
  let middlewares = []

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    middlewares.push(logger)
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}
