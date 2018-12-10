import React, { Component } from 'react';
import './App.css';
import Chat from './Chat';

class App extends Component<{}, {submitted: boolean, user: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      submitted: false,
      user: '' };

    this.userChangeHandler = this.userChangeHandler.bind(this);
    this.userSubmitHandler = this.userSubmitHandler.bind(this);
    this.disconnect = this.disconnect.bind(this);
 
  }

  userChangeHandler(event: any) {
    this.setState({ user: event.target.value });
  }

  userSubmitHandler(event: any) {
    event.preventDefault();
    this.setState({ submitted: true, user: this.state.user });
  }

  disconnect() {
    console.log('disconnected');
    this.setState({ submitted: false});
  }

  render() {
    if (this.state.submitted) {
      return (
        <Chat user={this.state.user} disconnect={this.disconnect} />
      );
    }

    return (
      <div className="App">
        <header className="App-header">
            <h1>header-chat</h1>
        </header>
        <form onSubmit={this.userSubmitHandler} className="user">
          <h1>Simple Chat</h1>
          <div>
            <input
              type="text"
              onChange={this.userChangeHandler}
              placeholder="Enter username:"
              required />
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default App;