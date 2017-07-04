
import config from 'config'
import app from './app'

app.listen(config.port, () => {
  console.log(`Server is listening on :${config.port}`)
})
