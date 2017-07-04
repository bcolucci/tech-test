
import test from 'ava'
import request from 'supertest'
import app from '../src/app'

test('get home', t => {
  return request(app).get('/')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const persons = JSON.parse(res.body)
        // uuid.v1 can not be mocked here
        .map((person, idx) => {
          return { ...person, id: `uuid-${idx}` }
        })
      t.deepEqual(persons, [
        { id: 'uuid-0', firstname: 'Jeff', surname: 'Stelling' },
        { id: 'uuid-1', firstname: 'Chris', surname: 'Kamara' },
        { id: 'uuid-2', firstname: 'Alex', surname: 'Hammond' },
        { id: 'uuid-3', firstname: 'Jim', surname: 'White' },
        { id: 'uuid-4', firstname: 'Natalie', surname: 'Sawyer' }
      ])
    })
})

test('add person (validation failed)', t => {
  return request(app).post('/')
    .send({ firstname: 'Non alpha 0nly', surname: 'ValidSurname' })
    .set('Accept', 'application/json')
    .expect(500)
    .then(res => {
      t.deepEqual(res.body, { error: 'Invalid parameters' })
    })
})

test('add person', t => {
  const firstname = 'Charlie'
  const surname = 'Chaplin'
  return request(app).post('/')
    .send({ firstname, surname })
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const person = res.body
      // uuid.v1 can not be mocked here
      person.id = 'uuid-0'
      t.deepEqual(person, { id: 'uuid-0', firstname, surname })
    })
})

test('remove person', t => {
  const firstname = 'Charlie'
  const surname = 'Chaplin'
  return request(app).post('/')
    .send({ firstname, surname })
    .set('Accept', 'application/json')
    .then(res => {
      const person = res.body
      return request(app).delete(`/${person.id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          t.is(res.body, person.id)
        })
    })
})

test('update person', t => {
  const firstname = 'Charles'
  const surname = 'Spencer'
  return request(app).post('/')
    .send({ firstname: 'Charlie', surname: 'Chaplin' })
    .set('Accept', 'application/json')
    .then(res => {
      const person = res.body
      return request(app).patch('/')
        .send({ id: person.id, firstname, surname })
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          t.deepEqual(res.body, { id: person.id, firstname, surname })
        })
    })
})
