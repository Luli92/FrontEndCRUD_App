import React from "react";

import { StyledEditButton } from "./styled";

export const EditButtonComponent = props => {
  const { title, disabled } = props;
  return (
    <StyledEditButton disabled={disabled} onClick={props.onClick}>
      {title}
    </StyledEditButton>
  );
};
