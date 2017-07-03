
import React, { Component } from 'react'

export default class PersonRow extends Component {

  constructor(props) {
    super(props)
    const firstname = props.firstname || ''
    const surname = props.surname || ''
    this.state = {
      id: props.id || '',
      initialValues: {
        firstname,
        surname
      },
      firstname: firstname,
      surname: surname
    }
  }

  componentDidMount() {
    if (! this.state.id) {
      this.refs.firstname.focus()
    }
  }

  handleSave() {
    const firstname = this.state.firstname.trim()
    const surname = this.state.surname.trim()
    if (firstname.length === 0) {
      return this.refs.firstname.focus()
    }
    if (surname.length === 0) {
      return this.refs.surname.focus()
    }
    fetch('/', {
      method: this.state.id ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        firstname,
        surname
      })
    })
    .then(res => res.json())
    .then(person => {
      if (! this.state.id) { // creation
        this.props.onPersonAdded(person)
        this.setState({ firstname: '', surname: '' })
      } else { // update
        console.log('update')
        this.setState({
          initialValues: {
            firstname,
            surname
          }
        })
      }
    })
    .catch(console.error.bind(console))
  }

  createField(name) {
    return <input type='text' ref={name} className='form-control'
      placeholder={name+'...'} value={this.state[name]}
      onChange={({ target }) => this.setState({ [name]: target.value })}/>
  }

  hasChanged() {
    const { initialValues, firstname, surname } = this.state
    return initialValues.firstname !== firstname
      || initialValues.surname !== surname
  }

  renderBtns() {
    const { id } = this.state
    const buttons = []
    if (id) {
      buttons.push(
        <button key='remove' className='btn btn-danger'
          onClick={this.props.onPersonRemoved.bind(this)}>
            <i className='fa fa-trash'></i>
        </button>
      )
    }
    buttons.push(
      <button key='save' className='btn btn-success'
        disabled={id && ! this.hasChanged()}
        onClick={this.handleSave.bind(this)}>
          <i className='fa fa-save'></i>
      </button>
    )
    return buttons
  }

  render() {
    const { id } = this.state
    return (
      <tr>
        <td className='id'>
          {id ? id : <strong>Create a new person:</strong>}
        </td>
        <td>{this.createField('firstname')}</td>
        <td>{this.createField('surname')}</td>
        <td>{this.renderBtns()}</td>
      </tr>
    )
  }

}
