
import test from 'ava'
import uuid from 'uuid'
import sinon from 'sinon'
import { createStore } from 'redux'
import reducer from '../src/person/reducer'
import { add, remove, update } from '../src/person/actions'

const createStoreProxy = () => {
  const store = createStore(reducer)
  store.subscribe(() => console.log('state changed', store.getState()))
  return store
}

test.beforeEach(() => {
  const stub = sinon.stub(uuid, 'v1')
  stub.onCall(0).returns('fake-uuid1')
  stub.onCall(1).returns('fake-uuid2')
})

test.afterEach(() => uuid.v1.restore())

test('add person', t => {
  const store = createStoreProxy()
  store.dispatch(add({ firstname: 'Brice', surname: 'Colucci' }))
  t.deepEqual(store.getState(), [
    { id: 'fake-uuid1', firstname: 'Brice', surname: 'Colucci' }
  ])
})

test('remove person', t => {
  const store = createStoreProxy()
  store.dispatch(add({ firstname: 'Brice', surname: 'Colucci' }))
  store.dispatch(add({ firstname: 'Caroline', surname: 'Lorent' }))
  t.deepEqual(store.getState(), [
    { id: 'fake-uuid1', firstname: 'Brice', surname: 'Colucci' },
    { id: 'fake-uuid2', firstname: 'Caroline', surname: 'Lorent' }
  ])
  store.dispatch(remove({ id: 'fake-uuid1' }))
  t.deepEqual(store.getState(), [
    { id: 'fake-uuid2', firstname: 'Caroline', surname: 'Lorent' }
  ])
})

test('update person', t => {
  const store = createStoreProxy()
  store.dispatch(add({ firstname: 'Brice', surname: 'Colucci' }))
  store.dispatch(add({ firstname: 'Caroline', surname: 'Lorent' }))
  t.deepEqual(store.getState(), [
    { id: 'fake-uuid1', firstname: 'Brice', surname: 'Colucci' },
    { id: 'fake-uuid2', firstname: 'Caroline', surname: 'Lorent' }
  ])
  store.dispatch(update({ id: 'fake-uuid1', firstname: 'Maximilien', surname: 'Colucci' }))
  t.deepEqual(store.getState(), [
    { id: 'fake-uuid1', firstname: 'Maximilien', surname: 'Colucci' },
    { id: 'fake-uuid2', firstname: 'Caroline', surname: 'Lorent' }
  ])
})
