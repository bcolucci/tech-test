
import { join } from 'path'
import Express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import * as Person from './person'

const module = Person.default

const store = module.createProductionStore()

const app = Express()

app.use(morgan('tiny'))
app.use('/public', Express.static(join(__dirname, '..', 'public')))

app.use(bodyParser.json())

app.use((req, res, next) => {
  req.appCtx = {}
  next()
})

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('home', { state: JSON.stringify(store.getState()) }))

const validatePerson = (req, res, next) => {
  if (! req.body) {
    return next('No data found.')
  }
  const { id, firstname, surname } = req.body
  req.appCtx.person = { id, firstname, surname }
  //TODO use validator
  next()
}

app.post('/', validatePerson, (req, res) => {
  const person = req.appCtx.person
  store.dispatch(module.Actions.add(person))
  store.dispatch(module.Actions.save())
  const persons = store.getState()
  res.json(persons[persons.length - 1])
})

app.patch('/', validatePerson, (req, res) => {
  const person = req.appCtx.person
  store.dispatch(module.Actions.update(person))
  store.dispatch(module.Actions.save())
  res.json(person)
})

app.delete('/:id', (req, res) => {
  const { id } = req.params
  if (! id) {
    return res.status(500).end()
  }
  store.dispatch(module.Actions.remove({ id }))
  store.dispatch(module.Actions.save())
  res.json(id)
})

export default app
