import React from 'react';

import Msg from './Msg';

class MsgList extends React.Component<{msgList: any, currUser: string}, {}> {
  static defaultProps: any;
  componentDidUpdate() {
    const objDiv = document.getElementById('msgList');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  render() {
    const msgList = this.props.msgList.map((msg: any, i: string) => {
        return (
          <Msg
            key={i}
            user={msg.user}
            msg={msg.msg}
            currUser={this.props.currUser} />
        );
      });

    return (
      <div className='msgList' id='msgList'>
        { msgList }
      </div>
    );
  }
}

MsgList.defaultProps = {
  msgList: []
};

export default MsgList;