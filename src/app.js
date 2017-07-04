
import { join } from 'path'
import Express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './person/router'

const app = Express()
app.set('view engine', 'pug')

app.use(morgan('tiny'))
app.use('/public', Express.static(join(__dirname, '..', 'public')))

app.use(bodyParser.json())

app.use((req, res, next) => {
  req.ctx = {} // just to isolate custom vars
  next()
})

app.use('/', router)

export default app
