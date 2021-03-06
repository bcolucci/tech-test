
import React, { Component } from 'react'
import PersonRow from './PersonRow'

export default class PersonsTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      persons: [ ...props.state ]
    }
  }

  renderRows() {
    const persons = this.state.persons.map(person => {
      return <PersonRow key={person.id} { ...person }
        onPersonRemoved={() => this.onPersonRemoved(person)}/>
    })
    return [
      <PersonRow key='proto'
        onPersonAdded={this.onPersonAdded.bind(this)}/>,
      ...persons
    ]
  }

  onPersonAdded(person) {
    const persons = [ ...this.state.persons, person ]
    this.setState({ persons })
  }

  onPersonRemoved(person) {
    if (! window.confirm('Are you sure?')) {
      return
    }
    fetch(`/${person.id}`, { method: 'DELETE' }).then(() => {
      const persons = this.state.persons.filter(p => p.id !== person.id)
      this.setState({ persons })
    }).catch(console.error.bind(console))
  }

  render() {
    return (
      <div className='row'>
        <div className='col-2'>
          <img src='/public/img/logo.svg' style={{ width: '100%' }}/>
        </div>
        <div className='col-10'>
          <h1>SkyBet Technical Test</h1>
          <p className='alert alert-info'>
            <i className='fa fa-cog'></i> Firstname and surname must be <strong>alpha strings</strong>, with a minimal
            length of <strong>three characters</strong>.
          </p>
          <table cellspacing="2">
            <thead>
              <tr>
                <th></th>
                <th>#UUID</th>
                <th>First name</th>
                <th>Last name</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}
