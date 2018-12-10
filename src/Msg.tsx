import React from 'react';

class Msg extends React.Component<{currUser: string, user: string, msg: string}, {}> {
  static defaultProps: any;
  render() {
    const fromMe = this.props.currUser == this.props.user;

    return (
      <div className={`msg ${fromMe}`}>
        <div className='user'>
          { this.props.user }
        </div>
        <div className='msg-body'>
          { this.props.msg }
        </div>
      </div>
    );
  }
}

Msg.defaultProps = {
  msg: '',
  user: '',
  currUser: ''
};

export default Msg;