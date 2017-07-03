
class PersonRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstname: props.firstname,
      surname: props.surname,
      prototype: false,
      saved: true
    }
  }

  handleSave() {
    console.log('save!')
  }

  renderBtns() {
    return (
      <button className='btn btn-success' onClick={this.handleSave.bind(this)}>
        <i className='fa fa-save'></i>
      </button>
    )
  }

  render() {
    return (
      <tr>
        <td>
          <input type='text' name='people[][firstname]' className='form-control'
            placeholder='John' value={this.state.firstname}/>
        </td>
        <td>
          <input type='text' name='people[][surname]' className='form-control'
            placeholder='Doe' value={this.state.surname}/>
        </td>
        <td>
          {this.renderBtns()}
        </td>
      </tr>
    )
  }

}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      persons: [ ...props.state ]
    }
  }

  renderRows() {
    const persons = this.state.persons.map(person => {
      return <PersonRow { ...person }/>
    })
    return [
      <PersonRow prototype={true}/>,
      ...persons
    ]
  }

  render() {
    return (
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-3'>
          <img src='/public/img/logo.svg' style={{ width: '100%' }}/>
        </div>
        <div className='col-3'>
          <table>
            <thead>
              <tr>
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

ReactDOM.render(<App state={state}/>, document.querySelector('#app-container'))
