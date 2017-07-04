
import config from 'config'
import uuid from 'uuid'
import fs from 'fs'
import { join } from 'path'
import * as Actions from './actions'

export default (state = [], action) => {
  if (action === undefined) {
    return state
  }
  switch (action.type) {
    case Actions.LOAD_ACTION:
      if (fs.existsSync(config.stateFile)) {
        return JSON.parse(fs.readFileSync(config.stateFile))
      }
      return state
    case Actions.SAVE_ACTION:
      const srzState = JSON.stringify(state, null, 2)
      fs.writeFileSync(config.stateFile, srzState)
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
