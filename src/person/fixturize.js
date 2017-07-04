
import config from 'config'
import { add, save } from './actions'

export default store => {
  config.fixtures.forEach(person => store.dispatch(add(person)))
  store.dispatch(save())
}
