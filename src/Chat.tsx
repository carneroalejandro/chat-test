
require('./App.css');

import React from 'react';
import io from 'socket.io-client';
import MsgList from './MsgList';
import UserList from './UserList';
import Input from './Input';

// server URL
const apiUrl = 'http://localhost:3000';

let socket: SocketIOClient.Socket;

interface msg {
  user: string;
  msg: string;
}


class Chat extends React.Component<{ user: string, disconnect: any }, { msgList: msg[], userList: string[], userTyping: boolean }> {
  static defaultProps: any;
  constructor(props: any) {
    super(props);
    this.state = { msgList: [], userList: [], userTyping: false};
    this.sendHandler = this.sendHandler.bind(this);
    this.disconnectHandler = this.disconnectHandler.bind(this);


    socket = io(apiUrl, { query: `user=${props.user}` }).connect();

    socket.on('msgList', (msgList: msg[]) => {
      console.log(msgList);
      this.setState({ msgList });
    });
    socket.on('userList', (userList: string[]) => {
      console.log(userList);
      this.setState({ userList });
    });

    socket.on('userTyping', () => {
      this.setState({ userTyping: true });
      setTimeout(() => {
        this.setState({ userTyping: false });
      }, 1500);
    });

    const msgObj = {
      user: this.props.user,
      msg: "connected"
    };
    socket.emit('client:msg', msgObj);
  }

  sendHandler(msg: string) {
    const msgObj = {
      user: this.props.user,
      msg
    };
    socket.emit('client:msg', msgObj);
  };

  typingHandler() {
    socket.emit('userTyping');
  };

  disconnectHandler() {
    socket.emit('disconnected');
    this.props.disconnect();
  };

  onUnload() {
    socket.emit('disconnected');
  };

  render() {
    return (
      <div className="container">
        <h3>React Chat App</h3>
        <p>{`User: ${this.props.user}`}</p>
        <button onClick={this.disconnectHandler}>
          Disconnect
        </button>
        <p>Users connected:</p>
        <UserList userList={this.state.userList} />
        <p style={{ visibility: this.state.userTyping ? 'visible' : 'hidden' }}>User typing</p>
        <p>Messages:</p>
        <MsgList msgList={this.state.msgList} currUser={this.props.user} />
        <Input onSend={this.sendHandler} onType={this.typingHandler} />
      </div>
    );
  }
}

Chat.defaultProps = {
  user: 'Anonymous'
};

export default Chat;