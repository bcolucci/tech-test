import { join } from 'path'

const printMessage = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`
        >> ${join(__dirname, 'index.js')}
        Just a test with latest JS features.
      `)
      resolve()
    }, Math.ceil(Math.random() * 1000))
  })
  await promise
  console.log('All is ok.')
}

printMessage()
