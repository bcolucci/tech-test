
import React from 'react'
import { render } from 'react-dom'
import PersonsTable from './PersonsTable'

const anchor = document.querySelector('#app-container')
render(<PersonsTable state={state}/>, anchor)
