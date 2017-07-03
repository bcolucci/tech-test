
export const LOAD_ACTION = 'LOAD_PERSONS'
export const SAVE_ACTION = 'SAVE_PERSONS'
export const ADD_ACTION = 'ADD_PERSON'
export const REMOVE_ACTION = 'REMOVE_PERSON'
export const UPDATE_ACTION = 'UPDATE_PERSON'

export const load = () => {
  return { type: LOAD_ACTION }
}

export const save = () => {
  return { type: SAVE_ACTION }
}

export const add = ({ firstname, surname }) => {
  return {
    type: ADD_ACTION,
    data: {
      firstname,
      surname
    }
  }
}

export const remove = ({ id }) => {
  return {
    type: REMOVE_ACTION,
    data: {
      id
    }
  }
}

export const update = ({ id, firstname, surname }) => {
  return {
    type: UPDATE_ACTION,
    data: {
      id,
      firstname,
      surname
    }
  }
}
