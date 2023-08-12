import React from "react"

class App extends React.Component {
  state = {
    name: ""
  }

  componentDidMount() {
    fetch("http://localhost:3000")
      .then(res => res.json())
      .then(data => this.setState({ name: data.name }))
  }

  render() {
    return (
      <h1>Welcome to {this.state.name}!</h1>
    )
  }
}

export default App