import React, { Component } from "react";

import "./App.css";
import { getUsers, deleteUser } from "./API";
import Menu from "./components/Menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      checked: false,
      editUser: "",
      update: false
    };
  }

  componentDidMount = async () => {
    const apiData = await getUsers();
    this.setState({ users: apiData.data });
  };

  componentDidUpdate = async () => {
    const apiData = await getUsers();
    this.setState({ users: apiData.data });
  };

  checkIfChecked = (user, event) => {
    const { checked } = this.state;
    this.setState({ checked: !checked, editUser: user });
  };

  deleteUser = async user => {
    const { editUser } = this.state;
    if (user.userid) {
      await deleteUser(editUser.userid);
    }
  };

  handleDeleteRequest = () => {
    const { deleteConfirm } = this.state;
    this.setState({ deleteConfirm: !deleteConfirm });
  };

  render() {
    const { users, editUser, checked } = this.state;
    return (
      <>
        <Menu
          users={users.items}
          checked={this.checkIfChecked}
          editMode={editUser}
          disable={checked}
        ></Menu>
      </>
    );
  }
}

export default App;
