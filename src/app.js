
import { join } from 'path'
import Express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = Express()

app.use(morgan('tiny'))
app.use('/public', Express.static(join(__dirname, '..', 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('home')
})

export default app
