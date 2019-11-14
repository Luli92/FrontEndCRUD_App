import React from "react";

import UserTile from "../UserTile";

export const UserList = props => {
  const { users, checked, editMode, loading } = props;

  if (loading) {
    return <h2>Loading Users....</h2>;
  }

  if (users.length === 0) {
    return <h2>No users in the list</h2>;
  }
  return (
    <ul>
      {users &&
        users.map((user, index) => {
          return (
            <UserTile
              index={index}
              key={user.userid}
              user={user}
              checked={checked}
              editMode={editMode}
            ></UserTile>
          );
        })}
    </ul>
  );
};
