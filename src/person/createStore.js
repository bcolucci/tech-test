
import { createStore } from 'redux'
import { load } from './actions'
import reducer from './reducer'
import fixturize from './fixturize'

export default () => {
  const store = createStore(reducer)
  store.dispatch(load())
  if (store.getState().length === 0) {
    fixturize(store)
  }
  return store
}
