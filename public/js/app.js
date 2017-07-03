
class App extends React.Component {
  render() {
    console.log('yeah, client ready!')
    return <img src='/public/img/logo.svg' style={{ width: '30%' }}/>
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
