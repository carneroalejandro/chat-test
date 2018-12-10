import React from 'react';

class UserList extends React.Component<{userList: any, currUser: string}, {}> {
  static defaultProps: any;
  componentDidUpdate() {
    const objDiv = document.getElementById('userList');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  render() {
    return (
      <div className='userList' id='userList'>
        { this.props.userList }
      </div>
    );
  }
}

UserList.defaultProps = {
  userList: []
};

export default UserList;