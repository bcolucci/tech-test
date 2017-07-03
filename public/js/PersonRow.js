
class PersonRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstname: null,
      surname: null
    }
  }

  render() {
    return (
      <tr>
        <td>
          <input type='text' name='people[][firstname]' placeholder='John' value={this.state.firstname}/>
        </td>
        <td>
          <input type='text' name='people[][surname]' placeholder='Doe' value={this.state.surname}/>
        </td>
      </tr>
    )
  }

}
