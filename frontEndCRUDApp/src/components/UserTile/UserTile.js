import React from "react";
import moment from "moment";

import { StyledDiv, StyledInput } from "./styled";
import { EditModal } from "../common/Modal";

export const UserTile = props => {
  const { user, checked, editMode } = props;
  const dateCreated = moment(user.dateCreated).format("MMM Do, H:mm A");
  const dateModified = moment(user.dateModified).format("MMM Do, H:mm A");
  const yearCreated = moment(user.dateCreated).format("YYYY");
  const yearModified = moment(user.dateModified).format("YYYY");
  const width = window.innerwidth;

  return (
    <div style={{ width: width }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "flex-start" }}>
          <StyledInput
            type="checkbox"
            onChange={value => checked(user, value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "flex-start" }}>
          <EditModal editMode={editMode}> </EditModal>
        </div>
      </div>

      <StyledDiv>
        <h1>
          {user.namefirst} {user.namelast}
        </h1>
        <h1>{user.email}</h1>
        <h1 style={{ display: "flex", fontsize: 12 }}>
          {dateCreated}
          <div style={{ color: "gray", fontSize: 12, paddingTop: 6 }}>
            ({yearCreated})
          </div>
        </h1>
        <h1 style={{ display: "flex", fontsize: 12 }}>
          {dateModified}
          <div style={{ color: "gray", fontSize: 12, paddingTop: 6 }}>
            ({yearModified})
          </div>{" "}
        </h1>
      </StyledDiv>
    </div>
  );
};
