
import uuid from 'uuid'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import * as Actions from './actions'

const file = join(__dirname, '..', '..', 'persons.json')

export default (state = [], action) => {
  if (action === undefined) {
    return state
  }
  switch (action.type) {
    case Actions.LOAD_ACTION:
      return existsSync(file) ? JSON.parse(readFileSync(file)) : state
    case Actions.SAVE_ACTION:
      writeFileSync(file, JSON.stringify(state, null, 2))
      break
    case Actions.ADD_ACTION:
      const id = uuid.v1()
      const { firstname, surname } = action.data
      return [ ...state, { id, firstname, surname } ]
    case Actions.REMOVE_ACTION:
      return state.filter(user => user.id !== action.data.id)
    case Actions.UPDATE_ACTION:
      return state.map(user => {
        if (user.id !== action.data.id) {
          return user
        }
        return { ...user, ...action.data }
      })
  }
  return state
}
