
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

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.get('/', (req, res) => res.render('home', { state: JSON.stringify(store.getState()) }))

app.post('/', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

export default app
