import React, {Component} from 'react';

class App extends Component {

  /*getInitialState(){
    return (
      {name:'-'}
    )
  }*/

  state = {
    name: '-'
  }

  handleChange = (event) => {
    this.setState({
      name: event
        .target
        .value
        .toUpperCase()
    })
  }

  render() {
    
    return (<input type="text" value={this.state.name} onChange={this.handleChange}/>);
  }
}

export default App;
