
class Form extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-3'>
          <img src='/public/img/logo.svg' style={{ width: '100%' }}/>
        </div>
        <div className='col-3'>
          <form>
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </form>
        </div>
      </div>


    )
  }
}

ReactDOM.render(<Form/>, document.querySelector('#form-container'))
