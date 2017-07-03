
import React, { Component } from 'react'

export default class PersonRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      firstname: props.firstname,
      surname: props.surname
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstname, surname })
    })
    .then(res => res.json())
    .then(person => {
      this.props.onPersonAdded(person)
      this.setState({ firstname: '', surname: '' })
    })
    .catch(console.error.bind(console))
  }

  createField(name) {
    return <input type='text' ref={name} className='form-control'
      placeholder={name+'...'} value={this.state[name]}
      onChange={({ target }) => this.setState({ [name]: target.value })}/>
  }

  renderBtns() {
    const { id } = this.state
    if (id) {
      return (
        <button className='btn btn-danger'
          onClick={this.props.onPersonRemoved.bind(this)}>
            <i className='fa fa-trash'></i>
        </button>
      )
    }
    return (
      <button key='save' className='btn btn-success'
        onClick={this.handleSave.bind(this)}>
          <i className='fa fa-save'></i>
      </button>
    )
  }

  render() {
    const { id } = this.state
    const classNames = []
    if (! id) {
      classNames.push('proto')
    }
    return (
      <tr className={classNames.join(' ')}>
        <td>{id}</td>
        <td>{this.createField('firstname')}</td>
        <td>{this.createField('surname')}</td>
        <td>{this.renderBtns()}</td>
      </tr>
    )
  }

}
