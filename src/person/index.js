
import { createStore } from 'redux'
import * as Actions from './actions'
import reducer from './reducer'

const createProductionStore = () => {
  const store = createStore(reducer)
  store.dispatch(Actions.load())
  if (store.getState().length === 0) {
    const fixtures = [
      { firstname: 'Jeff', surname: 'Stelling' },
      { firstname: 'Chris', surname: 'Kamara' },
      { firstname: 'Alex', surname: 'Hammond' },
      { firstname: 'Jim', surname: 'White' },
      { firstname: 'Natalie', surname: 'Sawyer' }
    ]
    fixtures.forEach(person => store.dispatch(Actions.add(person)))
    store.dispatch(Actions.save())
  }
  return store
}

export default {
  Actions,
  reducer,
  createProductionStore
}
