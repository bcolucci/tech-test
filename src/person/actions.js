
export const ADD_ACTION = 'ADD_PERSON'
export const REMOVE_ACTION = 'REMOVE_PERSON'
export const UPDATE_ACTION = 'UPDATE_PERSON'

export const add = ({ firstname, surname }) => {
  return { type: ADD_ACTION, firstname, surname }
}

export const remove = ({ id }) => {
  return { type: REMOVE_ACTION, id }
}

export const update = ({ id, firstname, surname }) => {
  return { type: UPDATE_ACTION, id, firstname, surname }
}
