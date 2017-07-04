
import { Router } from 'express'
import { add, remove, update, save } from './actions'
import createStore from './createStore'
import validate from './validate'

const store = createStore()

const validateHandler = (req, res, next) => {
  if (! req.body) {
    return next('No data found.')
  }
  const { id, firstname, surname } = req.body
  if (! validate(firstname) || ! validate(surname)) {
    return res.status(500).json({ error: 'Invalid parameters' })
  }
  req.ctx.person = { id, firstname, surname }
  next()
}

const router = new Router

router.get('/', (req, res) => {
  const srzState = JSON.stringify(store.getState())
  if (req.xhr || req.headers.accept.includes('json')) {
    return res.json(srzState)
  }
  res.render('home', { state: srzState })
})

router.post('/', validateHandler, (req, res) => {
  const person = req.ctx.person
  store.dispatch(add(person))
  store.dispatch(save())
  const persons = store.getState()
  res.json(persons[persons.length - 1])
})

router.patch('/', validateHandler, (req, res) => {
  const person = req.ctx.person
  store.dispatch(update(person))
  store.dispatch(save())
  res.json(person)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  if (! id) {
    return res.status(500).end()
  }
  store.dispatch(remove({ id }))
  store.dispatch(save())
  res.json(id)
})

export default router
